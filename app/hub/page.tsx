'use client';
import { PageHeader } from '@/components/PageHeader';
import { useState, useEffect } from 'react';
import { ScanLine, Send } from 'lucide-react';

// PLACEHOLDER DATA — connections, usernames and status all need auth plus a
// `connections` table before this screen does anything real.
type Status = 'in' | 'off' | 'pending';
type Person = { id: number; name: string; initials: string; status: Status; detail: string };

const placeholderPeople: Person[] = [
  { id: 1, name: 'Dr Amara O.', initials: 'AO', status: 'in', detail: 'On call \u00b7 Ward 7' },
  { id: 2, name: 'Dr Ben K.', initials: 'BK', status: 'in', detail: 'In hospital' },
  { id: 3, name: 'Dr Priya S.', initials: 'PS', status: 'off', detail: 'Not sharing' },
  { id: 4, name: 'Dr Tom L.', initials: 'TL', status: 'pending', detail: 'Request sent' },
];

// Fake QR made of deterministic blocks. Replace with `qrcode.react` encoding a
// short-lived invite token once users exist.
const qrBlocks = [
  [1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3],
  [6,1],[7,1],[8,1],[6,2],[8,2],[6,3],[7,3],[8,3],
  [1,6],[2,6],[3,6],[1,7],[3,7],[1,8],[2,8],[3,8],
  [5,5],[6,6],[7,5],[8,7],[5,8],[7,8],[6,4],[4,6],[5,2],[2,5],[8,5],[5,7],
];

function StatusDot({ status }: { status: Status }) {
  if (status === 'in') {
    return (
      <span
        className="w-[7px] h-[7px] rounded-full bg-[#4ade80] shrink-0 shift-pulse"
        role="status"
        aria-label="In the hospital"
      />
    );
  }
  return (
    <span
      className={`w-[7px] h-[7px] rounded-full shrink-0 ${status === 'off' ? 'bg-neutral-700' : 'bg-neutral-600'}`}
      role="status"
      aria-label={status === 'off' ? 'Not sharing' : 'Request pending'}
    />
  );
}

export default function Hub() {
  const [tab, setTab] = useState<'people' | 'add'>('people');
  const [sharing, setSharing] = useState(false); // opt-in, never on automatically
  const [username, setUsername] = useState('');
  const [sent, setSent] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(300);

  // Countdown for the rotating invite code. Real version should request a
  // fresh token from the server rather than resetting a local timer.
  useEffect(() => {
    if (tab !== 'add') return;
    const t = setInterval(() => setSecondsLeft((s) => (s <= 1 ? 300 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [tab]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = String(secondsLeft % 60).padStart(2, '0');

  function sendRequest() {
    if (!username.trim()) return;
    // TODO: POST to /api/connections. The other user must accept before
    // either side can see the other's status.
    setSent(`Request sent to ${username.trim().replace(/^@/, '')}`);
    setUsername('');
  }

  function scan() {
    // TODO: needs html5-qrcode plus camera permission. Works on Vercel
    // because it serves over HTTPS.
    alert('Camera scanning is not wired up yet - needs auth and a QR library first.');
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <PageHeader title="Resident hub" />

      <div className="flex border-b border-white/10 mb-4">
        {(['people', 'add'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 text-xs border-b-2 -mb-px transition-colors ${
              tab === t ? 'text-[#ff5a2e] border-[#ff5a2e]' : 'text-neutral-400 border-transparent'
            }`}
          >
            {t === 'people' ? 'People' : 'Add'}
          </button>
        ))}
      </div>

      {tab === 'people' ? (
        <>
          <div className="flex items-center justify-between bg-[#18181b] border border-white/10 rounded-xl px-3 py-3 mb-4">
            <div>
              <p className="text-xs">Share my status</p>
              <p className="text-[10px] text-neutral-400">Only people you have both added</p>
            </div>
            <button
              onClick={() => setSharing(!sharing)}
              aria-label="Toggle status sharing"
              aria-pressed={sharing}
              className={`w-11 h-6 rounded-full relative transition-colors ${sharing ? 'bg-[#ff5a2e]' : 'bg-white/10'}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-black transition-all ${sharing ? 'left-5' : 'left-0.5'}`}
              />
            </button>
          </div>

          {placeholderPeople.map((p) => (
            <div key={p.id} className="flex items-center gap-2.5 py-3 border-b border-white/5">
              <span className="w-8 h-8 rounded-full bg-[#18181b] border border-white/10 flex items-center justify-center text-[10px] text-neutral-400 shrink-0">
                {p.initials}
              </span>
              <div className="flex-1">
                <p className={`text-xs ${p.status === 'pending' ? 'text-neutral-500' : 'text-neutral-100'}`}>
                  {p.name}
                </p>
                <p className="text-[10px] text-neutral-400">{p.detail}</p>
              </div>
              <StatusDot status={p.status} />
            </div>
          ))}

          <p className="text-[10px] text-neutral-600 mt-4">
            Status is what people choose to share, never their location.
          </p>
          <p className="text-[10px] text-neutral-700 mt-2">
            Sample data - real connections need sign-in.
          </p>
        </>
      ) : (
        <>
          <div className="bg-[#18181b] border border-white/10 rounded-2xl p-4 text-center mb-4">
            <svg viewBox="0 0 100 100" className="w-28 h-28 mx-auto" role="img" aria-label="Your invite code">
              <rect width="100" height="100" fill="#f5f5f5" rx="4" />
              {qrBlocks.map(([x, y]) => (
                <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="9" height="9" fill="#0d0d0f" />
              ))}
            </svg>
            <p className="text-[11px] text-neutral-400 mt-2.5">
              Have them scan this. Code refreshes in {mins}:{secs}.
            </p>
          </div>

          <button
            onClick={scan}
            className="w-full bg-[#ff5a2e] text-black rounded-xl py-3 text-[13px] font-medium flex items-center justify-center gap-2 mb-4"
          >
            <ScanLine size={16} />
            Scan someone&apos;s code
          </button>

          <p className="text-[11px] text-neutral-400 mb-2">Or add by username</p>
          <div className="flex gap-2">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
              placeholder="@username"
              className="flex-1 bg-[#18181b] border border-white/10 rounded-xl px-3 py-2.5 text-xs outline-none focus:border-[#ff5a2e]"
            />
            <button
              onClick={sendRequest}
              aria-label="Send request"
              className="bg-[#18181b] border border-white/10 text-[#ff5a2e] rounded-xl px-4 flex items-center"
            >
              <Send size={14} />
            </button>
          </div>

          {sent && <p className="text-[11px] text-[#ff5a2e] mt-2">{sent}</p>}

          <p className="text-[10px] text-neutral-600 mt-3">
            They will get a request to accept before you are connected.
          </p>
        </>
      )}
    </main>
  );
}
