import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Beyond Theory | Bug Refinery',
  description:
    'Bridge the gap between your degree and your first real job with 26 industry-simulation labs across Tech, Management, Engineering, and Medical.',
  keywords: [
    'Bug Refinery',
    'industry simulation',
    'production debugging',
    'software engineering training',
    'graduate job readiness',
  ],
  authors: [{ name: 'Bug Refinery' }],
  icons: {
    icon: '/assets/brand.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark light" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var isDark=t?t==='dark':true;if(isDark){document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}else{document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}document.querySelectorAll('meta[name="color-scheme"]').forEach(function(m){m.content=isDark?'dark':'light';});}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-orange-500 selection:text-white transition-colors duration-200">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
