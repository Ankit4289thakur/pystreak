import { motion } from "motion/react";
import { 
  Flame, 
  Trophy, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  ChevronRight,
  BrainCircuit,
  Zap
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Link } from "react-router-dom";
import { auth } from "../lib/firebase";

const mockPerformanceData = [
  { day: "Mon", xp: 120 },
  { day: "Tue", xp: 210 },
  { day: "Wed", xp: 180 },
  { day: "Thu", xp: 350 },
  { day: "Fri", xp: 240 },
  { day: "Sat", xp: 420 },
  { day: "Sun", xp: 510 },
];

export default function Dashboard() {
  const user = auth.currentUser;

  const stats = [
    { label: "Current Streak", value: "5 Days", icon: Flame, emoji: "🔥", color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Earned XP", value: "2,450", icon: Zap, emoji: "💎", color: "text-blue-500", bg: "bg-blue-50" },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black tracking-tight text-[#1E1B4B]"
          >
            Welcome back, {user?.displayName?.split(' ')[0] || 'Pythonista'}! 👋
          </motion.h1>
          <p className="text-[#64748B] font-medium mt-1">Day 14 of your 30-day Python Mastery</p>
        </div>
        <div className="flex items-center gap-3">
          {stats.map((stat, i) => (
            <div key={i} className="stat-pill">
              <span className="text-lg">{stat.emoji}</span>
              <span className="uppercase tracking-wider text-[10px] text-zinc-400 mr-1">{stat.label}:</span>
              {stat.value}
            </div>
          ))}
          <div className="w-10 h-10 rounded-full border-2 border-zinc-200 overflow-hidden shadow-sm">
            <img src={user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.uid}`} alt="avatar" />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Main Lesson Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 card card-vibrant flex flex-col min-h-[400px]"
        >
          <div className="inline-flex px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6">
            Current Module: NumPy
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight">Mastering Array Reshaping</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl">
            Learn how to transform 1D data into complex matrices for data science and machine learning.
          </p>
          
          <div className="code-preview font-mono text-sm">
            <span className="text-sky-300">import</span> numpy <span className="text-sky-300">as</span> np<br /><br />
            arr = np.array([<span className="text-yellow-300">1, 2, 3, 4, 5, 6</span>])<br />
            newarr = arr.reshape(<span className="text-yellow-300">2, 3</span>)
          </div>

          <Link 
            to="/roadmap"
            className="btn-accent mt-auto w-fit px-10 py-4 text-lg shadow-xl shadow-indigo-900/20"
          >
            START LESSON (+50 XP)
          </Link>
        </motion.div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card-streak"
          >
            <h3 className="text-[#9A3412] text-xs font-bold uppercase tracking-widest mb-4">Consistency Tracker</h3>
            <div className="flex justify-between items-center">
              <div className="text-5xl font-black text-[#EA580C]">18</div>
              <div className="text-right">
                <div className="font-bold text-[#1E293B]">Perfect Week!</div>
                <div className="text-xs text-[#9A3412] font-semibold">+200 Bonus XP earned</div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className={`flex-1 h-8 rounded-md ${i < 5 ? 'bg-[#FB923C]' : 'bg-[#FED7AA]'}`}></div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card flex flex-col items-center justify-center py-8"
          >
            <div className="w-32 h-32 rounded-full mb-6 flex items-center justify-center relative">
              <svg className="w-full h-full -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#E2E8F0" strokeWidth="12" />
                <circle cx="64" cy="64" r="56" fill="none" stroke="#6366F1" strokeWidth="12" strokeDasharray="351.8" strokeDashoffset={351.8 * 0.58} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#1E1B4B]">42%</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase">Total</span>
              </div>
            </div>
            <h3 className="font-bold text-[#1E1B4B]">Course Progress</h3>
            <p className="text-zinc-500 text-xs text-center mt-2 px-6 leading-relaxed">
              You are faster than <span className="text-[#4F46E5] font-bold">85%</span> of other beginners this month!
            </p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <section className="card p-8">
          <h3 className="text-lg font-black text-[#1E1B4B] mb-6">Weak Topics</h3>
          <div className="flex flex-wrap gap-2">
            {["Decorators", "Class Inheritance", "Lambda Functions", "Reshaping"].map(topic => (
              <span key={topic} className="px-3 py-1.5 bg-red-50 text-red-800 rounded-full text-xs font-bold uppercase tracking-wider">
                {topic}
              </span>
            ))}
          </div>
          <p className="text-zinc-500 text-xs mt-6 leading-relaxed flex gap-2">
            <BrainCircuit size={14} className="text-blue-500 shrink-0" />
            <span>AI Suggestion: Revisit "Decorators" before the NumPy project.</span>
          </p>
        </section>

        <section className="card p-8 lg:col-span-2">
          <h3 className="text-lg font-black text-[#1E1B4B] mb-6">Learning Analytics</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <Area type="monotone" dataKey="xp" stroke="#6366F1" strokeWidth={3} fill="#6366F1" fillOpacity={0.1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}
