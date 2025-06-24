import { MarkdownEditor } from '../components/markdown-editor';

function App() {
  return (
    <div className="flex flex-col gap-4 w-full h-screen p-2">
      <div className="flex flex-1 border-1 rounded-md">
        <MarkdownEditor />
      </div>
    </div>
  );
}

export default App;
