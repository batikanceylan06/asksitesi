CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  plan text NOT NULL,
  template_id text NOT NULL,
  addons jsonb NOT NULL DEFAULT '{}'::jsonb,
  content jsonb NOT NULL DEFAULT '{}'::jsonb,
  photo_limit int NOT NULL DEFAULT 3,
  music_url text,
  lock_pin_hash text,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_slug text NOT NULL REFERENCES sites(slug) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('photo','music')),
  url text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_slug text NOT NULL,
  plan text NOT NULL,
  template_id text NOT NULL,
  addons jsonb NOT NULL DEFAULT '{}'::jsonb,
  total_price int NOT NULL,
  payment_status text NOT NULL DEFAULT 'pending',
  provider_ref text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS builder_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_slug text UNIQUE NOT NULL REFERENCES sites(slug) ON DELETE CASCADE,
  token_hash text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
