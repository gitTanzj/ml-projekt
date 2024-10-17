import React from 'react'
import { Draw } from './Draw'

export const ImageGame = () => {
  return (
    <div>
        <Draw onSave={() => {console.log('image saved')}}/>
    </div>
  )
}
