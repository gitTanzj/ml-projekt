import React from 'react'
import { useNavigate, NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { doSignOut } from '../firebase/auth'



export const Header = () => {

    const navigate = useNavigate()
    const { userLoggedIn, currentUser } = useAuth()

    return (
        <nav className='flex flex-row gap-x-2 w-full z-20 py-4 fixed top-0 left-0 h-20 border-b place-content-center items-center items-around bg-gray-900'>
            {
                userLoggedIn && currentUser
                    ?
                    <>
                        <p className="">you are logged in with {currentUser.email}</p>
                        <button onClick={() => navigate('/home/play')} className="text-md hover:text-white text-center font-medium rounded-xl border-white border-2 px-4 transition hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-md">Play</button>
                        <button onClick={() => navigate('/home/train-model')} className="text-md hover:text-white text-center font-medium rounded-xl border-white border-2 px-4 transition hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-md">Train Model</button>
                        <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='text-md hover:text-white text-center font-medium rounded-xl border-white border-2 px-4 transition hover:border-white hover:text-white hover:-translate-y-1 hover:shadow-md'>Logout</button>
                    </>
                    :
                    <>
                        <Link className='text-sm text-blue-600 underline' to={'/login'}>Login</Link>
                        <Link className='text-sm text-blue-600 underline' to={'/register'}>Register New Account</Link>
                    </>
            }

        </nav>
    )
}
