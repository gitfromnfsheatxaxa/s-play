// src/components/ContentCard/ContentCard.js
import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';

import StartIcon from '../../assets/icons/START.svg';
import './ContentCard.css';

function ContentCard({ item, index, totalItems, onFocus, onCardFocus, onSelect }) {
  const { ref, focused } = useFocusable({
    focusKey: `CARD-${item.id}`,
    onEnterPress: () => onSelect && onSelect(item),
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      // Position card 2rem above the viewport floor.
      // rAF defers until after Norigin's layout pass so the ref is measured correctly.
      requestAnimationFrame(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      });
      if (onCardFocus) onCardFocus(item);
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) {
        setFocus('NAV-HOME');
        return false;
      }
      if (direction === 'right' && index === totalItems - 1) return false;
      return true;
    },
  });

  const badgeClass =
    item.badgeVariant === 'primary' ? 'card__badge--primary' : 'card__badge--warning';

  const posterStyle = item.image
    ? { backgroundImage: `url("${item.image}")` }
    : { background: item.gradient };

  const positionClass = index === 0 ? 'content-card--first'
    : index === totalItems - 1 ? 'content-card--last'
    : '';

  return (
    <div
      ref={ref}
      className={`content-card ${positionClass} ${focused ? 'content-card--focused' : ''}`}
      onClick={() => onSelect && onSelect(item)}
    >
      <div className="card__poster" style={posterStyle}>
        <span className={`card__badge ${badgeClass}`}>{item.badge}</span>
        <span className="card__start-badge"><img src={StartIcon} alt="" /></span>
      </div>
    </div>
  );
}

export default ContentCard;
