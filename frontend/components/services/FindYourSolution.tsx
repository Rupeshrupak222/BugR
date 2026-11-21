'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2, HelpCircle, RotateCcw, Sparkles } from 'lucide-react';
import { servicesData } from '@/data/services';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    targetServiceSlug: string;
    tag: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'What is your primary software engineering challenge right now?',
    options: [
      {
        text: 'We need to build a new bespoke web platform or SaaS product from scratch',
        targetServiceSlug: 'web-development',
        tag: 'Web & SaaS',
      },
      {
        text: 'Our legacy codebase is brittle, slow, and desperately needs modernization or microservices',
        targetServiceSlug: 'application-modernization-maintenance',
        tag: 'Modernization',
      },
      {
        text: 'We need native or cross-platform iOS & Android mobile applications',
        targetServiceSlug: 'mobile-app-development',
        tag: 'Mobile Engineering',
      },
      {
        text: 'Our cloud costs are out of control and deployments are fragile or manual',
        targetServiceSlug: 'cloud-devops',
        tag: 'Cloud & DevOps',
      },
      {
        text: 'We want to automate enterprise workflows or integrate AI / LLM pipelines',
        targetServiceSlug: 'ai-automation',
        tag: 'AI Automation',
      },
      {
        text: 'We need rigorous penetration testing, security audit, or automated QA testing',
        targetServiceSlug: 'cybersecurity-qa',
        tag: 'Security & QA',
      },
      {
        text: 'We have data silos and need to build high-throughput API gateways and integrations',
        targetServiceSlug: 'api-development-integration',
        tag: 'API Integration',
      },
      {
        text: 'We need custom enterprise-grade software engineered for high concurrency',
        targetServiceSlug: 'custom-software-development',
        tag: 'Enterprise Systems',
      },
    ],
  },
  {
    id: 2,
    question: 'What is your architectural timeline expectation?',
    options: [
      {
        text: 'Urgent: We need a senior team deployed immediately (< 30 days)',
        targetServiceSlug: '',
        tag: 'High Velocity',
      },
      {
        text: 'Standard: Planning a formal 3-6 month milestone-driven delivery',
        targetServiceSlug: '',
        tag: 'Fixed-Milestone',
      },
      {
        text: 'Strategic: Ongoing long-term engineering squad embedded with our team',
        targetServiceSlug: '',
        tag: 'Dedicated Squad',
      },
    ],
  },
];

export function FindYourSolution() {
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string | null>(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  const matchedService = servicesData.find((s) => s.slug === selectedServiceSlug);

  const handleSelectService = (slug: string) => {
    setSelectedServiceSlug(slug);
    setCurrentQIndex(1);
  };

  const handleReset = () => {
    setSelectedServiceSlug(null);
    setCurrentQIndex(0);
  };

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/60 p-6 sm:p-10 backdrop-blur-xl shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-6 border-b border-black/5 dark:border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">
            INTERACTIVE SOLUTION ADVISOR
          </span>
        </div>
        {selectedServiceSlug && (
          <button
            onClick={handleReset}
            className="text-xs font-mono text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        )}
      </div>

      {!selectedServiceSlug ? (
        <div className="space-y-4">
          <h3 className="text-xl sm:text-2xl font-serif text-slate-900 dark:text-white">
            {QUESTIONS[0].question}
          </h3>
          <p className="text-xs text-slate-600 dark:text-zinc-400">
            Click your primary business goal to receive a tailored engineering recommendation:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {QUESTIONS[0].options.map((opt) => (
              <button
                key={opt.targetServiceSlug}
                onClick={() => handleSelectService(opt.targetServiceSlug)}
                className="text-left p-4 rounded-xl border border-black/5 dark:border-white/10 bg-slate-50/80 dark:bg-white/5 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all flex flex-col justify-between group"
              >
                <span className="text-[10px] font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 mb-1">
                  {opt.tag}
                </span>
                <span className="text-xs font-medium text-slate-800 dark:text-zinc-200 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                  {opt.text}
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : matchedService ? (
        <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-6 sm:p-8 space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-3 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>98% MATCH RECOMMENDED FOR YOUR GOALS</span>
          </div>
          <h3 className="text-2xl font-serif text-slate-900 dark:text-white">
            {matchedService.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {matchedService.valueProposition}
          </p>

          <div className="space-y-2 pt-2">
            <span className="text-xs font-mono uppercase text-slate-500 tracking-wider block">
              Key Deliverables You Receive:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-zinc-300">
              {matchedService.deliverables.slice(0, 4).map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Button asChild size="sm" className="rounded-full shadow-lg shadow-orange-500/20">
              <Link href={`/it-services/services/${matchedService.slug}`}>
                Explore Complete Architecture Specs <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="rounded-full">
              <Link href="/it-services/contact">Start RFP for this Service</Link>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
