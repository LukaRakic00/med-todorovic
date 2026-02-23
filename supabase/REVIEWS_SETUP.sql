-- ============================================
-- RECENZIJE – Pokreni u Supabase SQL Editor
-- ============================================

-- 1. Kreiraj tabelu
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- 2. Obriši stare politike ako postoje (za re-run)
DROP POLICY IF EXISTS "Public can view approved reviews" ON public.reviews;
DROP POLICY IF EXISTS "Anyone can submit review" ON public.reviews;
DROP POLICY IF EXISTS "Admins manage reviews" ON public.reviews;

-- 3. RLS politike
CREATE POLICY "Public can view approved reviews" ON public.reviews
FOR SELECT USING (is_approved = true);

CREATE POLICY "Anyone can submit review" ON public.reviews
FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins manage reviews" ON public.reviews
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- 4. Unesi primer recenzija (odobrene) – pokreni samo jednom
INSERT INTO public.reviews (name, location, message, is_approved) VALUES
('Raša Robija', 'Kriva Reka', 'Magični med Todorović mi je pomogao da prebrodim teške dane. Preporučujem svima!', true),
('Milena Selaković', 'Užice', 'Volim da jedem med nekoliko puta dnevno. Veoma mi znači što i vikendom mogu da poručim.', true),
('Vladimir Aleksić', 'Užice', 'Uvek mi je drago da pomognem lokalnim proizvođačima. Volim raznovrsnost ukusa koja se nudi.', true);
