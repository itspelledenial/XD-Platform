// app.tsx
import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  const fetchGames = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/games`)
      const text = await res.text()
      console.log("RAW RESPONSE:", text)

      const parsed = JSON.parse(text)
      console.log("PARSED DATA:", parsed)

      setData(parsed)
    } catch (err) {
      console.error("Fetch error:", err)
    }
  }

  return (
    <>
      <p>Hi</p>

      <button onClick={fetchGames}>
        Fetch Games
      </button>

      {data && (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </>
  )
}

export default App