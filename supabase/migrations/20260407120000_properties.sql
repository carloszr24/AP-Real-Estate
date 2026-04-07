-- Tabla de propiedades. Ejecuta el SQL en Supabase → SQL Editor (o supabase db push).

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  price double precision not null,
  location text not null,
  type text not null,
  status text not null default 'disponible',
  description text not null,
  images text not null,
  fotocasa_url text,
  bedrooms integer,
  bathrooms integer,
  sq_meters double precision,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists properties_created_at_idx on public.properties (created_at desc);
create index if not exists properties_featured_idx on public.properties (featured) where featured = true;

alter table public.properties enable row level security;

create policy "properties_select_public"
  on public.properties for select
  to anon, authenticated
  using (true);

-- Escrituras: usa SUPABASE_SERVICE_ROLE_KEY en el servidor (API routes).
