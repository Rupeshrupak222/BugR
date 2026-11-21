import React from 'react';
import Link from 'next/link';
import { industriesData } from '@/data/industries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Industries We Serve | Bug Refinery Software Engineering',
  description:
    'Tailored software engineering for Healthcare, Financial Technology, E-Commerce, Logistics, EdTech, and High-Growth SaaS.',
};

export default function IndustriesPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <span>DOMAIN-SPECIFIC SOFTWARE ENGINEERING</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Vertical Solutions for{' '}
            <span className="italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              High-Stakes
            </span>{' '}
            Industries.
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            Every industry possesses unique regulatory constraints, latency requirements, and data compliance mandates. We tailor architectures to solve sector-specific bottlenecks.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="space-y-12">
          {industriesData.map((ind) => (
            <div
              key={ind.id}
              className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-8 sm:p-12 backdrop-blur-xl shadow-xl space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-6">
                <div>
                  <Badge variant="outline" className="text-[10px] font-mono border-orange-500/30 text-orange-600 dark:text-orange-400 mb-2">
                    {ind.badge}
                  </Badge>
                  <h2 className="text-2xl sm:text-4xl font-serif text-slate-900 dark:text-white">
                    {ind.name}
                  </h2>
                </div>
                <Button asChild size="sm" className="rounded-full shrink-0 shadow-md shadow-orange-500/10">
                  <Link href="/it-services/contact">
                    <span>Inquire for {ind.name.split(' ')[0]}</span>
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {ind.headline} {ind.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Challenges */}
                <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
                  <span className="text-xs font-mono uppercase text-rose-500 font-semibold tracking-wider">
                    SECTOR-SPECIFIC BOTTLENECKS
                  </span>
                  <ul className="space-y-2">
                    {ind.keyChallenges.map((ch, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                        <span>{ch}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
                  <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
                    ENGINEERED REMEDIES
                  </span>
                  <ul className="space-y-2">
                    {ind.engineeringSolutions.map((sol, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{sol}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Core Tech Applied:</span>
                {ind.technologies.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
            <Link href="/it-services/contact">
              <span>Schedule an Industry Architecture Consultation</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
