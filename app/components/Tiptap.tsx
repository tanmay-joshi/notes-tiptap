'use client'
import { JsonValue } from '@prisma/client/runtime/library'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  content: JsonValue,
  id: string,
  title: string
}

const Tiptap = (props:Props) => {
  const datajson = props.content as string;
  const [editable, setEditable] = React.useState(false)
  const [initialContent, setInitialContent] = React.useState(datajson)

  const router = useRouter()

  const saveNote = async () => {
    const res = await fetch('/api/notes', {
      body: JSON.stringify({
        id: props.id,
        content: editor?.getJSON(),
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
    const newNote = await res.json().then(()=>{
      setEditable(false)
      editor?.setEditable(false)
      router.refresh()
    })
    return newNote
  }

  const discardChanges = async () => {
    await editor?.commands.setContent(initialContent)
    await setEditable(false)
    await editor?.setEditable(false)
    console.log('Discarded', editable)
  }

  const editor = useEditor({
      extensions: [
          StarterKit,
      ],
      editable: editable,
      content: datajson ,
      editorProps: {
        attributes: {
          class: 'prose dark:prose-invert w-screen p-4 rounded-md border-2 border-slate-600 flex-grow focus:outline-none'
        }
      }
  })
  return (
    <div className='px-2' >
      <div className='flex content-between items-center' >
        <p className='grow'>{props.title}</p>
        <button onClick={()=>{ if(!editable) {editor?.setEditable(!editable); setEditable(!editable);} else{saveNote()}}} >
          {editable ? 'Save' : 'Edit'}
        </button>
        {
          editable ? <button onClick={()=>{ if(editable) {discardChanges()}}} >
          Discard
        </button> : null
        }
      </div>
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap