//import { useState } from 'react'
import './App.css'
import AddGameForm from './components/AddGameForm'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

function App() {
  return (
    <>
      <h1>XDPlatform Login and Registration</h1>
      <LoginForm />
      <RegisterForm />
    </>
  )
}

export default App