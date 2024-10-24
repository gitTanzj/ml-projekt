
import { Header } from './Header'

// import { useAuth } from '../context/authContext'
import { ImagesProvider } from '../context/imagesContext'
import { LabelProvider } from '../context/labelContext'
import { Outlet } from 'react-router-dom';


export const Home = () => {
  // const { currentUser } = useAuth()

  return (
    <ImagesProvider>
      <LabelProvider>
        <div className="flex flex-col min-h-full w-full justify-center items-center">
          <Header/>
          <Outlet/>
        </div>
      </LabelProvider>
    </ImagesProvider>
  )
}
