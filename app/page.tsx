import { HomeRow } from '@/components/HomeRow';
import { Header } from '@/components/Header';
import { Stethoscope, Phone, FlaskConical, NotebookPen, BookOpen, TriangleAlert, GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <Header />
      <p className="text-sm text-neutral-400">morning, resident</p>
      <p className="text-xl font-medium mb-2">home</p>

      <HomeRow href="/essentials" icon={<Stethoscope size={18} />} title="first-year essentials" subtitle="day one to day ninety" />
      <HomeRow href="/oncall" icon={<Phone size={18} />} title="on-call toolkit" subtitle="on-call mode, eat and rest" />
      <HomeRow href="/labs" icon={<FlaskConical size={18} />} title="lab values" subtitle="filter by rotation" />
      <HomeRow href="/mywork" icon={<NotebookPen size={18} />} title="my work" subtitle="logbook and research notes" />
      <HomeRow href="/study" icon={<GraduationCap size={18} />} title="study" subtitle="specialty flashcards, quiz or read" />
      <HomeRow href="/books" icon={<BookOpen size={18} />} title="book references" subtitle="Oxford handbook and more" />
      <HomeRow href="/er" icon={<TriangleAlert size={18} />} title="ER quick protocols" subtitle="ABCDE, crisis only" />
    </main>
  );
}
