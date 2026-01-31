import Link from "next/link";
import { Mic, BookOpen, Trophy } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />

      <main className="relative z-10 text-center max-w-2xl space-y-12">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white via-blue-100 to-slate-500">
            English Quest
          </h1>
          <p className="text-xl text-slate-400">
            Level up your speaking skills. Defeat pronunciation bosses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Link
            href="/dojo"
            className="group relative p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <Mic className="w-12 h-12 text-blue-400 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">The Dojo</h2>
            <p className="text-sm text-slate-400">
              Practice speaking with real-time AI feedback.
            </p>
          </Link>

          <Link
            href="/inventory"
            className="group relative p-8 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="absolute inset-0 bg-purple-600/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            <BookOpen className="w-12 h-12 text-purple-400 mb-4 mx-auto group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-2">World List</h2>
            <p className="text-sm text-slate-400">
              View your vocabulary inventory and mastery stats.
            </p>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-slate-600 font-mono">
          <Trophy className="w-4 h-4" />
          <span>Current Streak: 0 Days</span>
        </div>
      </main>
    </div>
  );
}
