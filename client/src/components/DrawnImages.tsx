import React from 'react'
import { useImages } from '../context/imagesContext'

export const DrawnImages = () => {
    const { images, dispatch } = useImages();

    const handleDelete = (image: string) => {
        dispatch({ type: 'REMOVE_IMAGE', payload: image })
    }

    return (
        <div className="flex flex-col w-1/2 max-w-1/2 gap-5">
            <div className="grid grid-cols-3 gap-5 h-96 max-h-96 overflow-y-scroll">
                {images.map((image: string, index: number) => (
                <div key={index} className="relative w-full">
                    <button
                    className="absolute right-4 top-2 text-black rounded-full hover:opacity-50 p-2 transition"
                    onClick={() => handleDelete(image)}
                    >
                    <span>&#10006;</span>
                    </button>
                    <img src={image} alt="drawn" className="rounded-md w-full h-auto" />
                </div>
                ))}
            </div>
            <div className="flex justify-center w-full">
                <button
                disabled={images.length < 5}
                className="bg-sky-400 disabled:bg-gray-700 hover:bg-sky-500 text-white p-2 rounded-md w-1/2"
                >
                {images.length < 5 ? 'At least 5 images needed' : 'Train model'}
                </button>
            </div>
        </div>
    )
}
