# Resident - starter kit

This is a Next.js (App Router) starter matching the screens you prototyped:
home, first-year essentials, on-call toolkit, lab values, my work
(logbook + research notebook), book references, and ER quick protocols.

The swipe onboarding isn't included yet on purpose - build it last, once
everything else works (see the build order below).

## What's in here

```
lib/db.ts              -> Neon connection
lib/schema.sql          -> the 3 database tables (run this once in Neon)
lib/data/*.json         -> static reference content (no database needed)
components/Header.tsx   -> home screen header: profile icon + alarm quick-set panel
components/Chip.tsx, HomeRow.tsx -> shared pieces
app/page.tsx             -> home screen
app/essentials/          -> first-year essentials (local state only)
app/oncall/               -> on-call mode toggle + eat/rest timer
app/labs/                  -> lab values, filterable by rotation
app/mywork/                 -> logbook summary + research notes (reads from the API)
app/study/                   -> specialty flashcards, quiz mode + read mode
app/books/                     -> book references list
app/er/                         -> ER quick protocols (crisis-only, by design)
app/api/logbook/route.ts         -> GET summary, POST a new procedure
app/api/research/route.ts         -> GET notes, POST a new note
```

Hospital ETA is intentionally left out of this version, held back for later.
The alarm panel in `Header.tsx` is local-state only (not saved anywhere yet);
see the note in that file for what real notifications would need.

## Setup, step by step

1. **Start the project** (skip if you already have a Next.js app going):
   ```
   npx create-next-app@latest resident --typescript --tailwind --app
   ```
   Then copy every file from this kit into that project, matching the folder
   paths above (they'll overwrite the placeholder files create-next-app makes).

2. **Install the two extra packages this uses:**
   ```
   npm install @neondatabase/serverless lucide-react
   ```

3. **Set up Neon:**
   - Create a project at neon.tech if you haven't already
   - Open the SQL Editor in the Neon dashboard, paste in the contents of
     `lib/schema.sql`, and run it - this creates the 3 tables
   - Copy your connection string from Neon's dashboard (Connection Details)

4. **Set the environment variable:**
   - Locally: copy `.env.example` to `.env.local` and paste your connection
     string in as `DATABASE_URL`
   - On Vercel: Project Settings -> Environment Variables -> add `DATABASE_URL`
     with the same value

5. **Push and deploy:**
   ```
   git add .
   git commit -m "resident starter"
   git push
   ```
   Then import the repo in Vercel (or it'll auto-deploy if it's already linked).
   Every push after this redeploys automatically.

## Build order (do it in this order, not the file order above)

1. Home screen shell - just check the navigation works
2. Essentials, labs, books, study, ER protocols - all static or local-state,
   no database needed yet, good for seeing the whole app come together fast
3. On-call toolkit and the header's alarm panel - both pure client-side,
   nothing to wire up yet
4. Add real auth (NextAuth or Clerk both work fine with Next.js + Vercel) -
   do this *before* the next two steps, since logbook and research notes
   need to know whose data they're saving
5. Wire up the logbook page to actually POST to `/api/logbook` when someone
   taps a procedure (right now `my work` only reads the summary)
6. Same for research notes - add a simple form that POSTs to `/api/research`
7. Swipe onboarding - build this last

## Before this touches real patients or real trainees

`lib/data/labs.json`, `lib/data/protocols.json`, and `lib/data/flashcards.json`
are all placeholders with a `_note` field flagging exactly that. Every range,
protocol step, and quiz answer needs sign-off from an actual clinician before
this ships - wrong content here isn't a bug, it's a safety and credibility issue.
