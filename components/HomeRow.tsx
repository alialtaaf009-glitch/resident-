import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
    <Link href={href} className="group flex items-center gap-3 py-3 border-b border-white/5">
      <Chip>{icon}</Chip>
      <div className="flex-1">
        <p className="text-sm font-medium text-neutral-100">{title}</p>
        <p className="text-xs text-neutral-400">{subtitle}</p>
      </div>
      {/* Circular affordance on the right - fills orange on tap/hover */}
      <span
        aria-hidden="true"
        className="w-7 h-7 rounded-full border border-white/10 bg-[#18181b] flex items-center justify-center shrink-0 transition-colors group-hover:border-[#ff5a2e] group-hover:bg-[#ff5a2e]/10 group-active:border-[#ff5a2e] group-active:bg-[#ff5a2e]/10"
      >
        <ChevronRight
          size={14}
          className="text-neutral-500 transition-colors group-hover:text-[#ff5a2e] group-active:text-[#ff5a2e]"
        />
      </span>
    </Link>
  );
}
