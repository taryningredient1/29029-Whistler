-- Seed athlete profiles
-- Run this AFTER schema.sql

INSERT INTO athletes (name, current_status, completed_ascents, current_ascent)
VALUES
  ('Taryn',    'Sleeping', 0, 1),
  ('Eve',      'Sleeping', 0, 1),
  ('Jessica',  'Sleeping', 0, 1),
  ('Liz',      'Sleeping', 0, 1),
  ('Andrea',   'Sleeping', 0, 1),
  ('Greta',    'Sleeping', 0, 1),
  ('Heather',  'Sleeping', 0, 1),
  ('Rebecca',  'Sleeping', 0, 1),
  ('Samantha', 'Sleeping', 0, 1),
  ('Vivian',   'Sleeping', 0, 1)
ON CONFLICT DO NOTHING;
