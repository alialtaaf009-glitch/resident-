import type { Metadata } from 'next';
import './globals.css';
import { ShiftProvider } from '@/lib/shift-context';

export const metadata: Metadata = {
  title: 'Resident',
  description: 'The first-year survival kit for new doctors',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <ShiftProvider>{children}</ShiftProvider>
      </body>
    </html>
  );
}
