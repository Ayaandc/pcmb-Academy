import React from 'react';
import { KeyRound, LogOut, ShieldCheck, UserRound } from 'lucide-react';
import { User } from '../types';
import { UserAvatar } from '../components/Avatars';

const Settings: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => (
  <div className="space-y-6">
    <section>
      <h1 className="text-3xl font-extrabold text-slate-950">Settings & account</h1>
      <p className="mt-1 text-sm text-slate-500">Your account details and security options.</p>
    </section>
    <section className="premium-card rounded-[30px] p-5 md:p-7">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
        <UserAvatar name={user.name} avatar={user.avatar} size="lg" />
        <div><h2 className="text-lg font-extrabold text-slate-950">Profile</h2><p className="text-sm text-slate-500">Your signed-in account</p></div>
      </div>
      <dl className="grid gap-5 pt-5 sm:grid-cols-2">
        <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Name</dt><dd className="mt-1 text-sm font-semibold text-slate-800">{user.name}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</dt><dd className="mt-1 break-all text-sm font-semibold text-slate-800">{user.email}</dd></div>
        <div><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">Account type</dt><dd className="mt-1 text-sm font-semibold capitalize text-slate-800">{(user.role || 'STUDENT').toLowerCase()}</dd></div>
      </dl>
    </section>
    <section className="premium-card rounded-[30px] p-5 md:p-7">
      <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"><ShieldCheck size={21} /></div><div><h2 className="text-base font-extrabold text-slate-950">Security</h2><p className="text-sm text-slate-500">Your account is protected with a password.</p></div></div>
      <div className="mt-4 flex items-start gap-3 rounded-2xl bg-slate-50 p-4"><KeyRound size={18} className="mt-0.5 shrink-0 text-slate-400" /><p className="text-sm leading-6 text-slate-600">Password changes and password recovery aren’t available yet. Contact your institute for account help.</p></div>
    </section>
    <section className="premium-card flex flex-col gap-4 rounded-[30px] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
      <div className="flex items-center gap-3"><UserRound size={20} className="text-slate-400" /><div><h2 className="text-sm font-extrabold text-slate-950">Sign out</h2><p className="text-sm text-slate-500">End this session on this device.</p></div></div>
      <button onClick={onLogout} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-extrabold text-rose-700 hover:bg-rose-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-rose-600"><LogOut size={17} /> Sign out</button>
    </section>
  </div>
);

export default Settings;
