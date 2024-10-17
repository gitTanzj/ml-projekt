import React, { useState } from 'react'
import { Draw } from './Draw'
import { io } from 'socket.io-client'
import { useAuth } from '../context/authContext'


export const ImageGame = () => {

  const { currentUser } = useAuth()

  const socket = io('http://localhost:4000');
  const [playersConnected, setPlayersConnected] = useState<number>(0)
  const [connected, setConnected] = useState<boolean>(false)

  socket.on('connect', () => {
    console.log('connected')
  })

  const playGame = async () => {
      if(currentUser){
        socket.emit('play', currentUser.email)
        setConnected(true)
      }
  }

  socket.on('players', (data) => {
    setPlayersConnected(data)
  })

  return (
    <div>
        <div className="flex flex-col items-center justify-center py-4 text-lg text-bold">
          players connected <br/>
          <div>
            {playersConnected} 
          </div>
        </div>
        <div className="flex justify-center">
            <button disabled={connected} onClick={playGame} className="text-md hover:text-white text-center font-medium rounded-xl border-white border-2 p-4 transition hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-md">
              {connected ? 'Waiting for others...' : 'Play'}
            </button>
        </div>
    </div>
  )
}
