import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Toaster } from "sonner";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import LessonView from "./pages/LessonView";
import Practice from "./pages/Practice";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 font-medium font-mono">Initializing PyStride...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Toaster position="top-center" />
      <div className="flex min-h-screen bg-zinc-50 text-zinc-900">
        {user && <Sidebar />}
        <main className={`flex-1 ${user ? 'md:ml-64' : ''}`}>
          <Routes>
            <Route 
              path="/" 
              element={user ? <Navigate to="/dashboard" /> : <LandingPage />} 
            />
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard /> : <Navigate to="/" />} 
            />
            <Route 
              path="/roadmap" 
              element={user ? <Roadmap /> : <Navigate to="/" />} 
            />
            <Route 
              path="/lesson/:lessonId" 
              element={user ? <LessonView /> : <Navigate to="/" />} 
            />
            <Route 
              path="/practice" 
              element={user ? <Practice /> : <Navigate to="/" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
