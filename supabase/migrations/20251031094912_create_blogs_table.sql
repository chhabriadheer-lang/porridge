/*
  # Create blogs table

  1. New Tables
    - `blogs`
      - `id` (uuid, primary key)
      - `title` (text, not null)
      - `body` (text, not null)
      - `category` (text, not null)
      - `created_at` (timestamp, defaults to now)
      - `updated_at` (timestamp, defaults to now)

  2. Security
    - Enable RLS on `blogs` table
    - Add policy for public read access
*/

CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  body text NOT NULL,
  category text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blogs are publicly readable"
  ON blogs
  FOR SELECT
  TO anon, authenticated
  USING (true);