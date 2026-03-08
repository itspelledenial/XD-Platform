import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function RegisterForm() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    setMessage('') // reset message

    // 1️⃣ Sign up via Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) {
      setMessage('Sign up failed: ' + authError.message)
      return
    }

    // 2️⃣ Insert username into your users table, linked to Auth user id
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({
        username,
        auth_id: authData.user?.id, // link to Supabase Auth
        email, // optional, for convenience
      })

    if (userError) {
      setMessage('Could not save username: ' + userError.message)
      return
    }

    setMessage('Registered successfully! Welcome, ' + username)
  }

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  )
}