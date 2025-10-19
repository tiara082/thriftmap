-- Optional seed for demo products (requires an existing auth user id)
-- Replace this with a real UUID from auth.users to own seeded products
-- You can run: select id, email from auth.users; and paste one UUID below

-- DO NOT RUN as-is without setting the seller UUID
-- select 'SET YOUR SELLER UUID HERE'::uuid; -- placeholder

-- Example (uncomment and replace):
-- with s as (
--   select '00000000-0000-0000-0000-000000000000'::uuid as uid
-- )
-- insert into public.products(id, seller_id, title, description, category_id, condition, price_cents, currency, stock, lat, lng)
-- select gen_random_uuid(), s.uid, 'Jaket Denim Vintage', 'Jaket denim preloved gaya klasik',
--        (select id from public.categories where slug='pakaian-pria'), 'good', 8500000, 'IDR', 3, -6.2000, 106.8167 from s;
