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

  return (
    <div>
        <div className='flex gap-4 items-center'>
            <div className='tabs tabs-boxed grow' >
                {allspaces?.map((space, index) => (
                    <a key={index} className={`tab tab-lg ${activeTab === index ? 'tab-active' : ''}`} onClick={() => updateActiveTab(index)}>
                        <span className='tab-content'>{space.name}</span>
                    </a>
                ))}
            </div>
            <button className='tab btn btn-neutral' onClick={toggleNewSpaceForm} >New Space</button>
        </div>
        <div>
            { toggleform ? <NewSpace /> : null }
        </div>
        <div>
           { allspaces ? <AllNotes spaceid={allspaces[activeTab]?.id}/> : <p>loading</p> }
        </div>
    </div>
  )
}

export default SpacesTabs