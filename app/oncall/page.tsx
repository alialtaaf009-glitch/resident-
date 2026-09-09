'use client';
import { useState } from 'react';
import { Check, Phone, UserCog, Stethoscope, Building2 } from 'lucide-react';
import { useShift } from '@/lib/shift-context';

// Placeholder - in a real deployment these come from the trust's on-call rota,
// or the user fills them in at the start of each shift.
const onTonight = [
  { role: 'Med reg', icon: <UserCog size={15} /> },
  { role: 'Anaesthetics', icon: <Stethoscope size={15} /> },
  { role: 'Site manager', icon: <Building2 size={15} /> },
];

function Toggle({
  label,
  hint,
  on,
  onChange,
  color,
}: {
  label: string;
  hint: string;
  on: boolean;
  onChange: (v: boolean) => void;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between bg-[#18181b] border border-white/10 rounded-xl px-3 py-3 mb-2">
      <div>
        <p className="text-[13px]">{label}</p>
        <p className="text-[10px] text-neutral-400">{hint}</p>
      </div>
      <button
        onClick={() => onChange(!on)}
        aria-label={`Toggle ${label}`}
        aria-pressed={on}
        className="w-11 h-6 rounded-full relative transition-colors"
        style={{ background: on ? color : 'rgba(255,255,255,0.12)' }}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-black transition-all ${on ? 'left-5' : 'left-0.5'}`}
        />
      </button>
    </div>
  );
}

export default function OnCall() {
  const { onCall, setOnCall, bleepTriage, setBleepTriage, jobs, addJob, completeJob } = useShift();
  const [draft, setDraft] = useState('');
  const [wake, setWake] = useState('');

  function setNap(mins: number) {
    const d = new Date(Date.now() + mins * 60000);
    setWake(d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
  }

  function submit(urgent: boolean) {
    if (!draft.trim()) return;
    addJob(draft.trim(), urgent);
    setDraft('');
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-base font-medium mb-3">On-call toolkit</p>

      <Toggle
        label="On-call mode"
        hint="Shows a dot in the header"
        on={onCall}
        onChange={setOnCall}
        color="#ff5a2e"
      />
      <Toggle
        label="Bleep triage"
        hint="Pulsing dot while active"
        on={bleepTriage}
        onChange={setBleepTriage}
        color="#3b9dff"
      />

      {/* Jobs list */}
      <p className="text-[11px] text-neutral-400 mt-4 mb-2">Jobs</p>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit(false);
        }}
        placeholder="What needs doing?"
        className="w-full bg-[#18181b] border border-white/10 rounded-xl px-3 py-2.5 text-xs mb-2 outline-none focus:border-[#ff5a2e]"
      />
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => submit(true)}
          className="px-3 py-2 rounded-full border border-[#ff5a2e] bg-[#ff5a2e]/10 text-[#ff5a2e] text-[11px]"
        >
          Add urgent
        </button>
        <button
          onClick={() => submit(false)}
          className="px-3 py-2 rounded-full border border-white/10 bg-[#18181b] text-[11px]"
        >
          Add routine
        </button>
      </div>

      {jobs.length === 0 ? (
        <p className="text-[11px] text-neutral-600 mb-4">Nothing outstanding</p>
      ) : (
        <div className="mb-4">
          {/* Urgent jobs sort to the top */}
          {[...jobs]
            .sort((a, b) => Number(b.urgent) - Number(a.urgent))
            .map((job) => (
              <div key={job.id} className="flex items-center gap-2.5 py-2.5 border-b border-white/5">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: job.urgent ? '#ff5a2e' : '#5a5a5e' }}
                />
                <span className="flex-1 text-xs">{job.text}</span>
                <button onClick={() => completeJob(job.id)} aria-label={`Complete ${job.text}`}>
                  <Check size={15} className="text-neutral-600" />
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Eat / rest */}
      <p className="text-[11px] text-neutral-400 mb-2">Eat / rest mode</p>
      <div className="flex gap-2 mb-2">
        {[20, 45, 90].map((m) => (
          <button
            key={m}
            onClick={() => setNap(m)}
            className="px-3 py-2 rounded-full border border-white/10 bg-[#18181b] text-[11px]"
          >
            {m} min
          </button>
        ))}
      </div>
      <p className={`text-[11px] mb-4 ${wake ? 'text-[#ff5a2e]' : 'text-neutral-400'}`}>
        {wake ? `Wake by ${wake}` : 'Pick a length, get a wake-up alarm ready'}
      </p>

      {/* Escalation contacts for this shift */}
      <p className="text-[11px] text-neutral-400 mb-1">On tonight</p>
      {onTonight.map((c) => (
        <div key={c.role} className="flex items-center gap-2.5 py-2.5 border-b border-white/5">
          <span className="text-[#ff5a2e]">{c.icon}</span>
          <span className="flex-1 text-xs">{c.role}</span>
          <Phone size={14} className="text-[#ff5a2e]" />
        </div>
      ))}
      <p className="text-[10px] text-neutral-600 mt-3">
        Add your own numbers at the start of each shift - these are placeholders
      </p>
    </main>
  );
}

