// app.tsx
import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState(null)

  const fetchGames = async () => {
    const res = await fetch("/api/games");
    const data = await res.json();
    console.log(data);
  };

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