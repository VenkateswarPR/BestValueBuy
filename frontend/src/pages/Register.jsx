import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRound, Mail, LockKeyhole, Eye, EyeOff, Building2 } from 'lucide-react';
import { registerDemoUser } from '../utils/demoAuth';
import '../styles/auth-shortlist.css';

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (password.length < 6) { setError('Password must contain at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    try {
      registerDemoUser({ name, email, password });
      navigate('/properties', { replace: true });
    } catch (err) { setError(err.message || 'Unable to create account.'); }
  };

  return (
    <main className="bvb-auth-page">
      <section className="bvb-auth-card">
        <div className="bvb-auth-brand"><span className="bvb-auth-logo"><Building2 size={21} /></span><span>Best<span>Value</span>Buy</span></div>
        <h1>Create your account</h1>
        <p className="bvb-auth-subtitle">Save properties and manage your property listings in one place.</p>
        {error && <div className="bvb-auth-error" role="alert">{error}</div>}
        <form onSubmit={handleSubmit} className="bvb-auth-form">
          <label htmlFor="register-name">Full name</label>
          <div className="bvb-auth-input-wrap"><UserRound size={18} /><input id="register-name" autoComplete="name" required value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" /></div>
          <label htmlFor="register-email">Email address</label>
          <div className="bvb-auth-input-wrap"><Mail size={18} /><input id="register-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div>
          <label htmlFor="register-password">Password</label>
          <div className="bvb-auth-input-wrap"><LockKeyhole size={18} /><input id="register-password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" /><button type="button" className="bvb-auth-eye" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          <label htmlFor="register-confirm-password">Confirm password</label>
          <div className="bvb-auth-input-wrap"><LockKeyhole size={18} /><input id="register-confirm-password" type="password" autoComplete="new-password" required minLength={6} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" /></div>
          <button className="bvb-auth-submit" type="submit">Create Account</button>
        </form>
        <p className="bvb-auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
        <p className="bvb-auth-demo-note">Demo mode: account details are stored in this browser only. Do not use a real password.</p>
      </section>
    </main>
  );
}
