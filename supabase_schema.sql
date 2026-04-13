-- 1. Create PROFILES table (extending auth.users)
CREATE TABLE public.profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  phone       TEXT,
  university  TEXT,
  year_of_study TEXT,
  marketing_consent BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create CV_SUBMISSIONS table
CREATE TABLE public.cv_submissions (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  file_path   TEXT NOT NULL,
  file_name   TEXT NOT NULL,
  status      TEXT DEFAULT 'pending',
  feedback    TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at  TIMESTAMPTZ
);

-- 3. Create PAYMENTS table (PayHere integration)
CREATE TABLE public.payments (
  id                  UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payhere_order_id    TEXT UNIQUE NOT NULL,
  payhere_payment_id  TEXT,
  amount              NUMERIC NOT NULL,
  currency            TEXT DEFAULT 'LKR',
  product_type        TEXT NOT NULL,
  status              TEXT DEFAULT 'pending',
  metadata            JSONB,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create MARKETING_LEADS table
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

-- --- SECURITY: ENABLE RLS ---
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketing_leads ENABLE ROW LEVEL SECURITY;

-- --- POLICIES ---

-- Profiles: Users can manage their own profile
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = id);

-- CV Submissions: Users can view their own submissions
CREATE POLICY "Users can view own submissions" ON public.cv_submissions
  FOR SELECT USING (auth.uid() = user_id);

-- CV Submissions: Users can create their own submissions
CREATE POLICY "Users can create own submissions" ON public.cv_submissions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Payments: Users can view their own payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

-- --- AUTOMATION: Server-side Profile Creation ---

-- Function to handle new user signup (triggered from auth.users)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, university, year_of_study, marketing_consent)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'university',
    NEW.raw_user_meta_data->>'year_of_study',
    COALESCE((NEW.raw_user_meta_data->>'marketing_consent')::boolean, true)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- --- AUTOMATION: Lead Capture Trigger ---

-- Function to sync profile to marketing_leads
CREATE OR REPLACE FUNCTION public.handle_new_user_lead()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.marketing_leads (email, full_name, source, tags)
  VALUES (NEW.email, NEW.full_name, 'signup', ARRAY['innovator', NEW.year_of_study])
  ON CONFLICT (email) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to run on every profile creation
CREATE OR REPLACE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_lead();
