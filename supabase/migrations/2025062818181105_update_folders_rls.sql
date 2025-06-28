-- Drop existing policies
DROP POLICY IF EXISTS "Folders are viewable by everyone" ON folders;
DROP POLICY IF EXISTS "Folders are insertable by everyone" ON folders;
DROP POLICY IF EXISTS "Folders are updatable by everyone" ON folders;
DROP POLICY IF EXISTS "Folders are deletable by everyone" ON folders;

-- Create more restrictive policies
CREATE POLICY "Folders are viewable by owner" 
  ON folders FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Folders are insertable by authenticated users" 
  ON folders FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Folders are updatable by owner" 
  ON folders FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Folders are deletable by owner" 
  ON folders FOR DELETE 
  USING (auth.uid() = user_id);