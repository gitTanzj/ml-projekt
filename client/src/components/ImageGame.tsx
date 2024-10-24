import { useState, useEffect, useRef } from 'react'
import { Draw } from './Draw'
import { io, Socket } from 'socket.io-client'
import { useAuth } from '../context/authContext'
import axios from 'axios';

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

  const [waitingPredictions, setWaitingPredictions] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<{label:string, prediction:number}[]>();

  const handleSave = (canvas: HTMLCanvasElement | null) => {
    setWaitingPredictions(true);
    const dataURL = canvas?.toDataURL('image/png');
    const data = new FormData();
    const blob = dataURLToBlob(dataURL as string);
    data.append('image', blob, 'image.png');
    data.append('prompt', 'Nine');
    axios.post('http://localhost:4000/game/evaluate', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then((res: any) => {
        if(res.status === 200){
            let predictions = res.data.data;
            predictions = predictions.map((prediction: any) => {
              return {label: prediction[1], prediction: prediction[2]}
            })
            setPredictions(predictions);
            setWaitingPredictions(false);
        }
    })
    .catch((err) => {
        console.log(err)
        setWaitingPredictions(false);
    })
  } 

  const handleGameEnd = () => {
    setGameOver(true);
    setGameStarted(false);
    if (socketRef.current) {
      socketRef.current.emit('end-game');
    }
  }
 
  return (
    <div>
        {
          !gameStarted && (
            <div>
              <h2 className="text-center text-3xl font-bold text-red-500 py-20">WARNING!!! This game is proper broken and the model is in need of further tweaking</h2>
              <h1 className="text-center text-2xl font-bold">Image Game</h1>
            </div>
          )
        }
        {gameStarted ? (
          <>
            {gameOver ? <div>Game over</div> : 
              <div>
                { waitingPredictions && <div>Waiting for the machine to think...</div> }
                { predictions && (
                  <div className="flex flex-col border-white rounded-md w-full h-100">
                    {predictions.map((predictionObj, _) => (
                      <p>{predictionObj.label}: {Math.floor(predictionObj.prediction * 100)}% certainty</p>
                    ))}
                  </div>
                )}
                <h2 className="text-center p-2 font-bold">Draw this as best as you can! {}</h2>
                <Draw onSave={(canvas) => handleSave(canvas)}/>
                <button onClick={handleGameEnd} className="text-md hover:text-white text-center font-medium rounded-xl border-white border-2 p-4 transition hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-md">
                  End Game
                </button>
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
