import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './PortraitCard.css';

function PortraitCard({ item, index, totalItems, onFocus, onCollapseKeyboard, hasResults }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-CARD-${item.id}`,
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCollapseKeyboard) onCollapseKeyboard();
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) return false;
      if (direction === 'right' && index === totalItems - 1) return false;
      if (direction === 'up') {
        // When landscape results are visible they sit between catalog and the
        // search bar, so UP should land there. Otherwise go straight to SEARCH-BAR.
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
          backgroundImage: item.image
            ? `url(${item.image})`
            : item.gradient || 'none',
        }}
      />
      <div className="portrait-card__badge">Текст</div>
    </div>
  );
}

export default PortraitCard;
