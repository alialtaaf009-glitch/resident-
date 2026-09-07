import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/research - list research notes, most recently updated first
export async function GET() {
  const rows = await sql`
    select id, topic, coauthors, collaborators, notes
    from research_notes
    order by updated_at desc
  `;
  return NextResponse.json(rows);
}

// POST /api/research - add a new research note
// body: { userId, topic, coauthors?, collaborators?, notes? }
export async function POST(req: Request) {
  const body = await req.json();
  const rows = await sql`
    insert into research_notes (user_id, topic, coauthors, collaborators, notes)
    values (${body.userId}, ${body.topic}, ${body.coauthors ?? null}, ${body.collaborators ?? null}, ${body.notes ?? null})
    returning *
  `;
  return NextResponse.json(rows[0]);
}
