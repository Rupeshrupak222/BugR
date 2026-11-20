import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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
    icon: '/brand.svg',
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
        <Navbar />
        <main className="relative z-10 flex min-h-screen flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
