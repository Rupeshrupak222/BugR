import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';

export const metadata = {
  title: 'About | Bug Refinery',
  description: 'Our mission to transform theoretical education into practical engineering capability.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-16">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
            <span>ABOUT BUG REFINERY</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            Beyond Theory.
          </h1>
          <p className="text-lg text-zinc-300 leading-relaxed font-sans max-w-2xl mx-auto">
            We believe traditional degree programmes do a great job teaching theory, but leave students completely unprepared for real engineering environments.
          </p>
        </div>

        <div className="space-y-8 text-zinc-300 text-sm leading-relaxed border-t border-white/10 pt-12">
          <h2 className="text-2xl font-serif text-white">The Engineering Pedagogy</h2>
          <p>
            When a new engineer joins Stripe, Datadog, or any high-velocity tech team, nobody asks them to invert a binary tree on a whiteboard. Instead, they are assigned a broken bug ticket, a link to an unfamiliar multi-service codebase, and a deadline to produce a pull request with unit tests and clear reproduction steps.
          </p>
          <p>
            Bug Refinery was built from that exact premise. Our 26 Industry-Simulation Labs simulate real production environments across four major disciplines: Technology, Management & Commerce, Engineering & Non-IT, and Medical & Healthcare.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
            <div className="rounded-xl border border-white/10 bg-black/50 p-6 space-y-2">
              <h3 className="font-serif text-white text-lg">Two Wings, One Vision</h3>
              <p className="text-xs text-zinc-400">
                <strong>Labs:</strong> The training and simulation wing preparing graduates to be Day-1 ready.
                <br />
                <strong>Foundry:</strong> Our internal development wing shipping real products and client systems.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/50 p-6 space-y-2">
              <h3 className="font-serif text-white text-lg">Transparent Accountability</h3>
              <p className="text-xs text-zinc-400">
                Every graduate leaves with demonstrable proof of their debugging decisions, benchmarked scorecards, and verifiable GitHub pull requests.
              </p>
            </div>
          </div>

          <div className="text-center pt-8">
            <Button asChild size="lg">
              <Link href="/signup">
                <span>Join Upcoming Cohort</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
