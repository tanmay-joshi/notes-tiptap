import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

type Props = {
    setspaces: React.Dispatch<React.SetStateAction<any>>,
    toggleform: React.Dispatch<React.SetStateAction<boolean>>
}

const NewSpace = (props:Props) => {
    const {data: session} = useSession()

    const router = useRouter()

    const [name, setName] = React.useState('')

    const updateSpaceName = (e: any) => setName(e.target.value)

    const createSpace = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`/api/spaces?userid=${session?.user?.email}`, {
            method: 'POST',
            body: JSON.stringify({name:name}),
        })
        const newSpace = await res.json()
        // console.log(newSpace)
        props.setspaces((prevSpaces: any) => [...prevSpaces, newSpace])
        props.toggleform(false)
        // router.refresh()
    }
        return (
    <div>
        <h1>New Space</h1>
        <form onSubmit={createSpace} >
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={updateSpaceName} id="name"/>
            <button type='submit' className='btn btn-neutral'>Create Space </button>
        </form>
    </div>
  )
}

export default NewSpace