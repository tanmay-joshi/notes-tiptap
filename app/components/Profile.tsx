import React from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Profile = () => {
    const {data: session, status} = useSession()
if (status === 'authenticated')
  return (
    <div className='flex gap-2 items-center py-2 mx-2' >
         <Image width={32} height={32} src={session?.user?.image as string} alt="profile picture" className=' rounded-md' />
        <h1>{session?.user?.name}</h1>
      </div>
  )
}

export default Profile