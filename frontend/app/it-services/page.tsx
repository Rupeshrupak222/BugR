import React from 'react';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { industriesData } from '@/data/industries';
import { portfolioProjects } from '@/data/portfolio';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
  Cloud,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Server,
  Zap,
  Lock,
  GitBranch,
} from 'lucide-react';
import { FindYourSolution } from '@/components/services/FindYourSolution';

export const metadata = {
  title: 'IT Services & Digital Solutions | Bug Refinery',
  description:
    'Enterprise software engineering, custom cloud architecture, mobile apps, AI automation, and cybersecurity QA for ambitious companies.',
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

const TECH_CATEGORIES = [
  {
    category: 'Languages & Runtimes',
    items: ['TypeScript', 'Python', 'Go', 'Node.js LTS', 'Java', 'Rust', 'SQL'],
  },
  {
    category: 'Frontend & Mobile',
    items: ['Next.js', 'React', 'React Native', 'Tailwind CSS', 'shadcn/ui', 'Flutter', 'Swift'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS', 'Google Cloud', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
  },
  {
    category: 'Data, AI & Security',
    items: ['PostgreSQL', 'Redis', 'Kafka', 'Prisma', 'pgvector', 'OpenAI / Gemini', 'OWASP ZAP'],
  },
];

export default function ITServicesHomePage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-28">
        {/* HERO SECTION */}
        <section className="text-center max-w-4xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-600 dark:text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ENTERPRISE IT SERVICES & DIGITAL SOLUTIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-slate-900 dark:text-white tracking-tight leading-[1.08]">
            Engineered for Resilience, Scaled for{' '}
            <span className="italic bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 bg-clip-text text-transparent">
              High Velocity
            </span>
            .
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Bug Refinery delivers battle-tested custom software engineering, distributed cloud architectures, mobile systems, and AI workflows for high-growth enterprises and ambitious startups.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
              <Link href="/it-services/contact">
                <span>Start a Project / RFP</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/it-services/portfolio">View Technical Case Studies</Link>
            </Button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-black/5 dark:border-white/10 text-left">
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">99.99%</span>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">Uptime Architecture</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">8 Core</span>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">Software Disciplines</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">&lt; 45ms</span>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">p99 Latency Target</p>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white">100% Zero</span>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mt-0.5">Fabricated Metrics</p>
            </div>
          </div>
        </section>

        {/* GUIDED FIND YOUR SOLUTION WIDGET */}
        <section>
          <FindYourSolution />
        </section>

        {/* BUSINESS CHALLENGES & REMEDIES */}
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50/70 dark:bg-zinc-950/40 p-8 sm:p-12">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              WHY TRADITIONAL AGENCIES FAIL
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-white mt-1">
              Engineering Built Around Production Realities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40">
              <div className="h-10 w-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">The Challenge: Brittle Monoliths</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Legacy software architectures crash during peak business demand, suffer from silent memory leaks, and carry mountain-sized technical debt.
              </p>
              <div className="pt-2 text-xs font-mono text-orange-600 dark:text-orange-400">
                &rarr; Bug Refinery Remedy: Strangler Fig migration and fault-tolerant microservices.
              </div>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">The Challenge: Runaway Cloud Costs</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Over-provisioned cloud instances, unoptimized database queries, and redundant third-party SaaS subscriptions inflate burn rates.
              </p>
              <div className="pt-2 text-xs font-mono text-orange-600 dark:text-orange-400">
                &rarr; Bug Refinery Remedy: FinOps containerization, connection pooling, and IaC automation.
              </div>
            </div>

            <div className="space-y-3 p-6 rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/40">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">The Challenge: Security Regressions</h3>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                Rushed sprints ship untested endpoints with authorization bypasses, unvalidated inputs, and zero audit logging.
              </p>
              <div className="pt-2 text-xs font-mono text-orange-600 dark:text-orange-400">
                &rarr; Bug Refinery Remedy: Automated Playwright E2E suites and OWASP Top 10 security CI gates.
              </div>
            </div>
          </div>
        </section>

        {/* 8 CORE SERVICES OVERVIEW */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                CORE DISCIPLINES
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white mt-1">
                Full-Lifecycle Software Engineering
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/it-services/services">
                <span>View All 8 Detailed Service Pages</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

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
                        {svc.category.split(' ')[0]}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                      {svc.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-3 mb-4 leading-relaxed">
                      {svc.shortDesc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/10">
                    <Link
                      href={`/it-services/services/${svc.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono text-orange-600 dark:text-orange-400 hover:text-orange-500 font-semibold"
                    >
                      <span>Specifications</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* TECHNOLOGY CAPABILITIES MATRIX */}
        <section className="rounded-3xl border border-black/10 dark:border-white/10 bg-slate-50/70 dark:bg-zinc-950/40 p-8 sm:p-12">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest">
              TECHNOLOGY STANDARDS
            </span>
            <h2 className="text-3xl font-serif text-slate-900 dark:text-white mt-1">
              Production-Proven Tech Stack
            </h2>
            <p className="text-xs text-slate-600 dark:text-zinc-400 mt-2">
              We select modern, type-safe, LTS-supported tools with thriving open-source ecosystems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.category} className="space-y-3 p-5 rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/50">
                <h4 className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/10 px-2 py-0.5 text-xs text-slate-700 dark:text-zinc-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CASE STUDIES HIGHLIGHTS */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                VERIFIED SYSTEMS
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white mt-1">
                Engineering Case Studies
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full">
              <Link href="/it-services/portfolio">
                <span>Explore Full Portfolio</span>
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioProjects.slice(0, 3).map((proj) => (
              <div
                key={proj.slug}
                className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-6 flex flex-col justify-between hover:border-orange-500/40 hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="text-[10px] font-mono border-orange-500/30 text-orange-600 dark:text-orange-400">
                      {proj.category}
                    </Badge>
                    <span className="text-[11px] font-mono text-slate-500">{proj.timeline}</span>
                  </div>

                  <h3 className="text-xl font-serif text-slate-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
                    {proj.challenge}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    {proj.impactMetrics.slice(0, 2).map((out, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">{proj.techStack[0]} · {proj.techStack[1]}</span>
                  <Link
                    href={`/it-services/portfolio/${proj.slug}`}
                    className="text-xs font-mono text-orange-600 dark:text-orange-400 hover:text-orange-500 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Architecture Deep-Dive</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent p-8 sm:p-14 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-orange-600 dark:text-orange-400">
            START YOUR TECHNICAL DISCOVERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white">
            Have a Complex Engineering Problem?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 max-w-xl mx-auto leading-relaxed">
            Our Principal Architects review your architectural brief, evaluate trade-offs, and deliver an actionable discovery proposal within 1 business day.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20 px-8">
              <Link href="/it-services/contact">
                <span>Build Your Project Brief</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/it-services/process">Explore Our 8-Stage Delivery Model</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
