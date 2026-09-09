'use client';
import { useState } from 'react';
import {
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  HeartHandshake, Compass, Briefcase, GraduationCap,
  PhoneCall, Pill, Moon, Scale, MapPin,
  Square, CheckSquare, Dot,
} from 'lucide-react';
import data from '@/lib/data/essentials.json';

type SectionId = 'anxiety' | 'specialty' | 'kit' | 'skills' | 'escalate' | 'prescribe' | 'night' | 'ethics' | 'nobody';

const sections: { id: SectionId; icon: React.ReactNode; title: string; sub: string }[] = [
  { id: 'anxiety', icon: <HeartHandshake size={15} />, title: 'Day one, and the nerves', sub: 'What to actually expect' },
  { id: 'specialty', icon: <Compass size={15} />, title: 'Your first week in...', sub: 'Medicine, surgery, ED, paeds' },
  { id: 'kit', icon: <Briefcase size={15} />, title: 'Daily kit', sub: 'What to have in your pockets' },
  { id: 'skills', icon: <GraduationCap size={15} />, title: 'Skills to get taught', sub: 'Ask a senior, tick it off' },
  { id: 'escalate', icon: <PhoneCall size={15} />, title: 'How to escalate', sub: 'SBAR, and when to call' },
  { id: 'prescribe', icon: <Pill size={15} />, title: 'Prescribing safety', sub: 'The checks that catch errors' },
  { id: 'night', icon: <Moon size={15} />, title: 'First night shift', sub: 'Different rules after dark' },
  { id: 'ethics', icon: <Scale size={15} />, title: 'Consent and capacity', sub: 'Situations, not principles' },
  { id: 'nobody', icon: <MapPin size={15} />, title: 'Things nobody tells you', sub: 'Food, parking, lockers, pay' },
];

// Simple bullet list used by several sections
function Bullets({ items }: { items: string[] }) {
  return (
    <>
      {items.map((line) => (
        <div key={line} className="flex gap-2 py-1">
          <Dot size={14} className="text-[#ff5a2e] shrink-0 mt-0.5" />
          <span className="text-xs text-neutral-100">{line}</span>
        </div>
      ))}
    </>
  );
}

// Tickable checklist - state lives in the parent so it survives collapsing
function Checklist({
  items,
  checked,
  onToggle,
  hint,
}: {
  items: string[];
  checked: boolean[];
  onToggle: (i: number) => void;
  hint?: string;
}) {
  return (
    <>
      {hint && <p className="text-[11px] text-neutral-400 mb-2">{hint}</p>}
      {items.map((item, i) => (
        <button key={item} onClick={() => onToggle(i)} className="flex items-center gap-2 py-1.5 w-full text-left">
          {checked[i] ? (
            <CheckSquare size={15} className="text-[#ff5a2e] shrink-0" />
          ) : (
            <Square size={15} className="text-neutral-600 shrink-0" />
          )}
          <span className={`text-xs ${checked[i] ? 'text-neutral-100' : 'text-neutral-500'}`}>{item}</span>
        </button>
      ))}
    </>
  );
}

export default function Essentials() {
  const [day, setDay] = useState(1);
  const [open, setOpen] = useState<SectionId | null>(null);
  // TODO: persist these to the database once auth exists, so ticks survive a reinstall
  const [kitChecked, setKitChecked] = useState(data.kit.map(() => false));
  const [skillsChecked, setSkillsChecked] = useState(data.skills.map(() => false));
  const [spec, setSpec] = useState<keyof typeof data.specialties>('Medicine');

  const tip = data.tips[(day - 1) % data.tips.length];

  function toggle(list: boolean[], setter: (v: boolean[]) => void, i: number) {
    setter(list.map((v, idx) => (idx === i ? !v : v)));
  }

  function renderBody(id: SectionId) {
    switch (id) {
      case 'kit':
        return (
          <Checklist
            items={data.kit}
            checked={kitChecked}
            onToggle={(i) => toggle(kitChecked, setKitChecked, i)}
          />
        );
      case 'skills':
        return (
          <Checklist
            items={data.skills}
            checked={skillsChecked}
            onToggle={(i) => toggle(skillsChecked, setSkillsChecked, i)}
            hint="Tick when a senior has walked you through it"
          />
        );
      case 'escalate':
        return (
          <>
            {data.sbar.map((line, i) => (
              <div key={line} className="flex gap-2 py-1">
                <span className="text-[11px] text-[#ff5a2e] shrink-0">{i + 1}</span>
                <span className="text-xs text-neutral-100">{line}</span>
              </div>
            ))}
            <p className="text-[11px] text-neutral-400 mt-2">
              If you are wondering whether to call, that is the answer. Call.
            </p>
          </>
        );
      case 'specialty':
        return (
          <>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {(Object.keys(data.specialties) as (keyof typeof data.specialties)[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSpec(s)}
                  className={`px-3 py-1.5 rounded-full border text-[11px] ${
                    s === spec
                      ? 'border-[#ff5a2e] bg-[#ff5a2e]/10 text-[#ff5a2e]'
                      : 'border-white/10 bg-[#18181b] text-neutral-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <p className="text-xs text-neutral-100 leading-relaxed">{data.specialties[spec]}</p>
          </>
        );
      case 'anxiety':
        return (
          <p className="text-xs text-neutral-100 leading-relaxed">
            The first weeks feel like everyone else got a manual you did not. They did not. Ask
            questions early and often - that is what the first year is for. Use the day counter above
            for a reminder each shift.
          </p>
        );
      case 'prescribe':
        return <Bullets items={data.prescribing} />;
      case 'night':
        return <Bullets items={data.night} />;
      case 'ethics':
        return <Bullets items={data.ethics} />;
      case 'nobody':
        return <Bullets items={data.nobody} />;
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-base font-medium mb-3">First-year essentials</p>

      {/* Day counter with a rotating reassurance line */}
      <div className="bg-[#18181b] border border-white/10 rounded-2xl p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setDay(Math.max(1, day - 1))} aria-label="Previous day">
            <ChevronLeft size={15} className="text-neutral-400" />
          </button>
          <span className="text-[11px] text-neutral-400">Day {day} of 90</span>
          <button onClick={() => setDay(day + 1)} aria-label="Next day">
            <ChevronRight size={15} className="text-neutral-400" />
          </button>
        </div>
        <p className="text-xs text-center leading-relaxed">{tip}</p>
      </div>

      {sections.map((s) => (
        <div key={s.id}>
          <button
            onClick={() => setOpen(open === s.id ? null : s.id)}
            className="flex items-center gap-3 py-3 border-b border-white/5 w-full text-left"
          >
            <span className="w-8 h-8 rounded-full bg-[#ff5a2e]/10 text-[#ff5a2e] flex items-center justify-center shrink-0">
              {s.icon}
            </span>
            <span className="flex-1">
              <span className="block text-[13px] font-medium">{s.title}</span>
              <span className="block text-[11px] text-neutral-400">{s.sub}</span>
            </span>
            {open === s.id ? (
              <ChevronUp size={14} className="text-neutral-600" />
            ) : (
              <ChevronDown size={14} className="text-neutral-600" />
            )}
          </button>

          {open === s.id && <div className="pl-11 pr-1 pt-2 pb-3">{renderBody(s.id)}</div>}
        </div>
      ))}
    </main>
  );
}
