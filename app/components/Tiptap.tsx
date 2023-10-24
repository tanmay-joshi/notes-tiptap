'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

const Tiptap = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
        editorProps: {
          attributes: {
            class: 'prose dark:prose-invert w-screen p-4 m-4 rounded-sm border-2 border-slate-600 flex-grow focus:outline-none'
          }
        }
    })
  return (
    <div className='rounded-sm border-2 border-slate-950 flex' >
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap