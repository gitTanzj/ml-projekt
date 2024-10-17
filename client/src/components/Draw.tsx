import { useEffect, useState } from 'react';
import { useImages } from '../context/imagesContext';

interface DrawProps {
  onSave: (canvas: HTMLCanvasElement | null) => void;
}

export const Draw: React.FC<DrawProps> = ({ onSave }) => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const { dispatch } = useImages();

    useEffect(() => {
      const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
      const ctx = canvas.getContext('2d');
      if(ctx){
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, [])

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
        const clear = document.getElementById("clear") as HTMLButtonElement;
        const save = document.getElementById("save") as HTMLButtonElement;
        const ctx = canvas.getContext('2d');

        const isCanvasClear = () => {
          if (ctx) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixelBuffer = new Uint32Array(imageData.data.buffer);
        
            // Check if all pixels are white
            const whitePixel = 0xFFFFFFFF;
            return pixelBuffer.every(color => color === whitePixel);
          }
          return true;
        };

        const fillCanvasWithWhite = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        };
    
        // Fill the canvas with white when initialized
        if (ctx && isCanvasClear()) {
          fillCanvasWithWhite(ctx, canvas);
        }
    
        const handleMouseDown = (e: MouseEvent) => {
          setIsDrawing(true);
          if (ctx) {
            ctx.beginPath();
            ctx.lineWidth = 5;
            ctx.strokeStyle = "black";
            ctx.moveTo(e.offsetX, e.offsetY);
          }
        };
    
        const handleMouseMove = (e: MouseEvent) => {
          if (!isDrawing) return;
          if (ctx) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
          }
        };
    
        const handleMouseUp = () => {
          setIsDrawing(false);
          if (ctx) {
            ctx.closePath();
          }
        };

        const handleClear = () => {
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fillCanvasWithWhite(ctx, canvas); // Fill with white after clearing
          }
        };

        const handleSave = () => {
          if(isCanvasClear()){
            alert("Canvas is empty")
          } else {
            onSave(canvas)
            handleClear()
          }
        }


    
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);
        clear.addEventListener('click', handleClear)
        save.addEventListener('click', handleSave)
    
        return () => {
          canvas.removeEventListener('mousedown', handleMouseDown);
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseup', handleMouseUp);
          clear.removeEventListener('click', handleClear)
          save.removeEventListener('click', handleSave)
        };
      }, [isDrawing, dispatch]);

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-white rounded-md">
                <canvas width="300" height="300" id="canvas" className="rounded-md"/>
            </div>
            <button id="clear" className="text-white hover:bg-gray-600 p-2 rounded-md border-2 border-white">Clear</button>
            <button type="submit" id="save" className="bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md">Save</button>
        </div>
    )
}
