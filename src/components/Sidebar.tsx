import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Map, 
  BookOpen, 
  Trophy, 
  Settings, 
  LogOut, 
  Zap,
  Flame,
  MessageSquare
} from "lucide-react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { motion } from "motion/react";

export default function Sidebar() {
  const handleLogout = () => signOut(auth);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Map, label: "Roadmap", path: "/roadmap" },
    { icon: BookOpen, label: "Lessons", path: "/roadmap" }, // Lessons link to roadmap for now
    { icon: Zap, label: "Practice", path: "/practice" },
    { icon: MessageSquare, label: "AI Tutor", path: "/practice?tab=ai" },
  ];

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-zinc-200 bg-[#1E1B4B] p-6 md:flex flex-col z-50">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-[#FFD60A] rounded-xl flex items-center justify-center text-[#1E1B4B] font-black text-xl shadow-lg">
          P
        </div>
        <div>
          <h1 className="font-bold text-xl tracking-tight text-white">PyStride</h1>
          <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Mastery</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-white/10 text-[#FFD60A] font-semibold" 
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-6">
        <div className="bg-[#4F46E5] rounded-2xl p-4 text-white relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2 text-orange-400">
              <Flame size={16} fill="currentColor" />
              <span className="text-xs font-bold uppercase tracking-wider">Active Streak</span>
            </div>
            <p className="text-2xl font-bold">5 Days</p>
            <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-5/7 bg-orange-400"></div>
            </div>
          </div>
          <Zap className="absolute -right-4 -bottom-4 text-white/5 w-24 h-24 rotate-12 group-hover:scale-110 transition-transform" />
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-zinc-500 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
