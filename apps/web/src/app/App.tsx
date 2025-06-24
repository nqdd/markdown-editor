import { MarkdownEditor } from '../components/markdown-editor';
import { Toolbar } from '../components/toolbar';

function App() {
  return (
    <div className="flex-col gap-4 w-full h-screen p-4">
      <Toolbar />
      <MarkdownEditor />
    </div>
  );
}

export default App;
