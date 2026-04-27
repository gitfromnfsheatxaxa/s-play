// src/components/TopTenRow/TopTenRow.js
import React, { useCallback } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import icon1 from '../../assets/icons/1.svg';
import icon2 from '../../assets/icons/2.svg';
import icon3 from '../../assets/icons/3.svg';
import icon4 from '../../assets/icons/4.svg';
import imdbIcon from '../../assets/icons/imdb-icon 1.png';
import kpIcon from '../../assets/icons/Group.png';
import './TopTenRow.css';

const NUMBER_ICONS = [icon1, icon2, icon3, icon4];

// ─── TopTenCard ────────────────────────────────────────────────────────────────
function TopTenCard({ item, index, totalItems, rank, onFocus, onCardFocus }) {
  const { ref, focused } = useFocusable({
    focusKey: `TOP10-CARD-${item.id}`,
    onEnterPress: () => {},
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);       // horizontal scroll via ContentRow pattern
      if (onCardFocus) onCardFocus(item); // hero update
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

  const numberIcon = rank <= 4 ? NUMBER_ICONS[rank - 1] : null;

  const posterStyle = item.image
    ? { backgroundImage: `url("${item.image}")` }
    : { background: item.gradient };

  return (
    <div className="top10-item">
      {/* Large gradient rank number — decorative, not focusable */}
      {numberIcon ? (
        <img src={numberIcon} className="top10-number" alt={`#${rank}`} aria-hidden="true" />
      ) : (
        <span className="top10-number top10-number--text" aria-hidden="true">{rank}</span>
      )}

      {/* Poster — Norigin ref goes here (the actual focusable element) */}
      <div
        ref={ref}
        className={`top10-poster ${focused ? 'top10-poster--focused' : ''}`}
      >
        <div className="top10-poster__img" style={posterStyle} />

        <div className="top10-poster__overlay">
          <p className="top10-poster__title">{item.title}</p>
          <div className="top10-poster__ratings">
            {item.imdbRating && (
              <span className="top10-rating top10-rating--imdb">
                <img src={imdbIcon} alt="IMDb" className="top10-rating__icon" />
                {item.imdbRating}
              </span>
            )}
            {item.kinopoiskRating && (
              <span className="top10-rating top10-rating--kp">
                <img src={kpIcon} alt="КП" className="top10-rating__icon top10-rating__icon--kp" />
                {item.kinopoiskRating}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TopTenRow ─────────────────────────────────────────────────────────────────
function TopTenRow({ row, onCardFocus }) {
  // ref IS the horizontal scroll container — layout.x maps to scrollLeft
  const { ref, focusKey } = useFocusable({
    focusKey: `ROW-${row.id}`,
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: row.items[0] ? `TOP10-CARD-${row.items[0].id}` : undefined,
  });

  const onInternalCardFocus = useCallback(
    (layout) => {
      ref.current?.scrollTo({ left: layout.x, behavior: 'smooth' });
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    [ref]
  );

  if (!row.items || row.items.length === 0) return null;

  return (
    <div className="top10-row-wrapper">
      <h2 className="content-row__title">{row.title}</h2>

      <FocusContext.Provider value={focusKey}>
        <div className="top10-row__scroll" ref={ref}>
          {row.items.map((item, idx) => (
            <TopTenCard
              key={item.id}
              item={item}
              index={idx}
              totalItems={row.items.length}
              rank={idx + 1}
              onFocus={onInternalCardFocus}
              onCardFocus={onCardFocus}
            />
          ))}
        </div>
      </FocusContext.Provider>
    </div>
  );
}

export default TopTenRow;
