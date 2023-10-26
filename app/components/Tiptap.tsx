'use client'
import { note } from '@prisma/client'
import { JsonValue } from '@prisma/client/runtime/library'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
  content: JsonValue,
  id: string,
  title: string,
  spaceid: string,
}

const Tiptap = (props:Props) => {
  const datajson = props.content as string;
  const [editable, setEditable] = React.useState(false)
  // const [initialContent, setInitialContent] = React.useState(datajson)
  const [title, setTitle] = React.useState(props.title)

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
          id: props.id,
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

  const discardChanges = async () => {
    await editor?.commands.setContent(datajson)
    await setEditable(false)
    await editor?.setEditable(false)
    await setTitle(props.title)
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
          class: 'prose dark:prose-invert w-screen p-4 rounded-md flex-grow focus:outline-none'
        }
      }
  })

  const deleteNote = async () => {
      const res = await fetch(`/api/notes`, {
        body: JSON.stringify({
          id: props.id
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      const deletedNote = await res.json()
      return deletedNote
  }

  useEffect(()=>{
    editor?.setEditable(true); setEditable(true); setTitle("Title")}
  ,[editor])

  return (
    <div className='px-2' >
      <div className='flex content-between items-center' >
        <input className='grow' value={title} onChange={(e)=>{setTitle(e.target.value)}} disabled={!editable} />
        <button onClick={()=>{ if(!editable) {editor?.setEditable(!editable); setEditable(!editable);} else{saveNote()}}} >
          {editable ? 'Save' : 'Edit'}
        </button>
        <button onClick={deleteNote} >Delete</button>
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