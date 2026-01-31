"use client";

import { motion } from "framer-motion";
import { Sparkles, Volume2, Trophy } from "lucide-react";
import { Word } from "@/types/inventory";

interface WordCardProps {
  word: Word;
  onPlayAudio?: (text: string) => void;
}

export function WordCard({ word, onPlayAudio }: WordCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative p-6 bg-slate-900 border border-slate-700 rounded-xl shadow-xl overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
        <Trophy className={`w-5 h-5 ${word.level >= 3 ? "text-yellow-400" : "text-slate-600"}`} />
      </div>

      <div className="mb-4">
        <h3 className="text-2xl font-bold text-white mb-1 capitalize flex items-center gap-2">
          {word.text}
          <button
            onClick={() => onPlayAudio?.(word.text)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-blue-400 transition-colors"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </h3>
        <p className="text-slate-400 text-sm italic">{word.definition}</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(word.level / 5) * 100}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
          />
        </div>
        <span className="text-xs text-slate-500 font-mono">Lvl {word.level}</span>
      </div>

      {word.level === 0 && (
        <div className="absolute bottom-2 right-2">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div>
      )}
    </motion.div>
  );
}
