import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  Heart,
  Plus,
  UserRound,
  Menu,
  X
} from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const location = useLocation();

  /*
    =================================================
    BUY / RENT ACTIVE STATE
    =================================================

    /properties
      → Buy Property active

    /properties?listing=rent
      → Rent active
  */

  const searchParams = new URLSearchParams(location.search);

  const isRentPage =
    location.pathname === '/properties' &&
    searchParams.get('listing') === 'rent';

  const isBuyPage =
    location.pathname === '/properties' &&
    !isRentPage;

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <header className="header">

      <div className="header-wrap">

        {/* =================================================
            LOGO
        ================================================= */}

        <Link
          to="/"
          className="brand"
          onClick={closeMobileMenu}
        >
          <span className="brand-mark">
            BV
          </span>

          <span className="brand-name">
            Best<span>Value</span>Buy
          </span>
        </Link>


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <nav className="desktop-nav">

          {/* BUY PROPERTY */}

          <NavLink
            to="/properties"
            className={`nav-link ${isBuyPage ? 'active' : ''}`}
          >
            Buy Property
          </NavLink>


          {/* RENT */}

          <NavLink
            to="/properties?listing=rent"
            className={`nav-link ${isRentPage ? 'active' : ''}`}
          >
            Rent
          </NavLink>


          {/* SELL PROPERTY */}

          <NavLink
            to="/post-property"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Sell Property
          </NavLink>

        </nav>


        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="header-actions">

          {/* SHORTLIST */}

          <Link
            to="/dashboard"
            className="shortlist-link"
          >
            <Heart size={19} />

            <span>
              Shortlist
            </span>
          </Link>


          {/* POST PROPERTY */}

          <Link
            to="/post-property"
            className="post-property-btn"
          >
            <Plus size={18} />

            <span>
              Post Property
            </span>
          </Link>


          {/* LOGIN */}

          <Link
            to="/login"
            className="login-link"
          >
            <UserRound size={18} />

            <span>
              Login
            </span>
          </Link>

        </div>


        {/* =================================================
            MOBILE MENU BUTTON
        ================================================= */}

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>

      </div>


      {/* =================================================
          MOBILE NAVIGATION
      ================================================= */}

      {mobileOpen && (

        <div className="mobile-menu">

          {/* BUY PROPERTY */}

          <NavLink
            to="/properties"
            className={`mobile-nav-link ${isBuyPage ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Buy Property
          </NavLink>


          {/* RENT */}

          <NavLink
            to="/properties?listing=rent"
            className={`mobile-nav-link ${isRentPage ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            Rent
          </NavLink>


          {/* SELL PROPERTY */}

          <NavLink
            to="/post-property"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Sell Property
          </NavLink>


          {/* SHORTLIST */}

          <Link
            to="/dashboard"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <Heart size={18} />
            Shortlist
          </Link>


          {/* LOGIN */}

          <Link
            to="/login"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <UserRound size={18} />
            Login
          </Link>


          {/* POST PROPERTY */}

          <Link
            to="/post-property"
            className="mobile-post-btn"
            onClick={closeMobileMenu}
          >
            <Plus size={18} />
            Post Property
          </Link>

        </div>

      )}

    </header>
  );
}