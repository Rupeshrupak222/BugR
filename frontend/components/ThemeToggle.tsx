'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  size?: 'default' | 'sm';
}

export function ThemeToggle({ className = '', size = 'default' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const next = e.newValue === 'light' ? 'light' : 'dark';
        setTheme(next);
        if (next === 'dark') {
          document.documentElement.classList.add('dark');
          document.documentElement.classList.remove('light');
        } else {
          document.documentElement.classList.remove('dark');
          document.documentElement.classList.add('light');
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? 'light' : 'dark';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      try {
        localStorage.setItem('theme', 'dark');
      } catch (e) {
        // ignore storage error
      }
      document.querySelectorAll('meta[name="color-scheme"]').forEach((meta) => {
        meta.setAttribute('content', 'dark');
      });
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      try {
        localStorage.setItem('theme', 'light');
      } catch (e) {
        // ignore storage error
      }
      document.querySelectorAll('meta[name="color-scheme"]').forEach((meta) => {
        meta.setAttribute('content', 'light');
      });
    }
  };

  // Safe fallback while hydrating: default to dark
  const isDark = mounted ? theme === 'dark' : true;

  if (size === 'sm') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        onClick={toggleTheme}
        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isDark
            ? 'bg-zinc-900/90 border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
            : 'bg-amber-100/90 border border-amber-300/80 shadow-[inset_0_2px_4px_rgba(251,191,36,0.2)]'
        } ${className}`}
      >
        <span className="sr-only">Toggle theme</span>
        <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none select-none">
          <Sun
            className={`h-3 w-3 transition-all duration-300 ${
              !isDark ? 'text-amber-500 opacity-100 scale-100' : 'text-zinc-600 opacity-40 scale-75'
            }`}
          />
          <Moon
            className={`h-3 w-3 transition-all duration-300 ${
              isDark ? 'text-amber-400 opacity-100 scale-100' : 'text-amber-700/40 opacity-40 scale-75'
            }`}
          />
        </div>
        <span
          className={`pointer-events-none flex h-5 w-5 items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isDark
              ? 'translate-x-5 bg-zinc-800 border border-zinc-700 text-amber-400 shadow-black/50'
              : 'translate-x-0 bg-white border border-amber-200 text-amber-500 shadow-amber-500/20'
          }`}
        >
          {isDark ? (
            <Moon className="h-3 w-3 fill-amber-400/20" />
          ) : (
            <Sun className="h-3 w-3 fill-amber-400/30" />
          )}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isDark
          ? 'bg-zinc-900/90 border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
          : 'bg-amber-100/90 border border-amber-300/80 shadow-[inset_0_2px_4px_rgba(251,191,36,0.2)]'
      } ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      
      {/* Background Track Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none select-none">
        <Sun
          className={`h-3.5 w-3.5 transition-all duration-300 ${
            !isDark ? 'text-amber-500 opacity-100 scale-100' : 'text-zinc-600 opacity-40 scale-75'
          }`}
        />
        <Moon
          className={`h-3.5 w-3.5 transition-all duration-300 ${
            isDark ? 'text-amber-400 opacity-100 scale-100' : 'text-amber-700/40 opacity-40 scale-75'
          }`}
        />
      </div>

      {/* Sliding Knob */}
      <span
        className={`pointer-events-none flex h-6 w-6 items-center justify-center rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
          isDark
            ? 'translate-x-6 bg-zinc-800 border border-zinc-700 text-amber-400 shadow-black/50'
            : 'translate-x-0 bg-white border border-amber-200 text-amber-500 shadow-amber-500/20'
        }`}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 fill-amber-400/20" />
        ) : (
          <Sun className="h-3.5 w-3.5 fill-amber-400/30" />
        )}
      </span>
    </button>
  );
}
