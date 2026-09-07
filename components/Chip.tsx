export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#ff5a2e]/10 text-[#ff5a2e] flex-shrink-0">
      {children}
    </div>
  );
}
