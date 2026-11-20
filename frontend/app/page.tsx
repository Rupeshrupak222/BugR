import React from 'react';
import { HeroSection } from '@/components/landing/HeroSection';
import { GapComparison } from '@/components/landing/GapComparison';
import { MethodologySection } from '@/components/landing/MethodologySection';
import { CurriculumSection } from '@/components/landing/CurriculumSection';
import { LabsCatalog } from '@/components/landing/LabsCatalog';
import { LeadForm } from '@/components/LeadForm';
import { MotionReveal } from '@/components/animations/MotionReveal';
import { Sparkles, ArrowRight } from 'lucide-react';
import { labContent } from '@/data/labs';

export default function HomePage() {
  const allLabSources = ['General Enquiry', 'Students', 'Companies', ...labContent.map((l) => l.name)];

  return (
    <>
      <HeroSection />
      <GapComparison />
      <MethodologySection />
      <CurriculumSection />
      <LabsCatalog />

      {/* Registration & Enquiry Section */}
      <section id="register" className="py-24 border-t border-white/10 relative overflow-hidden bg-gradient-to-b from-transparent to-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 blur-[150px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <MotionReveal>
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-mono text-orange-400">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>COHORT 30 ADMISSIONS</span>
                </div>
                <h3 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight mt-3">
                  Start Your Practical Journey Today.
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Join hundreds of engineers, developers, and analysts who bridged the theory gap through Bug Refinery industry simulation.
                </p>

                <div className="space-y-3 pt-2 text-xs text-zinc-300 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span>9-week intensive simulation format</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span>Real codebase tickets, broken logs & PR reviews</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span>Direct introduction to hiring partner network</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400 font-bold">✓</span>
                    <span>₹9,999 per lab all-inclusive</span>
                  </div>
                </div>
              </MotionReveal>
            </div>

            <div className="lg:col-span-7">
              <MotionReveal delay={0.2}>
                <LeadForm
                  defaultSource="Python Full Stack"
                  sourceOptions={allLabSources}
                />
              </MotionReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
