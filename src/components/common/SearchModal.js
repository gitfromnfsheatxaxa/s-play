import React, { useState, useCallback, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import { searchContent } from '../../services/mockDataService';
import './Modal.css';

/**
 * SearchModal Component
 * 
 * TV-friendly search modal with on-screen keyboard support.
 * Users can navigate with arrow keys and select characters.
 * 
 * TV-Specific Design:
 * - Large, easily focusable character buttons
 * - Clear visual feedback on focus
 * - Keyboard input support for desktop testing
 * - Back button for easy navigation
 */

const KEYBOARD_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

const SPECIAL_KEYS = [
  { key: 'SPACE', label: 'Space', width: 3 },
  { key: 'BACKSPACE', label: '←', width: 2 },
];

function SearchModal({ isOpen, onClose, onSearch }) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSearchResults(null);
      return;
    }

    const timer = setTimeout(() => {
      if (query.trim()) {
        setIsSearching(true);
        try {
          const results = searchContent(query);
          setSearchResults({ all: results });
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults({ all: [] });
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults(null);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  const { ref: modalRef, focusKey: modalFocusKey, focusSelf } = useFocusable({
    focusKey: 'MODAL-SEARCH',
    trackChildren: true,
    isFocusBoundary: true, // traps focus inside modal while open
  });

  // Direct focus into modal as soon as it opens
  useEffect(() => {
    if (isOpen) focusSelf();
  }, [isOpen, focusSelf]);

  const handleKeyPress = useCallback((char) => {
    setQuery((prev) => prev + char);
  }, []);

  const handleBackspace = useCallback(() => {
    setQuery((prev) => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setSearchResults(null);
  }, []);

  const handleSubmit = useCallback(() => {
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      }
      // Focus first result if available
      if (searchResults && searchResults.all.length > 0) {
        setTimeout(() => {
          setFocus('search-result-0');
        }, 100);
      }
    }
  }, [query, onSearch, searchResults]);

  // Handle physical keyboard input for desktop testing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        handleSubmit();
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key.length === 1 && /[a-zA-Z0-9 ]/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleSubmit, handleBackspace, handleKeyPress, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        ref={modalRef}
        className="modal search-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <FocusContext.Provider value={modalFocusKey}>
          {/* Header */}
          <div className="modal-header">
            <h2 className="modal-title">Search</h2>
            <button className="modal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Search Input Display */}
          <div className="search-input-display">
            <span className="search-input-text">{query || 'Type to search...'}</span>
            {query && (
              <button className="search-clear" onClick={handleClear}>
                Clear
              </button>
            )}
          </div>

          {/* Search Results */}
          {isSearching && (
            <div className="search-loading">
              <span className="loading-spinner">...</span>
              <span>Searching...</span>
            </div>
          )}
          {searchResults && !isSearching && (
            <div className="search-results">
              <h3>Results ({searchResults.all.length})</h3>
              {searchResults.all.length === 0 ? (
                <div className="search-no-results">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <div className="search-results-grid">
                  {searchResults.all.map((item, index) => (
                    <SearchResultItem 
                      key={item.id} 
                      index={index}
                      item={item} 
                      onSelect={() => {
                        onClose();
                        if (onSearch) onSearch(query);
                      }} 
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Virtual Keyboard */}
          <div className="virtual-keyboard">
            {KEYBOARD_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="keyboard-row">
                {row.map((char) => (
                  <KeyboardKey
                    key={char}
                    char={char}
                    onClick={() => handleKeyPress(char)}
                  />
                ))}
              </div>
            ))}
            <div className="keyboard-row special-keys">
              {SPECIAL_KEYS.map((key) => (
                <KeyboardKey
                  key={key.key}
                  char={key.label}
                  width={key.width}
                  onClick={() => {
                    if (key.key === 'BACKSPACE') {
                      handleBackspace();
                    } else if (key.key === 'SPACE') {
                      handleKeyPress(' ');
                    }
                  }}
                />
              ))}
              <KeyboardKey
                char="Search"
                width={2}
                variant="primary"
                onClick={handleSubmit}
                disabled={!query.trim()}
              />
            </div>
          </div>
        </FocusContext.Provider>
      </div>
    </div>
  );
}

function KeyboardKey({ char, onClick, width = 1, variant = 'default', disabled = false }) {
  const { ref, focused } = useFocusable({
    focusKey: `search-key-${char}`,
    onEnterPress: onClick,
  });

  return (
    <div
      ref={ref}
      className={`keyboard-key ${focused ? 'focused' : ''} ${variant} ${disabled ? 'disabled' : ''}`}
      style={{ flex: width }}
    >
      {char}
    </div>
  );
}

function SearchResultItem({ item, index, onSelect }) {
  const { ref, focused } = useFocusable({
    focusKey: `search-result-${index}`,
    onEnterPress: onSelect,
  });

  return (
    <div
      ref={ref}
      className={`search-result-item ${focused ? 'focused' : ''}`}
    >
      <div className="search-result-image">
        {item.image ? (
          <img src={item.image} alt={item.title} />
        ) : (
          <span>{item.title.charAt(0)}</span>
        )}
      </div>
      <div className="search-result-info">
        <h4>{item.title}</h4>
        <span>{item.year}</span>
      </div>
    </div>
  );
}

export default SearchModal;