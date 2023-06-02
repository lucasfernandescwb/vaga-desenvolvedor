import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useStateContext } from '../lib/authContext'
import { useAxios } from '../lib/useAxios'
import axiosClient from '../lib/axiosClient'

import Loader from '../components/Loader'
import Tags from '../components/Tags'
import Button from '../components/Button'

export default function Job() {
  const { id } = useParams()
  const { user } = useStateContext()
  const [userJob, setUserJob] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const { data, error, loading } = useAxios({
    method: 'GET',
    url: `/jobs/${id}`
  })

  const getUserJobs = () => {
    axiosClient.get(`/users/${user.id}/jobs`)
      .then(({ data }) => {
        const jobId = data.map(v => v.pivot.job_id).filter(v => v === Number(id))
        if (jobId[0] !== undefined) {
          setUserJob(jobId[0])
        } else {
          setUserJob(0)
        }
      })
  }

  const deleteJob = () => {
    axiosClient.delete(`/jobs/${id}`)
      .then(() => window.history.go(-1))
  }

  const onUnsubscribe = () => {
    setIsLoading(true)

    axiosClient.delete(`/users/${user.id}/jobs/${id}/unsubscribe`)
      .then(() => getUserJobs())
      .finally(() => setIsLoading(false))
  }

  const onSubscribe = () => {
    setIsLoading(true)

    axiosClient.post(`/users/${user.id}/jobs/${id}/subscribe`)
      .then(() => getUserJobs())
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (user.id) {
      getUserJobs()
    }
  }, [user])

  if (loading) return (
    <div className='h-[calc(100vh_-_130px)] flex items-center justify-center'>
      <Loader show={loading} />
    </div>
  )

  return (
    <div className='bg-white neo-border p-4 animeLeft'>
      {error && (
        <div className='error'>
          <p>{error}</p>
        </div>
      )}

      {data && (
        <>
          <header className='mb-4'>
            <div className='flex flex-col-reverse gap-4 sm:flex-row sm:gap-0 sm:items-center sm:justify-between mb-2'>
              <h1 className='border-b-2 border-gray-800 w-fit'>{data.title}</h1>
              {user.name === data.companyName && <Button title='Delete job' secondary onClick={deleteJob} contrast />}
            </div>
            <p className='contrast-item mb-2'>{data.companyName}</p>
            <p className='contrast-item mb-1'>Email: <a className='font-bold text-indigo-400' href={`mailto: ${data.companyEmail}`}>{data.companyEmail}</a></p>
            <p className='contrast-item mb-1'>Located at: <span className='font-bold text-zinc-800'>{data.country}</span></p>
            <p className='contrast-item mb-1'>Phone Number: <span className='font-bold text-zinc-800'>{data.phoneNumber}</span></p>
            <p className='contrast-item mb-1'>Salary Proposal: <span className='font-bold text-zinc-800'>U${data.salaryRange}</span></p>
          </header>

          <div className='flex items-center gap-2 mb-4'>
            <Tags title={data.status} />
            <Tags title={data.type} />
          </div>

          <p className='mb-6'>{data.description}</p>

          <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
            {user.id && user.role !== 'Company' && <Button title={userJob !== 0 ? 'Unsubscribe' : 'Subscribe'} secondary onClick={userJob !== 0 ? onUnsubscribe : onSubscribe} loading={isLoading} contrast={userJob !== 0} />}

            {!user.id && (
              <Link to={'/login'}>
                <Button title='Subscribe' secondary />
              </Link>
            )}

            <p className='my-2 font-medium'>Job created at: <span className='text-zinc-400'>{new Date(data.createdAt).toLocaleDateString()}</span></p>
          </div>
        </>
      )}
    </div>
  )
}
