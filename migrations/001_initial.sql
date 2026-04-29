-- Jezdecký klub — přihlašování na závody
-- Spusť v Supabase SQL Editoru (DEV projekt)

-- Tabulka závodů
CREATE TABLE competitions (
  id integer generated always as identity primary key,
  name text not null,
  date date not null,
  location text not null,
  description text,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id)
);

ALTER TABLE competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "competitions_allow_all" ON competitions FOR ALL USING (true) WITH CHECK (true);

-- Tabulka přihlášek
CREATE TABLE registrations (
  id integer generated always as identity primary key,
  competition_id integer references competitions(id) on delete cascade,
  rider_name text not null,
  horse_name text not null,
  category text not null,
  email text not null,
  phone text,
  created_at timestamptz default now(),
  user_id uuid references auth.users(id)
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "registrations_allow_all" ON registrations FOR ALL USING (true) WITH CHECK (true);
