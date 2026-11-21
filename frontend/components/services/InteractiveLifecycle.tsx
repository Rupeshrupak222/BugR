'use client';

import React, { useState } from 'react';
import { processSteps } from '@/data/process';
import { CheckCircle2, ArrowRight, Layers, FileCheck, ShieldCheck, Terminal, Server, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function InteractiveLifecycle() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeStep = processSteps[activeStepIndex];

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-black/5 dark:border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">
            TRANSPARENT 8-STAGE METHODOLOGY
          </span>
          <h3 className="text-2xl font-serif text-slate-900 dark:text-white mt-1">
            Software Delivery Lifecycle (SDLC)
          </h3>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Step {activeStep.number} of 08
        </span>
      </div>

      {/* Horizontal Step Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mb-8">
        {processSteps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;
          return (
            <button
              key={step.number}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                  : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-orange-500/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-orange-600 dark:text-orange-400' : 'text-slate-400'}`}>
                  {step.number}
                </span>
                {isPassed && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
              </div>
              <span className={`text-xs font-semibold truncate ${isActive ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-zinc-300'}`}>
                {step.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-slate-50/90 dark:bg-zinc-950/70 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-black/5 dark:border-white/10 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-mono text-orange-600 dark:text-orange-400 mb-2">
              <span>STAGE {activeStep.number} SPECIFICATIONS</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-white">
              {activeStep.name}: {activeStep.tagline}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(prev - 1, 0))}
              className="text-xs"
            >
              Previous
            </Button>
            <Button
              size="sm"
              disabled={activeStepIndex === processSteps.length - 1}
              onClick={() => setActiveStepIndex((prev) => Math.min(prev + 1, processSteps.length - 1))}
              className="text-xs"
            >
              Next Stage <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-zinc-300 leading-relaxed max-w-3xl">
          {activeStep.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Engineering Activities */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Core Engineering Activities:
            </span>
            <ul className="space-y-2">
              {activeStep.activities.map((act, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-zinc-300 leading-normal">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-500 shrink-0 mt-1.5" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Concrete Deliverables */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 block">
              Tangible Deliverables Provided:
            </span>
            <div className="space-y-2">
              {activeStep.deliverables.map((deliv, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-black/5 dark:border-white/10 bg-white dark:bg-black/40 p-3 flex items-start gap-2.5 text-xs text-slate-800 dark:text-zinc-200"
                >
                  <FileCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{deliv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-slate-500">
            Ready to initiate Stage 01 Technical Discovery for your organization?
          </span>
          <Button asChild size="sm" className="rounded-full shadow-lg shadow-orange-500/20">
            <Link href="/it-services/contact">
              Initiate Discovery Brief <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
