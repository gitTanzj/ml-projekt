import React, { useState } from 'react'
import { useNavigate, Link, Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth';
import logo from '../assets/icons/android-chrome-192x192.png'

export const RegisterForm = () => {
    const navigate = useNavigate()	

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    
    let passwordMatch = password === confirmPassword

    const { userLoggedIn } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
            .then(() => {
                setIsRegistering(false)
                navigate('/home')
            })
            .catch(error => {
                setIsRegistering(false)
                setErrorMessage(error.message)
            })
        }
    }

    return (
        <div className="flex min-h-50% flex-col justify-center px-6 py-12 lg:px-8 border rounded-lg shadow-xl bg-gray-200">
          {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
          <img src={logo} className="mx-auto h-10 w-auto rounded-lg"/>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm s">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">Loo konto</h2>
          </div>
    
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6 " onSubmit={handleSubmit} >

              <div>
                <label className="block text-sm font-medium leading-6 text-black">Email address</label>
                <div className="mt-2">
                  <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"/>
                </div>
              </div>
    
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-black">Password</label>
                </div>
                <div className="mt-2">
                  <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"/>
                </div>
              </div>

                {}
    
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-black">Confirm password</label>
                </div>
                <div className="mt-2">
                  <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="confirmPassword" name="confirmPassword" type="password" required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white"/>
                </div>
              </div>
    
              {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
              )}

              {!passwordMatch && (<span className='text-red-400 font-bold'>Passwords do not match</span>)}
    
              <div>
                <button disabled={isRegistering || !passwordMatch} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create account</button>
              </div>
            </form>
            <p className="text-center text-sm py-4 text-black">Already have an account? <Link to={'/login'} className="hover:underline font-bold">Log in</Link></p>
          </div>
        </div>
      )
}

