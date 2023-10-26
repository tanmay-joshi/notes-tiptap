import React, { useEffect } from 'react'
import Note from './Note'   
import NewNote from './NewNote'
import { useSession } from 'next-auth/react'
import { note } from '@prisma/client'
import Tiptap from './Tiptap'

type Props = {
    spaceid: string
}

const AllNotes = (props:Props) => {

    const [notes, setNotes] = React.useState<note[]>([])
    const {data: session} = useSession()

    useEffect(() => {
        const getAllNotes = async () => {
            const res = await fetch(`/api/notes?userid=${session?.user?.email}&spaceid=${props.spaceid}`)
            const notes = await res.json()
            setNotes(notes)
        }
        getAllNotes()
    },[session, props.spaceid])

  return (
    <div className='flex flex-col content-start items-center gap-4 py-4' >
        <NewNote setnotes={setNotes} spaceid={props.spaceid}/>
        {notes.map((note: note) => (
            <Tiptap key={note.id} note={note} setnotes={setNotes} spaceid={props.spaceid} />
        )
        )}
    </div>
  )
}

export default AllNotes