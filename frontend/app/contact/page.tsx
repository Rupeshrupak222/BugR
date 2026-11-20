import React from 'react';
import { LeadForm } from '@/components/LeadForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Bug Refinery',
  description: 'Reach Bug Refinery support, admissions, or corporate partnership teams.',
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-mono text-orange-400 uppercase tracking-widest">
                DIRECT INQUIRY
              </span>
              <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight mt-2">
                Get in Touch
              </h1>
              <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                Have questions about our 9-week labs, cohort start dates, fee structure, or company recruitment? Our team is here to assist.
              </p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email Admissions & Support</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">support@bugrefinery.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Admissions Office Hours</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">Monday – Saturday: 9:00 AM – 7:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-orange-400">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Simulation Hubs</h4>
                  <p className="text-zinc-400 text-xs mt-0.5">Remote Interactive Labs + Dedicated City Centers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <LeadForm defaultSource="Contact" />
          </div>
        </div>
      </div>
    </div>
  );
}
