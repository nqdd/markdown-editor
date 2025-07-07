-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  folder_id UUID REFERENCES folders(id),
  user_id UUID REFERENCES auth.users(id),
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Documents are viewable by owner" 
  ON documents FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Documents are insertable by authenticated users" 
  ON documents FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Documents are updatable by owner" 
  ON documents FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Documents are deletable by owner" 
  ON documents FOR DELETE 
  USING (auth.uid() = user_id);