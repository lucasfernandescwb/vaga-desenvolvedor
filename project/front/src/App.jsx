import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import RootLayout from './components/RootLayout'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import UserProfile from './pages/UserProfile'
import CompanyProfile from './pages/CompanyProfile'
import EditJob from './pages/EditJob'
import Job from './pages/Job'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/user/:id' element={<UserProfile />} />
      <Route path='/company/:id' element={<CompanyProfile />} />
      <Route path='/edit/job/:id' element={<EditJob />} />
      <Route path='/jobs/:id' element={<Job />} />
    </Route>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}
