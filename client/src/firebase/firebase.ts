import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAbGK7oheq2yC578UA7DJOxmVzfPkg2mFw",
    authDomain: "ml-project-5ba39.firebaseapp.com",
    projectId: "ml-project-5ba39",
    storageBucket: "ml-project-5ba39.appspot.com",
    messagingSenderId: "695590022665",
    appId: "1:695590022665:web:6a2c0cba0011898d59d2d8",
    measurementId: "G-QXSSW67V6L"
};
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };