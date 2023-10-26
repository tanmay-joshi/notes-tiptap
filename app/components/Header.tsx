'use client'
import { SessionProvider, getSession, signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import Profile from './Profile'

const Header = () => {
  const {data: session, status} = useSession()

  const handleSignin = () => {
    if (status === 'authenticated'){
      signOut()
    }
    else if (status === 'unauthenticated'){
      signIn('google')
    }
    else {
      console.log('loading')
    }
    
  }
  // console.log(session)
  return (
        <div className='w-full px-4 py-1 border-2 border-slate-600 rounded-md my-2  flex justify-between items-center'>
            <h1>TipTap Notes</h1>
            <div className='flex items-center' >
              <Profile/>
              <button className='btn btn-ghost btn-xs' onClick={handleSignin} >
              {status === 'authenticated' ? 'Sign out' : 'Sign in'}
            </button>
            </div>
            
        </div>
  )
}

export default Header