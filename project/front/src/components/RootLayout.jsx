import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"

import Navbar from '../components/Navbar'
import axiosClient from '../lib/axiosClient'
import { useStateContext } from '../lib/authContext'

export default function RootLayout() {
  const { user, token, setUser, setToken } = useStateContext()

  const onLogout = () => {
    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  useEffect(() => {
    if (token) {
      axiosClient.get('/user')
        .then(({ data }) => setUser(data))
    }
  }, [])

  return (
    <main>
      <Navbar user={user} onLogout={onLogout} />
      <section className="wrapper-body">
        <Outlet />
      </section>
    </main>
  )
}
