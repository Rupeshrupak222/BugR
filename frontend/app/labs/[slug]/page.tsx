import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { labContent } from '@/data/labs';
import { LeadForm } from '@/components/LeadForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';

interface LabPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return labContent.map((lab) => ({
    slug: lab.slug,
  }));
}

export default async function LabDetailPage({ params }: LabPageProps) {
  const { slug } = await params;
  const lab = labContent.find((l) => l.slug === slug);

  if (!lab) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-zinc-400">
            <Link href="/labs">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all Labs</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="refinery" className="font-mono text-xs">
                  {lab.domain.toUpperCase()} DESK
                </Badge>
                <span className="text-xs font-mono text-zinc-400">
                  ₹9,999 · 9 WEEKS · COHORT 30
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">
                {lab.name} Lab
              </h1>
              <p className="mt-4 text-base text-zinc-300 leading-relaxed font-sans">
                {lab.simulate}
              </p>
            </div>

            {/* The Industry Bug Solved */}
            <div className="rounded-xl border border-red-500/20 bg-red-950/10 p-6 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-mono text-xs font-semibold">
                <ShieldAlert className="h-4 w-4" />
                <span>THE RECURRING INDUSTRY DEFECT</span>
              </div>
              <p className="text-sm text-zinc-300">
                Companies regularly reject graduates due to {lab.bug}
              </p>
            </div>

            {/* 9-Week Step-by-Step Curriculum */}
            <div className="space-y-6">
              <h2 className="text-xl font-serif text-white">Curriculum & Practical Milestones</h2>
              <div className="space-y-4">
                {lab.curriculum.map((phase, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-black/50 p-5 space-y-3"
                  >
                    <div className="text-sm font-mono text-orange-400 font-semibold">
                      {phase.heading}
                    </div>
                    {phase.body && (
                      <p className="text-xs text-zinc-400">{phase.body}</p>
                    )}
                    {phase.items && phase.items.length > 0 && (
                      <ul className="space-y-1.5 text-xs text-zinc-300">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="text-orange-400 font-bold">▹</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Graduation Deliverable */}
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                <span>INSPECTABLE GRADUATION PROOF</span>
              </div>
              <p className="text-sm text-zinc-200">
                {lab.summaryProof}
              </p>
            </div>
          </div>

          {/* Sidebar / Registration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-28">
              <div className="mb-4">
                <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                  ENROLLMENT
                </span>
                <h3 className="text-2xl font-serif text-white">Join This Track</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Secure your seat for Cohort 30 in the {lab.name} lab.
                </p>
              </div>

              <LeadForm defaultSource={lab.name} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
