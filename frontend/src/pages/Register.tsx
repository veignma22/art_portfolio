import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    await axios.post('https://prosek.shop/veignma22/3240/api/auth/register', { username, email, password })
    navigate('/login')
  }

  return (
    <div>
      <h1>Registrace</h1>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Heslo" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Zaregistrovat se</button>
    </div>
  )
}