import { useImages } from '../context/imagesContext'
import { useLabel } from '../context/labelContext'
import axios from 'axios';

export const DrawnImages = () => {
    const { images, dispatch } = useImages();
    const { label } = useLabel();

    const handleDelete = (image: string) => {
        dispatch({ type: 'REMOVE_IMAGE', payload: image })
    }

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

    const handleSubmit = () => {
        const formData = new FormData();
        images.forEach((dataURL, index) => {
            const blob = dataURLToBlob(dataURL);
            formData.append('images', blob, `image${index}.png`);
        });
        formData.append('label', label)
        axios.post('http://localhost:4000/train', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            if(res.status === 201){
                alert('Model trained successfully')
                dispatch({ type: 'CLEAR_IMAGES', payload: '' })
            }
        })
        .catch((err) => {
            console.log(err)
        })
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
                    onClick={handleSubmit}
                >
                    {images.length < 5 ? 'At least 5 images needed' : 'Train model'}
                </button>
            </div>
        </div>
    )
}
