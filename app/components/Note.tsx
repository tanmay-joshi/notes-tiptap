import { note } from '@prisma/client'
import React from 'react'
import Tiptap from './Tiptap'

type Props = {
    note: note
}

const Note = (props:Props) => {
  return (
    <div className='rounded-md border-2 border-slate-600 p-4'>
      <Tiptap id={props.note.id} content={props.note.content} title={props.note.title} />
    </div>
  )
}

export default Note