'use client';
import { useState } from 'react';

const instruments = ['stethoscope', 'reflex hammer', 'pen torch', 'tourniquet'];
const tips = [
  'most seniors were exactly this nervous on day one too',
  'it is normal to double check every prescription at first',
  'asking a nurse is experience you do not have yet',
  'by week 3 the on-call phone stops feeling scary',
];

export default function Essentials() {
  const [day, setDay] = useState(1);
  const [checks, setChecks] = useState([true, false, false, false]);
  const tip = tips[(day - 1) % tips.length];

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-lg font-medium mb-4">first-year essentials</p>

      <div className="bg-[#18181b] border border-white/10 rounded-xl p-4 mb-4 text-center">
        <div className="flex justify-between items-center mb-2 text-neutral-400 text-xs">
          <button onClick={() => setDay(Math.max(1, day - 1))} aria-label="previous day">&larr;</button>
          <span>day {day}</span>
          <button onClick={() => setDay(day + 1)} aria-label="next day">&rarr;</button>
        </div>
        <p className="text-sm">{tip}</p>
      </div>

      <p className="text-xs text-neutral-400 mb-2">your kit</p>
      {instruments.map((item, i) => (
        <button
          key={item}
          onClick={() => setChecks(checks.map((c, idx) => (idx === i ? !c : c)))}
          className="w-full flex items-center gap-3 py-3 border-b border-white/5 text-left"
        >
          <span className={checks[i] ? 'text-[#f5f5f5] text-sm' : 'text-neutral-600 text-sm line-through'}>{item}</span>
        </button>
      ))}
    </main>
  );
}
