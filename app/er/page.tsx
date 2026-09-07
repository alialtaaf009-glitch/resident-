'use client';
import { useState } from 'react';
import protocols from '@/lib/data/protocols.json';

const cats = Object.keys(protocols).filter((k) => k !== '_note');

export default function ER() {
  const [active, setActive] = useState(cats[0]);
  const steps = (protocols as any)[active].steps as string[];

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-lg font-medium mb-4">ER quick protocols</p>

      <button className="w-full bg-[#ff5a2e] text-black rounded-xl py-3 font-medium mb-4">something is wrong</button>

      <div className="flex flex-wrap gap-2 mb-4">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3 py-2 rounded-full border text-xs ${
              c === active ? 'border-[#ff5a2e] bg-[#ff5a2e]/10 text-[#ff5a2e]' : 'border-white/10 bg-[#18181b] text-neutral-200'
            }`}
          >
            {c.replace('_', ' ')}
          </button>
        ))}
      </div>

      {steps.map((s, i) => (
        <div key={s} className="flex gap-3 items-center bg-[#18181b] border border-white/10 rounded-xl p-3 mb-2 text-sm">
          <span className="text-[#ff5a2e] font-medium">{i + 1}</span>
          <span>{s}</span>
        </div>
      ))}
    </main>
  );
}
