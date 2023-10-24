'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'


const Tiptapeditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: "hello write",
        editorProps: {
          attributes: {
            class: 'prose dark:prose-invert w-screen p-4 m-4 rounded-sm border-2 border-slate-600 flex-grow focus:outline-none'
          }
        }
    })
  return (
    <div className='rounded-md my-2 border-2 border-slate-950 flex' >
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptapeditor