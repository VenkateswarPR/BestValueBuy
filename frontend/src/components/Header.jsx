import React, { useState } from 'react';
import {
  Link,
  useLocation
} from 'react-router-dom';

import {
  Heart,
  Plus,
  UserRound,
  Menu,
  X,
  Building2
} from 'lucide-react';


export default function Header() {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const location =
    useLocation();


  /* =================================================
     BUY / RENT ACTIVE STATE
  ================================================= */

  const searchParams =
    new URLSearchParams(
      location.search
    );


  const isRentPage =
    location.pathname === '/properties' &&
    searchParams.get('listing') === 'rent';


  const isBuyPage =
    location.pathname === '/properties' &&
    !isRentPage;


  const isDashboardPage =
    location.pathname === '/dashboard';


  const isShortlistPage =
    location.pathname === '/shortlist';


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

          <Link
            to="/properties"
            className={
              `nav-link ${
                isBuyPage
                  ? 'active'
                  : ''
              }`
            }
          >
            Buy Property
          </Link>


          {/* RENT */}

          <Link
            to="/properties?listing=rent"
            className={
              `nav-link ${
                isRentPage
                  ? 'active'
                  : ''
              }`
            }
          >
            Rent
          </Link>


         
        </nav>


        {/* =================================================
            DESKTOP ACTIONS
        ================================================= */}

        <div className="header-actions">


          {/* SHORTLIST */}

          <Link
            to="/shortlist"
            className={
              `shortlist-link ${
                isShortlistPage
                  ? 'active'
                  : ''
              }`
            }
          >

            <Heart size={19} />

            <span>
              Shortlist
            </span>

          </Link>


          {/* MY PROPERTIES */}

          <Link
            to="/dashboard"
            className={
              `my-properties-link ${
                isDashboardPage
                  ? 'active'
                  : ''
              }`
            }
          >

            <Building2 size={18} />

            <span>
              My Properties
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
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          aria-label="Toggle navigation"
          aria-expanded={
            mobileOpen
          }
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

          <Link
            to="/properties"
            className={
              `mobile-nav-link ${
                isBuyPage
                  ? 'active'
                  : ''
              }`
            }
            onClick={
              closeMobileMenu
            }
          >
            Buy Property
          </Link>


          {/* RENT */}

          <Link
            to="/properties?listing=rent"
            className={
              `mobile-nav-link ${
                isRentPage
                  ? 'active'
                  : ''
              }`
            }
            onClick={
              closeMobileMenu
            }
          >
            Rent
          </Link>


          


          {/* SHORTLIST */}

          <Link
            to="/shortlist"
            className={
              `mobile-nav-link ${
                isShortlistPage
                  ? 'active'
                  : ''
              }`
            }
            onClick={
              closeMobileMenu
            }
          >

            <Heart size={18} />

            Shortlist

          </Link>


          {/* MY PROPERTIES */}

          <Link
            to="/dashboard"
            className={
              `mobile-nav-link ${
                isDashboardPage
                  ? 'active'
                  : ''
              }`
            }
            onClick={
              closeMobileMenu
            }
          >

            <Building2 size={18} />

            My Properties

          </Link>


          {/* LOGIN */}

          <Link
            to="/login"
            className="mobile-nav-link"
            onClick={
              closeMobileMenu
            }
          >

            <UserRound size={18} />

            Login

          </Link>


          {/* POST PROPERTY */}

          <Link
            to="/post-property"
            className="mobile-post-btn"
            onClick={
              closeMobileMenu
            }
          >

            <Plus size={18} />

            Post Property

          </Link>

        </div>

      )}

    </header>

  );
}