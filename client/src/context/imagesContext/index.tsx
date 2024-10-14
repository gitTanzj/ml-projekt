import React, { SetStateAction, useContext, useReducer } from 'react';

interface ImagesContextType {
    label: string,
    images: string[],
    dispatch: React.Dispatch<SetStateAction<{type: string, payload: string}>>
}

const ImagesContext = React.createContext<ImagesContextType | undefined>(undefined);

const ImagesReducer = (state: {images: string[], label:string}, action: any) => {
    switch (action.type) {
        case 'ADD_IMAGE':
            return {
                ...state,
                images: [...state.images, action.payload]
            }
        case 'REMOVE_IMAGE':
            return {
                ...state,
                images: state.images.filter((image: string) => image !== action.payload)
            }
        case 'CLEAR_IMAGES':
            return {
                ...state,
                images: []
            }
        default:
            return state;
    }
}

export const ImagesProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(ImagesReducer, { label: "", images: [] });

    return (
        <ImagesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ImagesContext.Provider>
    )
}

export const useImages = () => {
    const context = useContext(ImagesContext);

    if(!context){
        throw new Error('useImages must be used within an ImagesProvider')
    }

    return context;
}
