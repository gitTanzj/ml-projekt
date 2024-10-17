
import { InsertLabel } from './InsertLabel'
import { DrawnImages } from './DrawnImages'
import { Draw } from './Draw'

import { useImages } from '../context/imagesContext'

export const TrainModel = () => {

    const { dispatch } = useImages();
    
  return (
    <>
        <InsertLabel/>
        <div className="flex justify-center w-full gap-20">
            <DrawnImages/>
            <Draw onSave={(canvas: HTMLCanvasElement | null) => {
                if(canvas){
                    dispatch({type: 'ADD_IMAGE', payload: canvas.toDataURL()})
                }
            }}/>
        </div>
    </>
  )
}
