# English Quest

Level up your English speaking skills with AI-powered coaching.

## Features
- **The Dojo:** Interactive speaking practice with ElevenLabs TTS.
- **World List:** Gamified vocabulary inventory.
- **Cloudflare KV:** Serverless data storage.

## Deployment
Built for Cloudflare Pages using `@cloudflare/next-on-pages`.

### Setup
1. Bind a KV Namespace named `ENGLISH_QUEST_KV`.
2. Set `ELEVENLABS_API_KEY` environment variable.
3. Build command: `npm run build`
4. Output directory: `.vercel/output/static`
