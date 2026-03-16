import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function NewPoem() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')
    await axios.post('https://prosek.shop/veignma22/3240/api/poems', { title, content }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    navigate('/')
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Zpět</button>
      <h1>Nová báseň</h1>
      <div>
        <input placeholder="Název" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea placeholder="Obsah básně..." value={content} onChange={e => setContent(e.target.value)} />
        <button onClick={handleSubmit}>Publikovat</button>
      </div>
    </div>
  )
}