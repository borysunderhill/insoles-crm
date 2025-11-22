-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- CLIENTS Table
create table public.clients (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  phone text not null,
  email text,
  notes text,
  -- Ensure phone is unique to avoid duplicates
  constraint clients_phone_key unique (phone)
);

-- APPOINTMENTS Table
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references public.clients(id),
  start_time timestamp with time zone not null,
  end_time timestamp with time zone not null,
  status text default 'scheduled' check (status in ('scheduled', 'completed', 'cancelled', 'no_show')),
  notes text
);

-- ORDERS Table
create table public.orders (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  client_id uuid references public.clients(id) not null,
  status text default 'new' check (status in ('new', 'paid', 'in_production', 'shipped', 'ready_for_pickup', 'completed')),
  total_amount numeric(10, 2) not null,
  paid_amount numeric(10, 2) default 0,
  description text
);

-- Enable Row Level Security (RLS)
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.orders enable row level security;

-- Create policies (For now, allow public read/write for learning purposes, later we lock it down)
create policy "Allow public access to clients" on public.clients for all using (true);
create policy "Allow public access to appointments" on public.appointments for all using (true);
create policy "Allow public access to orders" on public.orders for all using (true);
