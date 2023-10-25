import React, { useEffect } from 'react'
import Note from './Note'
import Tiptapeditor from './TipTapEditor'
import NewNote from './NewNote'

const AllNotes = () => {

    const [notes, setNotes] = React.useState([])

    useEffect(() => {
        const getAllNotes = async () => {
            const res = await fetch('/api/notes')
            const notes = await res.json()
            setNotes(notes)
        }
        getAllNotes()
    },[])

  return (
    <div className='flex flex-col content-start items-center gap-4 py-4' >
        <h1>All Notes</h1>
        <NewNote/>
        {notes.map((note: any) => (
            <Note note={note} key={note.id}/>
        )
        )}
    </div>
  )
}

export default AllNotes