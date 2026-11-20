import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Layers, Cpu, Cloud, ShieldCheck, Sparkles, Server } from 'lucide-react';
import { MotionReveal, MotionCard } from '@/components/animations/MotionReveal';
import { GsapReveal } from '@/components/animations/GsapReveal';

export const metadata = {
  title: 'IT Services & Digital Solutions | Bug Refinery',
  description: 'Enterprise custom software development, web applications, mobile apps, cloud infrastructure, AI automation, and cybersecurity QA.',
};

const serviceIcons: Record<string, React.ElementType> = {
  'custom-software-development': Code2,
  'web-development': Layers,
  'mobile-app-development': Cpu,
  'cloud-devops': Cloud,
  'ai-automation': Sparkles,
  'cybersecurity-qa': ShieldCheck,
};

export default function ServicesPage() {
  const engagementModels = [
    {
      title: 'Dedicated Engineering Squad',
      desc: 'An autonomous cross-functional engineering team (Lead Architect, Full-Stack Engineers, QA, and Scrum Master) embedded seamlessly into your product roadmap.',
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
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Services Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <GsapReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
              <span>ENTERPRISE IT SERVICES & SOLUTIONS</span>
            </div>
          </GsapReveal>

          <GsapReveal delay={0.1}>
            <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-[1.1]">
              Engineered for Resilience, Scaled for{' '}
              <span className="italic bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">
                High Velocity
              </span>
              .
            </h1>
          </GsapReveal>

          <GsapReveal delay={0.2}>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans">
              Bug Refinery delivers robust custom software development, cloud infrastructure, AI automation, and quality engineering for ambitious startups and growing enterprises.
            </p>
          </GsapReveal>

          <GsapReveal delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20">
                <Link href="/contact/project">
                  <span>Start a Project</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/work">Explore Reference Case Studies</Link>
              </Button>
            </div>
          </GsapReveal>
        </div>

        {/* 6 Core Services Grid */}
        <div className="mb-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                CORE CAPABILITIES
              </span>
              <h2 className="text-3xl font-serif text-white mt-1">
                Full-Lifecycle Software Services
              </h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              From greenfield architectural design to multi-region cloud deployment and ongoing proactive maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => {
              const Icon = serviceIcons[service.slug] || Server;
              return (
                <MotionReveal key={service.id} delay={idx * 0.1}>
                  <div className="h-full rounded-2xl border border-white/10 bg-black/60 p-8 backdrop-blur-xl flex flex-col justify-between hover:border-orange-500/40 hover:bg-black/80 transition-all duration-300 group">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-orange-400 group-hover:scale-105 group-hover:border-orange-500/30 transition-transform">
                          <Icon className="h-6 w-6" />
                        </div>
                        <Badge variant="outline" className="text-[11px] font-mono border-white/10 text-zinc-400">
                          {service.category}
                        </Badge>
                      </div>

                      <h3 className="text-2xl font-serif text-white mb-2 group-hover:text-orange-300 transition-colors">
                        {service.title}
                      </h3>

                      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                        {service.shortDesc}
                      </p>

                      <div className="space-y-2 mb-6">
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                          Key Deliverables:
                        </span>
                        {service.businessOutcomes.slice(0, 2).map((outcome, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="h-3.5 w-3.5 text-orange-400 shrink-0 mt-0.5" />
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-4 mt-auto">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {service.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-white/5 px-2 py-0.5 text-[11px] font-mono text-zinc-400 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-400 hover:text-orange-300 font-medium transition-colors"
                      >
                        <span>Explore Capabilities</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>
        </div>

        {/* Engagement Models */}
        <div className="mb-24 border-t border-white/10 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
              FLEXIBLE COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white">
              Engagement Models Built for Transparency
            </h2>
            <p className="text-zinc-400 text-sm">
              We align our collaboration structure with your project complexity, timeline requirements, and internal engineering bandwidth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementModels.map((model, i) => (
              <MotionReveal key={model.title} delay={i * 0.15}>
                <div className="h-full rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-xl flex flex-col justify-between hover:border-orange-500/30 transition-all">
                  <div>
                    <h3 className="text-xl font-serif text-white mb-3">{model.title}</h3>
                    <p className="text-sm text-zinc-300 leading-relaxed mb-4">{model.desc}</p>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/5 text-xs text-zinc-400 mb-6">
                      <strong className="text-white block mb-0.5">Ideal For:</strong>
                      {model.idealFor}
                    </div>
                  </div>
                  <div className="border-t border-white/10 pt-4 text-xs font-mono text-orange-400">
                    {model.terms}
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* Start a Project CTA */}
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-950/30 via-black to-black p-10 sm:p-16 backdrop-blur-2xl relative overflow-hidden text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-mono text-orange-400">
            <span>GET IN TOUCH WITH AN ARCHITECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-white">
            Have a Digital Product or Architecture Challenge?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule an initial technical discovery session with our senior solutions team. We provide actionable architectural feedback within 48 hours.
          </p>
          <div className="pt-2">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/25 px-8">
              <Link href="/contact/project">Request Architecture Consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
