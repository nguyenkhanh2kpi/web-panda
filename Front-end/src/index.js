import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'
import { registerLicense } from '@syncfusion/ej2-base'
import { GoogleOAuthProvider } from '@react-oauth/google'
const root = ReactDOM.createRoot(document.getElementById('root'))

registerLicense('Ngo9BigBOggjHTQxAR8/V1NHaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjWH9fcXRUQmRVUkRxWw==')
root.render(
  <ChakraProvider>
    <ContextProvider>
      <GoogleOAuthProvider clientId='854899780211-p148qqqvv8svo8mmviv8tuf6sbmip7iq.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </ContextProvider>
  </ChakraProvider>
)

reportWebVitals()
