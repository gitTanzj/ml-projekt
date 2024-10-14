import { useState } from 'react'
import { useLabel } from '../context/labelContext'

export const InsertLabel = () => {

    const { label, dispatch } = useLabel();

    return (
        <div className="m-5">
            <h2 className="font-bold">
                Today I will be drawing a 
                <input className="rounded-md p-2 m-2" value={label} onChange={(e) => dispatch({
                    type: "SET_LABEL",
                    payload: e.target.value
                })}></input>
            </h2>
        </div>
    )
}
