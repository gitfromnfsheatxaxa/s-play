// src/components/ContentCard/ContentCard.js
import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import imdbIcon from '../../assets/icons/imdb-icon 1.png';
import kpIcon from '../../assets/icons/Group.png';
import './ContentCard.css';

function ContentCard({ item, index, totalItems, onFocus, onCardFocus, onSelect }) {
  const { ref, focused } = useFocusable({
    focusKey: `CARD-${item.id}`,
    onEnterPress: () => onSelect && onSelect(item),
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
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
        {/* Новинка / СТАРТ badge — top left */}
        <span className={`card__badge ${badgeClass}`}>{item.badge}</span>
        {/* START badge — top right */}
        <span className="card__start-badge">START</span>
        <div className="card__overlay">
          <span className="card__title">{item.title}</span>

          <div className="card__ratings">
            {item.imdbRating && (
              <span className="card__rating card__rating--imdb">
                <img src={imdbIcon} alt="IMDb" className="card__rating-icon" />
                {item.imdbRating}
              </span>
            )}
            {item.kinopoiskRating && (
              <span className="card__rating card__rating--kp">
                <img src={kpIcon} alt="КП" className="card__rating-icon" />
                {item.kinopoiskRating}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentCard;
