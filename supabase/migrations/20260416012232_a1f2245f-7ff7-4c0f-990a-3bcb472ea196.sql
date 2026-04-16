-- 1. Deny all SELECT on contact table (no one should read via API)
CREATE POLICY "No public read access"
ON public.contact
FOR SELECT
USING (false);

-- 2. Replace the overly permissive INSERT policy with a scoped one
DROP POLICY IF EXISTS "Anyone can insert contact messages" ON public.contact;

CREATE POLICY "Anyone can insert contact messages"
ON public.contact
FOR INSERT
TO anon, authenticated
WITH CHECK (true);