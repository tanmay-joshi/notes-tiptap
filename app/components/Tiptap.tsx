'use client'
import { note } from '@prisma/client'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  spaceid: string,
  note: note,
  setnotes?: React.Dispatch<React.SetStateAction<note[]>>
}

const Tiptap = (props:Props) => {
  const [editable, setEditable] = React.useState(false)
  const [title, setTitle] = React.useState(props.note.title)

  const router = useRouter()

  const updatenotestate = async ()=>{
        await setEditable(false)
        await editor?.setEditable(false)
        router.refresh()
      }

  const {data: session} = useSession()
  const userid = session?.user?.email

  const saveNote = async () => {
        const res = await fetch(`/api/notes?userid=${userid}`, {
        body: JSON.stringify({
          id: props.note.id,
          content: editor?.getJSON(),
          title: title
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT'
      })
      const updatedNote = await res.json().then(updatenotestate)
      return updatedNote
  }

  const deleteNote = async () => {
    const res = await fetch(`/api/notes`, {
      body: JSON.stringify({
        id: props.note.id
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    const deletedNote = await res.json()
    props.setnotes ? props.setnotes((prevnotes:note[]) => prevnotes.filter((note:note) => note.id !== deletedNote.id)) : null
    return deletedNote
  }

  const discardChanges = async () => {
    await setEditable(false)
    await editor?.setEditable(false)
    await setTitle(props.note.title)
    await editor?.commands.setContent(props.note.content as string)
  }

  const editor = useEditor({
      extensions: [
          StarterKit,
      ],
      editable: editable,
      content: props.note.content as string,
      editorProps: {
        attributes: {
          class: 'prose dark:prose-invert w-screen rounded-md focus:outline-none'
        }
      }
  })

  return (
    <div className='p-4 rounded-md flex flex-col items-stretch border border-slate-200 gap-2 ' >
      <div className='flex content-between items-center' >
        <input className='grow' value={title} onChange={(e)=>{setTitle(e.target.value)}} disabled={!editable} />
        <button className='btn btn-ghost btn-xs' onClick={()=>{ if(!editable) {editor?.setEditable(!editable); setEditable(!editable);} else{saveNote()}}} >
          {editable ? 'Save' : 'Edit'}
        </button>
        {
          editable ? <button className='btn btn-ghost btn-xs' onClick={()=>{ if(editable) {discardChanges()}}} >
          Discard
        </button> : null
        }
        <button className='btn btn-ghost btn-xs' onClick={deleteNote} >Delete</button>
      </div>
        <EditorContent editor={editor} />
    </div>
  )
}

export default Tiptap