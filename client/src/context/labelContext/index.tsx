import React, { SetStateAction, useContext, useReducer } from 'react';

interface LabelContextType {
    label: string,
    dispatch: React.Dispatch<SetStateAction<{type: string, payload: string}>>
}

const LabelContext = React.createContext<LabelContextType | undefined>(undefined);

const LabelReducer = (state: {label:string}, action: any) => {
    switch (action.type) {
        case 'SET_LABEL':
            return {
                ...state,
                label: action.payload
            }
        default:
            return state;
    }
}

export const LabelProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(LabelReducer, { label: "" });

    return (
        <LabelContext.Provider value={{ ...state, dispatch }}>
            {children}
        </LabelContext.Provider>
    )
}

export const useLabel = () => {
    const context = useContext(LabelContext);

    if(!context){
        throw new Error('useLabel must be used within an LabelProvider')
    }

    return context;
}