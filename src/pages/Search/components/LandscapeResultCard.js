import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './LandscapeResultCard.css';

function LandscapeResultCard({ item, index, totalItems, onFocus, onCollapseKeyboard, onScrollToTop }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-LCARD-${item.id}`,
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCollapseKeyboard) onCollapseKeyboard();
      if (onScrollToTop) onScrollToTop();
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) return false;
      if (direction === 'right' && index === totalItems - 1) return false;
      if (direction === 'up') {
        setFocus('SEARCH-BAR');
        return false;
      }
      if (direction === 'down') {
        // Explicit jump to first catalog card — avoids Norigin guessing
        // across the inter-context gap between SEARCH-ROW-RESULTS and SEARCH-ROW-CATALOG.
        setFocus('SEARCH-CARD-movie-1');
        return false;
      }
      return true;
    },
  });

  return (
    <div ref={ref} className={`landscape-card ${focused ? 'landscape-card--focused' : ''}`}>
      <div
        className="landscape-card__bg"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      <div className="landscape-card__overlay" />
      <span className="landscape-card__badge-kino">КИНОКА</span>
      <span className="landscape-card__badge-start">START</span>
    </div>
  );
}

export default LandscapeResultCard;
