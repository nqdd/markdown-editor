-- Create user settings table
CREATE TABLE IF NOT EXISTS user_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'light',
  font_size INTEGER DEFAULT 16,
  line_spacing DECIMAL DEFAULT 1.5,
  auto_save BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "User settings are viewable by owner" 
  ON user_settings FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "User settings are insertable by authenticated users" 
  ON user_settings FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User settings are updatable by owner" 
  ON user_settings FOR UPDATE 
  USING (auth.uid() = user_id);