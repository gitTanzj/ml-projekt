import React from 'react'
import { doSignOut } from '../firebase/auth'
import { Header } from './Header'

export const Home = () => {


  return (
    <div className="flex min-h-full justify-center">
      <Header/>
    </div>
  )
}
