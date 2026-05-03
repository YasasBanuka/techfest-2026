-- =====================================================
-- TECHFEST 2026 — Supabase Schema (matches live DB)
-- =====================================================

-- 1. PROFILES table
CREATE TABLE public.profiles (
  id                UUID NOT NULL,
  full_name         TEXT NOT NULL,
  email             TEXT NOT NULL,
  phone             TEXT NULL,
  university        TEXT NULL,                              -- For Undergraduates
  year_of_study     TEXT NULL,                             -- For Undergraduates
  school_name       TEXT NULL,                             -- For School Students
  grade             TEXT NULL,                             -- For School Students
  company           TEXT NULL,                             -- For Professionals
  designation       TEXT NULL,                             -- For Professionals
  role              TEXT NULL,                             -- Undergraduate | School Student | Professional
  career_preference TEXT NULL DEFAULT 'Exploring Options',
  marketing_consent BOOLEAN NULL DEFAULT true,
  created_at        TIMESTAMPTZ NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NULL DEFAULT NOW(),
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_email_key UNIQUE (email),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE
) TABLESPACE pg_default;

-- 2. CV_SUBMISSIONS table
CREATE TABLE public.cv_submissions (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path    TEXT NOT NULL,
  file_name    TEXT NOT NULL,
  status       TEXT DEFAULT 'pending',
  feedback     TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at  TIMESTAMPTZ
);

-- 3. PAYMENTS table
CREATE TABLE public.payments (
  id                 UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id            UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payhere_order_id   TEXT UNIQUE NOT NULL,
  payhere_payment_id TEXT,
  amount             NUMERIC NOT NULL,
  currency           TEXT DEFAULT 'LKR',
  product_type       TEXT NOT NULL,
  status             TEXT DEFAULT 'pending',
  metadata           JSONB,
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 4. MARKETING_LEADS table
CREATE TABLE public.marketing_leads (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email           TEXT NOT NULL UNIQUE,
  full_name       TEXT,
  source          TEXT DEFAULT 'signup',
  tags            TEXT[],
  subscribed      BOOLEAN DEFAULT true,
  unsubscribed_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- --- SECURITY ---
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_leads ENABLE ROW LEVEL SECURITY;

-- --- RLS POLICIES ---
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can view own submissions" ON public.cv_submissions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own submissions" ON public.cv_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Function: Create profile row on new user signup
-- Reads all fields from raw_user_meta_data (set during signUp call)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    phone,
    role,
    university,
    year_of_study,
    school_name,
    grade,
    company,
    designation,
    career_preference,
    marketing_consent
  )
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'Undergraduate'),
    NEW.raw_user_meta_data->>'university',
    NEW.raw_user_meta_data->>'year_of_study',
    NEW.raw_user_meta_data->>'school_name',
    NEW.raw_user_meta_data->>'grade',
    NEW.raw_user_meta_data->>'company',
    NEW.raw_user_meta_data->>'designation',
    COALESCE(NEW.raw_user_meta_data->>'career_preference', 'Exploring Options'),
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, true)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fires after every new user is created in auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function: Sync new profile to marketing_leads
CREATE OR REPLACE FUNCTION public.handle_new_user_lead()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.marketing_leads (email, full_name, source, tags)
  VALUES (
    NEW.email,
    NEW.full_name,
    'signup',
    ARRAY[
      COALESCE(NEW.role, 'unknown'),
      COALESCE(NEW.career_preference, 'Exploring Options')
    ]
  )
  ON CONFLICT (email) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fires after every profile row is inserted
CREATE OR REPLACE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_lead();
