-- Dodaj DELETE politiku za contact_messages – admin može da briše poruke
CREATE POLICY "Admins can delete messages" ON public.contact_messages
FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
