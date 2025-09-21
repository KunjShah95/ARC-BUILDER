-- Create integrations table for storing user's connected services
create table if not exists public.integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  service_name text not null check (service_name in ('github', 'supabase', 'vercel', 'stripe')),
  is_connected boolean default false,
  config jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, service_name)
);

-- Enable RLS
alter table public.integrations enable row level security;

-- Create policies
create policy "integrations_select_own"
  on public.integrations for select
  using (auth.uid() = user_id);

create policy "integrations_insert_own"
  on public.integrations for insert
  with check (auth.uid() = user_id);

create policy "integrations_update_own"
  on public.integrations for update
  using (auth.uid() = user_id);

create policy "integrations_delete_own"
  on public.integrations for delete
  using (auth.uid() = user_id);
