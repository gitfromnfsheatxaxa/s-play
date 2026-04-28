import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './ActorCard.css';

function ActorCard({ actor, index, totalItems, onFocus, onCollapseKeyboard }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-ACTOR-${index}`,
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCollapseKeyboard) onCollapseKeyboard();
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) return false;
      if (direction === 'right' && index === totalItems - 1) return false;
      if (direction === 'down') return false;
      if (direction === 'up') {
        // Jump directly to first catalog card — more reliable than Norigin geometry.
        setFocus('SEARCH-CARD-movie-1');
        return false;
      }
      return true;
    },
  });

  return (
    <div ref={ref} className={`actor-card ${focused ? 'actor-card--focused' : ''}`}>
      <div className="actor-card__circle">
        {actor.photo && (
          <img src={actor.photo} alt={actor.name.replace('\n', ' ')} />
        )}
      </div>
      <div className="actor-card__name">{actor.name}</div>
    </div>
  );
}

export default ActorCard;
