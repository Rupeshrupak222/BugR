'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { portfolioProjects } from '@/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Layers, ShieldCheck, TrendingUp, Code2, Sparkles } from 'lucide-react';
import { MotionReveal } from '@/components/animations/MotionReveal';

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'FinTech', 'HealthTech', 'Web & SaaS', 'Cloud'];

  const filteredProjects =
    activeFilter === 'All'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeFilter);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ENGINEERING SHOWCASE & REFERENCE ARCHITECTURES</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            Our Work & Systems
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            Explore our demonstrated technical capabilities across high-throughput distributed systems, clinical data pipelines, event-driven commerce, and automated cloud infrastructure.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`rounded-full px-5 py-2 text-xs font-mono transition-all duration-200 border ${
                activeFilter === cat
                  ? 'border-orange-500 bg-orange-500/20 text-orange-400 font-semibold shadow-[0_0_15px_rgba(255,94,0,0.2)]'
                  : 'border-white/10 bg-black/40 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {filteredProjects.map((project, idx) => (
            <MotionReveal key={project.id} delay={idx * 0.1}>
              <div className="rounded-2xl border border-white/10 bg-black/60 p-8 sm:p-10 backdrop-blur-xl hover:border-orange-500/30 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <Badge variant="refinery" className="font-mono text-[11px]">
                        {project.category.toUpperCase()}
                      </Badge>
                      <span className="text-xs font-mono text-zinc-400">
                        {project.clientType}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        · {project.timeline}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif text-white">
                      {project.title}
                    </h2>
                  </div>

                  <div className="shrink-0">
                    <span className="rounded bg-white/5 px-3 py-1 text-xs font-mono text-zinc-400 border border-white/10">
                      Architecture: {project.architectureDiagramType}
                    </span>
                  </div>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed mb-8 max-w-4xl">
                  {project.summary}
                </p>

                {/* Challenge & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-2">
                    <div className="text-xs font-mono text-rose-400 font-semibold uppercase">
                      The Engineering Challenge
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-2">
                    <div className="text-xs font-mono text-emerald-400 font-semibold uppercase">
                      The Architectural Solution
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="border-t border-white/10 pt-6 mb-6">
                  <div className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-3">
                    Benchmarked Outcomes:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {project.impactMetrics.map((metric, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-200">
                        <TrendingUp className="h-4 w-4 text-orange-400 shrink-0 mt-0.5" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="border-t border-white/10 pt-4 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-white/5 px-2.5 py-1 text-xs font-mono text-zinc-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Button asChild variant="outline" size="sm">
                    <Link href={`/contact/project?interest=${encodeURIComponent(project.title)}`}>
                      <span>Discuss Similar Architecture</span>
                      <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
