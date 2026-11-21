import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Cpu,
  Cloud,
  ShieldCheck,
  Sparkles,
  Server,
  GitBranch,
  FileText,
  HelpCircle,
} from 'lucide-react';

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

export async function generateStaticParams() {
  return servicesData.map((svc) => ({
    slug: svc.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | Bug Refinery' };

  return {
    title: `${service.title} | Bug Refinery Enterprise IT Services`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const Icon = serviceIcons[service.slug] || Server;

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 space-y-16">
        {/* Back Link */}
        <Link
          href="/it-services/services"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to All IT Services</span>
        </Link>

        {/* Hero Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
              <Icon className="h-6 w-6" />
            </div>
            <Badge variant="outline" className="text-xs font-mono border-orange-500/30 text-orange-600 dark:text-orange-400">
              {service.category}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-slate-900 dark:text-white tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
            {service.valueProposition}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20">
              <Link href="/it-services/contact">
                <span>Start a Project Brief</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <Link href="/it-services/process">View 8-Stage Delivery Process</Link>
            </Button>
          </div>
        </div>

        {/* Business Outcomes Bar */}
        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50 dark:bg-zinc-950/60 p-6 sm:p-8">
          <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-4">
            TANGIBLE PROJECT OUTCOMES
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.businessOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
            <span className="text-xs font-mono uppercase text-rose-500 font-semibold tracking-wider">
              THE CORE CHALLENGE
            </span>
            <h3 className="text-xl font-serif text-slate-900 dark:text-white">Why Existing Solutions Fail</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {service.problemSolved}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-3">
            <span className="text-xs font-mono uppercase text-emerald-600 dark:text-emerald-400 font-semibold tracking-wider">
              THE BUG REFINERY APPROACH
            </span>
            <h3 className="text-xl font-serif text-slate-900 dark:text-white">Engineering for Production Resilience</h3>
            <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
              {service.solutionApproach}
            </p>
          </div>
        </div>

        {/* Specific Architectural Capabilities */}
        <div className="space-y-6">
          <span className="text-xs font-mono text-orange-600 dark:text-orange-400 uppercase tracking-widest block">
            CORE CAPABILITIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white">
            Architectural Focus Areas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {service.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/40 space-y-2 hover:border-orange-500/30 transition-all"
              >
                <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                  {cap.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Concrete Deliverables & Tech Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-orange-500" />
              <h3 className="text-lg font-serif text-slate-900 dark:text-white">Concrete Deliverables</h3>
            </div>
            <ul className="space-y-2.5">
              {service.deliverables.map((deliv, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 shrink-0 mt-0.5" />
                  <span>{deliv}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/50 space-y-4">
            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-orange-500" />
              <h3 className="text-lg font-serif text-slate-900 dark:text-white">Technology Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg bg-slate-100 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-1.5 text-xs font-mono text-slate-800 dark:text-zinc-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="space-y-6 border-t border-black/10 dark:border-white/10 pt-12">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-orange-500" />
              <h3 className="text-2xl font-serif text-slate-900 dark:text-white">
                Frequently Asked Technical Questions
              </h3>
            </div>

            <Accordion type="single" collapsible className="w-full space-y-3">
              {service.faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`faq-${idx}`}
                  className="border border-black/10 dark:border-white/10 rounded-xl px-4 bg-white/70 dark:bg-black/30"
                >
                  <AccordionTrigger className="text-sm font-medium text-slate-900 dark:text-white hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pt-1 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 to-transparent p-8 text-center space-y-4">
          <h3 className="text-2xl font-serif text-slate-900 dark:text-white">
            Ready to Build with {service.title}?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Submit your requirements via our interactive Project Brief Builder to receive a structured technical discovery response.
          </p>
          <Button asChild size="lg" className="rounded-full shadow-lg shadow-orange-500/20">
            <Link href="/it-services/contact">
              <span>Initiate Project Brief</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
