import { FolderLayout } from '../layouts/folder-layout.tsx';

export function DocumentationPage() {
  return (
    <FolderLayout title="Documentation">
      <div className="w-full max-w-3xl">
        <h1 className="text-2xl font-bold">Documentation</h1>
        <p className="mt-4">View documentation for using the markdown editor.</p>
        
        <div className="mt-8 space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
            <p>This markdown editor supports standard markdown syntax along with some extended features.</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Create headers with # symbols (# Header 1, ## Header 2)</li>
              <li>Format text with **bold** and *italic*</li>
              <li>Create lists with - or 1. prefixes</li>
              <li>Insert links with [text](url)</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Keyboard Shortcuts</h2>
            <div className="grid grid-cols-2 gap-2">
              <div>Ctrl+B</div><div>Bold text</div>
              <div>Ctrl+I</div><div>Italic text</div>
              <div>Ctrl+K</div><div>Insert link</div>
              <div>Ctrl+Shift+C</div><div>Code block</div>
              <div>Ctrl+Shift+I</div><div>Insert image</div>
            </div>
          </section>
        </div>
      </div>
    </FolderLayout>
  );
}