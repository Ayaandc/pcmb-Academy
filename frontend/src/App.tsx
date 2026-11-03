import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LiveClasses from './pages/LiveClasses';
import Practice from './pages/Practice';
import Settings from './pages/Settings';
import AiTutor from './pages/AiTutor';
import { User } from './types';
import Auth from './pages/Auth';
import { clearToken, getCurrentUser, getToken } from './services/api';

const Protected: React.FC<{ user: User | null; loading: boolean; onLogout: () => void; children: React.ReactNode }> = ({ user, loading, onLogout, children }) => {
  const location = useLocation();
  if (loading) return <div className="landing-shell flex min-h-screen items-center justify-center text-sm font-bold text-slate-600">Loading your workspace…</div>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Layout user={user} onLogout={onLogout}>{children}</Layout>;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(getToken()));

  useEffect(() => {
    if (!getToken()) return;
    getCurrentUser().then(setUser).catch(clearToken).finally(() => setLoading(false));
  }, []);

  const logout = () => { clearToken(); setUser(null); };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Auth mode="login" onAuthenticated={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Auth mode="signup" onAuthenticated={setUser} />} />
        <Route
          path="/dashboard"
          element={
            <Protected user={user} loading={loading} onLogout={logout}><Dashboard user={user!} /></Protected>
          }
        />
        <Route
          path="/courses"
          element={
            <Protected user={user} loading={loading} onLogout={logout}><Courses /></Protected>
          }
        />
        <Route
          path="/live"
          element={
            <Protected user={user} loading={loading} onLogout={logout}><LiveClasses /></Protected>
          }
        />
        <Route
          path="/ai-tutor"
          element={
            <Protected user={user} loading={loading} onLogout={logout}><AiTutor user={user!} /></Protected>
          }
        />
        <Route
          path="/quizzes"
          element={
            <Protected user={user} loading={loading} onLogout={logout}><Practice /></Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected user={user} loading={loading} onLogout={logout}><Settings user={user!} onLogout={logout} /></Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
