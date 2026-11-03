import React from 'react';
import { Atom, BookOpen, FlaskConical, Pi, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const subjects = [
  { name: 'Physics', Icon: Atom, tone: 'bg-violet-50 text-brand-600' },
  { name: 'Chemistry', Icon: FlaskConical, tone: 'bg-fuchsia-50 text-fuchsia-600' },
  { name: 'Mathematics', Icon: Pi, tone: 'bg-blue-50 text-blue-600' },
  { name: 'Biology', Icon: Sprout, tone: 'bg-emerald-50 text-emerald-600' },
];

const Courses = () => (
  <div className="space-y-6">
    <section className="deep-purple-gradient rounded-[34px] p-6 text-white shadow-[0_26px_64px_-38px_rgba(108,77,255,0.82)] md:p-8">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-bold text-white/82"><BookOpen size={14} /> Course library</span>
      <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">Learn at your own pace</h1>
      <p className="mt-3 max-w-xl text-sm leading-7 text-white/76">Courses, chapters, and learning materials will appear here when your institute publishes them.</p>
    </section>
    <section aria-label="Courses by subject" className="grid gap-4 sm:grid-cols-2">
      {subjects.map(({ name, Icon, tone }) => (
        <article key={name} className="premium-card rounded-[28px] p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${tone}`}><Icon size={23} /></div>
            <div><h2 className="text-lg font-extrabold text-slate-950">{name}</h2><p className="text-sm text-slate-500">Course library</p></div>
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-4">
            <p className="text-sm font-bold text-slate-700">No courses available yet.</p>
            <p className="mt-1 text-sm leading-6 text-slate-500">Your institute hasn’t published any {name} courses yet.</p>
          </div>
          <Link to="/quizzes" className="mt-4 inline-flex rounded-xl px-1 py-2 text-sm font-bold text-brand-600 hover:text-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600">View practice availability</Link>
        </article>
      ))}
    </section>
  </div>
);

export default Courses;
