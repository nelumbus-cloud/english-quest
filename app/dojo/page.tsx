"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Square, Play, RefreshCw, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  role: "user" | "coach";
  text: string;
  audioUrl?: string;
  correction?: string;
}

export default function DojoPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputVal.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputVal,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate AI thinking and replying (Mock for UI dev)
    setTimeout(() => {
      const coachMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "coach",
        text: "That was good! However, instead of saying 'It is good', try 'It is exemplary'.",
        correction: "It is exemplary.",
      };
      setMessages((prev) => [...prev, coachMsg]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          English Quest Dojo
        </h1>
        <div className="text-xs text-slate-500 font-mono">Level 1: Wordsmith</div>
      </header>

      {/* Chat / Interaction Area */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 opacity-50">
            <Mic className="w-16 h-16 mb-4" />
            <p>Tap microphone to start speaking...</p>
          </div>
        )}
        
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700"
                }`}
              >
                <p>{msg.text}</p>
                {msg.correction && (
                  <div className="mt-3 pt-3 border-t border-slate-600/50 text-sm text-green-400 font-mono">
                    Suggestion: {msg.correction}
                  </div>
                )}
                {msg.role === "coach" && (
                  <button className="mt-2 p-2 rounded-full hover:bg-slate-700 text-blue-400 transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      {/* Controls */}
      <footer className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
            
          {/* Text Input Fallback */}
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your response..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-full px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          {/* Send Button */}
          <button 
             onClick={handleSendMessage}
             className="p-3 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>

          {/* Mic Button (The Star) */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-4 rounded-full transition-all duration-300 shadow-lg ${
              isRecording
                ? "bg-red-500 text-white shadow-red-500/20 scale-110"
                : "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/20"
            }`}
          >
            {isRecording ? (
              <Square className="w-6 h-6 fill-current" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>
        </div>
      </footer>
    </div>
  );
}
