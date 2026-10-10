import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Plus, UserRound, LogOut, Menu, X, ChevronDown, House, CircleUserRound } from 'lucide-react';
import { getCurrentUser, logoutDemoUser } from '../utils/demoAuth';

export default function Header() {
  const [user, setUser] = useState(() => getCurrentUser());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const refreshUser = () => setUser(getCurrentUser());
    window.addEventListener('bvb-auth-change', refreshUser);
    window.addEventListener('storage', refreshUser);
    return () => {
      window.removeEventListener('bvb-auth-change', refreshUser);
      window.removeEventListener('storage', refreshUser);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) setAccountOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setAccountOpen(false);
    };
    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  const handleLogout = () => {
    logoutDemoUser();
    setUser(null);
    setAccountOpen(false);
    setMobileOpen(false);
    navigate('/', { replace: true });
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`;
  const displayName = user?.name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="header">
      <div className="header-wrap">
        <Link to="/" className="brand" aria-label="BestValueBuy home">
          <span className="brand-mark">BVB</span>
          <span className="brand-name">BestValue<span>Buy</span></span>
        </Link>

        <nav className={`desktop-nav${mobileOpen ? ' mobile-nav-open' : ''}`} aria-label="Main navigation">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/properties" className={linkClass}>Buy</NavLink>
          <NavLink to="/properties?listing=rent" className={linkClass}>Rent</NavLink>
        </nav>

        <div className="header-actions">
          <Link to={user ? '/post-property' : '/login'} className="post-property-btn">
            <Plus size={17} /> Post Property
          </Link>

          {user ? (
            <div className="header-account" ref={accountRef}>
              <button
                type="button"
                className={`header-account-trigger${accountOpen ? ' is-open' : ''}`}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                onClick={() => setAccountOpen(value => !value)}
                title="Open account menu"
              >
                <UserRound size={16} />
                <span className="header-account-name">{displayName}</span>
                <ChevronDown size={14} className="header-account-chevron" />
              </button>

              {accountOpen && (
                <div className="account-dropdown" role="menu">
                  <div className="account-dropdown-profile">
                    <span className="account-avatar"><UserRound size={20} /></span>
                    <span className="account-profile-text">
                      <strong>{displayName}</strong>
                      <small>{user.email}</small>
                    </span>
                  </div>
                  <div className="account-dropdown-divider" />
                  <div className="account-details" aria-label="Account details">
                    <span className="account-section-label">ACCOUNT DETAILS</span>
                    <span><strong>Name</strong><span>{displayName}</span></span>
                    <span><strong>Email</strong><span>{user.email || 'Not provided'}</span></span>
                  </div>
                  <div className="account-dropdown-divider" />
                  <Link to="/dashboard" role="menuitem" className="account-dropdown-link">
                    <House size={17} /><span>My Properties</span>
                  </Link>
                  <Link to="/shortlist" role="menuitem" className="account-dropdown-link">
                    <Heart size={17} /><span>Shortlisted Properties</span>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link">
              <UserRound size={17} /> <span>Login</span>
            </Link>
          )}

          {user && (
            <button type="button" className="header-logout-btn" onClick={handleLogout} title="Logout">
              <LogOut size={16} /> <span>Logout</span>
            </button>
          )}
        </div>

        <button
          type="button"
          className="mobile-menu-btn"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(value => !value)}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </header>
  );
}
