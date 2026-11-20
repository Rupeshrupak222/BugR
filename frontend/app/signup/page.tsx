import React from 'react';
import { LeadForm } from '@/components/LeadForm';
import { labContent } from '@/data/labs';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Apply for Cohort 30 | Bug Refinery',
  description: 'Register interest for Bug Refinery 9-week Industry-Simulation Labs.',
};

export default function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ source?: string }>;
}) {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>COHORT 30 ADMISSIONS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
            Register for Bug Refinery
          </h1>
          <p className="text-zinc-400 text-sm max-w-lg mx-auto">
            Choose your preferred discipline track from our 26 industry labs. Fixed fee of ₹9,999 for 9 weeks of intensive simulation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <LeadForm
            defaultSource="Python Full Stack"
            sourceOptions={labContent.map((l) => l.name)}
          />
        </div>
      </div>
    </div>
  );
}
