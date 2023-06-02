import { useEffect, useState } from "react"
import { useParams, Navigate } from "react-router-dom"

import { useStateContext } from '../lib/authContext'

import Card from '../components/Card'
import Loader from "../components/Loader"
import axiosClient from "../lib/axiosClient"
import Button from "../components/Button"

export default function UserProfile() {
  const { id } = useParams()
  const { user, token } = useStateContext()
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getUserJobs()
  }, [id])

  function getUserJobs() {
    setLoading(true)

    axiosClient.get(`/users/${id}/jobs`)
      .then(({ data }) => {
        setJobs(data)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }

  const deleteUser = (id) => {
    const doIt = confirm("Are you sure?")
    if (doIt) {
      axiosClient.delete(`/users/${id}`)
        .then(() => location.reload())
    }
  }

  if (!user.id) return <Navigate to={'/login'} />

  if (loading) return (
    <div className='h-[calc(100vh_-_130px)] flex items-center justify-center'>
      <Loader show={loading} />
    </div>
  )

  return (
    <div className="animeLeft">
      <header className="flex items-center justify-between mb-6 bg-white p-4 rounded neo-border">
        <div className="flex items-center gap-2">
          <div className="avatar md">
            <img src="/hacker.png" alt="Hacker" />
          </div>
          <h3>{user.name}</h3>
        </div>

        <Button title='Delete user' ghost onClick={() => deleteUser(id)} />
      </header>

      {error && (
        <div className="error">
          <p>{error}</p>
        </div>
      )}

      {jobs && (
        <div>
          <h2 className="mb-4">Jobs you applied to:</h2>
          <div className="flex flex-col gap-4">
            {jobs.map(j => <Card key={j.id} job={j} user={user} />)}
          </div>
        </div>
      )}
      
    </div>
  )
}
