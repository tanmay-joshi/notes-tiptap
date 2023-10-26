import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewSpace = () => {
    const {data: session} = useSession()

    const router = useRouter()

    const [showForm, setShowForm] = React.useState(false)

    const [name, setName] = React.useState('')

    const toggleForm = () => {setShowForm(!showForm); console.log(router) }

    const updateSpaceName = (e: any) => setName(e.target.value)

    const createSpace = async (e: any) => {
        e.preventDefault()
        const res = await fetch(`/api/spaces?userid=${session?.user?.email}`, {
            method: 'POST',
            body: JSON.stringify({name:name}),
        })
        const newSpace = await res.json()
        console.log(newSpace)
        toggleForm()
        router.refresh()
    }

    if (showForm) {
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
        } else {
        return (
            <button className='btn btn-neutral' onClick={toggleForm} >New Space </button>
        )
        }
}

export default NewSpace