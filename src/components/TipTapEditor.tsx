'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableRow } from '@tiptap/extension-table-row'
import Toolbar from './Toolbar'
import { useEffect } from 'react'

interface Props {
  content: string
  onChange: (content: string) => void
}

export default function TipTapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Table.configure({
        resizable: true,
        allowTableNodeSelection: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || '',
    onUpdate: ({ editor, transaction }) => {
      if (!transaction.docChanged) return // only fire when text changes
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, false) // false = do not trigger onUpdate
    }
  }, [content, editor])

  return (
    <div className="tipTapEditor border rounded p-2 bg-white">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
