import * as T from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { buildEnvironment } from './environment';
import { chapters, stations } from './journey';

type Callbacks = { ready: (value: boolean) => void; chapter: (value: number) => void; select: () => void; quality: (value: string) => void };

export function mountUniverse(host: HTMLElement, root: HTMLElement, label: HTMLElement, callbacks: Callbacks) {
  let mobile = innerWidth < 760;
  const renderer = new T.WebGLRenderer({ antialias: !mobile, powerPreference: 'high-performance' });
  renderer.setClearColor(0x080808);
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  host.append(canvas);
  const scene = new T.Scene(); scene.background = new T.Color(0x080808); scene.fog = new T.FogExp2(0x080808, .011);
  const camera = new T.PerspectiveCamera(49, 1, .2, 240);
  scene.userData.cameraPosition = camera.position;
  const room = new RoomEnvironment();
  const pmrem = new T.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(room, .04); room.dispose(); pmrem.dispose();
  scene.environment = environment.texture; scene.environmentIntensity = .65;
  const hemisphere = new T.HemisphereLight(0xf5f1e8, 0x18120d, 1.4); scene.add(hemisphere);
  const key = new T.DirectionalLight(0xf5f1e8, 3.2); key.castShadow = !mobile;
  key.shadow.mapSize.set(1024, 1024); key.shadow.camera.left = -26; key.shadow.camera.right = 26;
  key.shadow.camera.top = 26; key.shadow.camera.bottom = -26; key.shadow.camera.far = 80; key.shadow.normalBias = .12;
  scene.add(key, key.target);
  const rim = new T.DirectionalLight(0xf97316, 1.7); rim.position.set(-20, 12, -20); scene.add(rim);
  let world: ReturnType<typeof buildEnvironment>;
  try { world = buildEnvironment(scene, environment.texture, mobile); }
  catch (error) { environment.dispose(); renderer.dispose(); canvas.remove(); throw error; }

  const positions: T.Vector3[] = [], looks: T.Vector3[] = [];
  function paths() {
    positions.length = 0; looks.length = 0;
    stations.forEach((coordinates, index) => {
      const center = new T.Vector3(...coordinates);
      const offset = mobile ? new T.Vector3(12, 12, 39) : new T.Vector3(index === 0 || index === 6 ? 16 : 14, 12, 31);
      positions.push(center.clone().add(offset));
      looks.push(center.clone().add(new T.Vector3(0, mobile ? 5.8 : 6.2, 0)));
      if (index < stations.length - 1) {
        const next = new T.Vector3(...stations[index + 1]);
        const mid = center.clone().lerp(next, .5);
        positions.push(mid.clone().add(new T.Vector3(0, 8, 0)));
        looks.push(mid.clone().lerp(next, .48).add(new T.Vector3(0, 6, 0)));
      }
    });
  }
  paths();
  let cameraPath = new T.CatmullRomCurve3(positions, false, 'catmullrom', .32);
  let lookPath = new T.CatmullRomCurve3(looks, false, 'catmullrom', .32);
  const pointer = new T.Vector2(); const pointerEase = new T.Vector2();
  const raycaster = new T.Raycaster(); const projected = new T.Vector3();
  let width = 0, height = 0, frame = 0, last = 0, elapsed = 0;
  let target = 0, progress = 0, active = -1, inspection = 0, inspectTarget = 0;
  let paused = false, disposed = false, lost = false, started = false;
  let ratio = Math.min(devicePixelRatio, mobile ? 1 : 1.5);
  let slowFrames = 0, samples = 0, average = 16;
  let travel: { from: number; to: number; start: number; duration: number } | null = null;
  let touchStart = { x: 0, y: 0 };

  function schedule() { if (!frame && !document.hidden && !disposed && !lost) frame = requestAnimationFrame(draw); }
  function measure() {
    if (disposed) return;
    width = document.documentElement.clientWidth; height = innerHeight;
    const compact = width < 760;
    if (compact !== mobile) {
      mobile = compact; paths(); cameraPath = new T.CatmullRomCurve3(positions, false, 'catmullrom', .32); lookPath = new T.CatmullRomCurve3(looks, false, 'catmullrom', .32);
      ratio = Math.min(ratio, mobile ? 1 : 1.5); renderer.shadowMap.enabled = !mobile;
    }
    renderer.setPixelRatio(ratio); renderer.setSize(width, height, false);
    camera.aspect = width / height; camera.fov = mobile ? 58 : 49; camera.updateProjectionMatrix();
    updateProgress(); schedule();
  }
  function maxScroll() { return Math.max(1, root.offsetHeight - innerHeight); }
  function updateProgress() { if (!travel) target = T.MathUtils.clamp((scrollY - root.offsetTop) / maxScroll(), 0, 1); schedule(); }
  function go(index: number) {
    const to = T.MathUtils.clamp(index, 0, 6) / 6;
    travel = { from: progress, to, start: performance.now(), duration: 900 + Math.abs(to - progress) * 1700 };
    schedule();
  }
  function interrupt() { if (travel) { travel = null; updateProgress(); } }
  function navigateKey(event: KeyboardEvent) {
    if (document.querySelector('dialog[open]') || (event.target as HTMLElement).closest('button, a, input, textarea, select')) return;
    if (['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) {
      event.preventDefault(); go(event.key === 'Home' ? 0 : event.key === 'End' ? 6 : active + (event.key === 'ArrowRight' ? 1 : -1));
    }
  }
  function move(event: PointerEvent) {
    if (event.pointerType !== 'mouse' || paused) return;
    pointer.set((event.clientX / width - .5) * 2, (event.clientY / height - .5) * 2); schedule();
  }
  function down(event: PointerEvent) { touchStart = { x: event.clientX, y: event.clientY }; }
  function pick(event: PointerEvent) {
    if (Math.hypot(event.clientX - touchStart.x, event.clientY - touchStart.y) > 8 || (event.target as HTMLElement).closest('a, button, dialog, nav, .journey-copy, .cookie')) return;
    raycaster.setFromCamera(new T.Vector2(event.clientX / width * 2 - 1, 1 - event.clientY / height * 2), camera);
    const selected = world.targets[active === 6 ? 0 : active];
    if (selected && raycaster.intersectObject(selected, true).length) callbacks.select();
  }
  function visibility() { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; last = 0; } else schedule(); }
  function contextLost(event: Event) { event.preventDefault(); lost = true; cancelAnimationFrame(frame); frame = 0; callbacks.ready(false); }
  function contextRestored() { lost = false; callbacks.ready(true); measure(); schedule(); }

  function draw(now: number) {
    frame = 0;
    if (disposed || lost || document.hidden) return;
    const interval = last ? now - last : 16.7;
    const frameLimit = mobile || ratio < 1 ? 30 : 16;
    if (!paused && last && interval < frameLimit) { schedule(); return; }
    const dt = Math.min(interval / 1000, .08); last = now;
    if (!paused) elapsed += dt;
    if (travel) {
      const p = T.MathUtils.clamp((now - travel.start) / travel.duration, 0, 1);
      target = T.MathUtils.lerp(travel.from, travel.to, p * p * (3 - 2 * p));
      window.scrollTo({ top: root.offsetTop + target * maxScroll(), behavior: 'instant' });
      if (p >= 1) travel = null;
    }
    // Damping gives wheel/touch input a camera dolly, while reversing scroll reverses travel.
    progress = T.MathUtils.lerp(progress, target, paused ? 1 : 1 - Math.exp(-dt * 9));
    if (Math.abs(progress - target) < .000015) progress = target;
    const next = Math.round(progress * 6);
    if (next !== active) { active = next; inspectTarget = 0; callbacks.chapter(active); }
    inspection = T.MathUtils.lerp(inspection, inspectTarget, paused ? 1 : 1 - Math.exp(-dt * 6));
    // Arriving back at the core reconnects its gimbals into a unified assembly.
    const assembly = active === 6 && progress < .985 ? (1 - T.MathUtils.smoothstep(progress, .9, .985)) : inspection;
    pointerEase.lerp(pointer, .05);
    camera.position.copy(cameraPath.getPoint(progress));
    if (!paused) { camera.position.x += pointerEase.x * .8; camera.position.y -= pointerEase.y * .4; }
    const look = lookPath.getPoint(progress);
    camera.lookAt(look);
    key.position.copy(look).add(new T.Vector3(-15, 25, 10)); key.target.position.copy(look);
    world.update(elapsed, assembly, active);
    renderer.render(scene, camera);
    const anchor = world.anchors[active === 6 ? 0 : active]; anchor.getWorldPosition(projected); projected.project(camera);
    const x = (projected.x * .5 + .5) * width, y = (-projected.y * .5 + .5) * height;
    const atStop = Math.abs(progress * 6 - active) < .22;
    label.style.setProperty('--label-x', Math.max(14, Math.min(width - (mobile ? 175 : 225), x + 25)) + 'px');
    label.style.setProperty('--label-y', Math.max(mobile ? 155 : 180, Math.min(height * (mobile ? .43 : .59), y - 30)) + 'px');
    label.style.visibility = atStop && projected.z < 1 ? 'visible' : 'hidden';
    root.style.setProperty('--journey-progress', String(progress));
    canvas.dataset.camera = camera.position.toArray().map(n => n.toFixed(2)).join(',');
    canvas.dataset.progress = progress.toFixed(4);
    canvas.dataset.frames = String(Number(canvas.dataset.frames || 0) + 1);
    if (!started) { started = true; callbacks.ready(true); callbacks.quality(mobile ? 'Mobile' : 'High'); requestAnimationFrame(() => { measure(); updateProgress(); }); }
    if (!paused && !travel) {
      average = average * .96 + interval * .04;
      if (++samples > 90 && average > 45) slowFrames++; else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 40 && ratio > .65) {
        ratio = Math.max(.65, ratio - .25); renderer.setPixelRatio(ratio); renderer.shadowMap.enabled = false;
        callbacks.quality('Adaptive · light'); canvas.dataset.quality = 'light'; slowFrames = 0; samples = 0;
      }
    }
    if (!paused || travel || Math.abs(progress - target) > .000015 || Math.abs(inspection - inspectTarget) > .001) schedule();
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', measure);
  window.addEventListener('wheel', interrupt, { passive: true });
  window.addEventListener('touchstart', interrupt, { passive: true });
  window.addEventListener('keydown', navigateKey);
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('pointerdown', down, { passive: true });
  window.addEventListener('pointerup', pick);
  document.addEventListener('visibilitychange', visibility);
  canvas.addEventListener('webglcontextlost', contextLost);
  canvas.addEventListener('webglcontextrestored', contextRestored);
  const hashIndex = chapters.findIndex(chapter => '#' + chapter.id === location.hash);
  if (hashIndex > 0) target = progress = hashIndex / 6;
  measure();
  if (hashIndex > 0) { target = progress = hashIndex / 6; travel = { from: progress, to: progress, start: performance.now(), duration: 1 }; }
  schedule();
  return {
    go,
    pause(value: boolean) { paused = value; last = 0; pointer.set(0, 0); schedule(); },
    inspect(value: boolean) { inspectTarget = value ? 1 : 0; schedule(); },
    dispose() {
      disposed = true; cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateProgress); window.removeEventListener('resize', measure);
      window.removeEventListener('wheel', interrupt); window.removeEventListener('touchstart', interrupt); window.removeEventListener('keydown', navigateKey);
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); window.removeEventListener('pointerup', pick);
      document.removeEventListener('visibilitychange', visibility);
      canvas.removeEventListener('webglcontextlost', contextLost); canvas.removeEventListener('webglcontextrestored', contextRestored);
      world.dispose(); environment.dispose(); renderer.dispose(); canvas.remove();
    }
  };
}
