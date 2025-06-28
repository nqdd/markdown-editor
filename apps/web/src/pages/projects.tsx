import { MarkdownEditor } from '../components/markdown-editor.tsx';
import { FolderLayout } from '../layouts/folder-layout.tsx';

export function ProjectsPage() {
  return (
    <FolderLayout title="Projects">
      <MarkdownEditor />
    </FolderLayout>
  );
}
