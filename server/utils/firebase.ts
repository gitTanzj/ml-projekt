
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyAbGK7oheq2yC578UA7DJOxmVzfPkg2mFw",

  authDomain: "ml-project-5ba39.firebaseapp.com",

  projectId: "ml-project-5ba39",

  storageBucket: "ml-project-5ba39.appspot.com",

  messagingSenderId: "695590022665",

  appId: "1:695590022665:web:6a2c0cba0011898d59d2d8",

  measurementId: "G-QXSSW67V6L"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export { app, analytics }