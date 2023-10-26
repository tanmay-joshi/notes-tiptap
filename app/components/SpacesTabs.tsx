'use client'
import { space } from '@prisma/client'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import AllNotes from './AllNotes'

const SpacesTabs = () => {
    const {data:session } = useSession()

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
        <div className='tabs tabs-boxed' >
            {allspaces?.map((space, index) => (
                <a key={index} className={`tab tab-lg ${activeTab === index ? 'tab-active' : ''}`} onClick={() => updateActiveTab(index)}>
                    <span className='tab-content'>{space.name}</span>
                </a>
            ))}
        </div>
        <div>
           { allspaces ? <AllNotes spaceid={allspaces[activeTab]?.id}/> : <p>loading</p> }
        </div>
    </div>
  )
}

export default SpacesTabs