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

    const deleteSpace = async (id:string,index:number) => {
        const res = await fetch(`/api/spaces`, {
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      })
      const deletedSpace = await res.json()
      setAllSpaces(prevspaces => prevspaces?.filter((space:space) => (space.id !== deletedSpace.id)))
      index == 0 ? updateActiveTab(index) : updateActiveTab(index - 1)
      return deletedSpace
    }

  return (
    <div>
        <div className='flex gap-4 items-center'>
            <div className='tabs tabs-boxed grow' >
                {allspaces?.map((space, index) => (
                    <a key={index} className={`tab tab-lg flex gap-2 items-center ${activeTab === index ? 'tab-active' : ''}`} onClick={() => setActiveTab(index)}>
                        { activeTab == index ? <div className="dropdown ">
                            <label tabIndex={0}> ≡ </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a onClick={()=>deleteSpace(allspaces[index].id,index)}>Delete</a></li>
                            </ul>
                            </div> : null }
                        <span className='tab-content'>{space.name}</span>
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