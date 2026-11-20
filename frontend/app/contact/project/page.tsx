'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitLead } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, AlertCircle, Loader2, Sparkles, ShieldCheck } from 'lucide-react';

const projectInquirySchema = z.object({
  requestId: z.string().uuid(),
  name: z.string().min(1, 'Full name is required').max(120),
  email: z.string().email('Please enter a valid work email').max(254),
  phone: z.string().min(7, 'Phone number must have at least 7 digits').max(32),
  company: z.string().min(1, 'Company / Organization name is required').max(120),
  service: z.string().min(1, 'Please select a primary service').max(80),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  description: z.string().min(10, 'Please provide a brief project summary (min 10 characters)').max(2000),
  website: z.string().optional(), // Honeypot
});

type ProjectInquiryFormData = z.infer<typeof projectInquirySchema>;

export default function ProjectContactPage() {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectInquiryFormData>({
    resolver: zodResolver(projectInquirySchema),
    defaultValues: {
      requestId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
      name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Custom Software Development',
      budget: '$25k – $50k',
      timeline: '1 – 3 Months',
      description: '',
      website: '',
    },
  });

  const onSubmit = async (data: ProjectInquiryFormData) => {
    setSubmitState('loading');
    setErrorMessage('');
    try {
      const payload = {
        requestId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : data.requestId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        source: `Enterprise Project: ${data.service}`,
        message: `Company: ${data.company}\nBudget: ${data.budget}\nTimeline: ${data.timeline}\nScope: ${data.description}`,
        website: data.website || '',
      };
      await submitLead(payload);
      setSubmitState('success');
      reset();
    } catch (err: unknown) {
      setSubmitState('error');
      setErrorMessage((err as Error).message || 'Unable to submit RFP. Please email support@bugrefinery.com directly.');
    }
  };

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono text-orange-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ENTERPRISE INQUIRY & RFP</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight">
            Start Your Next Project
          </h1>
          <p className="text-zinc-300 text-base leading-relaxed">
            Tell us about your product goals, architectural constraints, and estimated timeline. A Senior Solutions Architect will review your scope and respond with preliminary technical feedback.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/70 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl">
          {submitState === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-serif text-white">Project Brief Received</h2>
              <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                Thank you for considering Bug Refinery. A Senior Solutions Architect has been assigned to review your scope and will respond within 24 business hours.
              </p>
              <div className="pt-4">
                <Button variant="outline" onClick={() => setSubmitState('idle')}>
                  Submit Another Brief
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {submitState === 'error' && (
                <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" placeholder="Alex Mercer" {...register('name')} />
                  {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Work Email *</Label>
                  <Input id="email" type="email" placeholder="alex@company.com" {...register('email')} />
                  {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company">Company / Organization *</Label>
                  <Input id="company" placeholder="Acme Technologies Inc." {...register('company')} />
                  {errors.company && <p className="text-xs text-red-400">{errors.company.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone / WhatsApp *</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 019-2834" {...register('phone')} />
                  {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="service">Primary Service *</Label>
                  <select
                    id="service"
                    {...register('service')}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                  >
                    <option value="Custom Software Development">Custom Software Development</option>
                    <option value="Website & Web Application Development">Website & Web App Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="Cloud & DevOps Engineering">Cloud & DevOps Engineering</option>
                    <option value="AI & Workflow Automation">AI & Workflow Automation</option>
                    <option value="Cybersecurity & Quality Assurance">Cybersecurity & QA</option>
                    <option value="Comprehensive Architecture Audit">Architecture Audit / Consulting</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget</Label>
                  <select
                    id="budget"
                    {...register('budget')}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                  >
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 – $25,000">$10,000 – $25,000</option>
                    <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                    <option value="$50,000 – $100,000">$50,000 – $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Expected Timeline</Label>
                  <select
                    id="timeline"
                    {...register('timeline')}
                    className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
                  >
                    <option value="Under 1 Month">Under 1 Month (Fast Track)</option>
                    <option value="1 – 3 Months">1 – 3 Months</option>
                    <option value="3 – 6 Months">3 – 6 Months</option>
                    <option value="Ongoing Retainer">Ongoing Squad Retainer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Project Summary & Technical Requirements *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Outline your application goals, target users, existing technical stack, and any specific deadlines..."
                  {...register('description')}
                />
                {errors.description && <p className="text-xs text-red-400">{errors.description.message}</p>}
              </div>

              {/* Honeypot field for anti-spam */}
              <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register('website')} />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="w-full h-12 text-base font-semibold"
                >
                  {submitState === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Transmitting Project Brief...
                    </>
                  ) : (
                    'Submit Project Brief for Review'
                  )}
                </Button>
              </div>

              <div className="flex items-center justify-center gap-6 pt-2 text-xs text-zinc-500 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-orange-400" />
                  <span>Strict NDA & IP Confidentiality</span>
                </div>
                <div>Direct response from Senior Solutions Architect</div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
