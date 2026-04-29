import React, {useCallback} from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import clockIcon from '../../../assets/icons/time-quarter-02.svg';
import './SuggestionsPanel.css';

function SuggestionItem({ text, mode, index, totalItems, onSelect }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-SUGG-${index}`,
    onEnterPress: () => { if (onSelect) onSelect(text); },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) {
        // Replace 'NAV-SEARCH' with your Sidebar's specific focus key
        setFocus('NAV-SEARCH');
        return false; // Prevent default engine behavior
      }      if (direction === 'up' && index === 0) {
        setFocus('SEARCH-BAR');
        return false;
      }
      return true;
    },
  });
  const onInternalCardFocus = useCallback(
      (layout) => {
        const scrollOffset = layout.x - 5;
        ref.current?.scrollTo({
          left: Math.max(0, scrollOffset),
          behavior: 'smooth'
        });      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      [ref]
  );

  return (
    <div
      ref={ref}
      className={`suggestion-item ${focused ? 'suggestion-item--focused' : ''}`}  onFocus={onInternalCardFocus}
    >
      {mode === 'history' ? (
        <img src={clockIcon} alt="" className="suggestion-item__icon suggestion-item__icon--img" />
      ) : (
        <svg className="suggestion-item__icon" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 13L13 3M13 3H6M13 3v7"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="suggestion-item__text">{text}</span>
    </div>
  );
}

function SuggestionsPanel({ mode, items, onSelect }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-SUGGESTIONS',
    trackChildren: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="suggestions-panel">
        {items.map((text, i) => (
          <SuggestionItem
            key={text + i}
            text={text}
            mode={mode}
            index={i}
            totalItems={items.length}
            onSelect={onSelect}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
}

export default SuggestionsPanel;
