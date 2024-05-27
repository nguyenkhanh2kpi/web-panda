// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD1Te9C9oY_hKV1EUXPyKQRjhZXPJaG97o',
  authDomain: 'upload2-23381.firebaseapp.com',
  projectId: 'upload2-23381',
  storageBucket: 'upload2-23381.appspot.com',
  messagingSenderId: '667652099335',
  appId: '1:667652099335:web:87d47db97ec22993a3c9a2',
  measurementId: 'G-YXB9K5MJ0M',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage }
