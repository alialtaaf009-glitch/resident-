import Link from 'next/link';
import { Chip } from './Chip';
import type { ReactNode } from 'react';

export function HomeRow({
  href,
  icon,
  title,
  subtitle,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 py-3 border-b border-white/5">
      <Chip>{icon}</Chip>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-100">{title}</p>
        <p className="text-xs text-neutral-400">{subtitle}</p>
      </div>
    </Link>
  );
}
