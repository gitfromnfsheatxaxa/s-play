import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import SearchBar from './components/SearchBar';
import SuggestionsPanel from './components/SuggestionsPanel';
import SearchKeyboard from './components/SearchKeyboard';
import PortraitCardRow from './components/PortraitCardRow';
import LandscapeResultRow from './components/LandscapeResultRow';
import ActorRow from './components/ActorRow';
import { getContentRows } from '../../services/mockDataService';
import './Search.css';

const HISTORY    = ['Аватар', 'Flex', 'Механик', 'Sevimli TV'];
const SUGGESTION = ['Аватар', 'Авиатор', 'Авантюрист', 'Авалон'];

function Search() {
  const [query, setQuery]               = useState('');
  const [keyboardActive, setKeyboardActive] = useState(false);

  const catalogItems = getContentRows()[0]?.items ?? [];
  const hasQuery     = query.trim().length > 0;
  const mode         = hasQuery ? 'suggestions' : 'history';
  const suggestions  = hasQuery ? SUGGESTION : HISTORY;
  const actorTitle   = hasQuery || keyboardActive ? 'Часто ищут' : 'Актёры и создатели';

  const { ref: pageRef, focusKey: pageFocusKey } = useFocusable({
    focusKey: 'PAGE-SEARCH-CONTENT',
    trackChildren: true,
    preferredChildFocusKey: 'SEARCH-CARD-movie-1',
  });

  // Set initial focus on first catalog card (same pattern as Home.js)
  useEffect(() => {
    const t = setTimeout(() => setFocus('SEARCH-CARD-movie-1'), 100);
    return () => clearTimeout(t);
  }, []);

  // Safety net: if landscape results disappear while a landscape card had focus
  // (e.g. user held ⌫ and cleared the query), rescue focus to catalog.
  const prevHasQuery = useRef(false);
  useEffect(() => {
    if (prevHasQuery.current && !hasQuery) {
      setFocus('SEARCH-CARD-movie-1');
    }
    prevHasQuery.current = hasQuery;
  }, [hasQuery]);

  // ── Query handlers ─────────────────────────────────────────────────────────
  const handleChar      = useCallback((c) => setQuery(q => q + c), []);
  const handleBackspace = useCallback(() => setQuery(q => q.slice(0, -1)), []);
  const handleClear     = useCallback(() => setQuery(''), []);
  const handleSpace     = useCallback(() => setQuery(q => q + ' '), []);
  const handleSuggSelect = useCallback((text) => {
    setQuery(text);
    // If keyboard isn't open yet (user typed via physical keyboard or suggestion
    // was activated from the default state), open it before moving focus to Q.
    setKeyboardActive(true);
    setTimeout(() => setFocus('SEARCH-KEY-Q'), 50);
  }, []);

  // ── Keyboard visibility ────────────────────────────────────────────────────
  const handleSearchBarActivate   = useCallback(() => setKeyboardActive(true),  []);
  const handleCollapseKeyboard    = useCallback(() => setKeyboardActive(false), []);

  // ── Scroll helpers ─────────────────────────────────────────────────────────
  // The outer scroll container is .home-content (in Home.js).
  // We query it by class — it is always the first ancestor with overflow-y:auto.
  const scrollToTop = useCallback(() => {
    const container = document.querySelector('.home-content');
    if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <FocusContext.Provider value={pageFocusKey}>
      <div ref={pageRef} className="search-page">

        {/* ── Top: search bar + keyboard block ── */}
        <div className="search-page__top">
          <SearchBar
            query={query}
            keyboardActive={keyboardActive}
            onActivate={handleSearchBarActivate}
            onScrollToTop={scrollToTop}
          />

          {keyboardActive && (
            <div className="search-page__keyboard-block">
              <SuggestionsPanel
                mode={mode}
                items={suggestions}
                onSelect={handleSuggSelect}
              />
              <SearchKeyboard
                onChar={handleChar}
                onBackspace={handleBackspace}
                onClear={handleClear}
                onSpace={handleSpace}
                onChipSelect={handleSuggSelect}
                onDeactivate={handleCollapseKeyboard}
              />
            </div>
          )}
        </div>

        {/* ── Landscape search results (only when query is active) ── */}
        {hasQuery && (
          <div className="search-page__section">
            <h2 className="search-page__section-title">Часто ищут</h2>
            <LandscapeResultRow onCollapseKeyboard={handleCollapseKeyboard} onScrollToTop={scrollToTop} />
          </div>
        )}

        {/* ── Каталог ── */}
        <div className="search-page__section">
          <h2 className="search-page__section-title">Каталог</h2>
          <PortraitCardRow
            items={catalogItems}
            onCollapseKeyboard={handleCollapseKeyboard}
            hasResults={hasQuery}
          />
        </div>

        {/* ── Actors / Часто ищут ── */}
        <div className="search-page__section">
          <h2 className="search-page__section-title">{actorTitle}</h2>
          <ActorRow onCollapseKeyboard={handleCollapseKeyboard} />
        </div>

      </div>
    </FocusContext.Provider>
  );
}

export default Search;
