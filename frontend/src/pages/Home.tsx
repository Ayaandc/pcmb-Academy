import React from 'react';
import { ArrowRight, Atom, BookOpen, Bot, BrainCircuit, CalendarDays, CheckCircle2, FlaskConical, Pi, Sparkles, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const subjects = [
  { icon: Atom, label: 'Physics' },
  { icon: FlaskConical, label: 'Chemistry' },
  { icon: Pi, label: 'Mathematics' },
  { icon: Sprout, label: 'Biology' },
];

const Home = () => (
  <div className="landing-shell min-h-screen px-4 py-6 md:px-6 xl:px-8">
    <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-[1180px] flex-col">
      <header className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-[22px] bg-white text-brand-600 shadow-lg shadow-brand-100"><Sparkles size={24} /></span><span><span className="block text-xl font-extrabold tracking-tight text-slate-950">PCMB</span><span className="-mt-1 block text-[10px] font-extrabold uppercase tracking-[0.32em] text-slate-400">Academy</span></span></Link>
        <Link to="/login" className="soft-button rounded-full px-4 py-2.5 text-sm font-bold text-slate-800">Login</Link>
      </header>
      <main className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 xl:gap-16">
        <section className="animate-slide-up">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/84 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-600 shadow-sm"><Sparkles size={14} /> AI-powered PCMB learning</div>
          <h1 className="mt-7 max-w-xl text-5xl font-extrabold leading-[1.04] text-slate-950 md:text-6xl">Learn with clarity.<span className="block bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">Grow with your institute.</span></h1>
          <div className="mt-4 h-1.5 w-20 rounded-full bg-gradient-to-r from-brand-600 to-brand-500" />
          <p className="mt-7 max-w-md text-base leading-8 text-slate-600">A student learning space for Physics, Chemistry, Mathematics, and Biology, with an AI tutor and institute-published courses, practice, and classes.</p>
          <div className="mt-7 grid gap-3">{['Ask the AI Tutor for step-by-step explanations', 'Access learning material published by your institute', 'Use the same workspace on mobile or desktop'].map((item) => <div key={item} className="flex items-center gap-3 text-sm font-semibold text-slate-700"><CheckCircle2 className="text-emerald-500" size={19} />{item}</div>)}</div>
          <Link to="/signup" className="primary-button mt-9 inline-flex w-full items-center justify-center gap-3 rounded-[24px] px-7 py-4 text-sm font-extrabold sm:w-auto">Create your account<span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6c4dff]"><ArrowRight size={18} /></span></Link>
          <p className="mt-4 text-xs font-medium text-slate-500">Courses, practice, and classes appear here when your institute publishes them.</p>
        </section>
        <section className="relative mx-auto w-full max-w-[470px]" aria-label="PCMB Academy learning areas">
          <div className="absolute inset-x-4 top-10 h-72 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
          <div className="premium-card relative rounded-[38px] p-5 shadow-[0_34px_86px_-48px_rgba(40,24,92,0.58)] sm:p-7">
            <div className="deep-purple-gradient rounded-[30px] p-6 text-white">
              <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/18"><Bot size={24} /></span><div><p className="text-xs font-bold text-white/65">Your learning companion</p><h2 className="text-xl font-extrabold">AI Tutor</h2></div></div>
              <p className="mt-4 text-sm leading-6 text-white/78">Ask a question and get a clear explanation from your protected Gemini-powered tutor.</p>
              <Link to="/login" className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#6c4dff]">Sign in to ask <ArrowRight size={16} /></Link>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {subjects.map(({ icon: Icon, label }) => <div key={label} className="flex items-center gap-3 rounded-[20px] bg-white p-3 shadow-[0_14px_32px_-26px_rgba(40,24,92,0.45)]"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon size={20} /></span><span className="text-sm font-extrabold text-slate-800">{label}</span></div>)}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[{ icon: BookOpen, label: 'Courses' }, { icon: BrainCircuit, label: 'Practice' }, { icon: CalendarDays, label: 'Classes' }].map(({ icon: Icon, label }) => <div key={label} className="rounded-[20px] bg-slate-50 p-4 text-center"><Icon className="mx-auto text-brand-600" size={21} /><p className="mt-2 text-xs font-bold text-slate-700">{label}</p><p className="mt-1 text-[10px] font-medium text-slate-400">Institute-published</p></div>)}
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
);

export default Home;
