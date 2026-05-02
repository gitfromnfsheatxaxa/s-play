// src/pages/MovieDetail/CreatorsRow.js
import React, { useCallback } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import CreatorCard from './CreatorCard';

const CREATORS = [
  { id: 'creator-1', name: 'Антони Руссо', photo: 'https://via.placeholder.com/120', role: 'Режиссёр' },
  { id: 'creator-2', name: 'Джозеф Руссо', photo: 'https://via.placeholder.com/120', role: 'Режиссёр' },
  { id: 'creator-3', name: 'Кристофер Маркус', photo: 'https://via.placeholder.com/120', role: 'Сценарист' },
  { id: 'creator-4', name: 'Стивен Макфили', photo: 'https://via.placeholder.com/120', role: 'Сценарист' },
  { id: 'creator-5', name: 'Кевин Файги', photo: 'https://via.placeholder.com/120', role: 'Продюсер' },
  { id: 'creator-6', name: 'Виктория Алонсо', photo: 'https://via.placeholder.com/120', role: 'Продюсер' },
  { id: 'creator-7', name: 'Джейми Беккер', photo: 'https://via.placeholder.com/120', role: 'Монтаж' },
];

function CreatorsRow() {
  const { ref, focusKey } = useFocusable({
    focusKey: 'MOVIE-DETAIL-ROW-CREATORS',
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: 'MOVIE-DETAIL-CREATOR-0',
  });

  const onInternalCardFocus = useCallback(
    (layout) => {
      const scrollOffset = layout.x - 140;
      ref.current?.scrollTo({
        left: Math.max(0, scrollOffset),
        behavior: 'smooth'
      });
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
    [ref]
  );

  const onArrowPress = useCallback((direction, index) => {
    if (direction === 'left' && index === 0) {
      setFocus('MOVIE-DETAIL-PLAY');
      return false;
    }
    if (direction === 'right' && index === CREATORS.length - 1) {
      return false;
    }
    if (direction === 'down') {
      return false;
    }
    return true;
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="creators-row">
        {CREATORS.map((creator, i) => (
          <CreatorCard
            key={creator.id}
            creator={creator}
            index={i}
            totalItems={CREATORS.length}
            onFocus={onInternalCardFocus}
            onArrowPress={onArrowPress}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
}

export default CreatorsRow;