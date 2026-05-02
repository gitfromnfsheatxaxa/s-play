// src/pages/MovieDetail/CreatorCard.js
import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './CreatorCard.css';

function CreatorCard({ creator, index, totalItems, onFocus, onArrowPress }) {
  const { ref, focused } = useFocusable({
    focusKey: `MOVIE-DETAIL-CREATOR-${index}`,
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
    },
    onArrowPress: (direction) => {
      if (onArrowPress) {
        return onArrowPress(direction, index);
      }
      return true;
    },
  });

  return (
    <div ref={ref} className={`creator-card ${focused ? 'creator-card--focused' : ''}`}>
      <div className="creator-card__circle">
        {creator.photo && (
          <img src={creator.photo} alt={creator.name} />
        )}
      </div>
      <div className="creator-card__info">
        <div className="creator-card__name">{creator.name}</div>
        <div className="creator-card__role">{creator.role}</div>
      </div>
    </div>
  );
}

export default CreatorCard;