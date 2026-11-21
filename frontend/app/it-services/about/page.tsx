import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, ShieldCheck, Terminal, Award, Users, Cpu, Code2 } from 'lucide-react';

export const metadata = {
  title: 'About Bug Refinery IT Services | Engineering Philosophy & Values',
  description:
    'Learn about Bug Refinery: our engineering standards, production debugging DNA, working practices, and high-velocity delivery culture.',
};

export default function AboutITServicesPage() {
  const values = [
    {
      title: 'Production Reality Over Theory',
      desc: 'Software is measured not by how clean it looks in slides, but by how reliably it behaves under high-concurrency peak load, network partition, and real-world failure modes.',
    },
    {
      title: 'Radical Architectural Honesty',
      desc: 'We never hide technical debt or sugarcoat complexity. When an architecture trade-off has consequences for cost or latency, we document it transparently with data.',
    },
    {
      title: 'Type Safety & Automated Verification',
      desc: 'We believe manual QA alone is insufficient. We write comprehensive automated test suites (unit, integration, and Playwright E2E) so regressions are caught in CI, not in production.',
    },
    {
      title: 'Zero Vendor Lock-In',
      desc: 'Your software belongs to you. We write clean, idiomatic code adhering to open-source standards, using standard Docker containers and cloud primitives that your internal team can easily maintain.',
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <span>OUR CULTURE & ENGINEERING DNA</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Engineering Born in the{' '}
            <span className="italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Trenches
            </span>
            .
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            Bug Refinery was founded on a simple principle: modern business software should be resilient, scalable, and built by engineers who understand real production failure modes.
          </p>
        </div>

        {/* The Dual-Engine Identity */}
        <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-8 sm:p-12 space-y-6">
          <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
            DUAL-ENGINE POWERHOUSE
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-slate-900 dark:text-white">
            Where Production Engineering Informs Industry-Simulation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-3 p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Engine 1: Enterprise IT Services
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                We partner with high-growth startups and established corporations to design, build, test, and deploy resilient digital platforms across FinTech, HealthTech, E-Commerce, Logistics, and SaaS.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                Engine 2: 26 Industry Simulation Labs
              </h3>
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                The technical challenges we solve in enterprise consulting directly feed our 26 simulation labs (Foundry), giving university graduates hands-on experience solving production bugs before their first job.
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest block mb-1">
              GUIDING PRINCIPLES
            </span>
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white">
              How We Work Every Day
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-3 hover:border-orange-500/30 transition-all"
              >
                <div className="h-8 w-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold text-xs font-mono">
                  &check;
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Global Standards */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 p-6 sm:p-8 text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
            COMPLIANCE & GOVERNANCE POSTURE
          </span>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            All code authored by Bug Refinery complies with OWASP Top 10 security standards, semantic versioning (SemVer), zero-vulnerability package dependencies, and strict data confidentiality agreements (NDA).
          </p>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
            <Link href="/it-services/contact">
              <span>Work With Our Senior Engineers</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
