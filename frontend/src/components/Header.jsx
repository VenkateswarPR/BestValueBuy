import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Heart,
  Plus,
  UserRound,
  Menu,
  X
} from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          <NavLink
			  to="/properties"
			  end
			  className={({ isActive }) =>
				`nav-link ${isActive ? 'active' : ''}`
			  }
			>
			  Buy Property
			</NavLink>

          <NavLink
            to="/properties?listing=rent"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Rent
          </NavLink>

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

          <Link
            to="/dashboard"
            className="shortlist-link"
          >
            <Heart size={19} />

            <span>
              Shortlist
            </span>
          </Link>


          <Link
            to="/post-property"
            className="post-property-btn"
          >
            <Plus size={18} />

            <span>
              Post Property
            </span>
          </Link>


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

          <NavLink
            to="/properties"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Buy Property
          </NavLink>


          <NavLink
            to="/properties?listing=rent"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Rent
          </NavLink>


          <NavLink
            to="/post-property"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
            onClick={closeMobileMenu}
          >
            Sell Property
          </NavLink>


          <Link
            to="/dashboard"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <Heart size={18} />
            Shortlist
          </Link>


          <Link
            to="/login"
            className="mobile-nav-link"
            onClick={closeMobileMenu}
          >
            <UserRound size={18} />
            Login
          </Link>


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