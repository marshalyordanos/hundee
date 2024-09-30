
import './App.css'

import { useDispatch } from 'react-redux';
import { login, setCredential } from './redux/auth/authSlice';
import AppRoute from './app-routing'
import { useEffect } from 'react';
import authService from './api/auth.service';
function App() {
  const dispatch = useDispatch();

  console.log("app ------------")

  
  useEffect(()=>{
    dispatch(setCredential({user:authService.getCurrentUser()}))
  },[])

  

  return (
    <div className='w-full'>
    
      <AppRoute />

      
    </div>
  )
}

export default App
