import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Home
} from 'lucide-react';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage('Please enter your email and password.');
      return;
    }

    // Authentication will be connected to the backend later.
    setMessage(
      'Login interface is ready. Authentication will be connected to the backend.'
    );
  };

  return (
    <div className="auth-page">
      <div className="auth-container">

        {/* Left Side */}
        <div className="auth-info">
          <Link to="/" className="auth-brand">
            <span className="auth-brand-icon">
              <Home size={22} />
            </span>

            <span>BestValueBuy</span>
          </Link>

          <div className="auth-info-content">
            <span className="auth-label">WELCOME BACK</span>

            <h1>
              Find the right property.
              <br />
              Get the best value.
            </h1>

            <p>
              Login to manage your properties, shortlist your favourites,
              and continue your property search.
            </p>

            <div className="auth-benefits">
              <div className="auth-benefit">
                <span>
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <strong>Verified Listings</strong>
                  <small>Explore trusted property listings.</small>
                </div>
              </div>

              <div className="auth-benefit">
                <span>
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <strong>Manage Your Properties</strong>
                  <small>Post, edit and manage your listings.</small>
                </div>
              </div>

              <div className="auth-benefit">
                <span>
                  <ShieldCheck size={19} />
                </span>
                <div>
                  <strong>Save Your Favourites</strong>
                  <small>Shortlist properties you like.</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="auth-card-wrapper">
          <div className="auth-card">

            <div className="auth-card-header">
              <h2>Login</h2>

              <p>
                Welcome back! Please enter your details.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="auth-field">
                <label htmlFor="email">
                  Email Address
                </label>

                <div className="auth-input-wrapper">
                  <Mail size={18} />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMessage('');
                    }}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                      setMessage('Password reset will be available soon.')
                    }
                  >
                    Forgot Password?
                  </button>
                </div>

                <div className="auth-input-wrapper">
                  <LockKeyhole size={18} />

                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setMessage('');
                    }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    aria-label={
                      showPassword
                        ? 'Hide password'
                        : 'Show password'
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="auth-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <span>Remember me</span>
                </label>
              </div>

              {/* Message */}
              {message && (
                <div className="auth-message">
                  {message}
                </div>
              )}

              {/* Login */}
              <button
                type="submit"
                className="auth-submit-btn"
              >
                Login
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Register */}
            <div className="auth-register">
              <span>Don't have an account?</span>

              <Link to="/register">
                Create an account
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}