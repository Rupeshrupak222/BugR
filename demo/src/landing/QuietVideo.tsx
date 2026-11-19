import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type Connection = { saveData?: boolean; effectiveType?: string; addEventListener?: (name: string, handler: () => void) => void; removeEventListener?: (name: string, handler: () => void) => void };

// Only the hero may autoplay. All other videos have no src until the visitor asks.
export function QuietVideo({ name, label, hero = false }: { name: string; label: string; hero?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const wanted = useRef(false);
  const visible = useRef(false);
  const tween = useRef(0);
  const restart = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fading = useRef(false);
  const reduced = useRef(false);

  function stopFade() { cancelAnimationFrame(tween.current); if (restart.current) clearTimeout(restart.current); restart.current = null; }
  function fade(to: number, duration = 500) {
    cancelAnimationFrame(tween.current);
    const element = video.current;
    if (!element) return;
    if (reduced.current) { element.style.opacity = String(to); return; }
    const from = Number(element.style.opacity || 0), start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      element.style.opacity = String(from + (to - from) * progress);
      if (progress < 1 && !document.hidden) tween.current = requestAnimationFrame(tick);
    };
    tween.current = requestAnimationFrame(tick);
  }
  function play() {
    const element = video.current;
    if (!element || !wanted.current || !visible.current || document.hidden) return;
    void element.play().then(() => { setPlaying(true); setLive(true); fade(1); }).catch(() => { wanted.current = false; setPlaying(false); });
  }
  function pause() {
    video.current?.pause(); stopFade(); setPlaying(false);
    if (video.current && live) video.current.style.opacity = '1';
  }
  useEffect(() => {
    setReady(true);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const decide = () => {
      reduced.current = preference.matches;
      if (preference.matches || connection?.saveData || /(^|-)2g|3g/.test(connection?.effectiveType || '')) {
        wanted.current = false; video.current?.pause(); stopFade(); setPlaying(false); setRequested(false); setLive(false);
      } else if (hero && matchMedia('(min-width: 768px)').matches) { wanted.current = true; setRequested(true); }
    };
    decide();
    const observer = new IntersectionObserver(entries => {
      visible.current = entries[0].isIntersecting;
      if (!visible.current) { video.current?.pause(); stopFade(); setPlaying(false); }
      else play();
    }, { threshold: .12 });
    if (host.current) observer.observe(host.current);
    const visibility = () => {
      if (document.hidden) { video.current?.pause(); stopFade(); setPlaying(false); }
      else play();
    };
    preference.addEventListener('change', decide);
    connection?.addEventListener?.('change', decide);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); preference.removeEventListener('change', decide); connection?.removeEventListener?.('change', decide); document.removeEventListener('visibilitychange', visibility); stopFade(); };
  }, [hero]);

  function toggle() {
    if (wanted.current && playing) { wanted.current = false; pause(); }
    else { wanted.current = true; setFailed(false); setRequested(true); if (video.current?.readyState && video.current.readyState >= 2) play(); }
  }
  return <div ref={host} className={'quiet-video' + (hero ? ' hero-film' : '')} data-playing={playing} data-live={live && !failed}>
    <img src={'/assets/landing/' + name + '.webp'} alt="" width="1280" height="720" loading={hero ? 'eager' : 'lazy'} fetchPriority={hero ? 'high' : 'auto'} />
    {requested && !failed && <video ref={video} src={'/assets/landing/' + name + '.mp4'} muted playsInline preload={hero ? 'auto' : 'metadata'} aria-hidden="true" tabIndex={-1} style={{ opacity: 0 }}
      onCanPlay={play} onPlaying={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setFailed(true); setLive(false); setPlaying(false); wanted.current = false; stopFade(); }}
      onTimeUpdate={() => {
        const element = video.current;
        if (hero && element && element.duration - element.currentTime <= .55 && !fading.current && !element.paused) { fading.current = true; fade(0); }
      }}
      onEnded={() => {
        if (!hero) { wanted.current = false; setPlaying(false); return; }
        if (video.current) video.current.style.opacity = '0';
        restart.current = setTimeout(() => { if (!video.current || !wanted.current) return; video.current.currentTime = 0; fading.current = false; play(); }, 100);
      }} />}
    {ready && <button className="liquid-glass film-control" type="button" onClick={toggle} aria-label={(playing ? 'Pause ' : 'Play ') + label} aria-pressed={playing}>
      {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}<span>{playing ? 'Pause motion' : failed ? 'Retry video' : 'Play film'}</span>
    </button>}
    {failed && <span className="film-error" role="status">Preview available. Video could not load.</span>}
  </div>;
}
