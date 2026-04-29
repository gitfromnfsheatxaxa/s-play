import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './PortraitCard.css';

function PortraitCard({ item, index, totalItems, onFocus, onCollapseKeyboard, hasResults }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-CARD-${item.id}`,
    // The 'layout' object contains .x, .y, .width, .height
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCollapseKeyboard) onCollapseKeyboard();
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) {
        setFocus('NAV-SEARCH');
        return false;
      }
      if (direction === 'right' && index === totalItems - 1) return false;
      if (direction === 'up') {
        setFocus(hasResults ? 'SEARCH-LCARD-lr-1' : 'SEARCH-BAR');
        return false;
      }
      return true;
    },
  });

  return (
      <div ref={ref} className={`portrait-card ${focused ? 'portrait-card--focused' : ''}`}>
        <div
            className="portrait-card__poster"
            style={{
              backgroundImage: item.image ? `url("${item.image}")` : 'none',
              backgroundColor: !item.image ? '#333' : 'transparent'
            }}
        />
      </div>
  );
}

export default PortraitCard;