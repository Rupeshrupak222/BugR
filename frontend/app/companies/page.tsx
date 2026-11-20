import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { CheckCircle2, Building2, TrendingDown, Users, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'For Companies & Hiring Teams | Bug Refinery',
  description: 'Stop onboarding graduates who cannot ship. Hire job-ready engineers trained on production debugging.',
};

export default function CompaniesPage() {
  const problems = [
    {
      title: '6 Months of Wasted Senior Engineering Time',
      desc: 'Senior staff spend weeks teaching fresh hires basic git branching, PR reviews, and how to read stack traces without panic.',
    },
    {
      title: 'High Ramp-Up Failure Rate',
      desc: 'Candidates who excelled in theoretical whiteboard puzzles often freeze when faced with large legacy microservices.',
    },
    {
      title: 'False Positive Resumes',
      desc: 'Generative AI and cookie-cutter tutorial clones make it nearly impossible to evaluate real debugging aptitude from resumes alone.',
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
              <Building2 className="h-3.5 w-3.5" />
              <span>FOR ENGINEERING LEADERS & HIRING TEAMS</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
              Stop Onboarding Graduates Who Can’t Ship.
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Bug Refinery produces graduates who have already navigated 50,000-line codebases, resolved production deadlocks, and had their pull requests critiqued by veteran engineers.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <a href="#partner">Hire From Bug Refinery</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/labs">Review Lab Rubrics</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {problems.map((p, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono mb-2">
                  <ShieldAlert className="h-4 w-4" />
                  <span>THE ONBOARDING BOTTLENECK</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{p.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hiring Partner Inquiry Form */}
        <div id="partner" className="pt-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 space-y-2">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                HIRING PARTNER NETWORK
              </span>
              <h2 className="text-3xl font-serif text-white">Partner With Bug Refinery</h2>
              <p className="text-sm text-zinc-400">
                Receive pre-vetted candidate scorecards, git diffs, and interview-ready talent.
              </p>
            </div>
            <LeadForm defaultSource="Companies" />
          </div>
        </div>
      </div>
    </div>
  );
}
