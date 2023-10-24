'use client'
import React from 'react'
import AllNotes from './AllNotes'
import AllSpaces from './AllSpaces'

const HomeTabs = () => {

    const [activeTab, setActiveTab] = React.useState(0)

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

export default HomeTabs