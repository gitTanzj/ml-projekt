import './App.css'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'  
import { Home } from './components/Home'

import { AuthProvider } from "./context/authContext";
import { useRoutes, RouteObject } from "react-router-dom";

import { TrainModel } from './components/TrainModel'
import { ImageGame } from './components/ImageGame'

function App() {
  const routes: RouteObject[] = [
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
      element: <Home/>,
      children: [
        {
          path: "/home/train-model",
          element: <TrainModel/>
        },
        {
          index: true,
          path: "/home/play",
          element: <ImageGame/>
        }
      ]
    }
  ]
  let routesElement = useRoutes(routes);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col justify-center items-center">{routesElement}</div>
    </AuthProvider>
  )
}

export default App
