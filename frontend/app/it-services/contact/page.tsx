import React from 'react';
import { ProjectBriefBuilder } from '@/components/services/ProjectBriefBuilder';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Start a Project / Enterprise RFP Portal | Bug Refinery',
  description:
    'Submit an enterprise project enquiry or generate a structured technical brief with Bug Refinery Principal Engineering Architects.',
};

export default function ContactProjectPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <span>START A PROJECT / ENTERPRISE RFP</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Let's Engineer Your{' '}
            <span className="italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Next Breakthrough
            </span>
            .
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            Use our interactive 7-step Project Brief Builder below to define your technical requirements, architectural constraints, and target timeline.
          </p>
        </div>

        {/* The Interactive Project Brief Builder */}
        <section>
          <ProjectBriefBuilder />
        </section>

        {/* Direct Contact Cards & Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <Mail className="h-4 w-4" />
              <span>Direct RFP Desk</span>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">enterprise@bugrefinery.com</p>
            <p className="text-xs text-slate-500">For formal procurement documentation & tenders</p>
          </div>

          <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">
              <Clock className="h-4 w-4" />
              <span>SLA Discovery Response</span>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">&le; 24 Business Hours</p>
            <p className="text-xs text-slate-500">Every brief is evaluated by a Principal Architect</p>
          </div>

          <div className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              <span>NDA & Confidentiality</span>
            </div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Mutual NDA Supported</p>
            <p className="text-xs text-slate-500">Your proprietary architecture remains confidential</p>
          </div>
        </div>
      </div>
    </div>
  );
}
