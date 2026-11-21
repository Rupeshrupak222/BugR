import React from 'react';
import Link from 'next/link';
import { InteractiveLifecycle } from '@/components/services/InteractiveLifecycle';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const metadata = {
  title: '8-Stage Engineering Delivery Process | Bug Refinery',
  description:
    'Transparent, milestone-based software engineering delivery lifecycle: Discovery, Planning, UI/UX Design, Architecture, Development, Testing, Deployment, and SLA Support.',
};

export default function ProcessPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <span>PREDICTABLE, MILESTONE-DRIVEN DELIVERY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            How We Deliver{' '}
            <span className="italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Production Code
            </span>
            .
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            No black boxes. No surprise delays. We follow an 8-stage software delivery lifecycle with verifiable artifacts, bi-weekly staging demos, and strict acceptance criteria.
          </p>
        </div>

        {/* Interactive Lifecycle Component */}
        <section>
          <InteractiveLifecycle />
        </section>

        {/* Engineering Governance Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif text-slate-900 dark:text-white">Two-Week Agile Sprints</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Every two weeks concludes with a live sprint demo on staging. You review working software, inspect automated test passes, and steer priorities before the next sprint begins.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif text-slate-900 dark:text-white">Automated CI/CD Quality Gates</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Every Git pull request must pass automated unit tests, Playwright browser suites, and security scans before any code merges into the release pipeline.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="text-xl font-serif text-slate-900 dark:text-white">Full IP & Code Ownership</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              All source code, Docker configs, database schemas, and documentation are committed directly to your version control repository from Day 1. Zero proprietary lock-in.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-6">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
            <Link href="/it-services/contact">
              <span>Initiate Stage 01 Technical Discovery</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
