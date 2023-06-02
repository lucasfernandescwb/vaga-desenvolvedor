import { useRef, useState } from 'react'
import Button from './Button'
import axiosClient from '../lib/axiosClient'

export default function Modal({ setModal, user }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [type, setType] = useState('')

    const titleRef = useRef()
    const descriptionRef = useRef()
    const salaryRef = useRef()
    const countryRef = useRef()
    const phoneNumberRef = useRef()

    function closeModal(event) {
        if (event.target === event.currentTarget) setModal(false)
    }

    async function onSubmit(event) {
        event.preventDefault()

        const payload = {
            title: titleRef.current.value,
            type,
            status: 'OPEN',
            company_name: user.name,
            company_email: user.email,
            phone_number: phoneNumberRef.current.value,
            country: countryRef.current.value,
            salary_range: salaryRef.current.value,
            description: descriptionRef.current.value,
        }

        setLoading(true)

        try {
            await axiosClient.post('/jobs', payload)
            location.reload()
        } catch (err) {
            const response = err.response
            if (response && response.status === 422) {
                if (response.data.errors) {
                    setError(response.data.errors)
                } else {
                    setError({ email: [response.data.message] })
                }
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='w-full h-full backdrop-blur-sm z-20 absolute left-0 top-0 flex items-center justify-center' onClick={closeModal}>
            <div className='w-full sm:w-[400px] neo-border shadow-neo bg-white p-4'>
                <h1 className='mb-6'>Create a new opportunity</h1>

                <form onSubmit={onSubmit}>
                    <label className='block mb-4'>
                        <span>Job title:</span>
                        <input type="text" placeholder='Super Hero Full Time...' ref={titleRef} />
                    </label>

                    <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center mb-4'>
                        <label className='block'>
                            <span>Country:</span>
                            <input type="text" placeholder='Brazil' ref={countryRef} />
                        </label>

                        <label className='block'>
                            <span>Phone Number:</span>
                            <input type="text" placeholder='+5541992352063' ref={phoneNumberRef} />
                        </label>
                    </div>

                    <label className='block mb-2'>
                        <span>Salary Proposal:</span>
                        <input type='text' placeholder='U$3,000.00' ref={salaryRef} />
                    </label>

                    <label className='block mb-2'>
                        <span>Description:</span>
                        <textarea placeholder='We need a super hero, yes, full-time would be great...' ref={descriptionRef} ></textarea>
                    </label>

                    <div className='mb-6'>
                        <span>Type:</span>
                        <div className='flex items-center gap-4' onChange={(e) => setType(e.target.value)}>
                            <div className='flex items-center gap-1'>
                                <input type="radio" name='type' value={'PJ'} />
                                <span>PJ</span>
                            </div>

                            <div className='flex items-center gap-1'>
                                <input type="radio" name='type' value={'CLT'} />
                                <span>CLT</span>
                            </div>

                            <div className='flex items-center gap-1'>
                                <input type="radio" name='type' value={'FREELANCE'} />
                                <span>FREELANCE</span>
                            </div>
                        </div>
                    </div>

                    {error && (
                        <div className='error'>
                            {Object.keys(error).map(key => <p key={key}>{error[key][0]}</p>)}
                        </div>
                    )}

                    <Button title='Create' secondary full loading={loading} />
                </form>
            </div>
        </div>
    )
}
