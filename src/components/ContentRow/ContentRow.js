// src/components/ContentRow/ContentRow.js
import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import ContentCard from '../ContentCard/ContentCard';
import './ContentRow.css';

function ContentRow({ row, onCardFocus }) {
  // ref IS the horizontal scroll container.
  // Norigin measures card x positions relative to this element → layout.x = scrollLeft target.
  const { ref, focusKey } = useFocusable({
    focusKey: `ROW-${row.id}`,
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: row.items[0] ? `CARD-${row.items[0].id}` : undefined,
  });

  const onInternalCardFocus = useCallback(
    (layout) => {
      // Horizontal only — vertical positioning is handled by Home.js so that
      // a single scroll fires after all layout shifts (banner spacer) have settled.
      ref.current?.scrollTo({ left: layout.x, behavior: 'smooth' });
    },
    [ref]
  );

  if (!row.items || row.items.length === 0) return null;

  return (
    <div className="content-row-wrapper">
      <h2 className="content-row__title">{row.title}</h2>

      <FocusContext.Provider value={focusKey}>
        {/* ref on the scroll container so layout.x maps directly to scrollLeft */}
        <div className="content-row__scroll" ref={ref}>
          {row.items.map((item, idx) => (
            <ContentCard
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

export default ContentRow;
