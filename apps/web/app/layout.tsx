import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WarmScreen - AI Recruiter',
  description: 'Self-evolving AI recruiter with 7-agent swarm intelligence',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
