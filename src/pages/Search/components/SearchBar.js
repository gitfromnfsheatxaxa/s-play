import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './SearchBar.css';

function SearchBar({ query, keyboardActive, onActivate, onScrollToTop }) {
  const { ref, focused } = useFocusable({
    focusKey: 'SEARCH-BAR',
    // Do NOT activate keyboard on focus — keyboard only opens on Enter.
    // Activating on focus causes a mount re-render mid-navigation which
    // confuses Norigin and makes UP navigation from catalog feel broken.
    onFocus: () => {
      if (onScrollToTop) onScrollToTop();
    },
    onEnterPress: () => {
      if (onActivate) onActivate();
      // Defer focus to Q until keyboard has mounted and Norigin has measured it.
      setTimeout(() => setFocus('SEARCH-KEY-Q'), 50);
    },
    onArrowPress: (direction) => {
      if (direction === 'up')    return false;   // top of page
      if (direction === 'left')  return false;
      if (direction === 'right') return false;
      if (direction === 'down') {
        if (keyboardActive) {
          setFocus('SEARCH-KEY-Q');
          return false;
        }
        // Keyboard not open: navigate naturally to catalog below
        return true;
      }
      return true;
    },
  });

  return (
    <div ref={ref} className={`search-bar ${focused ? 'search-bar--focused' : ''} ${keyboardActive ? 'search-bar--active' : ''}`}>
      <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none">
        <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="2" />
        <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="search-bar__text-area">
        {query ? (
          <span className="search-bar__query">
            {query}
            {keyboardActive && <span className="search-bar__caret" />}
          </span>
        ) : keyboardActive ? (
          <span className="search-bar__caret" />
        ) : (
          <span className="search-bar__placeholder">Поиск по названию</span>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
