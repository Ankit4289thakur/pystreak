import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  Send, 
  BrainCircuit, 
  Terminal, 
  Play, 
  Sparkles,
  User,
  Bot,
  Hash,
  Search
} from "lucide-react";
import { askGemini } from "../services/geminiService";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
  type?: "text" | "code";
}

export default function Practice() {
  const [mode, setMode] = useState<"chat" | "explainer">("chat");
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1", 
      role: "bot", 
      content: "Hi! I'm PyGuide AI. Ready to test your skills? You can ask me to generate a coding challenge, or toggle to **Code Explainer** mode to break down any snippet." 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (overrideInput?: string) => {
    const textToSend = overrideInput || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!overrideInput) setInput("");
    setIsLoading(true);

    try {
      let systemPrompt = "You are PyGuide AI, an elite Python educator. Answer concisely with clear code examples where relevant.";
      let userPrompt = textToSend;

      if (mode === "explainer") {
        systemPrompt = `You are the PyGuide Code Architect. 
        For the provided Python snippet:
        1. Give a real-world analogy to explain the concept.
        2. Break it down line-by-line in plain English.
        3. Explain "Common Pitfalls" for beginners.
        4. Suggest one small improvement.
        Format using Markdown headers.`;
        userPrompt = `Explain this Python code:\n\`\`\`python\n${textToSend}\n\`\`\``;
        setMode("chat"); // Return to chat to see the explanation
      }

      const response = await askGemini(userPrompt, systemPrompt);
      
      const botMessage: Message = { 
        id: (Date.now() + 1).toString(), 
        role: "bot", 
        content: response || "I'm a bit lost. Can you rephrase that?" 
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to connect to AI Tutor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChallenge = async () => {
    handleSend("Give me a 'Medium' difficulty coding challenge about Python Dictionaries.");
  };

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">
      <header className="p-6 border-b border-zinc-100 flex items-center justify-between bg-white shadow-sm relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#4F46E5] flex items-center justify-center text-white shadow-lg shadow-indigo-100">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h1 className="font-black text-lg text-[#1E1B4B]">AI Practice Lab</h1>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">Powered by PyGuide AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-xl">
          <button 
            onClick={() => setMode("chat")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'chat' ? 'bg-white text-[#4F46E5] shadow-sm' : 'text-zinc-500'}`}
          >
            Conversation
          </button>
          <button 
            onClick={() => setMode("explainer")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${mode === 'explainer' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-zinc-500'}`}
          >
            Code Explainer
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col relative">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth pb-32"
          >
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] md:max-w-[70%] flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center border shadow-sm ${
                      msg.role === 'user' ? 'bg-white border-zinc-200' : 'bg-[#4F46E5] border-[#4F46E5] text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                    </div>
                    <div className={`p-5 rounded-[24px] text-sm leading-relaxed shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-[#1E1B4B] text-white rounded-tr-none' 
                        : 'bg-white text-zinc-900 border border-zinc-100 rounded-tl-none prose prose-indigo prose-pre:bg-[#1E293B] prose-pre:text-indigo-100'
                    }`}>
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-full border border-zinc-100 flex gap-2 shadow-sm">
                  <div className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] to-transparent">
            {mode === 'chat' ? (
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Explain Lists", "NumPy arrays", "Decorators", "Lambdas"].map(tag => (
                    <button 
                      key={tag}
                      onClick={() => setInput(`Tell me about ${tag}`)}
                      className="px-3 py-1 bg-white border border-zinc-200 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-wider hover:border-[#4F46E5] hover:text-[#4F46E5] transition-all shadow-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything about Python..."
                    className="w-full bg-white border border-zinc-200 rounded-[20px] py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-[#4F46E5] focus:ring-4 focus:ring-indigo-50 transition-all font-medium shadow-sm"
                  />
                  <button 
                    onClick={() => handleSend()}
                    disabled={isLoading}
                    className="absolute right-2 top-2 p-3 bg-[#4F46E5] text-white rounded-xl hover:opacity-90 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:shadow-none"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            ) : (
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="max-w-4xl mx-auto bg-white p-6 rounded-[24px] border border-indigo-100 shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-[#4F46E5]">
                    <Terminal size={18} />
                    <span className="font-bold text-sm">Paste your Python code below</span>
                  </div>
                  <button 
                    onClick={() => setMode('chat')}
                    className="text-xs font-bold text-zinc-400 hover:text-zinc-600"
                  >
                    Cancel
                  </button>
                </div>
                <textarea 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="def hello_world():\n    print('Explain this!')"
                  className="w-full h-40 bg-[#1E293B] text-indigo-100 font-mono text-sm p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4F46E5] transition-all resize-none"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="w-full mt-4 py-4 bg-[#FFD60A] text-[#1E1B4B] rounded-xl font-black text-lg flex items-center justify-center gap-2 shadow-lg shadow-yellow-100 hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <Sparkles size={20} />
                  Explain Code In-Depth
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Shortcuts View */}
        <div className="md:w-80 border-l border-zinc-100 p-8 hidden md:block bg-white overflow-y-auto">
          <section className="mb-10">
            <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mb-6">Learning Actions</h3>
            <div className="space-y-4">
              {[
                { icon: Sparkles, label: "Daily Challenge", desc: "Test your skills", action: handleChallenge },
                { icon: Terminal, label: "Code Laboratory", desc: "Sandbox mode" },
                { icon: Search, label: "Documentation", desc: "Python references" }
              ].map((item, i) => (
                <button 
                  key={i} 
                  onClick={item.action}
                  className="w-full text-left p-5 rounded-2xl bg-zinc-50 border border-transparent hover:border-indigo-100 hover:bg-indigo-50/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-1">
                    <item.icon size={18} className="text-[#4F46E5]" />
                    <span className="text-sm font-bold text-[#1E1B4B]">{item.label}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{item.desc}</p>
                </button>
              ))}
            </div>
          </section>

          <section className="card-streak p-6">
             <h3 className="text-[10px] font-black text-[#9A3412] uppercase tracking-[0.2em] mb-4">AI Insight</h3>
             <div className="space-y-4">
                <p className="text-xs text-[#9A3412] font-medium leading-relaxed">
                  "You've been asking a lot about **Dictionaries**. Try the challenge to solidify your knowledge!"
                </p>
                <div className="h-1 w-full bg-[#FED7AA] rounded-full overflow-hidden">
                  <div className="h-full bg-[#EA580C] w-[60%]"></div>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
}
