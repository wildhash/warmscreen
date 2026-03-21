'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Home, ListChecks } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: (pathname: string) => boolean;
};

const NAV_ITEMS: NavItem[] = [
  {
    href: '/',
    label: 'Overview',
    icon: Home,
    isActive: (pathname) => pathname === '/',
  },
  {
    href: '/interviews',
    label: 'Interviews',
    icon: ListChecks,
    isActive: (pathname) => pathname === '/interviews' || pathname.startsWith('/interviews/'),
  },
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    isActive: (pathname) => pathname === '/dashboard' || pathname.startsWith('/dashboard/'),
  },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="ws-nav">
      <Link href="/" className="flex items-center gap-2">
        <span className="font-display text-[13px] font-bold text-zinc-50 tracking-tight">
          WarmScreen
        </span>
        <span className="font-mono text-[10px] text-zinc-600">v0.1</span>
      </Link>

      <nav className="flex items-center gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = item.isActive(pathname);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`ws-nav-item ${active ? 'active' : ''}`}
            >
              <Icon size={14} className={active ? 'text-amber-500' : 'text-zinc-500'} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
