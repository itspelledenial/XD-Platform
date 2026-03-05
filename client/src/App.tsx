// app.tsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/games`)
      .then(async res => {
        const text = await res.text();
        console.log("RAW RESPONSE:", text);
        try {
          const data = JSON.parse(text);
          console.log("PARSED DATA:", data);
        } catch (e) {
          console.error("JSON parse error:", e);
        }
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <>
      <p>Hi</p>
    </>
  )
}

export default App
