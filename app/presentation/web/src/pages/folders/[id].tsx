import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FolderLayout } from '../../layouts/folder-layout.tsx';
import { MarkdownEditor } from '../../components/markdown-editor.tsx';
import {
  useFolderUseCases,
  type Folder,
} from '../../hooks/useFolderUseCases.ts';

export function FolderPage() {
  const { id } = useParams<{ id: string }>();
  const [folder, setFolder] = useState<Folder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getFolderById } = useFolderUseCases();

  useEffect(() => {
    const loadFolder = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        // Get folder by ID using the folder use case
        const folder = await getFolderById(id);
        setFolder(folder);
      } catch (err) {
        console.error('Error loading folder:', err);
        setError('Failed to load folder');
      } finally {
        setLoading(false);
      }
    };

    loadFolder();
  }, [id, getFolderById]);

  if (loading) {
    return (
      <FolderLayout title="Loading...">
        <div className="flex items-center justify-center h-full">
          <p>Loading folder...</p>
        </div>
      </FolderLayout>
    );
  }

  if (error || !folder) {
    return (
      <FolderLayout title="Error">
        <div className="flex items-center justify-center h-full">
          <p className="text-red-500">{error || 'Folder not found'}</p>
        </div>
      </FolderLayout>
    );
  }

  return (
    <FolderLayout title={folder.name}>
      <MarkdownEditor
        initialContent={`# ${folder.name}\n\nThis is a folder created in the markdown editor.`}
      />
    </FolderLayout>
  );
}

export default FolderPage;
