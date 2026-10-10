import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LockKeyhole, Mail, Eye, EyeOff, Building2 } from 'lucide-react';
import { loginDemoUser } from '../utils/demoAuth';
import '../styles/auth-shortlist.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setBusy(true);
    try {
      loginDemoUser({ email, password });
      const destination = location.state?.from || '/properties';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    } finally { setBusy(false); }
  };

  return (
    <main className="bvb-auth-page">
      <section className="bvb-auth-card">
        <div className="bvb-auth-brand"><span className="bvb-auth-logo"><Building2 size={21} /></span><span>Best<span>Value</span>Buy</span></div>
        <h1>Welcome back</h1>
        <p className="bvb-auth-subtitle">Log in to shortlist properties and manage your listings.</p>
        {error && <div className="bvb-auth-error" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="bvb-auth-form">
          <label htmlFor="login-email">Email address</label>
          <div className="bvb-auth-input-wrap"><Mail size={18} /><input id="login-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
          <label htmlFor="login-password">Password</label>
          <div className="bvb-auth-input-wrap"><LockKeyhole size={18} /><input id="login-password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" /><button type="button" className="bvb-auth-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          <button className="bvb-auth-submit" type="submit" disabled={busy}>{busy ? 'Logging in…' : 'Log In'}</button>
        </form>
        <p className="bvb-auth-switch">Don't have an account? <Link to="/register">Create account</Link></p>
        <p className="bvb-auth-demo-note">Demo mode: account details are stored in this browser only. Do not use a real password.</p>
      </section>
    </main>
  );
}
