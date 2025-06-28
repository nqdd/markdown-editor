-- Create folders table
CREATE TABLE IF NOT EXISTS folders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  parent_id UUID REFERENCES folders(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Folders are viewable by everyone" 
  ON folders FOR SELECT 
  USING (true);

CREATE POLICY "Folders are insertable by everyone" 
  ON folders FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Folders are updatable by everyone" 
  ON folders FOR UPDATE 
  USING (true);

CREATE POLICY "Folders are deletable by everyone" 
  ON folders FOR DELETE 
  USING (true);