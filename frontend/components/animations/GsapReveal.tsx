'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface GsapRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  className?: string;
}

export function GsapReveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 30,
  stagger = 0,
  className = '',
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y,
          filter: 'blur(8px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration,
          delay,
          stagger,
          ease: 'power3.out',
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, y, stagger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export function GsapTextStagger({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const words = textRef.current.querySelectorAll('.word');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          opacity: 0,
          y: 20,
          rotateX: 45,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: 'back.out(1.4)',
        },
      );
    }, textRef);

    return () => ctx.revert();
  }, [text]);

  const words = text.split(' ');

  return (
    <h1 ref={textRef} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block word mr-[0.25em]">
          {word}
        </span>
      ))}
    </h1>
  );
}
