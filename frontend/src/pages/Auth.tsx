import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { login, register } from '../services/api';
import { User } from '../types';

const Auth: React.FC<{ mode: 'login' | 'signup'; onAuthenticated: (user: User) => void }> = ({ mode, onAuthenticated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isSignup = mode === 'signup';

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignup) {
        await register(name, email, password);
        navigate('/login', { replace: true, state: { message: 'Account created. Please sign in.' } });
        return;
      }
      const user = await login(email, password);
      onAuthenticated(user);
      navigate((location.state as { from?: string } | null)?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to continue. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <main className="landing-shell flex min-h-screen items-center justify-center p-4">
    <section className="premium-card w-full max-w-md rounded-[32px] p-6 md:p-8">
      <Link to="/" className="flex items-center gap-3 text-slate-950"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white"><Sparkles size={22} /></span><span className="text-xl font-extrabold">PCMB Academy</span></Link>
      <h1 className="mt-8 text-3xl font-extrabold text-slate-950">{isSignup ? 'Create your account' : 'Welcome back'}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-500">{isSignup ? 'Start learning with your personal PCMB workspace.' : 'Sign in to continue learning.'}</p>
      {location.state && (location.state as { message?: string }).message && <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">{(location.state as { message: string }).message}</p>}
      {error && <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">{error}</p>}
      <form className="mt-6 space-y-4" onSubmit={submit}>
        {isSignup && <label className="block text-sm font-bold text-slate-700">Name<input value={name} onChange={(e) => setName(e.target.value)} required maxLength={80} autoComplete="name" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /></label>}
        <label className="block text-sm font-bold text-slate-700">Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /></label>
        <label className="block text-sm font-bold text-slate-700">Password<span className="relative mt-2 block"><input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} autoComplete={isSignup ? 'new-password' : 'current-password'} className="w-full rounded-2xl border border-slate-200 px-4 py-3 pr-12 outline-none focus:border-brand-500 focus:ring-4 focus:ring-brand-50" /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'} aria-pressed={showPassword} className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600">{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button></span>{isSignup && <span className="mt-1 block text-xs font-medium text-slate-400">Use at least 8 characters.</span>}</label>
        <button disabled={loading} className="primary-button w-full rounded-2xl px-5 py-3.5 text-sm font-extrabold disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Please wait…' : isSignup ? 'Create account' : 'Sign in'}</button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">{isSignup ? 'Already have an account?' : 'New to PCMB Academy?'} <Link className="font-extrabold text-brand-600" to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Sign in' : 'Create an account'}</Link></p>
    </section>
  </main>;
};

export default Auth;
