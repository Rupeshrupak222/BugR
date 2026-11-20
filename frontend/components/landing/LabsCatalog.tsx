'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { labContent } from '@/data/labs';
import { MotionReveal, MotionCard } from '@/components/animations/MotionReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ArrowUpRight, Code, Briefcase, Cpu, Stethoscope, CheckCircle2 } from 'lucide-react';

export function LabsCatalog() {
  const [activeDomain, setActiveDomain] = useState<string>('all');
  const [selectedLab, setSelectedLab] = useState<typeof labContent[number] | null>(null);

  const domains = [
    { id: 'all', label: 'All 26 Labs', icon: null, count: labContent.length },
    { id: 'tech', label: 'Technology', icon: Code, count: 11 },
    { id: 'management', label: 'Management & Commerce', icon: Briefcase, count: 6 },
    { id: 'engineering', label: 'Engineering & Non-IT', icon: Cpu, count: 6 },
    { id: 'medical', label: 'Medical & Healthcare', icon: Stethoscope, count: 3 },
  ];

  const filteredLabs =
    activeDomain === 'all'
      ? labContent
      : labContent.filter((lab) => lab.domain === activeDomain);

  return (
    <section id="labs" className="py-24 border-t border-white/10 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <MotionReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-orange-400">
                DISCIPLINE DIRECTORY
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif text-white mt-2">
                26 Industry-Simulation Labs
              </h3>
              <p className="text-zinc-400 text-sm mt-2 max-w-xl">
                Every track operates as a simulated production desk. Select any lab to inspect the technical challenges, bug scenarios, and verifiable artifacts.
              </p>
            </div>
            <div className="text-xs font-mono text-zinc-500 bg-white/5 px-4 py-2 rounded-lg border border-white/10 shrink-0">
              ₹9,999 per lab · 9 weeks · Cohort 30
            </div>
          </div>
        </MotionReveal>

        {/* Domain Filters */}
        <div className="flex flex-wrap gap-2.5 mb-10">
          {domains.map((dom) => {
            const Icon = dom.icon;
            const isActive = activeDomain === dom.id;
            return (
              <button
                key={dom.id}
                onClick={() => setActiveDomain(dom.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-mono transition-all duration-200 border ${
                  isActive
                    ? 'border-orange-500/50 bg-orange-500/15 text-orange-400 shadow-[0_0_20px_rgba(255,94,0,0.15)]'
                    : 'border-white/10 bg-black/40 text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5" />}
                <span>{dom.label}</span>
                <span className="ml-1 opacity-60">({dom.count})</span>
              </button>
            );
          })}
        </div>

        {/* Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab) => (
            <MotionCard
              key={lab.slug}
              className="h-full rounded-xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-orange-500/40 hover:bg-black/70 transition-all cursor-pointer group"
              onClick={() => setSelectedLab(lab)}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="refinery" className="text-[11px] font-mono">
                    {lab.domain.toUpperCase()}
                  </Badge>
                  <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-orange-400 transition-colors" />
                </div>

                <h4 className="text-xl font-serif text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {lab.name}
                </h4>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {lab.simulate}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-auto space-y-2">
                <div className="text-[11px] text-zinc-500 font-mono">
                  PROOF DELIVERABLE:
                </div>
                <div className="text-xs text-zinc-300 font-medium">
                  {lab.summaryProof}
                </div>
              </div>
            </MotionCard>
          ))}
        </div>

        {/* Dialog for Deep Inspection of Selected Lab */}
        {selectedLab && (
          <Dialog open={!!selectedLab} onOpenChange={() => setSelectedLab(null)}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="refinery" className="font-mono text-xs">
                    {selectedLab.domain.toUpperCase()} DESK
                  </Badge>
                  <span className="text-xs text-zinc-500 font-mono">₹9,999 · 9 WEEKS</span>
                </div>
                <DialogTitle>{selectedLab.name} Industry Lab</DialogTitle>
                <DialogDescription className="text-zinc-300 text-sm">
                  {selectedLab.simulate}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 my-4 text-sm">
                <div>
                  <h5 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">
                    The Industry Defect
                  </h5>
                  <p className="text-zinc-300 text-xs bg-red-950/20 border border-red-500/20 p-3 rounded-lg">
                    Companies struggle with {selectedLab.bug}
                  </p>
                </div>

                <div>
                  <h5 className="text-xs font-mono text-orange-400 uppercase tracking-wider mb-2">
                    Curriculum & Debugging Modules
                  </h5>
                  <div className="space-y-3">
                    {selectedLab.curriculum.map((c, i) => (
                      <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-3 text-xs">
                        <div className="font-mono text-zinc-200 mb-1.5 font-semibold">
                          {c.heading}
                        </div>
                        {c.body && <div className="text-zinc-400 mb-2">{c.body}</div>}
                        {c.items && c.items.length > 0 && (
                          <ul className="space-y-1 text-zinc-300">
                            {c.items.map((item, j) => (
                              <li key={j} className="flex items-start gap-1.5">
                                <span className="text-orange-400">▹</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/20 bg-emerald-950/20 p-3 text-xs">
                  <div className="flex items-center gap-2 font-mono text-emerald-400 mb-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>VERIFIABLE GRADUATION PROOF</span>
                  </div>
                  <div className="text-zinc-300">{selectedLab.summaryProof}</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Button variant="outline" onClick={() => setSelectedLab(null)}>
                  Close
                </Button>
                <Button asChild>
                  <Link href={`/signup?source=${encodeURIComponent(selectedLab.name)}`}>
                    Enroll in {selectedLab.name}
                  </Link>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
