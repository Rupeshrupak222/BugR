import React from 'react';
import { MotionReveal } from '@/components/animations/MotionReveal';
import { AlertTriangle, HelpCircle } from 'lucide-react';

export function GapComparison() {
  return (
    <section className="py-24 border-t border-white/10 bg-zinc-950/40 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-orange-400">
              THE STRUCTURAL PROBLEM
            </h2>
            <h3 className="text-3xl sm:text-5xl font-serif text-white">
              The Gap No One Talks About
            </h3>
            <p className="text-zinc-400 text-base">
              Why 90% of engineering grads struggle in technical rounds, and why hiring managers spend 6 months onboarding candidates who know theory but can’t ship.
            </p>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hiring Manager's Frustration */}
          <MotionReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-red-500/20 bg-gradient-to-b from-red-950/20 to-black/60 p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center gap-3 text-red-400 mb-6 font-mono text-sm">
                <AlertTriangle className="h-5 w-5" />
                <span>THE HIRING MANAGER’S FRUSTRATION</span>
              </div>
              <ul className="space-y-4 text-zinc-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Toy projects everywhere:</strong> Every portfolio has the exact same tutorial todo-list or clone that takes 2 hours and teaches zero real-world engineering.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Zero codebase navigation:</strong> Candidates panic when dropped into a 50,000-line codebase with legacy patterns and incomplete documentation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Can’t read logs:</strong> High-scoring students struggle to interpret stack traces, race conditions, or production query latency.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span><strong>Months of onboarding cost:</strong> Senior engineering hours are burned teaching basic PR etiquette, regression tests, and deployment fundamentals.</span>
                </li>
              </ul>
            </div>
          </MotionReveal>

          {/* The Graduate's Reality */}
          <MotionReveal delay={0.2}>
            <div className="h-full rounded-2xl border border-orange-500/20 bg-gradient-to-b from-orange-950/20 to-black/60 p-8 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center gap-3 text-orange-400 mb-6 font-mono text-sm">
                <HelpCircle className="h-5 w-5" />
                <span>THE GRADUATE’S REALITY</span>
              </div>
              <ul className="space-y-4 text-zinc-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">?</span>
                  <span><strong>Four years of theory:</strong> You aced operating systems, algorithms, and SQL on a whiteboard, but never touched a real multi-container microservice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">?</span>
                  <span><strong>"Requires 2+ years experience":</strong> Entry-level jobs demand experience, but nobody gives you the environment to build it first.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">?</span>
                  <span><strong>Generic certificates mean nothing:</strong> Recruiters filter out thousands of identical video-completion certificates every week.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-400 font-bold shrink-0">?</span>
                  <span><strong>No proof to defend:</strong> In technical interviews, you can't walk through a real production outage you diagnosed, fixed, and verified.</span>
                </li>
              </ul>
            </div>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
