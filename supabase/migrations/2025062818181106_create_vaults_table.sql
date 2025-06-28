-- Create vaults table
CREATE TABLE IF NOT EXISTS vaults (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE vaults ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Vaults are viewable by owner" 
  ON vaults FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Vaults are insertable by authenticated users" 
  ON vaults FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Vaults are updatable by owner" 
  ON vaults FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Vaults are deletable by owner" 
  ON vaults FOR DELETE 
  USING (auth.uid() = user_id);