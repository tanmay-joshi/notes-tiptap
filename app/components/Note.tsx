import { note } from '@prisma/client'
import React from 'react'
import Tiptap from './Tiptap'

type Props = {
    note: note,
    spaceid: string
}

const Note = (props:Props) => {
  return (
    <div className='rounded-md border-2 border-slate-600 p-4'>
      <Tiptap spaceid={props.spaceid} note={props.note}  />
    </div>
  )
}

export default Note