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
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#080808] text-white antialiased selection:bg-orange-500 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
