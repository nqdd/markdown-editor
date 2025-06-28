import { supabase } from '../utils/supabase';

export interface Folder {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateFolderData {
  name: string;
  parent_id?: string | null;
}

export const folderService = {
  /**
   * Get all folders
   */
  async getAllFolders(): Promise<Folder[]> {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error fetching folders:', error);
      throw error;
    }

    return data as Folder[];
  },

  /**
   * Get folder by ID
   */
  async getFolderById(id: string): Promise<Folder> {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching folder by ID:', error);
      throw error;
    }

    return data as Folder;
  },

  /**
   * Get folders by parent ID
   */
  async getFoldersByParentId(parentId: string | null): Promise<Folder[]> {
    const query = supabase
      .from('folders')
      .select('*')
      .order('name');

    if (parentId) {
      query.eq('parent_id', parentId);
    } else {
      query.is('parent_id', null);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching folders by parent ID:', error);
      throw error;
    }

    return data as Folder[];
  },

  /**
   * Create a new folder
   */
  async createFolder(folderData: CreateFolderData): Promise<Folder> {
    const { data, error } = await supabase
      .from('folders')
      .insert(folderData)
      .select()
      .single();

    if (error) {
      console.error('Error creating folder:', error);
      throw error;
    }

    return data as Folder;
  },

  /**
   * Update a folder
   */
  async updateFolder(id: string, folderData: Partial<CreateFolderData>): Promise<Folder> {
    const { data, error } = await supabase
      .from('folders')
      .update(folderData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating folder:', error);
      throw error;
    }

    return data as Folder;
  },

  /**
   * Delete a folder
   */
  async deleteFolder(id: string): Promise<void> {
    const { error } = await supabase
      .from('folders')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting folder:', error);
      throw error;
    }
  },
};