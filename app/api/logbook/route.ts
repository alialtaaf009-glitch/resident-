import { sql } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET /api/logbook - summary counts for the "my work" screen
export async function GET() {
  const rows = await sql`
    select
      count(*)::int as count,
      count(*) filter (where signed_off = false)::int as pending
    from logbook_entries
  `;
  return NextResponse.json(rows[0] ?? { count: 0, pending: 0 });
}

// POST /api/logbook - log one procedure
// body: { userId, procedure, supervisor?, notes? }
export async function POST(req: Request) {
  const body = await req.json();
  const rows = await sql`
    insert into logbook_entries (user_id, procedure, supervisor_name, notes)
    values (${body.userId}, ${body.procedure}, ${body.supervisor ?? null}, ${body.notes ?? null})
    returning *
  `;
  return NextResponse.json(rows[0]);
}
