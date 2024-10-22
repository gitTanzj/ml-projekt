import React, { useState, useEffect, useRef } from 'react'
import { Draw } from './Draw'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../context/authContext'
import axios from 'axios';
import { useImages } from '../context/imagesContext'

export const ImageGame = () => {

  const { currentUser } = useAuth()
  const [playersConnected, setPlayersConnected] = useState<number>(0)
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [connected, setConnected] = useState<boolean>(false)
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io('http://localhost:4000');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('players-size', (data) => {
      setPlayersConnected(data);
      if (data === 0) {
        setConnected(false);
      }
    });

    socket.on('start-game', () => {
      setGameStarted(true);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const playGame = async () => {
    if (currentUser && socketRef.current) {
      socketRef.current.emit('join-game', currentUser);
      setConnected(true);
    }
  };

  const dataURLToBlob = (dataURL: string) => {
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
  };

  const handleSave = (canvas: HTMLCanvasElement | null) => {
    const dataURL = canvas?.toDataURL('image/png');
    const formData = new FormData();
    const blob = dataURLToBlob(dataURL as string);
    formData.append('image', blob, `image.png`);
    formData.append('prompt', 'Nine');
    axios.post('http://localhost:4000/game/evaluate', {
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((res) => {
        if(res.status === 200){
            alert(res.data)    
        }
    })
    .catch((err) => {
        console.log(err)
    })
  } 

  return (
    <div>
        {gameStarted ? (
          <>
            {gameOver ? <div>Game over</div> : 
              <div>
                <h2>Draw this as best as you can! {}</h2>
                  <Draw onSave={(canvas) => handleSave(canvas)}/>
              </div>
            }
          </>
        ) : (
          <>
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
          </>
        )}
    </div>
  )
}
