import { motion } from "motion/react";
import { 
  Lock, 
  CheckCircle2, 
  Circle, 
  PlayCircle,
  Flag,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  MapPin
} from "lucide-react";
import { roadmapData, Day } from "../data/roadmap";
import { Link } from "react-router-dom";

export default function Roadmap() {
  const modules = ["Python Basics", "Intermediate Python", "NumPy", "Pandas"];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto pb-32">
      <header className="mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Learning Roadmap</h1>
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-[#4F46E5]" />
            <span className="font-semibold text-[#1E1B4B]">30 Days remaining</span>
          </div>
          <div className="flex items-center gap-2">
            <Flag size={16} className="text-zinc-400" />
            <span className="font-semibold text-zinc-500">12 Sub-topics completed</span>
          </div>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Connection Line */}
        <div className="absolute left-10 top-0 bottom-0 w-1 bg-zinc-200 -z-10 rounded-full"></div>

        <div className="space-y-12">
          {roadmapData.map((day, i) => (
            <motion.div 
              key={day.day} 
              variants={{
                hidden: { x: -20, opacity: 0 },
                visible: { x: 0, opacity: 1 }
              }}
              className="flex gap-8 group"
            >
              <div className="relative">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border-4 border-white shadow-lg transition-all duration-300 ${
                  day.status === 'completed' ? 'bg-green-500 text-white' :
                  day.status === 'current' ? 'bg-[#4F46E5] text-white scale-110 shadow-[#4F46E5]/20' :
                  'bg-white text-zinc-300 border-zinc-50'
                }`}>
                  {day.status === 'completed' ? <CheckCircle2 size={32} /> :
                   day.status === 'current' ? <span className="text-2xl font-black">{day.day}</span> :
                   <Lock size={28} />}
                </div>
                {day.status === 'current' && (
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 bg-[#4F46E5] rounded-3xl -z-10"
                  ></motion.div>
                )}
              </div>

              <div className={`flex-1 bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm transition-all duration-300 ${
                day.status === 'locked' ? 'opacity-60 grayscale' : 'hover:border-[#4F46E5] hover:shadow-md'
              }`}>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#64748B]">
                        Day {day.day} • {day.module}
                      </span>
                      <span className="text-[10px] font-bold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded-full">
                        {day.xp} XP
                      </span>
                    </div>
                    <h3 className="text-xl font-black mb-2 group-hover:text-[#4F46E5] transition-colors text-[#1E1B4B]">
                      {day.title}
                    </h3>
                    <p className="text-zinc-500 text-sm mb-6 leading-relaxed max-w-xl">
                      {day.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {day.topics.map((topic, j) => (
                        <div key={j} className="flex items-center gap-2 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                          <PlayCircle size={14} className="text-zinc-400" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[11px] font-bold truncate">{topic.title}</p>
                            <p className="text-[9px] text-zinc-400 font-medium uppercase">{topic.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-4">
                     {day.status !== 'locked' ? (
                       <Link 
                        to={`/lesson/${day.day}`}
                        className={`p-4 rounded-2xl flex items-center justify-center transition-all ${
                          day.status === 'current' ? 'btn-accent shadow-xl shadow-yellow-200' : 'bg-zinc-100 text-zinc-900 overflow-hidden'
                        }`}
                       >
                         {day.status === 'current' ? (
                           <div className="flex items-center gap-2 font-bold px-2">
                             Start <ArrowRight size={20} />
                           </div>
                         ) : <div className="flex flex-col items-center gap-1">
                               <MapPin size={16} />
                               <span className="text-[10px] font-bold uppercase">Review</span>
                             </div>}
                       </Link>
                     ) : (
                       <div className="p-4 rounded-2xl bg-zinc-50 text-zinc-300 flex flex-col items-center gap-1">
                         <Lock size={16} />
                         <span className="text-[10px] font-bold uppercase">Locked</span>
                       </div>
                     )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Module Separator / Future */}
          <div className="pt-12 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mb-4">
              <ChevronRight size={20} className="text-zinc-300 rotate-90" />
            </div>
            <p className="text-xs font-bold text-zinc-300 tracking-widest uppercase">Intermediate Python Module Coming Soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
