import { FolderLayout } from '../layouts/folder-layout.tsx';

export function SettingsPage() {
  return (
    <FolderLayout title="Settings">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Editor</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Show line numbers</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Spell check</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Auto save</span>
                <input type="checkbox" className="toggle" checked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Show preview</span>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Appearance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Dark mode</span>
                <input type="checkbox" className="toggle" />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Font size</span>
                <select className="select select-sm">
                  <option>Small</option>
                  <option selected>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold">Plugins</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Markdown Extensions</span>
                <input type="checkbox" className="toggle" checked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Code Syntax Highlighting</span>
                <input type="checkbox" className="toggle" checked />
              </div>
              <div className="flex items-center justify-between p-3 border rounded-md">
                <span>Math Equations</span>
                <input type="checkbox" className="toggle" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </FolderLayout>
  );
}