import { BlockNoteView } from '@blocknote/shadcn';
import { useCreateBlockNote } from '@blocknote/react';
import { useTheme } from '@repo/ui';
import { useMemo } from 'react';

export const MarkdownEditor = () => {
  const { theme } = useTheme();

  const editor = useCreateBlockNote();

  const editorTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return theme;
  }, [theme]);

  const onChange = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    console.log(markdown);
  };

  return (
    <BlockNoteView editor={editor} theme={editorTheme} onChange={onChange} />
  );
};
