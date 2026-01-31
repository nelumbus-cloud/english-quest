import { getRequestContext } from "@cloudflare/next-on-pages";
import { Word } from "@/types/inventory";

export const runtime = 'edge';

const USER_ID = "user:1";

export async function GET() {
  const { env } = getRequestContext();
  
  if (!env.DB) {
    return new Response(JSON.stringify({ error: "Database not configured" }), { status: 500 });
  }

  // Lazy Init: Ensure table exists (Automatic Setup)
  try {
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS words (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        text TEXT NOT NULL,
        definition TEXT NOT NULL,
        level INTEGER DEFAULT 0,
        addedAt INTEGER NOT NULL
      )`
    ).run();
  } catch (err) {
    // Ignore error if table already exists or permission issue, 
    // let the query fail naturally if so.
    console.error("Auto-migration failed:", err);
  }

  // Fetch words list
  const { results } = await env.DB.prepare(
    "SELECT * FROM words WHERE user_id = ? ORDER BY addedAt DESC"
  ).bind(USER_ID).all<Word>();
  
  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req: Request) {
  const { env } = getRequestContext();
  const body = await req.json() as { word: string; definition: string };

  const newWord: Word = {
    id: Date.now().toString(),
    text: body.word,
    definition: body.definition,
    level: 0,
    addedAt: Date.now(),
  };

  if (!env.DB) {
    return new Response(JSON.stringify({ error: "Database not configured" }), { status: 500 });
  }

  try {
    await env.DB.prepare(
      "INSERT INTO words (id, user_id, text, definition, level, addedAt) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(newWord.id, USER_ID, newWord.text, newWord.definition, newWord.level, newWord.addedAt).run();

    return new Response(JSON.stringify(newWord), { status: 201 });
  } catch (e) {
    return new Response(JSON.stringify({ error: "Failed to add word" }), { status: 500 });
  }
}
