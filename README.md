# 29029 Whistler Women's Team App

A private, mobile-first team tracking app for 10 women doing 29029 Whistler.

## Setup (5 steps)

### 1. Create a Supabase project
1. Go to [supabase.com](https://supabase.com) → New project
2. Name it `29029-whistler` (or anything you like)
3. Choose a region close to you
4. Wait for it to spin up (~1 min)

### 2. Set up the database
1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New query**
3. Open the file `supabase/schema.sql` from this folder in a text editor, select all the text, and paste it into the SQL Editor
4. Click **Run** (or press Cmd+Enter) — you should see "Success"
5. Click **New query** again, then do the same with `supabase/seed.sql` to create the 10 athlete profiles

### 3. Add your environment variables
1. In Supabase → **Settings** → **API**
2. Copy your **Project URL** and **anon public** key
3. In this folder, create a file called `.env`:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run locally
```bash
npm install
npm run dev
```
Then open `http://localhost:5173` on your phone (or use the network URL shown in the terminal).

### 5. Deploy (Vercel — recommended)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import project → select your repo
3. Add the two environment variables from step 3
4. Deploy → you'll get a URL like `https://29029-whistler.vercel.app`

**Share the URL with all 10 athletes.** Each person opens it on their phone, taps their name, and they're set.

**Family view URL:** `https://your-app-url.vercel.app/family` — share this with family members for read-only access.

---

## How it works

- **Team tab** — see everyone's current status, sorted by urgency
- **Me tab** — your personal dashboard
- **Status tab** — one-tap status update
- **Recovery tab** — post-ascent checklist
- **Family tab / `/family` URL** — read-only view for family members

## Adding athlete photos
In Supabase → Table Editor → athletes → update the `photo_url` column for each athlete with a public image URL (Google Drive, Dropbox public link, or upload to Supabase Storage).

## Tech stack
- React + Vite
- Tailwind CSS
- Supabase (Postgres + Realtime)
- Deployed on Vercel
