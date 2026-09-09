'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

// Shift status is shared between the on-call page (where it's toggled) and
// the header (where the status dots appear), so it lives in context rather
// than in either component.
// NOTE: this resets on refresh. Once auth exists, persist it per user so a
// dropped phone or a browser reload doesn't clear an active shift.

type Job = { id: number; text: string; urgent: boolean };

type ShiftState = {
  onCall: boolean;
  setOnCall: (v: boolean) => void;
  bleepTriage: boolean;
  setBleepTriage: (v: boolean) => void;
  jobs: Job[];
  addJob: (text: string, urgent: boolean) => void;
  completeJob: (id: number) => void;
};

const ShiftContext = createContext<ShiftState | null>(null);

export function ShiftProvider({ children }: { children: ReactNode }) {
  const [onCall, setOnCall] = useState(false);
  const [bleepTriage, setBleepTriage] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);

  function addJob(text: string, urgent: boolean) {
    setJobs((prev) => [...prev, { id: Date.now(), text, urgent }]);
  }

  function completeJob(id: number) {
    setJobs((prev) => prev.filter((j) => j.id !== id));
  }

  return (
    <ShiftContext.Provider
      value={{ onCall, setOnCall, bleepTriage, setBleepTriage, jobs, addJob, completeJob }}
    >
      {children}
    </ShiftContext.Provider>
  );
}

export function useShift() {
  const ctx = useContext(ShiftContext);
  if (!ctx) throw new Error('useShift must be used inside ShiftProvider');
  return ctx;
}

