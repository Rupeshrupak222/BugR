import React from 'react';
import Link from 'next/link';
import { industriesData } from '@/data/industries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { MotionReveal } from '@/components/animations/MotionReveal';

export const metadata = {
  title: 'Industries We Serve | Bug Refinery',
  description: 'Specialized software engineering solutions for Healthcare, FinTech, E-Commerce, Logistics, and B2B SaaS.',
};

export default function IndustriesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
            <span>DOMAIN EXPERTISE & SECTOR SOLUTIONS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            Every sector has unique regulatory mandates, data compliance hurdles, and latency requirements. We architect solutions built specifically for your vertical.
          </p>
        </div>

        <div className="space-y-16">
          {industriesData.map((ind, idx) => (
            <MotionReveal key={ind.id} delay={idx * 0.1}>
              <div className="rounded-3xl border border-white/10 bg-black/60 p-8 sm:p-12 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <Badge variant="refinery" className="font-mono text-xs mb-2">
                      {ind.badge}
                    </Badge>
                    <h2 className="text-3xl font-serif text-white">{ind.name}</h2>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/contact/project?industry=${encodeURIComponent(ind.name)}`}>
                      <span>Consult on {ind.name}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                <p className="text-zinc-300 text-base leading-relaxed mb-8 max-w-4xl">
                  {ind.headline} {ind.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Key Sector Challenges */}
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-6 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                      <ShieldAlert className="h-4 w-4" />
                      <span>PRIMARY SECTOR CHALLENGES</span>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {ind.keyChallenges.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-rose-400 font-bold">&times;</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Engineering Solutions */}
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-6 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>ENGINEERING REMEDIES</span>
                    </div>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {ind.engineeringSolutions.map((s, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="border-t border-white/10 pt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
                  <span className="text-zinc-500 mr-2">Core Domain Tooling:</span>
                  {ind.technologies.map((t) => (
                    <span key={t} className="rounded bg-white/5 px-2.5 py-1 text-zinc-300 border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
