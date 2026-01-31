import { getRequestContext } from "@cloudflare/next-on-pages";
import { Word } from "@/types/inventory";

export const runtime = 'edge';

export async function GET() {
  const { env } = getRequestContext();
  
  if (!env.ENGLISH_QUEST_KV) {
    return new Response(JSON.stringify({ error: "KV not configured" }), { status: 500 });
  }

  // Fetch words list
  const wordsList = await env.ENGLISH_QUEST_KV.get("user:1:words", { type: "json" }) || [];
  
  return new Response(JSON.stringify(wordsList), {
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

  const existing: Word[] = (await env.ENGLISH_QUEST_KV.get("user:1:words", { type: "json" })) || [];
  const updated = [...existing, newWord];

  await env.ENGLISH_QUEST_KV.put("user:1:words", JSON.stringify(updated));

  return new Response(JSON.stringify(newWord), { status: 201 });
}
