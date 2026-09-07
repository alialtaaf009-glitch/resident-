-- Run this once in the Neon SQL editor (Neon dashboard -> your project -> SQL Editor)
-- Only the things that are personal / change per user live in the database.
-- Lab values, protocols, and book references stay as JSON files in the repo.

create table if not exists users (
  id serial primary key,
  email text unique not null,
  specialty_match text,
  created_at timestamptz default now()
);

create table if not exists logbook_entries (
  id serial primary key,
  user_id integer references users(id),
  procedure text not null,
  performed_at timestamptz default now(),
  signed_off boolean default false,
  supervisor_name text,
  notes text
);

create table if not exists research_notes (
  id serial primary key,
  user_id integer references users(id),
  topic text not null,
  coauthors text,
  collaborators text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
