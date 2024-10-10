import { useEffect } from 'react';
import * as fabric from 'fabric';

import { CanvasProvider, useCanvas } from '../context/canvasContext'; 

export const DrawingTrain = () => {
    return (
        <CanvasProvider>
            <Draw/>
        </CanvasProvider>
    )
}

const Draw = () => {

    const canvas = useCanvas();

    useEffect(() => {
        if (canvas) {
            canvas.isDrawingMode = true;
        }
    }, [canvas]);

    return (
        <div>
            
        </div>
    )
}
