import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [poems, setPoems] = useState([])
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  useEffect(() => {
    axios.get('http://localhost:3001/api/poems').then(res => setPoems(res.data))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    navigate('/login')
  }

  return (
    <div>
      <div>
        {username ? (
          <>
            <span>Přihlášen jako {username}</span>
            <button onClick={() => navigate('/new')}>Přidat báseň</button>
            <button onClick={handleLogout}>Odhlásit</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Registrace</button>
          </>
        )}
      </div>
      <h1>Básně</h1>
      {poems.map((poem: any) => (
        <div key={poem.id} onClick={() => navigate(`/poem/${poem.id}`)}>
          <h2>{poem.title}</h2>
          <p>{poem.username}</p>
        </div>
      ))}
    </div>
  )
}