import React from 'react';
import { MotionReveal } from '@/components/animations/MotionReveal';
import { Terminal, Bug, Rocket } from 'lucide-react';

export function MethodologySection() {
  const steps = [
    {
      num: '01',
      cmd: '$ step-01 simulate',
      title: 'Simulate Industry Environments',
      icon: Terminal,
      description:
        'Step directly into unfamiliar codebases, production database schemas, and messy multi-service applications designed to mirror top engineering teams.',
      deliverable: 'Unpack architectural briefs, map dependencies, and trace data flow without spoon-feeding.',
    },
    {
      num: '02',
      cmd: '$ step-02 debug',
      title: 'Debug Under Pressure',
      icon: Bug,
      description:
        'Tackle real failure states: distributed locks, memory leaks, broken serializers, and race conditions. Read stack traces and query logs.',
      deliverable: 'Formulate defensible root-cause analyses, write regression tests, and fix the defects.',
    },
    {
      num: '03',
      cmd: '$ step-03 ship',
      title: 'Ship Real Projects',
      icon: Rocket,
      description:
        'Package fixes and features into production pull requests, undergo senior code reviews, and deploy live artifacts that prove your competency.',
      deliverable: 'Graduate with an inspectable portfolio of merged PRs, post-mortems, and proof of work.',
    },
  ];

  return (
    <section className="py-24 border-t border-white/10 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-widest text-orange-400">
              THE REFINERY METHOD
            </h2>
            <h3 className="text-3xl sm:text-5xl font-serif text-white">
              Three Steps to Job-Ready
            </h3>
            <p className="text-zinc-400 text-base">
              A structured 9-week pedagogy built on simulation rather than passive lecture streaming.
            </p>
          </div>
        </MotionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <MotionReveal key={step.num} delay={idx * 0.15}>
                <div className="group h-full rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-mono text-xs text-orange-400/80 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                        {step.cmd}
                      </span>
                      <span className="text-2xl font-serif text-zinc-600 group-hover:text-orange-400/50 transition-colors">
                        {step.num}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h4 className="text-xl font-serif text-white">{step.title}</h4>
                    </div>

                    <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <span className="block text-xs font-mono text-zinc-500 mb-1">
                      KEY DELIVERABLE:
                    </span>
                    <span className="text-xs text-zinc-300">
                      {step.deliverable}
                    </span>
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
