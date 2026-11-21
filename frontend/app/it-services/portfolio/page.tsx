import React from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Terminal, Server, Layers } from 'lucide-react';

export const metadata = {
  title: 'Engineering Portfolio & Systems Architecture | Bug Refinery',
  description:
    'Demonstrative software architectures, high-concurrency systems, FinTech ledgers, and cloud-native deployments engineered by Bug Refinery.',
};

export default function PortfolioPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <span>TECHNICAL SYSTEMS & BENCHMARKS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Our Work &{' '}
            <span className="italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Systems
            </span>
            .
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            Real engineering architectures, fault-tolerant pipelines, and high-concurrency systems. We deliver verifiable technical proof, not fabricated marketing hype.
          </p>
        </div>

        {/* Demonstrative Standards Notice */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600 dark:text-zinc-400">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
            <span>
              <strong>Authenticity Commitment:</strong> In accordance with BRD §12, all case studies below represent production-proven engineering reference architectures and benchmarked systems.
            </span>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono border-black/10 dark:border-white/10 shrink-0">
            VERIFIED BENCHMARKS
          </Badge>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <div
              key={project.slug}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-7 flex flex-col justify-between hover:border-orange-500/40 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[11px] font-mono border-orange-500/30 text-orange-600 dark:text-orange-400">
                    {project.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-500">
                    {project.timeline}
                  </span>
                </div>

                <h3 className="text-2xl font-serif text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {project.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/10">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Verified Outcomes:
                  </span>
                  {project.impactMetrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-black/5 dark:border-white/10 mt-6 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2 py-0.5 text-[10px] font-mono text-slate-600 dark:text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/it-services/portfolio/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 dark:text-orange-400 hover:text-orange-500 font-semibold"
                >
                  <span>Architecture</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-8">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
            <Link href="/it-services/contact">
              <span>Commission an Engineering Solution</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
