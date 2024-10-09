import './App.css'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'  
import { Home } from './components/Home'

import { AuthProvider } from "./context/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = [
    {
      path: "*",
      element: <LoginForm />
    },
    {
      path: "/login",
      element: <LoginForm/>
    },
    {
      path: "/register",
      element: <RegisterForm/>
    },
    {
      path: "/home",
      element: <Home/>
    }
  ]
  let routesElement = useRoutes(routes);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col justify-center">{routesElement}</div>
    </AuthProvider>
  )
}

export default App
