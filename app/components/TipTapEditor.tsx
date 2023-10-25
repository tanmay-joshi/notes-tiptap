'use client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'


const Tiptapeditor = () => {

  const [title, setTitle] = React.useState('')
  const [newNote, setNewNote] = React.useState(false)
  
  const handleUpdate = (e: any) => {
    setTitle(e.target.value)
  }

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: "hello write",
        editorProps: {
          attributes: {
            class: 'prose dark:prose-invert w-screen p-4 rounded-md border-2 border-slate-600 flex-grow focus:outline-none'
          }
        }
    })
  return (
    <div>
      <button className='btn btn-neutral' onClick={()=>{setNewNote(!newNote)}} >
            {newNote ? 'Close' : 'New Note'}
        </button>
        {newNote ? 
    <div className='rounded-md my-2 p-4 border-2 border-slate-950 flex flex-col p-x2 ' >
      <div>
          <input className='w-1/2' placeholder='' value={title} onChange={handleUpdate} />
          <button>save</button>
      </div>
        <EditorContent editor={editor} />
    </div> : null}
    </div>
  )
}

export default Tiptapeditor