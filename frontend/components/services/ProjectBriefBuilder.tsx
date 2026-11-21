'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { enquirySchema, EnquiryFormData } from '@/lib/validations/enquiry';
import { servicesData } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Sparkles,
  Layers,
  Cpu,
  Clock,
  Send,
  Building2,
  Mail,
  User,
  Phone,
  Code2,
} from 'lucide-react';

const PROJECT_TYPES = [
  { id: 'greenfield', label: 'Greenfield Build', desc: 'Bespoke from-scratch software architecture' },
  { id: 'modernization', label: 'Legacy Modernization', desc: 'Refactor monolith or upgrade cloud stack' },
  { id: 'dedicated-squad', label: 'Dedicated Squad', desc: 'Cross-functional engineering team augmentation' },
  { id: 'architecture-audit', label: 'Architecture & Security Audit', desc: 'Deep-dive codebase & performance review' },
];

const FEATURE_OPTIONS = [
  'Role-Based Access Control (RBAC & Auth)',
  'PCI-DSS Payment Orchestration (Stripe/Razorpay)',
  'Real-Time WebSockets & Live Telemetry',
  'High-Concurrency Microservices (Kafka/RabbitMQ)',
  'Multi-Tenant Database Partitioning',
  'Custom Analytics & Admin Dashboard',
  'AI / LLM Workflow or Vector RAG Integration',
  'Automated CI/CD & Multi-Region Cloud IaC',
];

const TIMELINE_OPTIONS = [
  'Immediate (< 1 Month)',
  '1 to 3 Months',
  '3 to 6 Months',
  '6+ Months (Long-Term Retainer)',
  'Flexible / Dependent on Scope',
];

const BUDGET_OPTIONS = [
  '₹5L – ₹15L (Startup MVP / Assessment)',
  '₹15L – ₹35L (Production Core System)',
  '₹35L – ₹75L (Enterprise Scale / High Concurrency)',
  '₹75L+ (Multi-Region / Dedicated Squad)',
  'Undetermined / Exploring Options',
];

export function ProjectBriefBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      serviceCategory: 'custom-software-development',
      projectType: 'greenfield',
      features: [],
      budgetRange: '₹15L – ₹35L (Production Core System)',
      timeline: '1 to 3 Months',
      honeypot: '',
      description: '',
      name: '',
      email: '',
      phone: '',
      company: '',
    },
  });

  const selectedService = watch('serviceCategory');
  const selectedType = watch('projectType');
  const selectedFeatures = watch('features') || [];
  const selectedTimeline = watch('timeline');
  const selectedBudget = watch('budgetRange');
  const formValues = watch();

  const toggleFeature = (feature: string) => {
    const current = selectedFeatures;
    if (current.includes(feature)) {
      setValue('features', current.filter((f) => f !== feature));
    } else {
      setValue('features', [...current, feature]);
    }
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 7));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          requestId: crypto.randomUUID(),
        }),
      });

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData.message || 'Failed to submit project brief. Please try again.');
      }

      const referenceId = resData.referenceId || `BR-RFP-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmitSuccess(referenceId);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 sm:p-12 text-center max-w-2xl mx-auto backdrop-blur-xl">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-serif text-slate-900 dark:text-white mb-2">
          Project Brief Registered
        </h3>
        <p className="text-sm font-mono text-emerald-600 dark:text-emerald-400 mb-4">
          Tracking Reference: {submitSuccess}
        </p>
        <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed max-w-md mx-auto mb-8">
          Thank you for trusting Bug Refinery. Our engineering team will review your architectural specifications and respond with initial technical discovery notes within 1 business day.
        </p>
        <Button
          onClick={() => {
            setSubmitSuccess(null);
            setCurrentStep(1);
          }}
          variant="outline"
          className="rounded-full"
        >
          Submit Another Brief
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl transition-colors" id="builder">
      {/* Header & Steps Indicator */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-mono text-orange-600 dark:text-orange-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>STEP {currentStep} OF 7 · INTERACTIVE PROJECT BRIEF BUILDER</span>
            </div>
            <h3 className="text-2xl font-serif text-slate-900 dark:text-white">
              {currentStep === 1 && 'Select Your Service Category'}
              {currentStep === 2 && 'Define Project Nature'}
              {currentStep === 3 && 'Key Architectural Capabilities'}
              {currentStep === 4 && 'Target Timeline & Budget'}
              {currentStep === 5 && 'Stakeholder Contact Details'}
              {currentStep === 6 && 'Review Generated Technical Brief'}
              {currentStep === 7 && 'Confirm & Submit Inbound RFP'}
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
            Progress: {Math.round((currentStep / 7) * 100)}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / 7) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Hidden Honeypot for bot detection */}
        <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

        {/* STEP 1: Service Category */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">
              Select the core technology capability you need Bug Refinery to engineer:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {servicesData.map((svc) => (
                <button
                  type="button"
                  key={svc.slug}
                  onClick={() => setValue('serviceCategory', svc.slug)}
                  className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    selectedService === svc.slug
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                      : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-orange-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {svc.category}
                    </span>
                    {selectedService === svc.slug && (
                      <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-1">
                    {svc.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 line-clamp-2">
                    {svc.shortDesc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Project Nature */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">
              What type of technical engagement best fits your roadmap?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PROJECT_TYPES.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setValue('projectType', type.id)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
                    selectedType === type.id
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/10'
                      : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:border-orange-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">
                      {type.label}
                    </h4>
                    {selectedType === type.id && (
                      <CheckCircle2 className="h-4 w-4 text-orange-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-zinc-400">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Key Architectural Features */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-4">
              Select key technical requirements your system will require (multi-select):
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURE_OPTIONS.map((feature) => {
                const isSelected = selectedFeatures.includes(feature);
                return (
                  <button
                    type="button"
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10 text-slate-900 dark:text-white'
                        : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300 hover:border-orange-500/30'
                    }`}
                  >
                    <span className="text-xs font-medium">{feature}</span>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-orange-500 shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Timeline & Budget */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-3 block">
                Target Launch Horizon:
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TIMELINE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setValue('timeline', opt)}
                    className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedTimeline === opt
                        ? 'border-orange-500 bg-orange-500/10 text-slate-900 dark:text-white'
                        : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs font-mono uppercase tracking-wider text-slate-700 dark:text-zinc-300 mb-3 block">
                Estimated Project Budget Bracket:
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setValue('budgetRange', b)}
                    className={`text-left p-3.5 rounded-xl border text-xs font-medium transition-all ${
                      selectedBudget === b
                        ? 'border-orange-500 bg-orange-500/10 text-slate-900 dark:text-white'
                        : 'border-black/5 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-zinc-300'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Stakeholder Contact & Description */}
        {currentStep === 5 && (
          <div className="space-y-5">
            <p className="text-sm text-slate-600 dark:text-zinc-400 mb-2">
              Where should our Principal Engineering Architect send the technical discovery brief?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brief-name" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5 block">
                  Full Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="brief-name"
                    placeholder="Aditi Verma"
                    className="pl-10"
                    {...register('name')}
                  />
                </div>
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Label htmlFor="brief-email" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5 block">
                  Work Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="brief-email"
                    type="email"
                    placeholder="aditi@company.com"
                    className="pl-10"
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="brief-company" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5 block">
                  Company / Organization *
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="brief-company"
                    placeholder="Acme Financial Technologies"
                    className="pl-10"
                    {...register('company')}
                  />
                </div>
                {errors.company && <p className="text-xs text-rose-500 mt-1">{errors.company.message}</p>}
              </div>

              <div>
                <Label htmlFor="brief-phone" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5 block">
                  Direct Phone Number (Optional)
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="brief-phone"
                    placeholder="+91 98765 43210"
                    className="pl-10"
                    {...register('phone')}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="brief-desc" className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-zinc-400 mb-1.5 block">
                Project Overview & Constraints *
              </Label>
              <Textarea
                id="brief-desc"
                rows={4}
                placeholder="Briefly describe your business challenge, existing stack, and expected outcomes..."
                {...register('description')}
              />
              {errors.description && (
                <p className="text-xs text-rose-500 mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>
        )}

        {/* STEP 6: Review Generated Technical Brief */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-slate-50/80 dark:bg-zinc-950/60 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/10 pb-3">
                <span className="text-xs font-mono uppercase text-orange-600 dark:text-orange-400">
                  STRUCTURED TECHNICAL BRIEF PREVIEW
                </span>
                <span className="text-xs font-mono text-slate-500">FORMAT: RFC SUMMARY</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-mono text-slate-400 block mb-0.5">Primary Capability:</span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">
                    {servicesData.find((s) => s.slug === formValues.serviceCategory)?.title || formValues.serviceCategory}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-slate-400 block mb-0.5">Engagement Nature:</span>
                  <span className="font-semibold text-slate-900 dark:text-white capitalize">
                    {PROJECT_TYPES.find((t) => t.id === formValues.projectType)?.label || formValues.projectType}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-slate-400 block mb-0.5">Timeline:</span>
                  <span className="text-slate-800 dark:text-zinc-200">{formValues.timeline}</span>
                </div>
                <div>
                  <span className="font-mono text-slate-400 block mb-0.5">Budget Allocation:</span>
                  <span className="text-slate-800 dark:text-zinc-200">{formValues.budgetRange}</span>
                </div>
              </div>

              <div className="border-t border-black/5 dark:border-white/10 pt-3">
                <span className="text-xs font-mono text-slate-400 block mb-1">Architectural Features:</span>
                <div className="flex flex-wrap gap-1.5">
                  {(formValues.features || []).length > 0 ? (
                    formValues.features?.map((f) => (
                      <span key={f} className="rounded-md bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 px-2 py-0.5 text-[11px] text-slate-700 dark:text-zinc-300">
                        {f}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">None specifically checked</span>
                  )}
                </div>
              </div>

              <div className="border-t border-black/5 dark:border-white/10 pt-3">
                <span className="text-xs font-mono text-slate-400 block mb-1">Target Organization:</span>
                <p className="text-xs text-slate-800 dark:text-zinc-200 font-medium">
                  {formValues.name || 'Not provided'} · {formValues.company || 'Not provided'} ({formValues.email || 'No email'})
                </p>
              </div>

              <div className="border-t border-black/5 dark:border-white/10 pt-3">
                <span className="text-xs font-mono text-slate-400 block mb-1">Project Scope:</span>
                <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed italic">
                  "{formValues.description || 'No description provided yet.'}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* STEP 7: Confirm & Submit */}
        {currentStep === 7 && (
          <div className="space-y-6 text-center max-w-lg mx-auto py-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 mb-2">
              <Send className="h-6 w-6" />
            </div>
            <h4 className="text-xl font-serif text-slate-900 dark:text-white">
              Ready to Transmit Your Engineering Brief
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Your brief will be stored in our secure PostgreSQL database and assigned to a Lead Architect. We never sell your data or share your specifications.
            </p>

            {submitError && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-500">
                {submitError}
              </div>
            )}

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full rounded-full shadow-lg shadow-orange-500/20 font-medium"
            >
              {isSubmitting ? 'Transmitting Brief...' : 'Transmit Project Brief & RFP →'}
            </Button>
          </div>
        )}

        {/* Controls Bar */}
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
          <Button
            type="button"
            variant="ghost"
            onClick={handlePrev}
            disabled={currentStep === 1 || isSubmitting}
            className="text-xs"
          >
            <ArrowLeft className="mr-1.5 h-3.5 w-3.5" /> Previous Step
          </Button>

          {currentStep < 7 ? (
            <Button
              type="button"
              onClick={handleNext}
              className="rounded-full text-xs px-6 shadow-md shadow-orange-500/10"
            >
              Proceed to Step {currentStep + 1} <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
