// api/games.js
import { createClient } from "@supabase/supabase-js";

console.log("games.js called");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  try {
    // disable caching for dev / preview
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");

    const { data, error } = await supabase.from("games").select("*");
    if (error) throw error;

    res.status(200).json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
}