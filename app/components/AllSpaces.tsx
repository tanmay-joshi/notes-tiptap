import React, { useEffect } from 'react'
import Space from './Space'
import { useSession } from 'next-auth/react'
import NewSpace from './NewSpace'

const AllSpaces = () => {

    const [spaces, setSpaces] = React.useState([])
    const {data: session} = useSession()

    useEffect(() => {
        const getAllSpaces = async () => {
            const res = await fetch(`/api/spaces?userid=${session?.user?.email}`)
            const spaces = await res.json()
            setSpaces(spaces)
        }
        getAllSpaces()
    }, [session])

  return (
    <div className='flex flex-col content-start items-center gap-4 py-4'  >
        <h1>All Spaces</h1>
        <NewSpace />
        {spaces.map((space: any) => (
            <Space space={space} key={space.id}/>
        )
        )}
    </div>
  )
}

export default AllSpaces