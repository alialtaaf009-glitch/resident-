'use client';
import { useEffect, useState } from 'react';

type LogbookSummary = { count: number; pending: number };
type ResearchNote = { id: number; topic: string; coauthors: string; collaborators: string };

export default function MyWork() {
  const [logbook, setLogbook] = useState<LogbookSummary | null>(null);
  const [notes, setNotes] = useState<ResearchNote[]>([]);

  useEffect(() => {
    fetch('/api/logbook').then((r) => r.json()).then(setLogbook).catch(() => {});
    fetch('/api/research').then((r) => r.json()).then(setNotes).catch(() => {});
  }, []);

  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-lg font-medium mb-4">my work</p>

      <p className="text-xs text-neutral-400 mb-2">logbook</p>
      <div className="flex justify-between py-3 border-b border-white/5 text-sm mb-4">
        <span>{logbook ? `${logbook.count} procedures logged` : 'loading...'}</span>
        <span className="text-[#ff5a2e]">{logbook ? `${logbook.pending} pending sign-off` : ''}</span>
      </div>

      <p className="text-xs text-neutral-400 mb-2">research notebook</p>
      {notes.map((n) => (
        <div key={n.id} className="bg-[#18181b] border border-white/10 rounded-xl p-3 mb-2">
          <p className="text-sm">{n.topic}</p>
          <p className="text-xs text-neutral-400">
            with {n.coauthors} &middot; {n.collaborators}
          </p>
        </div>
      ))}
      {notes.length === 0 && <p className="text-xs text-neutral-600">no research notes yet - add your first from the API route below</p>}
    </main>
  );
}
