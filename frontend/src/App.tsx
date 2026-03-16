import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import NewPoem from './pages/NewPoem'
import Poem from './pages/Poem'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/poem/:id" element={<Poem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/new" element={<NewPoem />} />
    </Routes>
  )
}

export default App