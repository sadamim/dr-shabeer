'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar'
import { useEffect } from 'react'

interface Props {
  content: string
  onChange: (content: string) => void
}

export default function TipTapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
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
