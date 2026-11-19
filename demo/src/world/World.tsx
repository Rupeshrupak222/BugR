import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { mountWorld } from './renderer';

export function WorldCanvas() {
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<ReturnType<typeof mountWorld> | null>(null);
  const pauseSetting = useRef(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [controls, setControls] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const scope = document.getElementById('content');
    const viewport = host.current;
    if (!scope || !viewport || !scope.querySelector('[data-world]') || !('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;
    setControls(document.getElementById('world-controls'));
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let generation = 0;
    let observer: IntersectionObserver | undefined;

    function refresh() {
      const revision = ++generation;
      observer?.disconnect();
      controller.current?.dispose();
      controller.current = null;
      setReady(false);
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer?.disconnect();
        void import('./renderer').then(({ mountWorld }) => {
          if (revision !== generation) return;
          controller.current = mountWorld(viewport!, scope!, setReady);
          controller.current.pause(pauseSetting.current);
        }).catch(() => {
          if (revision === generation) setReady(false);
        });
      }, { rootMargin: '60px' });
      scope!.querySelectorAll('[data-world]').forEach(slot => observer?.observe(slot));
    }

    refresh();
    preference.addEventListener('change', refresh);
    return () => {
      generation++;
      observer?.disconnect();
      controller.current?.dispose();
      controller.current = null;
      preference.removeEventListener('change', refresh);
    };
  }, []);

  return <>
    <div ref={host} className="world-canvas" aria-hidden="true" />
    {ready && controls && createPortal(<button type="button" className="world-motion" aria-pressed={paused} onClick={() => {
      const next = !pauseSetting.current;
      pauseSetting.current = next;
      setPaused(next);
      controller.current?.pause(next);
    }}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> <span className="world-motion-text">{paused ? 'Play 3D' : 'Pause 3D'}</span></button>, controls)}
  </>;
}

export function SceneView({ model, label, variant = '', interactive = false, inspected = false }: {
  model: string; label?: string; variant?: string; interactive?: boolean; inspected?: boolean;
}) {
  const slot = useRef<HTMLDivElement>(null);
  const fallback = ['tech', 'management', 'engineering', 'medical'].includes(model) ? model : 'index';
  function orbit(turn: number) {
    slot.current?.dispatchEvent(new CustomEvent('world-control', { detail: turn, bubbles: true }));
  }
  return <div className={'world-view ' + variant}>
    <div className="world-slot" ref={slot} data-world={model} data-inspect={String(inspected)}
      data-orbitable={interactive ? 'true' : undefined} aria-hidden="true">
      <div className="world-fallback">
        {model === 'reactor' ? <img src="/assets/refinery-core.webp" alt="" width="1100" height="1100" fetchPriority="high" />
          : <svg viewBox="0 0 320 160" focusable="false"><use href={'/assets/artifacts.svg#' + fallback} /></svg>}
      </div>
    </div>
    {label && <div className="world-meta"><span>{label}</span><span className="world-live"><span aria-hidden="true" /> LIVE 3D</span></div>}
    {interactive && <div className="world-tools">
      <span>DRAG TO ORBIT</span>
      <div role="group" aria-label="3D camera controls">
        <button type="button" onClick={() => orbit(-1)} aria-label="Rotate view left">←</button>
        <button type="button" onClick={() => orbit(0)} aria-label="Reset camera">◎</button>
        <button type="button" onClick={() => orbit(1)} aria-label="Rotate view right">→</button>
      </div>
    </div>}
  </div>;
}
