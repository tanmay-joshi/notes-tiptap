'use client'
import React from 'react'
import AllNotes from './AllNotes'
import AllSpaces from './AllSpaces'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'

const HomeTabs = () => {

  const [activeTab, setActiveTab] = React.useState(0)

  const {status} = useSession()

    const updateActiveTab = (index: number) => {
        setActiveTab(index)
    }
    
    const tabs = [
        {
            name: 'All Notes',
            index: 0
        },
        {
            name: 'All Spaces',
            index: 1
        }
    ]
if(status === 'loading') return (
    <div>
        <h1>Loading...</h1>
    </div>)
else if (status === 'authenticated') {
  return (
    <div>
        <div className="tabs tabs-boxed">
          {tabs.map((tab, index) => (
            <a key={index} className={`tab tab-lg ${activeTab === index ? 'tab-active' : ''}`} onClick={() => updateActiveTab(index)}>
              <span className="tab-content">{tab.name}</span>
            </a>
          )
          )}
        </div>
        <div>
            {activeTab === 0 && <AllNotes/>}
            {activeTab === 1 && <AllSpaces/>}
        </div>
    </div>
  )
  }
  else return (
    <div>
      <button onClick={() => signIn('google')}>sign in with gooogle</button>
    </div>
  )

}

export default HomeTabs