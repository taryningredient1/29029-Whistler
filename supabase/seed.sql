-- Seed athlete profiles
-- Run this AFTER schema.sql

INSERT INTO athletes (name, current_status, completed_ascents, current_ascent)
VALUES
  ('Taryn',    'Starting Soon', 0, 1),
  ('Eve',      'Starting Soon', 0, 1),
  ('Jessica',  'Starting Soon', 0, 1),
  ('Liz',      'Starting Soon', 0, 1),
  ('Andrea',   'Starting Soon', 0, 1),
  ('Gretta',   'Starting Soon', 0, 1),
  ('Heather',  'Starting Soon', 0, 1),
  ('Rebecca',  'Starting Soon', 0, 1),
  ('Samantha', 'Starting Soon', 0, 1),
  ('Vivan',    'Starting Soon', 0, 1)
ON CONFLICT DO NOTHING;
