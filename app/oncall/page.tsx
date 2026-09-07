'use client';
import { useState } from 'react';

export default function OnCall() {
  const [oncall, setOncall] = useState(false);
  const [wake, setWake] = useState('');

  function setNap(mins: number) {
    const d = new Date(Date.now() + mins * 60000);
    setWake(d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-lg font-medium mb-4">on-call toolkit</p>

      <div className="flex items-center justify-between bg-[#18181b] border border-white/10 rounded-xl p-4 mb-4">
        <span className="text-sm">on-call mode</span>
        <button
          onClick={() => setOncall(!oncall)}
          aria-label="toggle on-call mode"
          className={`w-11 h-6 rounded-full relative transition-colors ${oncall ? 'bg-[#ff5a2e]' : 'bg-white/10'}`}
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-black transition-all ${oncall ? 'left-5' : 'left-0.5'}`} />
        </button>
      </div>

      <p className="text-xs text-neutral-400 mb-2">eat / rest mode</p>
      <div className="flex gap-2 mb-3">
        {[20, 45, 90].map((m) => (
          <button key={m} onClick={() => setNap(m)} className="px-3 py-2 rounded-full border border-white/10 bg-[#18181b] text-xs">
            {m} min
          </button>
        ))}
      </div>
      <p className={`text-xs ${wake ? 'text-[#ff5a2e]' : 'text-neutral-400'}`}>
        {wake ? `wake by ${wake}` : 'pick a length, get a wake-up alarm ready'}
      </p>
    </main>
  );
}
