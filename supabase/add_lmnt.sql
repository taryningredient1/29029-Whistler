-- Add LMNT packet tracking columns
-- Run this in Supabase SQL Editor

ALTER TABLE athletes
  ADD COLUMN IF NOT EXISTS lmnt_target INTEGER CHECK (lmnt_target IN (12, 18)),
  ADD COLUMN IF NOT EXISTS lmnt_used INTEGER DEFAULT 0 CHECK (lmnt_used >= 0);
