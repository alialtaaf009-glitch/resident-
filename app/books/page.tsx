import books from '@/lib/data/books.json';

export default function Books() {
  return (
    <main className="min-h-screen bg-black text-white p-6 max-w-sm mx-auto">
      <p className="text-lg font-medium mb-4">book references</p>
      {books.map((b) => (
        <a key={b.title} href={b.url || '#'} className="flex items-center gap-3 py-3 border-b border-white/5">
          <span className="text-sm">{b.title}</span>
        </a>
      ))}
    </main>
  );
}
