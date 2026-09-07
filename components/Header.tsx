'use client';
import { useState } from 'react';
import { Bell, User } from 'lucide-react';

// Alarms live in local state for now - see README "build order" for when
// to add a real `alarms` table + push notifications.
const startingAlarms = [
  { label: '6:00 AM \u00b7 weekdays', on: true },
  { label: 'Before ward round \u00b7 7:45 AM', on: false },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [alarms, setAlarms] = useState(startingAlarms);

  function quickSet(label: string) {
    setMessage(`Alarm set for ${label}`);
  }

  function toggleAlarm(i: number) {
    setAlarms(alarms.map((a, idx) => (idx === i ? { ...a, on: !a.on } : a)));
  }

  return (
    <div className="mb-3">
      {/* Three columns of equal width keep the wordmark optically centered
          no matter how wide the icons on either side get. */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center">
        <div />

        <p className="text-xs text-[#ff5a2e] tracking-[0.2em] uppercase">resident</p>

        <div className="flex items-center gap-4 justify-end">
          <button onClick={() => setOpen(!open)} aria-label="Alarms">
            <Bell size={19} className="text-neutral-100" />
          </button>
          <button
            className="w-7 h-7 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center"
            aria-label="Profile"
          >
            <User size={14} className="text-neutral-400" />
          </button>
        </div>
      </div>

      {open && (
        <div className="bg-[#18181b] border border-white/10 rounded-2xl p-3 mt-3">
          <p className="text-xs text-neutral-400 mb-2">Quick alarm</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {['6:00 shift start', 'Match next shift', 'Custom'].map((label) => (
              <button
                key={label}
                onClick={() => quickSet(label)}
                className="px-3 py-2 rounded-full border border-white/10 bg-[#0d0d0f] text-xs text-neutral-100"
              >
                {label}
              </button>
            ))}
          </div>
          {message && <p className="text-xs text-[#ff5a2e] mb-2">{message}</p>}
          {alarms.map((a, i) => (
            <div key={a.label} className="flex items-center justify-between py-2 border-t border-white/5">
              <span className="text-sm text-neutral-100">{a.label}</span>
              <button
                onClick={() => toggleAlarm(i)}
                aria-label={`Toggle ${a.label}`}
                className={`w-9 h-5 rounded-full relative transition-colors ${a.on ? 'bg-[#ff5a2e]' : 'bg-white/10'}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-black transition-all ${a.on ? 'left-4' : 'left-0.5'}`}
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
