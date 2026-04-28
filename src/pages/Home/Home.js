// src/pages/Home/Home.js
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ContentRow from '../../components/ContentRow/ContentRow';
import AdBanner from '../../components/AdBanner/AdBanner';
import TopTenRow from '../../components/TopTenRow/TopTenRow';
import ShowsRow from '../../components/ShowsRow/ShowsRow';
import {
  getFeaturedContent,
  getContentRows,
  getRecommendationsRow,
  getShowsRow,
  getBroadcastsRow,
} from '../../services/mockDataService';
import './Home.css';

function Home() {
  const featured = getFeaturedContent();
  const allRows = getContentRows();
  const premieresRow = allRows[0];
  const filmsRow = allRows[1];
  const recommendationsRow = getRecommendationsRow();
  const showsRow = getShowsRow();
  const broadcastsRow = getBroadcastsRow();

  const [activeItem, setActiveItem] = useState('NAV-HOME');
  const [focusedItem, setFocusedItem] = useState(featured);

  const handleNavigate = useCallback((itemId) => { setActiveItem(itemId); }, []);
  // When focus leaves the sidebar, keep the indicator on the current page (Главная).
  const handleContentFocus = useCallback(() => { setActiveItem('NAV-HOME'); }, []);
  const handleCardFocus = useCallback((item) => { setFocusedItem(item); }, []);

  const { ref: contentRef, focusKey: contentFocusKey } = useFocusable({
    focusKey: 'CONTENT',
    trackChildren: true,
    preferredChildFocusKey: 'ROW-row-premieres',
    onFocus: handleContentFocus,
  });

  const onHeroFocus = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [contentRef]);

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
            {/* Премьеры */}
            {premieresRow && (
              <ContentRow
                key={premieresRow.id}
                row={premieresRow}
                onCardFocus={handleCardFocus}
              />
            )}

            <AdBanner />

            {/* Фильмы */}
            {filmsRow && (
              <ContentRow
                key={filmsRow.id}
                row={filmsRow}
                onCardFocus={handleCardFocus}
              />
            )}

            {/* Рекомендации для [user] */}
            {recommendationsRow && (
              <TopTenRow
                row={recommendationsRow}
                onCardFocus={handleCardFocus}
              />
            )}

            {/* Сериалы */}
            {showsRow && (
              <ShowsRow
                row={showsRow}
                onCardFocus={handleCardFocus}
              />
            )}

            {/* Телепередачи */}
            {broadcastsRow && (
              <ContentRow
                key={broadcastsRow.id}
                row={broadcastsRow}
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
