'use client'
import { JsonValue } from '@prisma/client/runtime/library'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'

type Props = {
  content: JsonValue
}

const Tiptap = (props:Props) => {
  const datajson = props.content as string;
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: datajson ,
        editorProps: {
          attributes: {
            class: 'prose dark:prose-invert w-screen p-4 m-4 rounded-md border-2 border-slate-600 flex-grow focus:outline-none'
          }
        }
    })
  return (
    <div className='rounded-md border-2 border-slate-950 flex' >
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap