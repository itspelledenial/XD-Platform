// AddGameForm component
import { useState } from 'react'

export default function AddGameForm({ onAdded }: { onAdded: () => void }) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [price, setPrice] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: desc, price })
    })
    if (res.ok) {
      onAdded() // callback to refresh the game list
      setTitle(''); setDesc(''); setPrice('')
    } else {
      const error = await res.json()
      console.error('Error adding game:', error)
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <button onClick={handleSubmit}>Add Game</button>
    </div>
  )
}