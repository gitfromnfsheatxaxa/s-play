import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './SearchBar.css';

function SearchBar({
  query,
  value,
  keyboardActive = false,
  active = keyboardActive,
  showCaretOnFocus = false,
  onActivate,
  onScrollToTop,
  downFocusKey = 'SEARCH-CARD-movie-1',
  focusKey = 'SEARCH-BAR',
  leftFocusKey = 'NAV-SEARCH',
  rightFocusKey,
  upFocusKey,
  enterFocusKey = 'SEARCH-KEY-FIRST',
  placeholder = 'Поиск по названию',
  showSearchIcon = true,
}) {
  const textValue = value ?? query ?? '';

  const { ref, focused } = useFocusable({
    focusKey,
    onFocus: () => {
      if (onScrollToTop) onScrollToTop();
    },
    onEnterPress: () => {
      if (onActivate) onActivate();
      if (enterFocusKey) {
        setTimeout(() => setFocus(enterFocusKey), 50);
      }
    },
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus(upFocusKey || focusKey);
        return false;
      }
      if (direction === 'left') {
        setFocus(leftFocusKey || focusKey);
        return false;
      }
      if (direction === 'right') {
        setFocus(rightFocusKey || focusKey);
        return false;
      }
      if (direction === 'down') {
        if (keyboardActive && enterFocusKey) {
          setFocus(enterFocusKey);
          return false;
        }
        setFocus(downFocusKey || focusKey);
        return false;
      }
      return true;
    },
  });

  const showTypingState = active || (showCaretOnFocus && focused);

  return (
    <div
      ref={ref}
      className={`search-bar ${focused ? 'search-bar--focused' : ''} ${showTypingState ? 'search-bar--active' : ''}`}
    >
      {showSearchIcon && (
        <svg className="search-bar__icon" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7.5" stroke="currentColor" strokeWidth="2" />
          <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      <div className="search-bar__text-area">
        {textValue ? (
          <span className="search-bar__query">
            {textValue}
            {showTypingState && <span className="search-bar__caret" />}
          </span>
        ) : showTypingState ? (
          <span className="search-bar__caret" />
        ) : (
          <span className="search-bar__placeholder">{placeholder}</span>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
