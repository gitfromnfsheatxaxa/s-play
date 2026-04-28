import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import PortraitCard from './PortraitCard';

function PortraitCardRow({ items, onCollapseKeyboard, hasResults }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-ROW-CATALOG',
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: items[0] ? `SEARCH-CARD-${items[0].id}` : undefined,
  });

  const onInternalCardFocus = useCallback(
      (layout) => {
        const scrollOffset = layout.x - 5;
        ref.current?.scrollTo({
          left: Math.max(0, scrollOffset),
          behavior: 'smooth'
        });      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      [ref]
  );

  if (!items || items.length === 0) return null;

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="portrait-card-row">
        {items.map((item, i) => (
          <PortraitCard
            key={item.id}
            item={item}
            index={i}
            totalItems={items.length}
            onFocus={onInternalCardFocus}
            onCollapseKeyboard={onCollapseKeyboard}
            hasResults={hasResults}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
}

export default PortraitCardRow;
