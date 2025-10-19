-- Supabase schema for ThriftMap
-- Run this in the Supabase SQL editor or via CLI: supabase db reset or psql

-- Enable extensions commonly used
create extension if not exists pgcrypto; -- for gen_random_uuid
create extension if not exists vector; -- optional if you plan to add search vectors later

-- Auth schema is managed by Supabase (auth.users). We'll link to it via user_id UUID.

-- 1) Profiles (user info beyond auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique check (length(username) >= 3),
  full_name text,
  avatar_url text,
  phone text,
  -- Gamification
  exp integer not null default 0,
  level smallint not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.set_current_timestamp_updated_at();

-- Helper function for updated_at
create or replace function public.set_current_timestamp_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 2) Categories
create table if not exists public.categories (
  id bigserial primary key,
  name text not null unique,
  slug text not null unique,
  parent_id bigint references public.categories(id) on delete set null,
  created_at timestamptz default now()
);

-- 3) Products
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category_id bigint references public.categories(id) on delete set null,
  condition text check (condition in ('excellent','good','fair')) default 'good',
  price_cents integer not null check (price_cents >= 0),
  currency char(3) not null default 'IDR',
  stock integer not null default 1 check (stock >= 0),
  lat double precision,
  lng double precision,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  is_active boolean not null default true
);

create trigger products_updated_at
before update on public.products
for each row execute function public.set_current_timestamp_updated_at();

-- 4) Product images
create table if not exists public.product_images (
  id bigserial primary key,
  product_id uuid references public.products(id) on delete cascade,
  url text not null,
  alt text,
  sort_order integer default 0
);

-- 5) Wishlists (per user)
create table if not exists public.wishlists (
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);

-- 6) Carts (server-side cart; optional if you keep localStorage only)
create table if not exists public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.cart_items (
  cart_id uuid references public.carts(id) on delete cascade,
  product_id uuid references public.products(id) on delete restrict,
  qty integer not null check (qty > 0),
  price_cents integer not null check (price_cents >= 0),
  primary key (cart_id, product_id)
);

-- 7) Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  status text not null check (status in ('pending','paid','shipped','delivered','canceled')) default 'pending',
  total_cents integer not null check (total_cents >= 0),
  currency char(3) not null default 'IDR',
  shipping_address jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create trigger orders_updated_at
before update on public.orders
for each row execute function public.set_current_timestamp_updated_at();

create table if not exists public.order_items (
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  title text not null,
  qty integer not null check (qty > 0),
  price_cents integer not null check (price_cents >= 0),
  primary key (order_id, product_id)
);

-- 8) Reviews
create table if not exists public.reviews (
  id bigserial primary key,
  product_id uuid references public.products(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now(),
  unique(product_id, user_id)
);

-- 9) RLS policies
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.wishlists enable row level security;
alter table public.carts enable row level security;
alter table public.cart_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.reviews enable row level security;

-- Public read for products and images
create policy if not exists "Public read products" on public.products
for select using (true);
create policy if not exists "Public read product_images" on public.product_images
for select using (true);
create policy if not exists "Public read categories" on public.categories
for select using (true);

-- Profiles: users can read public profiles and update their own
create policy if not exists "Read profiles" on public.profiles for select using (true);
create policy if not exists "Update own profile" on public.profiles
for update using (auth.uid() = id);

-- Products: only owner can insert/update/delete; everyone can read
create policy if not exists "Insert own product" on public.products
for insert with check (auth.uid() = seller_id);
create policy if not exists "Update own product" on public.products
for update using (auth.uid() = seller_id);
create policy if not exists "Delete own product" on public.products
for delete using (auth.uid() = seller_id);

-- Images: owner only
create policy if not exists "Manage images for own product" on public.product_images
for all using (exists (
  select 1 from public.products p where p.id = product_id and p.seller_id = auth.uid()
)) with check (exists (
  select 1 from public.products p where p.id = product_id and p.seller_id = auth.uid()
));

-- Wishlists: user only
create policy if not exists "Manage own wishlist" on public.wishlists
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Carts & items: user only
create policy if not exists "Manage own carts" on public.carts
for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy if not exists "Manage own cart items" on public.cart_items
for all using (exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()))
with check (exists (select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()));

-- Orders: user only
create policy if not exists "Manage own orders" on public.orders
for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy if not exists "Manage own order items" on public.order_items
for all using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()))
with check (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- Reviews: user can manage own review
create policy if not exists "Manage own reviews" on public.reviews
for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 10) Seed basic categories
insert into public.categories(name, slug) values
  ('Pakaian Wanita','pakaian-wanita') on conflict do nothing;
insert into public.categories(name, slug) values
  ('Pakaian Pria','pakaian-pria') on conflict do nothing;
insert into public.categories(name, slug) values
  ('Anak & Bayi','anak-bayi') on conflict do nothing;
insert into public.categories(name, slug) values
  ('Barang & Peralatan','barang-peralatan') on conflict do nothing;
insert into public.categories(name, slug) values
  ('Aksesoris','aksesoris') on conflict do nothing;
