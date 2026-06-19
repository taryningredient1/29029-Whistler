-- 29029 Whistler Women's Team App
-- Run this in your Supabase SQL editor

-- Create athletes table
CREATE TABLE IF NOT EXISTS athletes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  photo_url TEXT,
  current_status TEXT DEFAULT 'Sleeping',
  completed_ascents INTEGER DEFAULT 0 CHECK (completed_ascents >= 0 AND completed_ascents <= 8),
  current_ascent INTEGER DEFAULT 1 CHECK (current_ascent >= 1 AND current_ascent <= 8),
  last_updated TIMESTAMPTZ DEFAULT now(),
  starting_soon TEXT CHECK (starting_soon IN ('Starting Now', 'Starting Within 10 Minutes', 'Starting Within 30 Minutes') OR starting_soon IS NULL),
  recovery_water BOOLEAN DEFAULT false,
  recovery_electrolytes BOOLEAN DEFAULT false,
  recovery_fuel BOOLEAN DEFAULT false,
  recovery_bathroom BOOLEAN DEFAULT false,
  recovery_ready BOOLEAN DEFAULT false,
  recovery_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE athletes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read (team board and family view are public within the app)
CREATE POLICY "Allow all reads" ON athletes
  FOR SELECT USING (true);

-- Allow anyone to update (simple app, no user auth)
CREATE POLICY "Allow all updates" ON athletes
  FOR UPDATE USING (true);

-- Allow inserts (for seeding)
CREATE POLICY "Allow all inserts" ON athletes
  FOR INSERT WITH CHECK (true);

-- Enable realtime for live updates
ALTER PUBLICATION supabase_realtime ADD TABLE athletes;
