'use client'
import { space } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import AllNotes from './AllNotes'
import NewSpace from './NewSpace'

const SpacesTabs = () => {
    const {data:session } = useSession()

    const [toggleform, setToggleForm] = React.useState(false)
    const toggleNewSpaceForm = () => {
        setToggleForm(!toggleform)
    }

    const [activeTab, setActiveTab] = React.useState(0)
    const updateActiveTab = (index: number) => {
        setActiveTab(index)
    }

    const [allspaces, setAllSpaces] = React.useState<space[]>()

    useEffect(() => {
        const getAllSpaces = async () => {
        const res = await fetch(`/api/spaces?userid=${session?.user?.email}`)
        const data = await res.json()
        setAllSpaces(data)
    }
        getAllSpaces()
    }, [session])

    const deleteSpace = async (index:string) => {
        const res = await fetch(`/api/spaces`, {
        body: JSON.stringify({
          id: index
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      const deletedSpace = await res.json()
      setAllSpaces(prevspaces => prevspaces?.filter((space:space) => (space.id !== deletedSpace.id)))
      return deletedSpace
    }

  return (
    <div>
        <div className='flex gap-4 items-center'>
            <div className='tabs tabs-boxed grow' >
                {allspaces?.map((space, index) => (
                    <a key={index} className={`tab tab-lg flex gap-2 items-center ${activeTab === index ? 'tab-active' : ''}`} onClick={() => updateActiveTab(index)}>
                        <span className='tab-content'>{space.name}</span>
                        { activeTab === index ? <span className='tab-close' onClick={()=>deleteSpace(allspaces[index].id)}>x</span> : null}
                    </a>
                ))}
            </div>
            <button className='tab btn btn-ghost btn-xs' onClick={toggleNewSpaceForm} >New Space</button>
        </div>
        <div>
            { toggleform ? <NewSpace setspaces={setAllSpaces} toggleform={setToggleForm} /> : null }
        </div>
        <div>
           { allspaces ? <AllNotes spaceid={allspaces[activeTab]?.id}/> : <p>loading</p> }
        </div>
    </div>
  )
}

export default SpacesTabs