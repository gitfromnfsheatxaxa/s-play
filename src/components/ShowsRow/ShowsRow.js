// src/components/ShowsRow/ShowsRow.js
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
      if (direction === 'left' && index === 0) {
        setFocus('NAV-HOME');
        return false;
      }
      if (direction === 'right' && index === totalItems - 1) return false;
      return true;
    },
  });

  // Use quotes in url() to handle spaces or parentheses in filenames
  const bgStyle = item.image ? { backgroundImage: `url("${item.image}")` } : {};

  return (
      <div
          ref={ref}
          className={`show-card ${focused ? 'show-card--focused' : ''}`}
          style={bgStyle}
      >
        <div className="show-card__overlay" />

        <div className="show-card__top">
          {/* Novinka badge - Always visible if data exists */}
          {item.badge && (
              <span className={`card__badge ${item.badgeVariant === 'primary' ? 'card__badge--primary' : 'card__badge--warning'}`}>
            {item.badge}
          </span>
          )}

          {/* Dynamic Chips logic */}
          <div className="show-card__chips">
            {focused ? (
                <>
                  {item.kinopoiskRating && (
                      <span className="show-chip">{item.kinopoiskRating} ☆</span>
                  )}
                  {item.ageRating && (
                      <span className="show-chip">{item.ageRating}</span>
                  )}
                  {item.language && (
                      <span className="show-chip">{item.language}</span>
                  )}
                  <span className="show-chip show-chip--active"><b>START</b></span>
                </>
            ) : (
                <span className="show-chip"><b>START</b></span>
            )}
          </div>
        </div>
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
      ({ x }) => {
        // 1. Horizontal Scroll (within the row)
        // We use the 'x' coordinate from the layout object
        const scrollOffset = x - 140; // Adjust '140' to match your page padding-left
        if (ref.current) {
          ref.current.scrollTo({
            left: Math.max(0, scrollOffset),
            behavior: 'smooth'
          });

          // 2. Vertical Scroll (the whole page)
          // This ensures the row itself jumps into view if it's at the bottom
          ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center', // Centers the row vertically in the screen
            inline: 'nearest'
          });
        }
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