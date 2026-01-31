import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export async function POST(req: Request) {
  const { text } = await req.json() as { text: string };
  const { env } = getRequestContext();

  if (!env.ELEVENLABS_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 500 });
  }

  // Use Turbo model for speed/cost
  const model_id = "eleven_turbo_v2";
  const voice_id = "21m00Tcm4TlvDq8ikWAM"; // Rachel

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
      {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "xi-api-key": env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id,
          voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return new Response(JSON.stringify({ error: errorText }), { status: response.status });
    }

    return new Response(response.body, {
      headers: { "Content-Type": "audio/mpeg" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "TTS Failed" }), { status: 500 });
  }
}
