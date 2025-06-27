import { SidebarProvider, SidebarTrigger, Label } from '@repo/ui';
import { AppSidebar } from './components/app-sidebar';
import { MarkdownEditor } from './components/markdown-editor';

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col flex-1 gap-2 p-2">
        <div className="flex items-center">
          <SidebarTrigger />
          <Label>Markdown Editor</Label>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-1 border-1 rounded-md py-4 px-2">
            <MarkdownEditor />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
