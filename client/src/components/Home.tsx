import React from 'react'
import { doSignOut } from '../firebase/auth'
import { Header } from './Header'

import { useAuth } from '../context/authContext'

export const Home = () => {
  const { currentUser } = useAuth()

  return (
    <div className="flex min-h-full justify-center">
      <Header/>
      <div className="flex justify">asd</div>
    </div>
  )
}
