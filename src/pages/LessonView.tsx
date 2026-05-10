import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  BrainCircuit, 
  Lightbulb,
  MessageSquare,
  History,
  X
} from "lucide-react";
import { roadmapData } from "../data/roadmap";
import ReactMarkdown from "react-markdown";
import { askGemini } from "../services/geminiService";
import { toast } from "sonner";

interface Step {
  title: string;
  content: string;
  code?: string;
  expectedOutput?: string;
  type: "text" | "interactive" | "quiz";
  quizOptions?: string[];
  correctAnswer?: string;
}

const lessonsContent: Record<string, Step[]> = {
  "1": [
    {
      title: "Welcome to PyStride",
      type: "text",
      content: `
Python is a high-level, interpreted programming language known for its **readability** and **versatility**. 

### Why Python?
- **Beginner Friendly:** It reads like English.
- **Vast Ecosystem:** Used in AI, Web Dev, and Science.
- **High Demand:** Companies like Google, Netflix, and Shopify use it.

**Analogy:** If programming languages were tools, Python would be a Swiss Army Knife. It's easy to carry and can do almost anything.
      `
    },
    {
      title: "The print() function",
      type: "interactive",
      content: "The `print()` function is how we tell the computer to talk back to us. It's the most basic way to see what's happening inside your code.",
      code: 'print("Hello, Pythonista!")',
      expectedOutput: "Hello, Pythonista!"
    },
    {
      title: "Knowledge Check",
      type: "quiz",
      content: "What keyword do we use to display text in the console?",
      quizOptions: ["output()", "display()", "print()", "show()"],
      correctAnswer: "print()"
    }
  ],
  "5": [
    {
      title: "The If Statement",
      type: "text",
      content: `
Conditionals allow your code to make decisions. 

### Syntax:
\`\`\`python
if condition:
    # do something
else:
    # do something else
\`\`\`

**Note the Indentation!** Python uses spaces to group blocks of code.
      `
    },
    {
      title: "Making Choices",
      type: "interactive",
      content: "Try changing the `score` variable to see different paths.",
      code: 'score = 85\n\nif score >= 90:\n    print("Grade: A")\nelif score >= 80:\n    print("Grade: B")\nelse:\n    print("Keep studying!")',
      expectedOutput: "Grade: B"
    }
  ]
};

export default function LessonView() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lesson = roadmapData.find(d => d.day.toString() === lessonId);
  const steps = lessonsContent[lessonId || ""] || [];

  useEffect(() => {
    if (steps[currentStep]?.code) {
      setCode(steps[currentStep].code || "");
    }
    setOutput("");
    setAiExplanation("");
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
  }, [currentStep, lessonId]);

  if (!lesson || steps.length === 0) return <div>Lesson not found</div>;

  const currentStepData = steps[currentStep];

  const handleRunCode = () => {
    // Simple simulation for beginner lessons
    if (code.includes('print("Hello, Pythonista!")')) setOutput("Hello, Pythonista!");
    else if (code.includes('print("Grade: B")')) setOutput("Grade: B");
    else if (code.includes('print("Grade: A")')) setOutput("Grade: A");
    else setOutput("Code executed successfully (simulation)");
    
    toast.success("Execution complete");
  };

  const handleAskAI = async () => {
    setIsAiLoading(true);
    try {
      const explanation = await askGemini(
        `Explain this Python code to a complete beginner:\n\n${code}`,
        "You are an encouraging AI Python Tutor. Keep it very simple and use analogies."
      );
      setAiExplanation(explanation || "I'm having trouble thinking right now.");
    } catch (error) {
      toast.error("AI service currently unavailable");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      toast.success("Lesson Completed! +200 XP");
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-zinc-100 p-4 flex items-center justify-between sticky top-0 bg-white z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/roadmap")} className="p-2 hover:bg-zinc-50 rounded-xl transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="h-4 w-px bg-zinc-200 hidden md:block"></div>
          <div>
            <h2 className="font-bold text-sm">{lesson.title}</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Day {lessonId} • Step {currentStep + 1} of {steps.length}</p>
          </div>
        </div>
        <div className="flex-1 max-w-md mx-8">
          <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#4F46E5]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></motion.div>
          </div>
        </div>
        <button onClick={() => navigate("/roadmap")} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
          <History size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-auto bg-zinc-50/50">
        <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="prose prose-zinc prose-pre:bg-zinc-900 prose-pre:text-indigo-400 max-w-none">
              <h1 className="text-3xl font-black text-[#1E1B4B] tracking-tight mb-6">{currentStepData.title}</h1>
              <div className="markdown-body text-zinc-600 leading-relaxed text-lg">
                <ReactMarkdown>{currentStepData.content}</ReactMarkdown>
              </div>
            </div>

            {currentStepData.type === 'quiz' && (
              <div className="space-y-3">
                {currentStepData.quizOptions?.map((option, i) => (
                  <button 
                    key={i}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedQuizIndex(i)}
                    className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                      selectedQuizIndex === i 
                        ? (quizSubmitted 
                            ? (option === currentStepData.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                            : 'border-[#4F46E5] bg-indigo-50 text-[#4F46E5] font-bold')
                        : 'border-zinc-200 bg-white hover:border-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        selectedQuizIndex === i ? 'border-current' : 'border-zinc-300'
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      {option}
                    </div>
                  </button>
                ))}
                {!quizSubmitted && selectedQuizIndex !== null && (
                  <button 
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (currentStepData.quizOptions![selectedQuizIndex] === currentStepData.correctAnswer) {
                        toast.success("Exactly!");
                      } else {
                        toast.error("Not quite. Re-read the snippet!");
                      }
                    }}
                    className="mt-4 w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold shadow-lg shadow-zinc-200"
                  >
                    Check Answer
                  </button>
                )}
              </div>
            )}

            <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-100 flex gap-4">
              <Lightbulb className="text-yellow-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-yellow-900 text-sm mb-1">PyGuide Tip</h4>
                <p className="text-yellow-800 text-sm italic">
                  "Don't worry about memorizing syntax yet. Focus on the logic behind how code flows."
                </p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            {currentStepData.type === 'interactive' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col min-h-[400px]"
              >
                <div className="bg-zinc-800 px-6 py-3 flex justify-between items-center border-b border-zinc-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">main.py</span>
                  <div className="flex items-center gap-4">
                    <button onClick={handleAskAI} className="text-zinc-400 hover:text-white transition-colors">
                      <BrainCircuit size={18} />
                    </button>
                    <button 
                      onClick={handleRunCode}
                      className="bg-[#4F46E5] text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-indigo-600 transition-colors"
                    >
                      <Play size={12} fill="currentColor" />
                      Run
                    </button>
                  </div>
                </div>
                <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-transparent text-blue-400 font-mono p-6 resize-none focus:outline-none leading-relaxed text-sm"
                  spellCheck={false}
                />
                {output && (
                  <div className="p-6 bg-zinc-950 border-t border-zinc-800 text-zinc-300 font-mono text-xs whitespace-pre-wrap">
                    <div className="text-zinc-500 mb-2 uppercase tracking-widest text-[10px] font-bold">Output:</div>
                    {output}
                  </div>
                )}
              </motion.div>
            )}

            <AnimatePresence>
              {aiExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white p-6 rounded-3xl border border-blue-200 shadow-sm relative overflow-hidden group"
                >
                  <button 
                    onClick={() => setAiExplanation("")}
                    className="absolute top-4 right-4 text-zinc-300 hover:text-zinc-900"
                  >
                    <X size={16} />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <MessageSquare size={16} />
                    </div>
                    <span className="font-bold text-sm text-blue-600">AI Explanation</span>
                  </div>
                  <div className="text-zinc-600 text-sm leading-relaxed prose-sm">
                    <ReactMarkdown>{aiExplanation}</ReactMarkdown>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="bg-white p-6 rounded-3xl border border-zinc-200 shadow-sm flex items-center justify-between group cursor-help">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Need a hint?</h4>
                  <p className="text-xs text-zinc-400 font-medium">Click to see what to do next</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-zinc-100 p-6 bg-white flex justify-center">
        <button 
          onClick={handleNext}
          className="btn-accent px-12 py-4 flex items-center gap-3 text-lg"
        >
          {currentStep === steps.length - 1 ? "Complete Lesson" : "Continue"}
          <ChevronRight size={24} />
        </button>
      </footer>

      {isAiLoading && (
        <div className="fixed inset-0 bg-white/50 backdrop-blur-sm z-[100] flex items-center justify-center">
           <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-2xl flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-zinc-500">PyGuide AI is thinking...</p>
           </div>
        </div>
      )}
    </div>
  );
}
