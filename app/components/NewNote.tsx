import React from 'react'
import Tiptap from './Tiptap'
import { note } from '@prisma/client'

const NewNote = () => {

  const [newNote, setNewNote] = React.useState(false)

  const note = {
    id: '',
    title: '',
    content: {},
  }

  return (
    <div>
      <button className='btn btn-neutral' onClick={()=> { setNewNote(!newNote) }} >
        {newNote ? 'Close' : 'New Note'}
      </button>
      {
        newNote ? <Tiptap newNote content={note.content} id={note.id} title={note.title} /> : null
      }
    </div>
  )
}

export default NewNote