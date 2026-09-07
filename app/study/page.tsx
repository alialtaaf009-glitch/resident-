'use client';
import { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import cards from '@/lib/data/flashcards.json';

const specs = [
  { k: 'em', n: 'emergency' },
  { k: 'med', n: 'medicine' },
  { k: 'rad', n: 'radiology' },
  { k: 'path', n: 'pathology' },
  { k: 'anaes', n: 'anaesthesia' },
];

type Card = { q: string; a: string; read: string };

export default function Study() {
  // Default to the resident's own specialty match from onboarding once that
  // screen exists - for now this just starts on the first specialty.
  const [spec, setSpec] = useState('em');
  const [mode, setMode] = useState<'quiz' | 'read'>('quiz');
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const deck = (cards as any)[spec] as Card[];
  const card = deck[idx];

  function changeSpec(k: string) {
    setSpec(k);
    setIdx(0);
    setRevealed(false);
  }

  function nav(dir: number) {
    setIdx((idx + dir + deck.length) % deck.length);
    setRevealed(false);
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-medium">study</p>
        <div className="flex items-center gap-1 text-[#ff5a2e] text-xs">
          <Flame size={14} />
          <span>4-day streak</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {specs.map((s) => (
          <button
            key={s.k}
            onClick={() => changeSpec(s.k)}
            className={`px-3 py-2 rounded-full border text-xs ${
              s.k === spec ? 'border-[#ff5a2e] bg-[#ff5a2e]/10 text-[#ff5a2e]' : 'border-white/10 bg-[#18181b] text-neutral-200'
            }`}
          >
            {s.n}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        {(['quiz', 'read'] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              setRevealed(false);
            }}
            className={`px-3 py-2 rounded-full border text-xs ${
              m === mode ? 'border-[#ff5a2e] bg-[#ff5a2e]/10 text-[#ff5a2e]' : 'border-white/10 bg-[#18181b] text-neutral-200'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <p className="text-xs text-neutral-400 mb-2">
        {idx + 1} of {deck.length}
      </p>

      <div className="bg-[#18181b] border border-white/10 rounded-2xl p-4 min-h-[130px] flex flex-col justify-center gap-3 mb-4">
        {mode === 'quiz' ? (
          <>
            <p className="text-sm">{card.q}</p>
            {revealed ? (
              <p className="text-sm text-[#ff5a2e]">{card.a}</p>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="self-start px-3 py-2 rounded-full border border-white/10 bg-[#0d0d0f] text-xs text-neutral-100"
              >
                reveal answer
              </button>
            )}
          </>
        ) : (
          <>
            <p className="text-xs text-neutral-400">topic</p>
            <p className="text-sm">{card.read}</p>
          </>
        )}
      </div>

      <div className="flex justify-center gap-5">
        <button
          onClick={() => nav(-1)}
          aria-label="previous card"
          className="w-9 h-9 rounded-full border border-white/10 bg-[#18181b] flex items-center justify-center text-neutral-400"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => nav(1)}
          aria-label="next card"
          className="w-9 h-9 rounded-full border border-white/10 bg-[#18181b] flex items-center justify-center text-neutral-400"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </main>
  );
}
