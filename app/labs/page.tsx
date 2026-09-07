'use client';
import { useState } from 'react';
import labData from '@/lib/data/labs.json';

const cats = Object.keys(labData).filter((k) => k !== '_note');

export default function Labs() {
  const [cat, setCat] = useState(cats[0]);
  const rows = (labData as any)[cat] as { name: string; range: string }[];

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-lg font-medium mb-4">lab values</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-3 py-2 rounded-full border text-xs ${
              c === cat ? 'border-[#ff5a2e] bg-[#ff5a2e]/10 text-[#ff5a2e]' : 'border-white/10 bg-[#18181b] text-neutral-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {rows.map((row) => (
        <div key={row.name} className="flex justify-between py-2 border-b border-white/5 text-sm">
          <span>{row.name}</span>
          <span className="text-neutral-400">{row.range}</span>
        </div>
      ))}

      <p className="text-[10px] text-neutral-600 mt-3">
        illustrative ranges - verify against your trust's actual reference ranges before relying on these
      </p>
    </main>
  );
}
