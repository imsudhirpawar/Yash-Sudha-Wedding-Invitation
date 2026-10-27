# Shared blessings setup

Blessings are stored in Supabase so all visitors can see them. The project uses
Supabase's free tier; create a Supabase project at https://supabase.com if you
do not already have one.

1. In the Supabase project, open **SQL Editor**, paste the contents of
   [`schema.sql`](./schema.sql), and run it.
2. In **Project Settings → API**, copy the project URL and the publishable key
   (or legacy `anon` key). These are intended for browser use; never use a
   `service_role` or secret key in this website.
3. Create a local `.env.local` file in the project root using
   [`.env.example`](../.env.example) as a template, and fill in those two
   values.
4. Set the same `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` variables in
   the website's hosting/build settings, then rebuild and redeploy the site.

The public read/insert policies let guests read and submit blessings without
signing in. Row-level security and database constraints remain enabled.
Supabase Realtime distributes new blessings live; the page also refreshes its
list periodically as a fallback.
