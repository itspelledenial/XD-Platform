
// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();

// Allow all origins for dev
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Supabase client (backend only)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE
);

// Log every incoming request
app.use((req, res, next) => {
  console.log("---- Incoming Request ----");
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Headers:", req.headers);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.get("/games", async (req, res) => {
  console.log("Fetching games from Supabase...");
  const { data, error } = await supabase.from("games").select("*");
  
  if (error) {
    console.error("Supabase error:", error);
    return res.status(500).json({ error: error.message });
  }
  
  console.log("Supabase data:", data);
  res.json(data);
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return res.status(401).json({ error: error.message });

    res.json({ session: data.session, user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) return res.status(400).json({ error: error.message });

    res.json({ user: data.user });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));