// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0g856EECC9-boYW7QI5onEwmMpPHKBgw',
  authDomain: 'netflix-clone-5b6e0.firebaseapp.com',
  projectId: 'netflix-clone-5b6e0',
  storageBucket: 'netflix-clone-5b6e0.appspot.com',
  messagingSenderId: '135101836230',
  appId: '1:135101836230:web:9ae7c8e578a6d82b6ae0c7',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { db, auth }
