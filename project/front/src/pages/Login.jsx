import { useRef, useState } from 'react'
import { Link, Navigate } from "react-router-dom";

import { useStateContext } from '../lib/authContext';
import axiosClient from '../lib/axiosClient';
import Button from "../components/Button";

export default function Login() {
  const { setUser, user, setToken } = useStateContext()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const emailRef = useRef()
  const passwordRef = useRef()

  if (user.id) {
    return <Navigate to='/' />
  }

  async function onSubmit(e) {
    e.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    setLoading(true)

    try {
      const { data } = await axiosClient.post('/login', payload)

      setUser(data.user)
      setToken(data.token)
    } catch(err) {
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
    <section className="h-[calc(100vh_-_128px)] flex items-center justify-center">
      <form className="form animeLeft" onSubmit={onSubmit}>
        <header className="border-b-2 border-b-zinc-800 mb-6">
          <h1 className="text-center mb-2">Login 😎✌</h1>
        </header>

        <label className="block mb-4">
          <span>Email:</span>
          <input type="text" placeholder="Email" ref={emailRef} />
        </label>

        <label className="block mb-6">
          <span>Password:</span>
          <input type="password" placeholder="Password" ref={passwordRef} />
          {error && (
            <div className='error'>
              {Object.keys(error).map(key => <p key={key}>{error[key][0]}</p>)}
            </div>
          )}
        </label>

        <Button title='Enter' secondary full loading={loading} />

        <label className="login-info">Do not have an account? <Link to={'/signup'} className="text-indigo-500">Signup here 👈</Link></label>
      </form>
    </section>
  )
}
