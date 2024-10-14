
import { Header } from './Header'
import { Draw } from './Draw'
import { DrawnImages } from './DrawnImages'
import { InsertLabel } from './InsertLabel'

import { useAuth } from '../context/authContext'
import { ImagesProvider } from '../context/imagesContext'
import { LabelProvider } from '../context/labelContext'


export const Home = () => {
  const { currentUser } = useAuth()

  return (
    <ImagesProvider>
      <LabelProvider>
        <div className="flex flex-col min-h-full w-full justify-center items-center">
          <Header/>
          <InsertLabel/>
          <div className="flex justify-center w-full gap-20">
            <DrawnImages/>
            <Draw/>
          </div>
        </div>
      </LabelProvider>
    </ImagesProvider>
  )
}
