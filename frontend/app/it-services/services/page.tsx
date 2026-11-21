import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
  Cloud,
  ShieldCheck,
  Sparkles,
  Server,
  GitBranch,
} from 'lucide-react';

export const metadata = {
  title: 'All Software Engineering Services | Bug Refinery',
  description:
    'Comprehensive index of Bug Refinery software engineering services: Custom Software, Web, Mobile, Cloud DevOps, AI, Cybersecurity, API Integration, and Modernization.',
};

const serviceIcons: Record<string, React.ElementType> = {
  'custom-software-development': Code2,
  'web-development': Layers,
  'mobile-app-development': Cpu,
  'cloud-devops': Cloud,
  'ai-automation': Sparkles,
  'cybersecurity-qa': ShieldCheck,
  'api-development-integration': Server,
  'application-modernization-maintenance': GitBranch,
};

export default function ServicesDirectoryPage() {
  const engagementModels = [
    {
      title: 'Dedicated Engineering Squad',
      desc: 'An autonomous cross-functional engineering team (Lead Architect, Senior Full-Stack Engineers, QA, and Scrum Master) embedded seamlessly into your product roadmap.',
      idealFor: 'Startups and enterprises scaling existing platforms with ongoing feature backlogs.',
      terms: 'Monthly Sprint Retainer · Flexible Team Sizing',
    },
    {
      title: 'Fixed-Scope Project Delivery',
      desc: 'End-to-end execution of a defined project with agreed architectural specifications, clear milestone deliverables, guaranteed deadlines, and capped budget.',
      idealFor: 'Bespoke corporate platforms, MVP builds, and defined legacy modernization projects.',
      terms: 'Milestone-Based Billing · Fixed Delivery Date',
    },
    {
      title: 'Architecture & Security Audits',
      desc: 'Targeted deep-dive assessments of your codebase, cloud infrastructure, performance bottlenecks, and security posture with prioritized remediation runbooks.',
      idealFor: 'Due diligence, SOC 2 / HIPAA compliance preparation, and scaling bottlenecks.',
      terms: '2–4 Week Intensive Engagement · Formal Audit Report',
    },
  ];

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <span>FULL-LIFECYCLE SOFTWARE DISCIPLINES</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Engineering Capabilities for{' '}
            <span className="italic bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent">
              Mission-Critical
            </span>{' '}
            Systems.
          </h1>

          <p className="text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
            From greenfield architectural synthesis to distributed cloud deployment and 24/7 SLA maintenance, Bug Refinery delivers robust solutions engineered for high concurrency.
          </p>
        </div>

        {/* 8 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((svc) => {
            const Icon = serviceIcons[svc.slug] || Server;
            return (
              <div
                key={svc.slug}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-6 flex flex-col justify-between hover:border-orange-500/40 hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono border-black/10 dark:border-white/10">
                      {svc.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                    {svc.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                    {svc.shortDesc}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Core Outcomes:
                    </span>
                    {svc.businessOutcomes.slice(0, 2).map((out, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {svc.techStack.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono text-slate-500">
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/it-services/services/${svc.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 dark:text-orange-400 hover:text-orange-500 font-semibold"
                  >
                    <span>View Specs</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engagement Models */}
        <div className="border-t border-black/10 dark:border-white/10 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              COLLABORATION MODELS
            </span>
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white">
              Engagement Structures Built for Clarity
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              We align our engagement model with your team's internal bandwidth, project certainty, and delivery milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagementModels.map((model) => (
              <div
                key={model.title}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-serif text-slate-900 dark:text-white mb-2">{model.title}</h3>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">{model.desc}</p>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 mb-4 text-xs text-slate-700 dark:text-zinc-300">
                    <span className="font-mono text-[10px] uppercase text-orange-600 dark:text-orange-400 block mb-1">
                      Ideal For:
                    </span>
                    {model.idealFor}
                  </div>
                </div>
                <div className="pt-3 border-t border-black/5 dark:border-white/10 text-[11px] font-mono text-slate-500">
                  {model.terms}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Callout */}
        <div className="text-center pt-8">
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
            <Link href="/it-services/contact">
              <span>Start an Engineering Project / RFP</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
