// src/components/ShowsRow/ShowsRow.js  — "Сериалы" wide-card row
import React, { useCallback } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './ShowsRow.css';

function ShowCard({ item, index, totalItems, onFocus, onCardFocus }) {
  const { ref, focused } = useFocusable({
    focusKey: `SHOW-CARD-${item.id}`,
    onEnterPress: () => {},
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCardFocus) onCardFocus(item);
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) { setFocus('NAV-HOME'); return false; }
      if (direction === 'right' && index === totalItems - 1) return false;
      return true;
    },
  });

  const bgStyle = item.image ? { backgroundImage: `url("${item.image}")` } : {};

  return (
    <div
      ref={ref}
      className={`show-card ${focused ? 'show-card--focused' : ''}`}
      style={bgStyle}
    >
      {/* Right-darkening scrim */}
      <div className="show-card__scrim" />

      {/* Top bar: Новинка badge LEFT  |  4 chips RIGHT */}
      <div className="show-card__top">
        {/* Новинка badge */}
        <span className={`card__badge ${item.badgeVariant === 'primary' ? 'card__badge--primary' : 'card__badge--warning'}`}>
          {item.badge}
        </span>
        <pre> 

        </pre>
        {/* 4 individual chips */}
        <div className="show-card__chips">
          {item.kinopoiskRating && (
            <span className="show-chip">{item.kinopoiskRating} ☆</span>
          )}
          {item.ageRating && (
            <span className="show-chip">{item.ageRating}</span>
          )}
          {item.language && (
            <span className="show-chip">{item.language}</span>
          )}
          <span className="show-chip "><b>START</b></span>
        </div>
      </div>

      {/* Title — right half, right-aligned, bottom */}
    </div>
  );
}

function ShowsRow({ row, onCardFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: `ROW-${row.id}`,
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: row.items[0] ? `SHOW-CARD-${row.items[0].id}` : undefined,
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
    <div className="shows-row-wrapper">
      <h2 className="content-row__title">{row.title}</h2>

      <FocusContext.Provider value={focusKey}>
        <div className="shows-row__scroll" ref={ref}>
          {row.items.map((item, idx) => (
            <ShowCard
              key={item.id}
              item={item}
              index={idx}
              totalItems={row.items.length}
              onFocus={onInternalCardFocus}
              onCardFocus={onCardFocus}
            />
          ))}
        </div>
      </FocusContext.Provider>
    </div>
  );
}

export default ShowsRow;
