'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

// Shared header for every screen below home. Uses router.back() so it
// returns wherever the user actually came from, rather than always
// forcing them to home.
export function PageHeader({ title }: { title: string }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 mb-3 -ml-1">
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="w-8 h-8 rounded-full flex items-center justify-center active:bg-white/5"
      >
        <ChevronLeft size={20} className="text-neutral-400" />
      </button>
      <p className="text-base font-medium">{title}</p>
    </div>
  );
}
