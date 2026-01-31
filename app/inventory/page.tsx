"use client";

import { useState } from "react";
import { WordCard } from "@/components/Inventory/WordCard";
import { Word } from "@/types/inventory";

// Mock Data for MVP
const MOCK_WORDS: Word[] = [
  {
    id: "1",
    text: "preliminary",
    definition: "Denoting an action or event preceding or done in preparation for something fuller.",
    level: 1,
    addedAt: Date.now(),
  },
  {
    id: "2",
    text: "exacerbate",
    definition: "Make (a problem, bad situation, or negative feeling) worse.",
    level: 0,
    addedAt: Date.now(),
  },
  {
    id: "3",
    text: "serendipity",
    definition: "The occurrence and development of events by chance in a happy or beneficial way.",
    level: 3,
    addedAt: Date.now(),
  },
];

export default function InventoryPage() {
  const [words] = useState<Word[]>(MOCK_WORDS);

  const handlePlayAudio = (text: string) => {
    console.log(`Playing audio for: ${text}`);
    // Integration with ElevenLabs will go here
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
          Your World List
        </h1>
        <p className="text-slate-400">
          Master these words to unlock new scenarios.
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {words.map((word) => (
          <WordCard key={word.id} word={word} onPlayAudio={handlePlayAudio} />
        ))}
      </div>
    </div>
  );
}
