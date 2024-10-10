import { createContext, useContext, useState, useRef, useEffect } from 'react';
import * as fabric from 'fabric';

const CanvasContext = createContext<fabric.Canvas | null>(null);

export function useCanvas() {
    return useContext(CanvasContext);
}

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const options = {
            selection: false,
            backgroundColor: 'white',
            isDrawingMode: true
        };
        const canvasInstance = new fabric.Canvas(canvasRef.current!, options);
        setCanvas(canvasInstance);

        return () => {
            canvasInstance.dispose();
            setCanvas(null);
        };
    }, []);

    return (
        <CanvasContext.Provider value={canvas}>
            <canvas width="300" height="300" ref={canvasRef} className="rounded-md"/>
            {children}
        </CanvasContext.Provider>
    )
};