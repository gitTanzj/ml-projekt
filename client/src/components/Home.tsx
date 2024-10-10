
import { Header } from './Header'
import { DrawingTrain } from './DrawingTrain'

import { useAuth } from '../context/authContext'


export const Home = () => {
  const { currentUser } = useAuth()

  return (
    <div className="flex min-h-full justify-center items-center">
      <Header/>
      <div className="flex justify">
        <DrawingTrain/>
      </div>
    </div>
  )
}
