import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Bell,
  BookOpen,
  BrainCircuit,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageCircleQuestion,
  Settings,
  Sparkles,
  Video,
  X,
} from 'lucide-react';
import { User } from '../types';
import { UserAvatar } from './Avatars';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Home', path: '/dashboard' },
  { icon: BookOpen, label: 'Courses', path: '/courses' },
  { icon: Video, label: 'Classes', path: '/live' },
  { icon: BrainCircuit, label: 'AI Tutor', path: '/ai-tutor' },
  { icon: MessageCircleQuestion, label: 'Practice', path: '/quizzes' },
];

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any; label: string; path: string; active: boolean }) => (
  <Link to={path} className={`nav-link mb-2 ${active ? 'nav-link-active' : ''}`}>
    <Icon size={20} />
    <span className="font-semibold">{label}</span>
  </Link>
);

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="app-backdrop min-h-screen lg:flex">
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-slate-950/55 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside
        className={`sidebar-surface fixed inset-y-0 left-0 z-40 w-72 transform text-white transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-7">
            <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-white to-purple-100 text-[#6c4dff] shadow-lg shadow-black/20">
                <Sparkles size={24} strokeWidth={2.5} />
              </div>
              <div>
                <div className="text-[10px] font-extrabold uppercase tracking-[0.32em] text-white/45">PCMB</div>
                <span className="text-xl font-extrabold tracking-tight text-white">Academy</span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-2xl p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close navigation"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 py-6">
            {navItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={location.pathname === item.path}
              />
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <SidebarItem icon={Settings} label="Settings" path="/settings" active={location.pathname === '/settings'} />
            <button onClick={onLogout} className="nav-link mt-2 w-full text-rose-200 hover:text-white">
              <LogOut size={20} />
              <span className="font-semibold">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        <header className="topbar-surface sticky top-0 z-20 flex h-20 items-center justify-between px-4 md:px-6 xl:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="soft-button rounded-2xl p-3 lg:hidden" aria-label="Open navigation">
              <Menu size={22} />
            </button>
            <div className="lg:hidden">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-brand-600">PCMB</p>
              <p className="text-sm font-extrabold text-slate-950">Academy</p>
            </div>
            <div className="hidden lg:block">
              <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-brand-600">AI learning workspace</p>
              <div className="mt-1 flex text-sm text-slate-500">
                Welcome back,
                <span className="ml-1 font-bold text-slate-950">{user.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button disabled className="soft-button relative cursor-not-allowed rounded-2xl p-3 text-slate-400 opacity-70" aria-label="Notifications are not available yet" title="Notifications are not available yet">
              <Bell size={20} />
            </button>
            <div className="relative">
              <button type="button" onClick={() => setAccountOpen((open) => !open)} aria-label="Open account menu" aria-expanded={accountOpen} aria-haspopup="menu" className="rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 focus-visible:outline-offset-2">
                <UserAvatar name={user.name} avatar={user.avatar} size="md" />
              </button>
              {accountOpen && <div role="menu" className="absolute right-0 top-full z-40 mt-2 w-52 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                <p className="truncate px-3 py-2 text-xs font-semibold text-slate-500">{user.email}</p>
                <Link role="menuitem" to="/settings" onClick={() => setAccountOpen(false)} className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-brand-50 hover:text-brand-600">Profile & settings</Link>
                <button role="menuitem" onClick={onLogout} className="w-full rounded-xl px-3 py-2 text-left text-sm font-bold text-rose-700 hover:bg-rose-50">Sign out</button>
              </div>}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-4 pb-28 pt-5 md:px-6 lg:pb-8 xl:px-8">
          <div className="mx-auto w-full max-w-[1180px]">{children}</div>
        </main>

        <nav className="mobile-nav fixed inset-x-0 bottom-0 z-30 border-t border-white/70 bg-white/88 px-3 pt-2 shadow-[0_-18px_42px_-34px_rgba(40,24,92,0.52)] backdrop-blur-xl lg:hidden">
          <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
            {navItems.map(({ icon: Icon, label, path }) => {
              const active = location.pathname === path;

              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-bold transition-all ${
                    active ? 'bg-brand-50 text-brand-600 shadow-inner' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'
                  }`}
                >
                  <Icon size={20} strokeWidth={active ? 2.7 : 2.2} />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Layout;
