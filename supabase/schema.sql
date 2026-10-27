create table public.blessings (
  id bigint generated always as identity primary key,
  name text not null check (char_length(btrim(name)) between 1 and 100),
  message text not null check (char_length(btrim(message)) between 1 and 2000),
  created_at timestamptz not null default now()
);

create index blessings_created_at_idx on public.blessings (created_at desc);

alter table public.blessings enable row level security;

grant select, insert on public.blessings to anon;

create policy "Anyone can read blessings"
  on public.blessings for select
  to anon
  using (true);

create policy "Anyone can add a blessing"
  on public.blessings for insert
  to anon
  with check (true);

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'blessings'
  ) then
    alter publication supabase_realtime add table public.blessings;
  end if;
end;
$$;
