// src/components/Toolbar.tsx
'use client'

import {
    FaListUl,
    FaListOl,
    FaAlignLeft,
    FaAlignCenter,
    FaAlignRight
} from 'react-icons/fa'
import { FaLink } from 'react-icons/fa'
import {
    RxFontBold,
    RxFontItalic,
    RxStrikethrough
} from 'react-icons/rx'
import { FaTable } from 'react-icons/fa'
import React from 'react'

interface Props {
    editor: any
}

export default function Toolbar({ editor }: Props) {
    if (!editor) return null

    return (
        <div className="toolbar mb-2 flex flex-wrap gap-1 border-b pb-2">
            <button
                type="button" // ✅ prevent form submit
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
                title="Bold"
            >
                <RxFontBold size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
                title="Italic"
            >
                <RxFontItalic size={18} />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('strike') ? 'bg-gray-200' : ''}`}
                title="Strike Through"
            >
                <RxStrikethrough size={18} />
            </button>

            <button
                type="button"
                onClick={() => {
                    if (editor.isActive('link')) {
                        editor.chain().focus().unsetLink().run()
                        return
                    }
                    const url = window.prompt('Enter the URL')
                    if (!url) return
                    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
                }}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('link') ? 'bg-gray-200' : ''}`}
                title="Insert Link"
            >
                <FaLink />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('paragraph') ? 'bg-gray-200' : ''}`}
                title="Paragraph"
            >
                <span className="text-sm">P</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
                title="Heading 1"
            >
                <span className="text-sm">H1</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}`}
                title="Heading 2"
            >
                <span className="text-sm">H2</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
                title="Bullet List"
            >
                <FaListUl />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-200 ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
                title="Ordered List"
            >
                <FaListOl />
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="p-2 rounded hover:bg-gray-200"
                title="Separator"
            >
                <span>—</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded hover:bg-gray-200"
                title="Undo"
            >
                <span>↩</span>
            </button>

            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded hover:bg-gray-200"
                title="Redo"
            >
                <span>↪</span>
            </button>

            <div className="border-l pl-2 ml-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 2, withHeaderRow: true }).run()}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Insert Table"
                >
                    <FaTable />
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().addColumnBefore().run()}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Add Column Before"
                >
                    <span className="text-sm">+Col</span>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteColumn().run()}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Delete Column"
                >
                    <span className="text-sm">-Col</span>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().addRowBefore().run()}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Add Row Before"
                >
                    <span className="text-sm">+Row</span>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteRow().run()}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Delete Row"
                >
                    <span className="text-sm">-Row</span>
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().deleteTable().run()}
                    className="p-2 rounded hover:bg-gray-200"
                    title="Delete Table"
                >
                    <span className="text-sm">×Table</span>
                </button>

                <div className="border-l pl-2 ml-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (!editor) return;
                            const { state, view } = editor;
                            const { selection } = state;
                            const { $from } = selection;
                            let node = $from.node($from.depth);
                            let depth = $from.depth;
                            while (depth > 0 && node && node.type.name !== 'table') {
                                depth--;
                                node = state.doc.nodeAt($from.before(depth));
                            }
                            if (node && node.type.name === 'table') {
                                const pos = $from.before(depth);
                                const tr = state.tr.setNodeMarkup(pos, null, {
                                    ...node.attrs,
                                    class: 'align-left'
                                });
                                view.dispatch(tr);
                            }
                        }}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Align Table Left"
                    >
                        <FaAlignLeft />
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (!editor) return;
                            const { state, view } = editor;
                            const { selection } = state;
                            const { $from } = selection;
                            let node = $from.node($from.depth);
                            let depth = $from.depth;
                            while (depth > 0 && node && node.type.name !== 'table') {
                                depth--;
                                node = state.doc.nodeAt($from.before(depth));
                            }
                            if (node && node.type.name === 'table') {
                                const pos = $from.before(depth);
                                const tr = state.tr.setNodeMarkup(pos, null, {
                                    ...node.attrs,
                                    class: 'align-center'
                                });
                                view.dispatch(tr);
                            }
                        }}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Align Table Center"
                    >
                        <FaAlignCenter />
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            if (!editor) return;
                            const { state, view } = editor;
                            const { selection } = state;
                            const { $from } = selection;
                            let node = $from.node($from.depth);
                            let depth = $from.depth;
                            while (depth > 0 && node && node.type.name !== 'table') {
                                depth--;
                                node = state.doc.nodeAt($from.before(depth));
                            }
                            if (node && node.type.name === 'table') {
                                const pos = $from.before(depth);
                                const tr = state.tr.setNodeMarkup(pos, null, {
                                    ...node.attrs,
                                    class: 'align-right'
                                });
                                view.dispatch(tr);
                            }
                        }}
                        className="p-2 rounded hover:bg-gray-200"
                        title="Align Table Right"
                    >
                        <FaAlignRight />
                    </button>
                </div>
            </div>
        </div>
    )
}
