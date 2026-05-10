import { motion } from "motion/react";
import { auth } from "../lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Zap, Code, Shield, Trophy, ArrowRight, Github } from "lucide-react";
import { toast } from "sonner";

export default function LandingPage() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Welcome to PyStride!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to sign in. Please try again.");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: "spring" as const, stiffness: 100 } 
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-yellow-50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 opacity-40 pointer-events-none"></div>

      <nav className="container mx-auto px-6 py-8 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFD60A] rounded-xl flex items-center justify-center text-[#1E1B4B] font-black text-xl shadow-lg">
            P
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#1E1B4B]">PyStride</span>
        </div>
        <button 
          onClick={handleLogin}
          className="px-6 py-2.5 bg-[#4F46E5] text-white rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2 group"
        >
          Sign In
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </nav>

      <div className="container mx-auto px-6 pt-20 pb-32 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-[#4F46E5] text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Zap size={14} fill="currentColor" />
            New: Master Pandas in 7 Days
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95] text-[#1E1B4B]"
          >
            Python for the <br />
            <span className="text-[#4F46E5]">Curious Mind.</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-zinc-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Ditch the boring textbooks. Master Python, NumPy, and Pandas through interactive, bit-sized daily challenges. Become a data-fluent engineer in 30 days.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={handleLogin}
              className="px-10 py-5 bg-[#4F46E5] text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center gap-3 w-full sm:w-auto"
            >
              Start Learning for Free
              <ArrowRight size={20} />
            </button>
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl border border-zinc-200 text-[#1E1B4B] font-bold bg-white w-full sm:w-auto">
              <Code size={20} />
              Zero config needed
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-32 grid md:grid-cols-3 gap-12"
        >
          {[
            { icon: Zap, title: "Active Learning", desc: "Interactive snippets that you run directly in your browser. No local setup required." },
            { icon: Shield, title: "Structured Roadmap", desc: "A carefully crafted 30-day plan covering everything from print() to Pandas analytics." },
            { icon: Trophy, title: "Streak & XP", desc: "Build consistency with our reward system. Badges, streaks, and a community leaderboard." }
          ].map((feature, i) => (
            <div key={i} className="group cursor-default">
              <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center text-zinc-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 mb-6">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <footer className="border-t border-zinc-100 py-12 mt-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-400 text-sm">
          <div className="flex items-center gap-6">
            <span>© 2026 PyStride</span>
            <a href="#" className="hover:text-zinc-900 transition-colors">Safety</a>
            <a href="#" className="hover:text-zinc-900 transition-colors">Privacy</a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 hover:text-zinc-900 transition-colors">
              <Github size={16} />
              Open Source
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
