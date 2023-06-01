import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import axiosClient from "../lib/axiosClient";
import { useStateContext } from "../lib/authContext";
import Button from "../components/Button";

export default function Signup() {
  const { setUser, token, setToken } = useStateContext()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmationRef = useRef()
  const companyRef = useRef()

  if (token) {
    return <Navigate to={'/'} />
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name: usernameRef.current.value,
      email: emailRef.current.value,
      role: companyRef.current.checked ? 'Company' : 'Employee',
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }

    setLoading(true)

    try {
      const { data } = await axiosClient.post('/signup', payload)

      setUser(data.user)
      setToken(data.token)
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
    <section className="h-[calc(100vh_-_128px)] flex items-center justify-center">
      <form className="form animeLeft" onSubmit={onSubmit}>
        <header className="border-b-2 border-b-zinc-800 mb-6">
          <h1 className="text-center mb-2">Signup 😉</h1>
        </header>

        <label className="block mb-4">
          <span>Username/Company Name:</span>
          <input type="text" placeholder="Username / Company Name" ref={usernameRef} />
        </label>

        <label className="block mb-4">
          <span>Email:</span>
          <input type="text" placeholder="Email" ref={emailRef} />
        </label>

        <label className="block mb-4">
          <span>Password:</span>
          <input type="password" placeholder="Password" ref={passwordRef} />
          <small>At least one symbol / uppercase / number</small>
        </label>

        <label className="block mb-4">
          <span>Confirm password:</span>
          <input type="password" placeholder="Confirm password" ref={passwordConfirmationRef} />
        </label>

        <div className="mb-6">
          <div className="flex items-center gap-1">
            <input type="checkbox" className="w-fit" ref={companyRef} />
            <p>Company - If you wish to hire.</p>
          </div>
          {error && (
            <div className='error'>
              {Object.keys(error).map(key => <p key={key}>{error[key][0]}</p>)}
            </div>
          )}
        </div>

        <Button title='Enter' secondary full loading={loading} />

        <label className="login-info">Already have an account? <Link to={'/login'} className="text-indigo-500">Login here 👈</Link></label>
      </form>
    </section>
  )
}
