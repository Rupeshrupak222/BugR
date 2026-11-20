import React from 'react';
import { MotionReveal } from '@/components/animations/MotionReveal';
import { CheckCircle } from 'lucide-react';

export function CurriculumSection() {
  const phases = [
    {
      period: 'Weeks 1–2',
      title: 'Skills Brushup',
      subtitle: 'Fundamentals in Context',
      summary:
        'Refresh language foundations, Git branch management, ORM queries, and API patterns strictly within working starter repositories.',
      highlights: [
        'Reading production config & environments',
        'Understanding ORM queries and N+1 detection',
        'Git hygiene: commits, interactive rebasing & PR reviews',
      ],
    },
    {
      period: 'Weeks 3–4',
      title: 'Production Debugging',
      subtitle: 'Hunt & Fix High-Priority Defects',
      summary:
        'Confront 4 distinct real-world failure states. Trace stack traces, reproduce concurrency bugs, patch the vulnerability, and supply regression tests.',
      highlights: [
        'Auth token refresh failures & race conditions',
        'Database connection pool exhaustion and lock timeouts',
        'Browser devtools memory leak diagnosis',
      ],
    },
    {
      period: 'Weeks 5–7',
      title: 'Codebase Navigation',
      subtitle: 'Large-Scale System Orientation',
      summary:
        'Drop into multi-module legacy repositories without documentation. Trace end-to-end request journeys and execute non-breaking architectural refactors.',
      highlights: [
        'Map architectural bottlenecks and microservice flows',
        'Refactor god-objects while keeping full test coverage green',
        'Conduct rigorous peer code reviews on fellow engineers',
      ],
    },
    {
      period: 'Weeks 8–9',
      title: 'Shipping Features',
      subtitle: 'Capstone Deployment & Defense',
      summary:
        'Ship a feature from user requirement to production deployment. Defend architecture, testing strategy, and an incident post-mortem in live technical evaluation.',
      highlights: [
        'Implement resilient features with observability and logs',
        'Deploy with CI/CD pipeline on production infrastructure',
        'Conduct live post-mortem defense in senior panel format',
      ],
    },
  ];

  return (
    <section className="py-24 border-t border-white/10 bg-zinc-950/40 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-orange-400">
              THE 9-WEEK ROADMAP
            </h2>
            <h3 className="text-3xl sm:text-5xl font-serif text-white">
              From Theory to Shipped Production
            </h3>
            <p className="text-zinc-400 text-base">
              Every phase is benchmarked against senior engineering standards. You leave with demonstrable evidence, not empty attendance marks.
            </p>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((phase, idx) => (
            <MotionReveal key={phase.period} delay={idx * 0.1}>
              <div className="h-full rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-orange-500/30 transition-all">
                <div>
                  <div className="text-xs font-mono text-orange-400 mb-2">
                    {phase.period}
                  </div>
                  <h4 className="text-xl font-serif text-white mb-1">
                    {phase.title}
                  </h4>
                  <div className="text-xs text-zinc-400 font-mono mb-4">
                    {phase.subtitle}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {phase.summary}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2">
                  {phase.highlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
