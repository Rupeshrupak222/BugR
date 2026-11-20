import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 bg-slate-100/90 dark:bg-black/80 py-16 text-slate-600 dark:text-zinc-400 transition-colors">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5">
                <svg
                  viewBox="0 0 36 36"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-orange-500 dark:text-orange-400"
                >
                  <path d="M13 4h10m-8 0v11L6 28q-2 4 3 4h18q5 0 3-4l-9-13V4"></path>
                  <path d="m18 19 4 2v5l-4 2-4-2v-5zM18 22v5m-7-4h3m8 0h3"></path>
                </svg>
              </div>
              <span className="text-lg font-serif text-slate-900 dark:text-white">Bug Refinery</span>
            </div>
            <p className="max-w-sm text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              Beyond Theory. Enterprise software engineering, digital product development, cloud architecture, and the 26-discipline industry-simulation platform.
            </p>
            <div className="flex flex-col gap-1 text-xs font-mono text-slate-500 dark:text-zinc-500">
              <span>B2B Engineering & Architecture Consulting</span>
              <span>₹9,999 per lab · 9 weeks · Cohort 30</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white">IT Services</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/services/custom-software-development" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link href="/services/web-development" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Web & SaaS Apps
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-app-development" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Mobile Development
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-devops" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Cloud & DevOps
                </Link>
              </li>
              <li>
                <Link href="/services/ai-automation" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  AI & Automation
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity-qa" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Cybersecurity & QA
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white">Company & Work</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/work" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Our Work & Systems
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Industries We Serve
                </Link>
              </li>
              <li>
                <Link href="/process" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  7-Step Process
                </Link>
              </li>
              <li>
                <Link href="/labs" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  26 Simulation Labs
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact/project" className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium transition-colors">
                  Start a Project / RFP &rarr;
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white">Contact & Support</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li className="text-slate-800 dark:text-zinc-300">support@bugrefinery.com</li>
              <li>
                <Link href="/contact" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Contact Helpdesk
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-slate-950 dark:hover:text-white transition-colors">
                  Cohort 30 Registration
                </Link>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
                  Accepting RFP Submissions
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-black/5 dark:border-white/5 pt-8 text-xs text-slate-500 dark:text-zinc-600 sm:flex-row">
          <p>© {new Date().getFullYear()} Bug Refinery. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Enterprise IT Services · Software Engineering · Industry-Simulation Labs.</p>
        </div>
      </div>
    </footer>
  );
}
