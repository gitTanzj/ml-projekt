
import { Header } from './Header'
import { Draw } from './Draw'

import { useAuth } from '../context/authContext'


export const Home = () => {
  const { currentUser } = useAuth()

  return (
    <div className="flex min-h-full justify-center items-center">
      <Header/>
      <div className="flex justify w-100">
        <Draw/>
      </div>
    </div>
  )
}
