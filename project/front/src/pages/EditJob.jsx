import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

import axiosClient from "../lib/axiosClient"
import Button from '../components/Button'

export default function EditJob() {
    const { id } = useParams()
    const router = useNavigate()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [status, setStatus] = useState(false)
    const [state, setState] = useState({
        title: '',
        type: '',
        description: '',
        status: '',
        salaryRange: '',
        phoneNumber: '',
        country: ''
    })

    function handleForm(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const getData = async () => {
            await axiosClient.get(`/jobs/${id}`)
                .then(({ data }) => {
                    setState({
                        title: data.title,
                        type: data.type,
                        description: data.description,
                        status,
                        salaryRange: data.salaryRange,
                        phoneNumber: data.phoneNumber,
                        country: data.country,
                    })
                })
        }

        getData()
    }, [id])

    const updateJob = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {
            const payload = {
                title: state.title,
                type: state.type,
                description: state.description,
                status: status ? 'OPEN' : 'PAUSED',
                salary_range: state.salaryRange,
                phone_number: state.phoneNumber,
                country: state.country,
            }

            await axiosClient.patch(`/jobs/${id}`, payload)
            router(-1)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <form className="form animeLeft flex flex-col gap-4" onSubmit={updateJob}>
                <header className="border-b-2 border-zinc-800">
                    <h1 className="mb-2">Edit your job infos 📝:</h1>
                </header>

                <label className="block">
                    <span>Title:</span>
                    <input type="text" value={state.title} onChange={handleForm} name="title" />
                </label>

                <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center'>
                    <label className='block'>
                        <span>Country:</span>
                        <input type="text" placeholder='Brazil' name="country" value={state.country} onChange={handleForm} />
                    </label>

                    <label className='block'>
                        <span>Phone Number:</span>
                        <input type="text" placeholder='+5541992352063' name="phoneNumber" value={state.phoneNumber} onChange={handleForm} />
                    </label>
                </div>

                <label className="block">
                    <span>Salary Proposal:</span>
                    <input type="text" value={state.salaryRange} onChange={handleForm} name="salaryRange" />
                </label>

                <div className='flex flex-col sm:flex-row gap-4 sm:items-center'>
                    <select onChange={handleForm} value={state.type} name="type">
                        <option value="PJ">PJ</option>
                        <option value="CLT">CLT</option>
                        <option value="FREELANCE">FREELANCE</option>
                    </select>

                    <div className="flex items-center w-fit gap-1">
                        <input type="checkbox" name="status" checked={status} onChange={(e) => setStatus(e.target.checked)} />
                        <span>Open</span>
                    </div>
                </div>

                <label className="block mb-4">
                    <span>Description:</span>
                    <textarea value={state.description} onChange={handleForm} name="description" />
                    {error && (
                        <div className="error">
                            <p>{error}</p>
                        </div>
                    )}
                </label>

                <Button full title='Save changes' secondary loading={loading} />
            </form>
        </div>
    )
}
