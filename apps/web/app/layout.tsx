import type { Metadata } from 'next';
import { JetBrains_Mono, Syne } from 'next/font/google';

import { AppNav } from './components/app-nav';

import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'WarmScreen — AI Recruiter',
  description: 'Self-evolving AI recruiter with 7-agent swarm intelligence',
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <AppNav />
        {children}
      </body>
    </html>
  );
}
