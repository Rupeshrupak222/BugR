'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

type Connection = {
  saveData?: boolean;
  effectiveType?: string;
  addEventListener?: (name: string, handler: () => void) => void;
  removeEventListener?: (name: string, handler: () => void) => void;
};

// Hero autoplay video background with seamless loop and responsive support
export function QuietVideo({ name, label, hero = false }: { name: string; label: string; hero?: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(hero);
  const [playing, setPlaying] = useState(hero);
  const [live, setLive] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const wanted = useRef(hero);
  const visible = useRef(true);
  const tween = useRef(0);
  const restart = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fading = useRef(false);
  const reduced = useRef(false);

  function stopFade() {
    cancelAnimationFrame(tween.current);
    if (restart.current) clearTimeout(restart.current);
    restart.current = null;
  }

  function fade(to: number, duration = 400) {
    cancelAnimationFrame(tween.current);
    const element = video.current;
    if (!element) return;
    if (reduced.current || hero) {
      element.style.opacity = String(to);
      return;
    }
    const from = Number(element.style.opacity || 0),
      start = performance.now();
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
    void element
      .play()
      .then(() => {
        setPlaying(true);
        setLive(true);
        fade(1);
      })
      .catch(() => {
        if (!hero) {
          wanted.current = false;
          setPlaying(false);
        }
      });
  }

  function pause() {
    video.current?.pause();
    stopFade();
    setPlaying(false);
    if (video.current && live) video.current.style.opacity = '1';
  }

  useEffect(() => {
    setReady(true);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: Connection }).connection;
    const decide = () => {
      reduced.current = preference.matches;
      if (preference.matches || connection?.saveData) {
        if (!hero) {
          wanted.current = false;
          video.current?.pause();
          stopFade();
          setPlaying(false);
          setRequested(false);
          setLive(false);
        }
      } else if (hero) {
        wanted.current = true;
        setRequested(true);
        play();
      }
    };
    decide();

    const observer = new IntersectionObserver(
      (entries) => {
        visible.current = entries[0].isIntersecting;
        if (!visible.current) {
          video.current?.pause();
          stopFade();
          setPlaying(false);
        } else {
          if (wanted.current) play();
        }
      },
      { threshold: 0.05 }
    );
    if (host.current) observer.observe(host.current);

    const visibility = () => {
      if (document.hidden) {
        video.current?.pause();
        stopFade();
        setPlaying(false);
      } else {
        if (wanted.current) play();
      }
    };

    preference.addEventListener('change', decide);
    connection?.addEventListener?.('change', decide);
    document.addEventListener('visibilitychange', visibility);

    // Initial play attempt on mount
    if (hero) {
      wanted.current = true;
      setRequested(true);
      play();
    }

    return () => {
      observer.disconnect();
      preference.removeEventListener('change', decide);
      connection?.removeEventListener?.('change', decide);
      document.removeEventListener('visibilitychange', visibility);
      stopFade();
    };
  }, [hero]);

  function toggle() {
    if (wanted.current && playing) {
      wanted.current = false;
      pause();
    } else {
      wanted.current = true;
      setFailed(false);
      setRequested(true);
      play();
    }
  }

  return (
    <div
      ref={host}
      className={'quiet-video' + (hero ? ' hero-film' : '')}
      data-playing={playing}
      data-live={live && !failed}
    >
      <img
        src={'/assets/landing/' + name + '.webp'}
        alt=""
        width="1280"
        height="720"
        loading={hero ? 'eager' : 'lazy'}
        fetchPriority={hero ? 'high' : 'auto'}
      />
      {requested && !failed && (
        <video
          ref={video}
          src={'/assets/landing/' + name + '.mp4'}
          autoPlay={hero}
          loop
          muted
          playsInline
          preload={hero ? 'auto' : 'metadata'}
          aria-hidden="true"
          tabIndex={-1}
          style={{ opacity: hero ? 1 : 0 }}
          onCanPlay={() => {
            setLive(true);
            play();
          }}
          onPlaying={() => {
            setPlaying(true);
            setLive(true);
            if (hero && video.current) video.current.style.opacity = '1';
          }}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true);
            setLive(false);
            setPlaying(false);
            wanted.current = false;
            stopFade();
          }}
        />
      )}
      {ready && (
        <button
          className="liquid-glass film-control"
          type="button"
          onClick={toggle}
          aria-label={(playing ? 'Pause ' : 'Play ') + label}
          aria-pressed={playing}
        >
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          <span>{playing ? 'Pause motion' : failed ? 'Retry video' : 'Play film'}</span>
        </button>
      )}
      {failed && (
        <span className="film-error" role="status">
          Preview available. Video could not load.
        </span>
      )}
    </div>
  );
}
