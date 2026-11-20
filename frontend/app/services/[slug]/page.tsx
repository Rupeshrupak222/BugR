import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { servicesData } from '@/data/services';
import { LeadForm } from '@/components/LeadForm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Workflow,
  PackageCheck,
  HelpCircle,
  Code2,
} from 'lucide-react';

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | Bug Refinery' };

  return {
    title: `${service.title} | Bug Refinery IT Services`,
    description: service.shortDesc,
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Button asChild variant="ghost" size="sm" className="gap-2 text-zinc-400">
            <Link href="/services">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all IT Services</span>
            </Link>
          </Button>
        </div>

        {/* 1. Service-Specific Hero */}
        <div className="mb-16 max-w-4xl space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="refinery" className="font-mono text-xs">
              {service.category.toUpperCase()}
            </Badge>
            <span className="text-xs font-mono text-zinc-400">ENTERPRISE DELIVERY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-tight">
            {service.title}
          </h1>

          <p className="text-lg text-zinc-300 leading-relaxed font-sans">
            {service.valueProposition}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-16">
            {/* 2. Business Problem Being Solved */}
            <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-8 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-semibold">
                <AlertTriangle className="h-4 w-4" />
                <span>THE BUSINESS PROBLEM</span>
              </div>
              <h2 className="text-2xl font-serif text-white">Why Existing Solutions Fail</h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {service.problemSolved}
              </p>
            </div>

            {/* 3. Solutions Offered & Capabilities */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold">
                <Lightbulb className="h-4 w-4" />
                <span>CAPABILITIES & ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl font-serif text-white">How We Solve It</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-white/10 bg-black/50 p-5 space-y-2 hover:border-orange-500/30 transition-colors"
                  >
                    <h3 className="text-base font-semibold text-white">{cap.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{cap.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Technology Capabilities (Tech Stack) */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold">
                <Code2 className="h-4 w-4" />
                <span>TECHNICAL TOOLING</span>
              </div>
              <h2 className="text-2xl font-serif text-white">Technologies & Frameworks</h2>
              <div className="flex flex-wrap gap-2.5">
                {service.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono text-zinc-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* 5. Development Approach */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold">
                <Workflow className="h-4 w-4" />
                <span>ENGINEERING METHOD</span>
              </div>
              <h2 className="text-2xl font-serif text-white">Our Engineering Approach</h2>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {service.solutionApproach}
              </p>
            </div>

            {/* 6. Expected Deliverables */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-8 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <PackageCheck className="h-4 w-4" />
                <span>EXPECTED DELIVERABLES</span>
              </div>
              <h2 className="text-2xl font-serif text-white">Tangible Project Outcomes</h2>
              <ul className="space-y-3 text-sm text-zinc-200">
                {service.deliverables.map((del, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 7. Frequently Asked Questions */}
            {service.faqs && service.faqs.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold">
                  <HelpCircle className="h-4 w-4" />
                  <span>COMMON QUESTIONS</span>
                </div>
                <h2 className="text-2xl font-serif text-white">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {service.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </div>

          {/* Sidebar / Consultation Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-28 space-y-6">
              <div>
                <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                  START A CONVERSATION
                </span>
                <h3 className="text-2xl font-serif text-white mt-1">
                  Request Consultation
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Connect directly with a Solutions Architect regarding {service.title}.
                </p>
              </div>

              <LeadForm defaultSource={service.title} />

              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-xs text-zinc-400 space-y-2">
                <div className="font-semibold text-white">Direct Advisory Support:</div>
                <div>Email: <a href="mailto:support@bugrefinery.com" className="text-orange-400 hover:underline">support@bugrefinery.com</a></div>
                <div>Typical technical response time: Under 24 business hours.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
