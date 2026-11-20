import React from 'react';
import Link from 'next/link';
import { processSteps } from '@/data/process';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ChevronRight, Workflow } from 'lucide-react';
import { MotionReveal } from '@/components/animations/MotionReveal';

export const metadata = {
  title: 'Our Engineering Process | Bug Refinery',
  description: 'Our 7-stage delivery lifecycle: Discover, Plan, Design, Develop, Test, Deploy, Support.',
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
            <Workflow className="h-3.5 w-3.5" />
            <span>DISCIPLINED DELIVERY LIFECYCLE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            How We Deliver
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            From initial requirements synthesis to zero-downtime cutover and 24/7 proactive telemetry: a predictable 7-step engineering journey.
          </p>
        </div>

        {/* 7-Step Horizontal / Vertical Process Rail */}
        <div className="space-y-12 max-w-5xl mx-auto">
          {processSteps.map((step, idx) => (
            <MotionReveal key={step.number} delay={idx * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden group hover:border-orange-500/40 transition-all">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-500/30 bg-orange-500/10 font-serif text-2xl font-bold text-orange-400">
                      {step.number}
                    </span>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-serif text-white group-hover:text-orange-300 transition-colors">
                        {step.name}
                      </h2>
                      <span className="text-xs font-mono text-zinc-400">
                        {step.tagline}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-zinc-500 bg-white/5 px-3 py-1.5 rounded border border-white/5 shrink-0">
                    STAGE {step.number} OF 07
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  {step.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  {/* Activities */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider block">
                      Core Activities:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-400">
                      {step.activities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-orange-400 font-bold">▹</span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tangible Deliverables */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block">
                      Tangible Deliverables:
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {step.deliverables.map((del, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Start a Project CTA */}
        <div className="text-center mt-20 space-y-4">
          <h3 className="text-2xl font-serif text-white">Ready to Start Step 01?</h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Schedule a 45-minute technical discovery call with our solutions architects.
          </p>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact/project">
              <span>Begin Technical Discovery</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
