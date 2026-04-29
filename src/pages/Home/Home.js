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
  getAnimeRow,
  getComedyRow,
  getHorrorRow,
  getDocsRow,
  getTopWeekRow,
} from '../../services/mockDataService';
import './Home.css';

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
  const animeRow = getAnimeRow();
  const comedyRow = getComedyRow();
  const horrorRow = getHorrorRow();
  const docsRow = getDocsRow();
  const topWeekRow = getTopWeekRow();

  const [currentPage, setCurrentPage] = useState(
    () => localStorage.getItem('tv-current-page') || 'NAV-HOME'
  );
  const [focusedItem, setFocusedItem] = useState(featured);
  // padding-top:62vh is permanent so no layout shift on toggle — just opacity/transform
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleNavigate = useCallback((itemId) => {
    localStorage.setItem('tv-current-page', itemId);
    setCurrentPage(itemId);
  }, []);

  const { ref: contentRef, focusKey: homeFocusKey } = useFocusable({
    focusKey: 'HOME-CONTENT',
    trackChildren: true,
    preferredChildFocusKey: 'ROW-row-premieres',
  });

  // ContentRow cards → show banner + update content
  const handleContentCardFocus = useCallback((item) => {
    setFocusedItem(item);
    setBannerVisible(true);
  }, []);

  // All other rows → hide banner
  const handleHideBanner = useCallback(() => {
    setBannerVisible(false);
  }, []);

  const onHeroFocus = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [contentRef]);

  // On initial load — restore last visited page and focus the right element
  useEffect(() => {
    const restoredPage = localStorage.getItem('tv-current-page') || 'NAV-HOME';
    const FIRST_FOCUS = { 'NAV-HOME': 'CARD-movie-1', 'NAV-SEARCH': 'SEARCH-BAR' };
    const focusKey = FIRST_FOCUS[restoredPage] ?? restoredPage;
    const timer = setTimeout(() => setFocus(focusKey), 150);
    return () => clearTimeout(timer);
  }, []);

  // When navigating back to Home from another page, focus the first card
  useEffect(() => {
    if (currentPage !== 'NAV-HOME') return;
    const timer = setTimeout(() => setFocus('CARD-movie-1'), 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const contentFocusKey = CONTENT_FOCUS_KEYS[currentPage] || 'ROW-row-premieres';
  const isHome = currentPage === 'NAV-HOME';

  return (
    <div className="home-page">
      <Sidebar
        activeItem={currentPage}
        onNavigate={handleNavigate}
        contentFocusKey={contentFocusKey}
      />

      {isHome && (
        <HeroBanner
          movie={focusedItem}
          visible={bannerVisible}
          onFocus={onHeroFocus}
        />
      )}

      {isHome ? (
        <FocusContext.Provider value={homeFocusKey}>
          <div className="home-content" ref={contentRef}>
            <div className="home-rows">
              {premieresRow && (
                <ContentRow
                  key={premieresRow.id}
                  row={premieresRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              <AdBanner onFocus={handleHideBanner} />

              {filmsRow && (
                <ContentRow
                  key={filmsRow.id}
                  row={filmsRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              {recommendationsRow && (
                <TopTenRow
                  row={recommendationsRow}
                  onCardFocus={handleHideBanner}
                />
              )}

              {showsRow && (
                <ShowsRow
                  row={showsRow}
                  onCardFocus={handleHideBanner}
                />
              )}

              {broadcastsRow && (
                <ContentRow
                  key={broadcastsRow.id}
                  row={broadcastsRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              {animeRow && (
                <ContentRow
                  key={animeRow.id}
                  row={animeRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              {comedyRow && (
                <ContentRow
                  key={comedyRow.id}
                  row={comedyRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              {horrorRow && (
                <ContentRow
                  key={horrorRow.id}
                  row={horrorRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              {docsRow && (
                <ContentRow
                  key={docsRow.id}
                  row={docsRow}
                  onCardFocus={handleContentCardFocus}
                />
              )}

              {topWeekRow && (
                <ContentRow
                  key={topWeekRow.id}
                  row={topWeekRow}
                  onCardFocus={handleContentCardFocus}
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
