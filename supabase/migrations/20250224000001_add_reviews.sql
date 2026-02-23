-- Tabela za recenzije (ŠTA KAŽU NAŠI POTROŠAČI)
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  message TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Javno može da vidi samo odobrene recenzije
CREATE POLICY "Public can view approved reviews" ON public.reviews
FOR SELECT USING (is_approved = true);

-- Bilo ko može da ostavi recenziju
CREATE POLICY "Anyone can submit review" ON public.reviews
FOR INSERT WITH CHECK (true);

-- Admin može da odobri, izmeni ili obriše
CREATE POLICY "Admins manage reviews" ON public.reviews
FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
