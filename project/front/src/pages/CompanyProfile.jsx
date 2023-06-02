import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { useStateContext } from '../lib/authContext'
import axiosClient from '../lib/axiosClient'
import { useAxios } from '../lib/useAxios'

import Avatar from '../components/Avatar'
import Button from '../components/Button'
import Modal from '../components/Modal'
import Loader from '../components/Loader'
import Card from '../components/Card'

export default function CompanyProfile() {
    const { id } = useParams()
    const { user, token } = useStateContext()
    const [modal, setModal] = useState(false)
    const router = useNavigate()

    const { data, error, loading } = useAxios({
        method: 'GET',
        url: `/all-jobs`
    })

    const deleteCompany = (id) => {
        const doIt = confirm("Are you sure?")
        if (doIt) {
            axiosClient.delete(`/users/${id}`)
                .then(() => location.reload())
        }
    }

    if (!token) return <Navigate to={'/login'} />

    if (loading) return (
        <div className='h-[calc(100vh_-_130px)] flex items-center justify-center'>
            <Loader show={loading} />
        </div>
    )

    return (
        <>
            {modal && <Modal setModal={setModal} user={user} />}
            <div className="animeLeft">
                <header className="flex flex-col gap-4 sm:gap-0 p-2 sm:p-4 sm:flex-row items-center justify-between mb-6 bg-white rounded neo-border">
                    <div className="flex items-center gap-2">
                        <div className='avatar md'>
                            <Avatar user={user} />
                        </div>
                        <h3 className='text-sm sm:text-lg'>{user.name}</h3>
                    </div>

                    <div className='flex items-center gap-4'>
                        <Button title='Delete company' ghost onClick={() => deleteCompany(id)} />
                        <Button title='Create job' secondary onClick={() => setModal(true)} />
                    </div>
                </header>

                <div>
                    <h2 className='text-lg mb-2'>Jobs opportunities created by your company:</h2>
                    {data && (
                        <div className='flex flex-col gap-4'>
                            {data.data.filter(j => j.companyName === user.name).map(j => <Card key={j.id} job={j} user={user} />)}
                        </div>
                    )}
                    {data && data.data.length < 1 && <p>You have no jobs created... Change it by hitting the button "Create Job" 😎</p>}
                </div>
            </div>
        </>
    )
}
