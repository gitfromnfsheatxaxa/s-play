// src/pages/Home/Home.js
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ContentRow from '../../components/ContentRow/ContentRow';
import AdBanner from '../../components/AdBanner/AdBanner';
import TopTenRow from '../../components/TopTenRow/TopTenRow';
import { getFeaturedContent, getContentRows, getTopTenRow } from '../../services/mockDataService';
import './Home.css';

function Home() {
  const featured = getFeaturedContent();
  const allRows = getContentRows();
  const premieresRow = allRows[0];
  const remainingRows = allRows.slice(1);
  const topTenRow = getTopTenRow();

  const [activeItem, setActiveItem] = useState(null);
  const [focusedItem, setFocusedItem] = useState(featured);

  const handleNavigate = useCallback((itemId) => {
    setActiveItem(itemId);
  }, []);

  const handleContentFocus = useCallback(() => {
    setActiveItem(null);
  }, []);

  // When a card gets focus, update the hero banner.
  const handleCardFocus = useCallback((item) => {
    setFocusedItem(item);
  }, []);

  // CONTENT is the FocusContext container AND the vertical scroll container.
  // preferredChildFocusKey: RIGHT from sidebar skips the hero button, lands on first row.
  const { ref: contentRef, focusKey: contentFocusKey } = useFocusable({
    focusKey: 'CONTENT',
    trackChildren: true,
    preferredChildFocusKey: 'ROW-row-premieres',
    onFocus: handleContentFocus,
  });

  const onHeroFocus = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [contentRef]);

  // Initial focus: start on the first content card so no sidebar item is
  // highlighted/selected on load.
  useEffect(() => {
    const timer = setTimeout(() => setFocus('CARD-movie-1'), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      <Sidebar activeItem={activeItem} onNavigate={handleNavigate} />

      <FocusContext.Provider value={contentFocusKey}>
        <div className="home-content" ref={contentRef}>
          <HeroBanner movie={focusedItem} onFocus={onHeroFocus} />

          <div className="home-rows">
            {premieresRow && (
              <ContentRow
                key={premieresRow.id}
                row={premieresRow}
                onCardFocus={handleCardFocus}
              />
            )}

            <AdBanner />

            {remainingRows.map((row) => (
              <ContentRow
                key={row.id}
                row={row}
                onCardFocus={handleCardFocus}
              />
            ))}

            {topTenRow && (
              <TopTenRow
                row={topTenRow}
                onCardFocus={handleCardFocus}
              />
            )}
          </div>
        </div>
      </FocusContext.Provider>
    </div>
  );
}

export default Home;
