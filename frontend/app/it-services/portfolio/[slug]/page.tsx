import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { portfolioProjects } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Server,
  Terminal,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export async function generateStaticParams() {
  return portfolioProjects.map((proj) => ({
    slug: proj.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);
  if (!project) return { title: 'Case Study Not Found | Bug Refinery' };

  return {
    title: `${project.title} | Bug Refinery Technical Architecture`,
    description: project.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-14">
        {/* Back Link */}
        <Link
          href="/it-services/portfolio"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All Case Studies</span>
        </Link>

        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-xs font-mono border-orange-500/30 text-orange-600 dark:text-orange-400">
              {project.category}
            </Badge>
            <span className="text-xs font-mono text-slate-500">{project.clientType} · {project.timeline}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Benchmark Outcomes */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6 sm:p-8 space-y-4">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-semibold block">
            VERIFIED BENCHMARKS & PRODUCTION METRICS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.impactMetrics.map((metric, i) => (
              <div key={i} className="p-4 rounded-xl border border-emerald-500/20 bg-white/80 dark:bg-black/40 space-y-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mb-1" />
                <p className="text-xs font-medium text-slate-800 dark:text-zinc-200">{metric}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challenge & Architectural Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
            <span className="text-xs font-mono uppercase text-rose-500 font-semibold">
              THE BOTTLENECK / CHALLENGE
            </span>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-orange-500/20 bg-orange-500/5 space-y-3">
            <span className="text-xs font-mono uppercase text-orange-600 dark:text-orange-400 font-semibold">
              THE ARCHITECTURAL SOLUTION
            </span>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Architecture Pattern & Tech Stack */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
            <span className="text-xs font-mono uppercase text-orange-600 dark:text-orange-400">
              ARCHITECTURE TOPOLOGY: {project.architectureDiagramType}
            </span>
            <span className="text-xs font-mono text-slate-500">RFC 8122-COMPLIANT</span>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 block">Employed Tech Stack:</span>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1 text-xs font-mono text-slate-800 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-transparent p-8 text-center space-y-4">
          <h3 className="text-2xl font-serif text-slate-900 dark:text-white">
            Need Similar Architectural Rigor for Your Team?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Submit your requirements to receive a structured technical discovery response from our Principal Engineering Architects.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20">
            <Link href="/it-services/contact">
              <span>Start an RFP for Your System</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
