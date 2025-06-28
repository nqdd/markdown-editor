-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create document_tags junction table
CREATE TABLE IF NOT EXISTS document_tags (
  document_id UUID REFERENCES documents(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (document_id, tag_id)
);

-- Create RLS policies for tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_tags ENABLE ROW LEVEL SECURITY;

-- Create policies for tags
CREATE POLICY "Tags are viewable by owner" 
  ON tags FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Tags are insertable by authenticated users" 
  ON tags FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Tags are updatable by owner" 
  ON tags FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Tags are deletable by owner" 
  ON tags FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policies for document_tags
CREATE POLICY "Document tags are viewable by document owner" 
  ON document_tags FOR SELECT 
  USING (EXISTS (
    SELECT 1 FROM documents 
    WHERE documents.id = document_tags.document_id 
    AND documents.user_id = auth.uid()
  ));

CREATE POLICY "Document tags are insertable by document owner" 
  ON document_tags FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM documents 
    WHERE documents.id = document_tags.document_id 
    AND documents.user_id = auth.uid()
  ));

CREATE POLICY "Document tags are deletable by document owner" 
  ON document_tags FOR DELETE 
  USING (EXISTS (
    SELECT 1 FROM documents 
    WHERE documents.id = document_tags.document_id 
    AND documents.user_id = auth.uid()
  ));