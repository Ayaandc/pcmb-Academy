import React from 'react';
import { ArrowRight, BookOpen, CalendarDays, MessageCircleQuestion, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { AcademyAvatar } from '../components/Avatars';

const Dashboard: React.FC<{ user: User }> = ({ user }) => (
  <div className="space-y-6">
    <section className="animate-slide-up">
      <h1 className="text-3xl font-extrabold text-slate-950">Hi, {user.name}!</h1>
      <p className="mt-1 text-sm font-medium text-slate-500">Your learning workspace is ready.</p>
    </section>
    <section className="deep-purple-gradient relative overflow-hidden rounded-[32px] p-5 text-white shadow-[0_26px_64px_-36px_rgba(108,77,255,0.78)] md:p-7">
      <div className="relative z-10 max-w-lg">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/16 px-3 py-1 text-xs font-bold text-white/82"><Sparkles size={14} /> AI tutor</div>
        <h2 className="text-2xl font-extrabold md:text-3xl">Questions are welcome</h2>
        <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">Ask your AI Tutor for help with Physics, Chemistry, Mathematics, or Biology.</p>
        <Link to="/ai-tutor" className="primary-button mt-6 inline-flex min-h-12 items-center justify-center gap-3 rounded-2xl px-5 py-3 text-sm font-extrabold !text-white">Open AI Tutor <ArrowRight size={17} /></Link>
      </div>
      <div className="absolute bottom-5 right-6 hidden md:block"><AcademyAvatar size="lg" online className="h-28 w-28 text-brand-600 shadow-2xl shadow-black/20" /></div>
    </section>
    <section>
      <h2 className="mb-3 text-base font-extrabold text-slate-950">Your learning space</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { Icon: BookOpen, title: 'Courses', description: 'Courses and study material from your institute will show here.', href: '/courses', action: 'Browse courses' },
          { Icon: MessageCircleQuestion, title: 'Practice', description: 'Practice sets will be available when your institute adds questions.', href: '/quizzes', action: 'Check practice' },
          { Icon: CalendarDays, title: 'Classes', description: 'Your institute’s scheduled classes will show here.', href: '/live', action: 'View classes' },
        ].map(({ Icon, title, description, href, action }) => (
          <article key={title} className="premium-card rounded-[26px] p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><Icon size={22} /></div>
            <h3 className="mt-4 text-base font-extrabold text-slate-950">{title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">{description}</p>
            <Link to={href} className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-600">{action}<ArrowRight size={15} /></Link>
          </article>
        ))}
      </div>
    </section>
    <section className="premium-card rounded-[26px] p-5" aria-label="Learning activity">
      <h2 className="text-base font-extrabold text-slate-950">Learning activity</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">No activity yet. Start learning to see your activity here.</p>
    </section>
  </div>
);

export default Dashboard;
