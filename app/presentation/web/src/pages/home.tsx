import { FolderLayout } from '../layouts/folder-layout.tsx';

export function HomePage() {
  return (
    <FolderLayout title="Markdown Editor">
      <div className="flex items-center justify-center w-full h-full">
        No file is open
      </div>
    </FolderLayout>
  );
}
