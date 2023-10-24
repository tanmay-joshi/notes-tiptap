import React, { useEffect } from 'react'
import Space from './Space'

const AllSpaces = () => {

    const [spaces, setSpaces] = React.useState([])

    useEffect(() => {
        const getAllSpaces = async () => {
            const res = await fetch('/api/spaces')
            const spaces = await res.json()
            setSpaces(spaces)
        }
        getAllSpaces()
    }, [])

  return (
    <div className='flex flex-col content-start items-center gap-4 py-4'  >
        <h1>All Spaces</h1>
        <button className='btn btn-neutral'>New Space </button>
        {spaces.map((space: any) => (
            <Space space={space} key={space.id}/>
        )
        )}
    </div>
  )
}

export default AllSpaces