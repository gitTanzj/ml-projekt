import { useEffect, useState } from 'react';

export const Draw = () => {
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    useEffect(() => {
        const canvas: HTMLCanvasElement | null = document.getElementById("canvas") as HTMLCanvasElement;
        const clear = document.getElementById("clear") as HTMLButtonElement;
        const save = document.getElementById("save") as HTMLButtonElement;
        const ctx = canvas.getContext('2d');
    
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
            }
        };

        const handleSave = () => {
          let data = canvas.toDataURL('image/png');
          // POST REQUEST TO SERVER
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
      }, [isDrawing]);

    return (
        <div className="flex flex-col gap-3">
            <div className="bg-white rounded-md">
                <canvas id="canvas"/>
            </div>
            <button id="clear" className="text-white hover:bg-gray-600 p-2 rounded-md border-2 border-white">Clear</button>
            <button type="submit" id="save" className="bg-sky-400 hover:bg-sky-500 text-white p-2 rounded-md">Save</button>
        </div>
    )
}
