import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export default function PoemDetail() {
  const [poem, setPoem] = useState<any>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const username = localStorage.getItem('username')

  useEffect(() => {
    axios.get(`http://localhost:3001/api/poems/${id}`).then(res => setPoem(res.data))
  }, [id])

  const handleDelete = async () => {
    const token = localStorage.getItem('token')
    await axios.delete(`http://localhost:3001/api/poems/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    navigate('/')
  }

  if (!poem) return <p>Načítám...</p>

  return (
    <div>
      <button onClick={() => navigate('/')}>← Zpět</button>
      <h1>{poem.title}</h1>
      <p>{poem.username}</p>
      <p>{poem.content}</p>
      {username === poem.username && (
        <button onClick={handleDelete}>Smazat</button>
      )}
    </div>
  )
}