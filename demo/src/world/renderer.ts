import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createModel } from './models';

type View = {
  kind: string;
  model: ReturnType<typeof createModel>;
  time: number;
  yaw: number;
  targetYaw: number;
  tilt: number;
  targetTilt: number;
  inspect: number;
};

export function mountWorld(host: HTMLElement, content: HTMLElement, onReady: (ready: boolean) => void) {
  const renderer = new T.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.autoClear = false;
  renderer.setClearColor(0x080808, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.07;
  const room = new RoomEnvironment();
  const generator = new T.PMREMGenerator(renderer);
  const environment = generator.fromScene(room, .04, .1, 100);
  room.dispose();
  generator.dispose();
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.append(canvas);

  const slots = new Set<HTMLElement>();
  const nearby = new Set<HTMLElement>();
  const views = new Map<HTMLElement, View>();
  const coarse = matchMedia('(pointer: coarse)');
  const clamp = T.MathUtils.clamp;
  let frame = 0;
  let last = 0;
  let width = 0;
  let height = 0;
  let stopped = false;
  let lost = false;
  let paused = false;
  let active = false;
  let drag: { slot: HTMLElement; id: number; x: number; y: number } | undefined;

  function schedule() {
    if (!stopped && !lost && !document.hidden && !frame) frame = requestAnimationFrame(draw);
  }

  function retire(slot: HTMLElement) {
    views.get(slot)?.model.dispose();
    views.delete(slot);
    delete slot.dataset.live;
  }

  function draw(now: number) {
    frame = 0;
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const compact = viewportWidth < 760 || coarse.matches;
    if (!paused && compact && last && now - last < 30) {
      schedule();
      return;
    }
    const delta = last && !paused ? Math.min((now - last) / 1000, .055) : 0;
    last = now;
    if (viewportWidth !== width || viewportHeight !== height) {
      width = viewportWidth;
      height = viewportHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1 : 1.4));
      renderer.setSize(width, height, false);
    }

    const visible = [...nearby].map(slot => ({ slot, bounds: slot.getBoundingClientRect() }))
      .filter(({ bounds }) => bounds.width && bounds.height && bounds.bottom > 0 && bounds.top < height && bounds.right > 0 && bounds.left < width);
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, width, height);
    renderer.clear(true, true, false);
    renderer.setScissorTest(true);
    let moving = false;

    for (const { slot, bounds } of visible) {
      const kind = slot.dataset.world!;
      let view = views.get(slot);
      if (!view || view.kind !== kind) {
        retire(slot);
        view = { kind, model: createModel(kind, environment.texture), time: 0, yaw: 0, targetYaw: 0, tilt: 0, targetTilt: 0, inspect: 0 };
        views.set(slot, view);
      }
      view.time += delta;
      const blend = paused ? 1 : .13;
      view.yaw = T.MathUtils.lerp(view.yaw, view.targetYaw, blend);
      view.tilt = T.MathUtils.lerp(view.tilt, view.targetTilt, blend);
      const inspection = slot.dataset.inspect === 'true' ? 1 : 0;
      view.inspect = T.MathUtils.lerp(view.inspect, inspection, blend);
      const scroll = paused ? 0 : clamp((height - bounds.top) / (height + bounds.height) - .5, -.5, .5);
      const x = Math.max(0, bounds.left);
      const y = Math.max(0, height - bounds.bottom);
      renderer.setViewport(bounds.left, height - bounds.bottom, bounds.width, bounds.height);
      renderer.setScissor(x, y, Math.min(width, bounds.right) - x, Math.min(height, height - bounds.top) - y);
      renderer.clearDepth();
      view.model.update(view.time, bounds.width / bounds.height, view.yaw, view.tilt, scroll, view.inspect);
      renderer.render(view.model.scene, view.model.camera);
      slot.dataset.live = 'true';
      if (!active) {
        active = true;
        onReady(true);
      }
      moving = true;
    }
    if (moving && !paused) schedule();
    else last = 0;
  }

  const intersection = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const slot = entry.target as HTMLElement;
      if (entry.isIntersecting) nearby.add(slot);
      else {
        nearby.delete(slot);
        retire(slot);
      }
    }
    schedule();
  }, { rootMargin: '72px' });

  function syncSlots() {
    const next = new Set(content.querySelectorAll<HTMLElement>('[data-world]'));
    for (const slot of slots) {
      if (next.has(slot)) continue;
      slots.delete(slot);
      nearby.delete(slot);
      intersection.unobserve(slot);
      retire(slot);
    }
    for (const slot of next) {
      if (slots.has(slot)) continue;
      slots.add(slot);
      intersection.observe(slot);
    }
    schedule();
  }

  const mutations = new MutationObserver(syncSlots);
  mutations.observe(content, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-world', 'data-inspect'] });
  const resize = new ResizeObserver(schedule);
  resize.observe(content);
  syncSlots();

  function pointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0 || !(event.target instanceof Element)) return;
    const slot = event.target.closest<HTMLElement>('[data-world][data-orbitable]');
    if (!slot || !views.has(slot)) return;
    drag = { slot, id: event.pointerId, x: event.clientX, y: event.clientY };
    slot.setPointerCapture(event.pointerId);
    slot.dataset.dragging = 'true';
  }

  function pointerMove(event: PointerEvent) {
    if (!drag || drag.id !== event.pointerId) return;
    const view = views.get(drag.slot);
    if (!view) return;
    view.targetYaw += (event.clientX - drag.x) * -.008;
    if (event.pointerType !== 'touch') view.targetTilt = clamp(view.targetTilt + (event.clientY - drag.y) * .0025, -.23, .27);
    drag.x = event.clientX;
    drag.y = event.clientY;
    schedule();
  }

  function pointerEnd(event: PointerEvent) {
    if (!drag || drag.id !== event.pointerId) return;
    delete drag.slot.dataset.dragging;
    drag = undefined;
  }

  function control(event: Event) {
    if (!(event.target instanceof HTMLElement)) return;
    const view = views.get(event.target);
    if (!view) return;
    const turn = (event as CustomEvent<number>).detail;
    if (turn === 0) {
      view.targetYaw = 0;
      view.targetTilt = 0;
    } else {
      view.targetYaw += turn * Math.PI / 6;
    }
    schedule();
  }

  function contextLost(event: Event) {
    event.preventDefault();
    lost = true;
    active = false;
    cancelAnimationFrame(frame);
    frame = 0;
    last = 0;
    for (const slot of slots) retire(slot);
    onReady(false);
  }

  function contextRestored() {
    lost = false;
    schedule();
  }

  function visibility() {
    last = 0;
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else schedule();
  }

  content.addEventListener('pointerdown', pointerDown);
  content.addEventListener('pointermove', pointerMove);
  content.addEventListener('pointerup', pointerEnd);
  content.addEventListener('pointercancel', pointerEnd);
  content.addEventListener('world-control', control);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('visibilitychange', visibility);
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.addEventListener('webglcontextrestored', contextRestored);

  return {
    pause(value: boolean) {
      paused = value;
      last = 0;
      schedule();
    },
    dispose() {
      stopped = true;
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resize.disconnect();
      mutations.disconnect();
      content.removeEventListener('pointerdown', pointerDown);
      content.removeEventListener('pointermove', pointerMove);
      content.removeEventListener('pointerup', pointerEnd);
      content.removeEventListener('pointercancel', pointerEnd);
      content.removeEventListener('world-control', control);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', visibility);
      canvas.removeEventListener('webglcontextlost', contextLost);
      canvas.removeEventListener('webglcontextrestored', contextRestored);
      for (const slot of slots) retire(slot);
      environment.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    }
  };
}
