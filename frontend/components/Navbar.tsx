'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Button } from './ui/button';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-black/10 dark:border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 36 36"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-orange-500 dark:text-orange-400"
            >
              <path d="M13 4h10m-8 0v11L6 28q-2 4 3 4h18q5 0 3-4l-9-13V4"></path>
              <path d="m18 19 4 2v5l-4 2-4-2v-5zM18 22v5m-7-4h3m8 0h3"></path>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white font-serif">
              Bug Refinery
            </span>
            <span className="text-[10px] uppercase tracking-wider text-orange-600 dark:text-orange-400 font-mono">
              Beyond Theory.
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700 dark:text-zinc-300">
          <Link
            href="/services"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Services
          </Link>
          <Link
            href="/work"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Work
          </Link>
          <Link
            href="/industries"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Industries
          </Link>
          <Link
            href="/process"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Process
          </Link>
          <Link
            href="/labs"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <span>Labs</span>
            <span className="rounded bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/25 dark:border-orange-500/30 text-orange-600 dark:text-orange-400 text-[10px] px-1.5 py-0.2 font-mono">
              26
            </span>
          </Link>
          <Link
            href="/about"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white text-xs">
            <Link href="/signup">
              <span>Cohort 30</span>
            </Link>
          </Button>
          <Button asChild variant="default" size="sm" className="rounded-full px-5 shadow-lg shadow-orange-500/20">
            <Link href="/contact/project">
              <span>Start a Project</span>
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle size="sm" />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-slate-700 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-950/98 backdrop-blur-2xl px-6 py-6 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400">
              Appearance
            </span>
            <ThemeToggle size="sm" />
          </div>

          <div className="text-[11px] font-mono text-orange-600 dark:text-orange-400 uppercase tracking-wider mb-2">
            IT Services & Solutions
          </div>
          <Link
            href="/services"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-orange-400"
          >
            Services Overview
          </Link>
          <Link
            href="/work"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-orange-400"
          >
            Our Work / Portfolio
          </Link>
          <Link
            href="/industries"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-orange-400"
          >
            Industries We Serve
          </Link>
          <Link
            href="/process"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-800 dark:text-zinc-200 hover:text-orange-600 dark:hover:text-orange-400"
          >
            7-Step Delivery Process
          </Link>

          <div className="border-t border-black/10 dark:border-white/10 pt-4 text-[11px] font-mono text-slate-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
            Industry Simulation Platform
          </div>
          <Link
            href="/labs"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white"
          >
            26 Simulation Labs
          </Link>
          <Link
            href="/students"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white"
          >
            For Students
          </Link>
          <Link
            href="/companies"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white"
          >
            For Companies
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="block text-base font-medium text-slate-700 dark:text-zinc-300 hover:text-slate-950 dark:hover:text-white"
          >
            Contact Support
          </Link>

          <div className="pt-4 space-y-2 border-t border-black/10 dark:border-white/10">
            <Button asChild className="w-full">
              <Link href="/contact/project" onClick={() => setMobileOpen(false)}>
                Start a Project / RFP
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/signup" onClick={() => setMobileOpen(false)}>
                Join Cohort 30
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
