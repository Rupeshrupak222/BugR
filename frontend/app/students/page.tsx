import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { MotionReveal } from '@/components/animations/MotionReveal';
import { ShieldCheck, ArrowRight, Award, FolderGit2, Users } from 'lucide-react';

export const metadata = {
  title: 'For Students & Graduates | Bug Refinery',
  description: 'Bridge the theory gap with hands-on codebase navigation and verified deliverables.',
};

export default function StudentsPage() {
  const studentBenefits = [
    {
      icon: FolderGit2,
      title: 'Verified Portfolio of PRs',
      desc: 'Graduate with real GitHub pull requests, commit histories, and reviewed regression fixes you can walk interviewers through.',
    },
    {
      icon: ShieldCheck,
      title: 'Live Technical Post-Mortems',
      desc: 'Defend your engineering decisions in simulated staff reviews, giving you battle-tested confidence in tech rounds.',
    },
    {
      icon: Users,
      title: 'Direct Hiring Introductions',
      desc: 'We place our top graduates directly into hiring partner pipelines who prioritize proven ability to ship over marks.',
    },
    {
      icon: Award,
      title: 'Industry Credential',
      desc: 'A verified simulation credential backed by recorded git diffs and deliverables, not generic attendance.',
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
              <span>FOR STUDENTS & COMPUTER SCIENCE GRADUATES</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
              Stop Applying With Tutorial Todo Apps.
            </h1>
            <p className="text-lg text-zinc-300 leading-relaxed">
              Your college degree proved you can pass exams. Bug Refinery proves you can sit at a desk on Day 1, clone a 100,000-line codebase, reproduce a production ticket, and ship a pull request that doesn’t break production.
            </p>
            <div className="flex gap-4">
              <Button asChild size="lg">
                <a href="#register">Apply for Cohort 30</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/labs">Browse 26 Tracks</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl">
              <h3 className="text-xl font-serif text-white mb-6">What You Walk Away With</h3>
              <div className="space-y-6">
                {studentBenefits.map((b, i) => {
                  const Icon = b.icon;
                  return (
                    <div key={i} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">{b.title}</h4>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Student Enrollment Form */}
        <div id="register" className="pt-12 border-t border-white/10">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 space-y-2">
              <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                STUDENT ADMISSIONS
              </span>
              <h2 className="text-3xl font-serif text-white">Register for Next Cohort</h2>
              <p className="text-sm text-zinc-400">
                ₹9,999 per lab · 9 weeks · Evening & weekend-friendly schedules
              </p>
            </div>
            <LeadForm defaultSource="Students" />
          </div>
        </div>
      </div>
    </div>
  );
}
