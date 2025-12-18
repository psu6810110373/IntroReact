import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import LoginScreen from './LoginScreen';
import BookScreen from './BookScreen';
import { Routes, Route, Navigate } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:3000"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  const setToken = (token) => {
    axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    setIsAuthenticated(true)
  }

  useEffect(() => {
    const savedToken = localStorage.getItem('token'); 
    if (savedToken) {
      setToken(savedToken); 
    }
  }, [])

  const handleLoginSuccess = (token,) => {
   setToken(token); 
    if (remember) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token'); 
    }
  }

  return (
   <Routes>
      <Route 
        path="/login" 
        element={
          isAuthenticated ? <Navigate to="/" /> : <LoginScreen onLoginSuccess={handleLoginSuccess}/>
        } 
      />
      <Route 
        path="/" 
        element={
          isAuthenticated ? <BookScreen/> : <Navigate to="/login" />
        } 
      />
    </Routes>
  )
}

export default App