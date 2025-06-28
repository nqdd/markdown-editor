-- Add vault_id column to folders table
ALTER TABLE folders ADD COLUMN vault_id UUID REFERENCES vaults(id);