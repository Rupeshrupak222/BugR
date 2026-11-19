import { useEffect, useRef, type ReactNode } from 'react';
import { motion, useAnimationControls, useInView, useReducedMotion } from 'framer-motion';

export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const element = useRef<HTMLDivElement>(null);
  const seen = useInView(element, { once: true, margin: '-70px' });
  const reduced = useReducedMotion();
  const controls = useAnimationControls();
  // The prerendered HTML is always visible. Animation is progressive enhancement.
  useEffect(() => {
    if (reduced || !element.current) return;
    if (element.current.getBoundingClientRect().top > innerHeight) controls.set({ opacity: 0, y: 22 });
  }, [controls, reduced]);
  useEffect(() => {
    if (seen || reduced) void controls.start({ opacity: 1, y: 0, transition: { duration: reduced ? 0 : .65, delay: reduced ? 0 : delay } });
  }, [seen, reduced, controls, delay]);
  return <motion.div ref={element} className={className} initial={false} animate={controls}>{children}</motion.div>;
}
