import { note } from '@prisma/client'
import React from 'react'
import Tiptap from './Tiptap'

type Props = {
    note: note
}

const Note = (props:Props) => {
  return (
    <div>
        <h1>{props.note.title}</h1>
        <Tiptap content={props.note.content} />
    </div>
  )
}

export default Note