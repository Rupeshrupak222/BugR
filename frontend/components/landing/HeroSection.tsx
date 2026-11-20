'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Terminal, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GsapReveal, GsapTextStagger } from '@/components/animations/GsapReveal';
import { MotionReveal } from '@/components/animations/MotionReveal';

export function HeroSection() {
  const [terminalStep, setTerminalStep] = useState(0);

  const terminalLogs = [
    { type: 'cmd', text: '$ git checkout -b fix/distributed-lock-race-condition' },
    { type: 'err', text: '[FAIL] TestOrderCheckout::test_concurrent_inventory_lock - LockTimeout 500ms exceeded' },
    { type: 'info', text: 'Analyzing postgres deadlocks in app/services/inventory.py:84...' },
    { type: 'fix', text: '+ SELECT id FROM inventory WHERE item_id = :id FOR UPDATE NOWAIT;' },
    { type: 'cmd', text: '$ pytest tests/integration/test_checkout.py' },
    { type: 'ok', text: '5 passed, 0 failed, 0 warnings in 0.42s [100%]' },
    { type: 'ship', text: '✓ Pull Request #142 approved by Senior Staff Engineer · Ready to Ship' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTerminalStep((prev) => (prev < terminalLogs.length ? prev + 1 : 1));
    }, 1800);
    return () => clearInterval(timer);
  }, [terminalLogs.length]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-orange-600/15 via-amber-500/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/4 w-[500px] h-[400px] bg-orange-950/20 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Column */}
          <div className="lg:col-span-7 space-y-6">
            <GsapReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-ping" />
                <span>BEYOND THEORY • INDUSTRY-SIMULATION PLATFORM</span>
              </div>
            </GsapReveal>

            <GsapReveal delay={0.2}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.08]">
                Bridge the Gap Between Your Degree and Your{' '}
                <span className="italic bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                  First Real Job
                </span>
                .
              </h1>
            </GsapReveal>

            <GsapReveal delay={0.35}>
              <p className="max-w-2xl text-lg text-zinc-300 leading-relaxed font-sans">
                You spent four years learning computer science and engineering theory. Bug Refinery spends the next 9 weeks turning that theory into the practical debugging, codebase navigation, and shipping skills companies actually hire for.
              </p>
            </GsapReveal>

            <GsapReveal delay={0.5}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/25">
                  <Link href="/signup">
                    <span>Explore Cohort 30</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full">
                  <Link href="/labs">Browse 26 Industry Labs</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  <span>Verified Deliverables</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>₹9,999 per Lab · 9 Weeks</span>
                </div>
              </div>
            </GsapReveal>
          </div>

          {/* Right Hero Column: Live Terminal Simulation */}
          <div className="lg:col-span-5">
            <MotionReveal delay={0.4}>
              <div className="relative rounded-2xl border border-white/15 bg-black/70 backdrop-blur-2xl shadow-2xl p-5 overflow-hidden">
                {/* Window header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                    <Terminal className="h-3.5 w-3.5 text-orange-400" />
                    <span>sim-session: production-node-01</span>
                  </div>
                </div>

                {/* Simulated Terminal Output */}
                <div className="font-mono text-xs space-y-2.5 min-h-[260px]">
                  {terminalLogs.slice(0, Math.max(1, terminalStep)).map((log, index) => (
                    <div
                      key={index}
                      className={`transition-opacity duration-300 ${
                        log.type === 'cmd'
                          ? 'text-zinc-200'
                          : log.type === 'err'
                          ? 'text-red-400 bg-red-950/20 p-1.5 rounded'
                          : log.type === 'fix'
                          ? 'text-emerald-300 bg-emerald-950/20 p-1.5 rounded'
                          : log.type === 'ok'
                          ? 'text-emerald-400 font-semibold'
                          : log.type === 'ship'
                          ? 'text-orange-400 font-semibold border-t border-white/10 pt-2'
                          : 'text-zinc-400'
                      }`}
                    >
                      {log.text}
                    </div>
                  ))}
                </div>

                {/* Footnote inside terminal */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Target: Zero-Downtime Hotfix</span>
                  <span className="text-emerald-400">STATUS: REPRODUCED & SHIPPED</span>
                </div>
              </div>
            </MotionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
