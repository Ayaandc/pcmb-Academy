import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BrainCircuit, BookOpenCheck } from 'lucide-react';

const Practice = () => (
  <div className="space-y-6">
    <section className="deep-purple-gradient rounded-[34px] p-6 text-white shadow-[0_26px_64px_-38px_rgba(108,77,255,0.82)] md:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-bold text-white/82"><BrainCircuit size={14} /> Practice</span>
      <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">Practice with institute material</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-white/76">Practice sets and questions will appear here after your institute publishes them.</p>
    </section>
    <section className="premium-card rounded-[30px] px-6 py-12 text-center md:px-10" aria-live="polite">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><BookOpenCheck size={26} /></div>
      <h2 className="mt-5 text-xl font-extrabold text-slate-950">No practice material available yet.</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Your institute hasn’t added any practice questions yet. When questions are available, you’ll be able to work through them here.</p>
      <Link to="/courses" className="mt-5 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold text-brand-600 hover:bg-brand-50"><ArrowLeft size={16} /> Browse courses</Link>
    </section>
  </div>
);

export default Practice;
