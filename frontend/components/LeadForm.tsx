'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { leadSchema, type LeadFormData } from '@/lib/validations/lead';
import { submitLead } from '@/lib/api-client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface LeadFormProps {
  defaultSource?: string;
  sourceOptions?: string[];
  className?: string;
  onSuccess?: () => void;
}

export function LeadForm({
  defaultSource = 'General Enquiry',
  sourceOptions,
  className = '',
  onSuccess,
}: LeadFormProps) {
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      requestId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'c8087268-306d-495d-9fc0-42ba2cfa5fbc',
      name: '',
      email: '',
      phone: '',
      source: defaultSource,
      message: '',
      website: '',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setSubmitState('loading');
    setErrorMessage('');
    try {
      const payload: LeadFormData = {
        ...data,
        requestId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : data.requestId,
      };
      await submitLead(payload);
      setSubmitState('success');
      reset();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      setSubmitState('error');
      setErrorMessage((err as Error).message || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-black/60 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl ${className}`}>
      {submitState === 'success' ? (
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-serif text-white">Application Received</h3>
          <p className="max-w-md text-sm text-zinc-400">
            Thank you for registering interest with Bug Refinery. Our admissions and engineering team will reach out to you within 24 hours.
          </p>
          <Button
            variant="outline"
            onClick={() => setSubmitState('idle')}
            className="mt-2"
          >
            Submit Another Enquiry
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitState === 'error' && (
            <div className="flex items-center gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Maya Patel"
              {...register('name')}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                {...register('email')}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+91 9876543210"
                {...register('phone')}
                aria-invalid={!!errors.phone}
              />
              {errors.phone && (
                <p className="text-xs text-red-400">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="source">Track / Discipline *</Label>
            {sourceOptions && sourceOptions.length > 0 ? (
              <select
                id="source"
                {...register('source')}
                className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500"
              >
                {sourceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-zinc-900 text-white">
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <Input id="source" {...register('source')} readOnly />
            )}
            {errors.source && (
              <p className="text-xs text-red-400">{errors.source.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="message">Message / Questions (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your background, degree, or hiring requirements..."
              rows={3}
              {...register('message')}
            />
            {errors.message && (
              <p className="text-xs text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* Honeypot field for anti-spam */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            {...register('website')}
          />

          <Button
            type="submit"
            disabled={submitState === 'loading'}
            className="w-full h-11 text-base font-semibold"
          >
            {submitState === 'loading' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </Button>

          <p className="text-center text-[11px] text-zinc-500">
            Cohort 30 starting soon. Guaranteed 9-week practical industry simulation.
          </p>
        </form>
      )}
    </div>
  );
}
