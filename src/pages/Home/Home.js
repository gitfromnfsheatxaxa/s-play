// src/pages/Home/Home.js
import React, { useCallback, useEffect, useState } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import Sidebar from '../../components/Sidebar/Sidebar';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import ContentRow from '../../components/ContentRow/ContentRow';
import AdBanner from '../../components/AdBanner/AdBanner';
import TopTenRow from '../../components/TopTenRow/TopTenRow';
import ShowsRow from '../../components/ShowsRow/ShowsRow';
import Search from '../Search/Search';
import Catalog from '../Catalog/Catalog';
import Channels from '../Channels/Channels';
import Favorites from '../Favorites/Favorites';
import Notifications from '../Notifications/Notifications';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';
import {
  getFeaturedContent,
  getContentRows,
  getRecommendationsRow,
  getShowsRow,
  getBroadcastsRow,
} from '../../services/mockDataService';
import './Home.css';

// Maps each nav item to the focus key that Enter / RIGHT should land on
const CONTENT_FOCUS_KEYS = {
  'NAV-HOME':          'ROW-row-premieres',
  'NAV-SEARCH':        'PAGE-SEARCH-CONTENT',
  'NAV-CATALOG':       'PAGE-CATALOG-CONTENT',
  'NAV-CHANNELS':      'PAGE-CHANNELS-CONTENT',
  'NAV-FAVORITES':     'PAGE-FAVORITES-CONTENT',
  'NAV-NOTIFICATIONS': 'PAGE-NOTIFICATIONS-CONTENT',
  'NAV-SETTINGS':      'PAGE-SETTINGS-CONTENT',
  'NAV-PROFILES':      'PAGE-PROFILE-CONTENT',
};

function renderPage(currentPage) {
  switch (currentPage) {
    case 'NAV-SEARCH':        return <Search />;
    case 'NAV-CATALOG':       return <Catalog />;
    case 'NAV-CHANNELS':      return <Channels />;
    case 'NAV-FAVORITES':     return <Favorites />;
    case 'NAV-NOTIFICATIONS': return <Notifications />;
    case 'NAV-SETTINGS':      return <Settings />;
    case 'NAV-PROFILES':      return <Profile />;
    default:                  return null;
  }
}

function Home() {
  const featured = getFeaturedContent();
  const allRows = getContentRows();
  const premieresRow = allRows[0];
  const filmsRow = allRows[1];
  const recommendationsRow = getRecommendationsRow();
  const showsRow = getShowsRow();
  const broadcastsRow = getBroadcastsRow();

  const [currentPage, setCurrentPage] = useState(
    () => localStorage.getItem('tv-current-page') || 'NAV-HOME'
  );
  const [focusedItem, setFocusedItem] = useState(featured);

  const handleNavigate = useCallback((itemId) => {
    localStorage.setItem('tv-current-page', itemId);
    setCurrentPage(itemId);
  }, []);
  const handleCardFocus = useCallback((item) => { setFocusedItem(item); }, []);

  const { ref: contentRef, focusKey: homeFocusKey } = useFocusable({
    focusKey: 'HOME-CONTENT',
    trackChildren: true,
    preferredChildFocusKey: 'ROW-row-premieres',
  });

  const onHeroFocus = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [contentRef]);

  useEffect(() => {
    const restoredPage = localStorage.getItem('tv-current-page') || 'NAV-HOME';
    const focusKey = restoredPage === 'NAV-HOME' ? 'CARD-movie-1' : restoredPage;
    const timer = setTimeout(() => setFocus(focusKey), 150);
    return () => clearTimeout(timer);
  }, []);

  const contentFocusKey = CONTENT_FOCUS_KEYS[currentPage] || 'ROW-row-premieres';
  const isHome = currentPage === 'NAV-HOME';

  return (
    <div className="home-page">
      <Sidebar
        activeItem={currentPage}
        onNavigate={handleNavigate}
        contentFocusKey={contentFocusKey}
      />

      {isHome ? (
        <FocusContext.Provider value={homeFocusKey}>
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

              {filmsRow && (
                <ContentRow
                  key={filmsRow.id}
                  row={filmsRow}
                  onCardFocus={handleCardFocus}
                />
              )}

              {recommendationsRow && (
                <TopTenRow
                  row={recommendationsRow}
                  onCardFocus={handleCardFocus}
                />
              )}

              {showsRow && (
                <ShowsRow
                  row={showsRow}
                  onCardFocus={handleCardFocus}
                />
              )}

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
      ) : (
        <div className="home-content">
          {renderPage(currentPage)}
        </div>
      )}
    </div>
  );
}

export default Home;
