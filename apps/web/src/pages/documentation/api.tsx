import { FolderLayout } from '../../layouts/folder-layout.tsx';

export function ApiReferencePage() {
  return (
    <FolderLayout title="API Reference">
      <div className="w-full max-w-3xl prose dark:prose-invert">
        <h1>API Reference</h1>
        
        <h2>MarkdownEditor Component</h2>
        <p>The main component for editing markdown content.</p>
        
        <h3>Props</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>initialContent</td>
              <td>string</td>
              <td>''</td>
              <td>Initial markdown content</td>
            </tr>
            <tr>
              <td>onChange</td>
              <td>function</td>
              <td>undefined</td>
              <td>Callback when content changes</td>
            </tr>
            <tr>
              <td>theme</td>
              <td>'light' | 'dark' | 'system'</td>
              <td>'system'</td>
              <td>Editor theme</td>
            </tr>
            <tr>
              <td>showPreview</td>
              <td>boolean</td>
              <td>false</td>
              <td>Show preview pane</td>
            </tr>
          </tbody>
        </table>
        
        <h2>FolderLayout Component</h2>
        <p>Layout component for folder pages.</p>
        
        <h3>Props</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>title</td>
              <td>string</td>
              <td>required</td>
              <td>Page title</td>
            </tr>
            <tr>
              <td>children</td>
              <td>ReactNode</td>
              <td>required</td>
              <td>Page content</td>
            </tr>
            <tr>
              <td>showPreview</td>
              <td>boolean</td>
              <td>false</td>
              <td>Show preview pane</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Utility Functions</h2>
        <p>The library also provides several utility functions for working with markdown:</p>
        
        <ul>
          <li><code>parseMarkdown(content: string): ParsedContent</code> - Parse markdown to structured content</li>
          <li><code>renderToHtml(content: string): string</code> - Convert markdown to HTML</li>
          <li><code>exportToPdf(content: string): Promise&lt;Blob&gt;</code> - Export markdown to PDF</li>
        </ul>
      </div>
    </FolderLayout>
  );
}

export default ApiReferencePage;