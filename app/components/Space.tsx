import { space } from '@prisma/client'
import React from 'react'

type Props = {
    space: space
}

const Space = (props:Props) => {
  return (
    <div className='p-4 border-2 border-slate-400 rounded-md ' >
        <h1>{props.space.name}</h1>
        <p>{props.space.id}</p>
    </div>
  )
}

export default Space