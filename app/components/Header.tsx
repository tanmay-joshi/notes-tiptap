import React from 'react'

const Header = () => {
  return (
        <div className='w-full p-2 border-2 border-slate-600 rounded-md my-2  flex justify-between items-center'>
            <h1>Your personal space</h1>
            <button className='btn btn-neutral '>Signin</button>
        </div>
  )
}

export default Header