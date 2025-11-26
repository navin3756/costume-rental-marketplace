'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/deals', label: 'Deals' },
  { href: '/listings', label: 'Browse' },
  { href: '/bookings', label: 'Bookings' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/admin', label: 'Admin' }
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-brand">
          Costume Market
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-slate-600">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                pathname === link.href
                  ? 'text-brand'
                  : 'transition hover:text-brand'
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
