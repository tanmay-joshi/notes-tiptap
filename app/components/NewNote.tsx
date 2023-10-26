import React, { use, useEffect } from 'react'
import Tiptap from './Tiptap'
import { Editor, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { title } from 'process'
import { useSession } from 'next-auth/react'
import { note } from '@prisma/client'

type Props = {
  spaceid: string,
  setnotes: React.Dispatch<React.SetStateAction<any>>
}

const NewNote = (props:Props) => {

  const emptynote = {
    id: '',
    title: '',
    content: [{ content: [{ type: 'text', text: '' }] }],
  }

  const [newNote, setNewNote] = React.useState(false)
  const [note, setNote] = React.useState(emptynote)

  const {data: session} = useSession()

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
      editorProps: {
        attributes: {
          class: 'prose dark:prose-invert w-screen p-4 rounded-md flex-grow focus:outline-none'
        }
      }
  })

  const createnote = async () => {
    const res = await fetch(`/api/notes?userid=${session?.user?.email}&spaceid=${props.spaceid}`, {
      body: JSON.stringify({
        content: editor?.getJSON(),
        title: note.title
      }),
      headers:{
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const creatednote = await res.json()
    editor?.commands.clearContent(true)
    await props.setnotes((prev:any)=>[...prev, creatednote])
    await setNote(emptynote)
    await setNewNote(!newNote)
  }

  const discardnewnote = () => {
    setNewNote(!newNote)
    setNote(emptynote)
  }

  return (
    <div>
      {
        newNote ? 
        <div>
          <input value={note.title} onChange={(e)=> setNote({...note ,title: e.target.value }) }/>
          <EditorContent editor={editor} />
          <button onClick={createnote} className='btn btn-ghost btn-xs' >create new note</button>
          <button onClick={discardnewnote} className='btn btn-ghost btn-xs' >Discard</button>
        </div> : 
        <button className='btn btn-neutral' onClick={()=> { setNewNote(!newNote) }} >New Note</button>
      }
    </div>
  )
}

export default NewNote