import React from 'react';
import Focusable from '../common/Focusable';
import './NavBar.css';

/**
 * NavBar Component
 * 
 * Main navigation bar for the TV app with logo and navigation items.
 * Supports horizontal navigation with arrow keys.
 */
function NavBar({ items = [], onNavigate, onSearchToggle }) {
  const defaultItems = [
    { id: 'nav-home', label: 'Home', path: '/' },
    { id: 'nav-movies', label: 'Movies', path: '/movies' },
    { id: 'nav-series', label: 'Series', path: '/series' },
    { id: 'nav-new', label: 'New & Popular', path: '/new' },
    { id: 'nav-mylist', label: 'My List', path: '/mylist' },
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  const handleNavigate = (item) => {
    if (onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        {/* Logo */}
        <Focusable
          id="nav-logo"
          className="navbar-logo"
          role="link"
          aria-label="Go to home"
          onSelect={() => handleNavigate({ path: '/', label: 'Home' })}
        >
          <span className="logo-text">STREAMFLIX</span>
        </Focusable>

        {/* Navigation Items */}
        <ul className="navbar-nav" role="menubar">
          {navItems.map((item) => (
            <li key={item.id} role="none">
              <Focusable
                id={item.id}
                role="menuitem"
                className="navbar-item"
                onSelect={() => handleNavigate(item)}
                aria-label={item.label}
              >
                <span className="navbar-item-label">{item.label}</span>
              </Focusable>
            </li>
          ))}
        </ul>

        {/* Search and Profile */}
        <div className="navbar-actions">
          <Focusable
            id="nav-search"
            className="navbar-icon"
            role="button"
            aria-label="Search"
            onSelect={onSearchToggle}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </Focusable>

          <Focusable
            id="nav-profile"
            className="navbar-profile"
            role="button"
            aria-label="Profile"
          >
            <div className="profile-avatar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </Focusable>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;