import { MarkdownEditor } from '../components/markdown-editor.tsx';
import { FolderLayout } from '../layouts/folder-layout.tsx';

export function HomePage() {
  return (
    <FolderLayout title="Markdown Editor">
      <MarkdownEditor />
    </FolderLayout>
  );
}
