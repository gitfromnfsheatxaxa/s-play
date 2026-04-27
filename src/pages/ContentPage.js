import React, { useCallback, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import './Pages.css';

/**
 * Shared page wrapper used by Movies, Series, New & Popular, and My List.
 * Replicates the exact same focus + scroll architecture as HomePage:
 *   - useFocusable with trackChildren on the scroll container
 *   - onRowFocus → ref.current.scrollTo (vertical scroll follows focus)
 *   - onMovieSelect wired through to the App-level detail modal handler
 *
 * Props:
 *   focusKey       – unique Norigin key for this page's content container
 *   title          – page heading
 *   subtitle       – page subheading (optional)
 *   categories     – [{ id, title, items }] — ids must be unique app-wide
 *   onMovieSelect  – bubbles up to App.js → opens MovieDetailModal
 *   onRegisterFocus – bubbles up to App.js → updates lastFocusKey
 *   headerContent  – optional JSX rendered between the title and the rows
 *                    (stat cards, trending badge, etc.)
 */
function ContentPage({
  focusKey,
  title,
  subtitle,
  categories,
  onMovieSelect,
  onRegisterFocus,
  headerContent,
}) {
  const { ref, focusKey: resolvedKey } = useFocusable({
    focusKey,
    trackChildren: true,
  });

  // Pull focus into the content area on mount.
  //
  // Problem: handlePageChange in App.js calls setFocus('menu-movies') at 100ms,
  // leaving lastValidFocusRef pointing at a sidebar key. If focus is ever lost
  // while on this page, the Layer 2 recovery guard restores to the sidebar instead
  // of a content card — causing the navbar to appear focused on content pages.
  //
  // Fix: at 200ms (after handlePageChange's 100ms setFocus has fired), focus this
  // container. Norigin descends via trackChildren → saveLastFocusedChild to the
  // first card. lastValidFocusRef then updates to that card key on the next keydown,
  // breaking the sidebar-restore loop permanently.
  useEffect(() => {
    const t = setTimeout(() => setFocus(resolvedKey), 200);
    return () => clearTimeout(t);
  }, []); // intentionally empty — run once on mount only

  const handleMovieSelect = useCallback((movie) => {
    if (onMovieSelect) onMovieSelect(movie);
  }, [onMovieSelect]);

  // Vertical scroll — layout.y is relative to this container, use directly
  const onRowFocus = useCallback(({ y }) => {
    ref.current?.scrollTo({ top: y, behavior: 'smooth' });
  }, [ref]);

  return (
    <FocusContext.Provider value={resolvedKey}>
      <div ref={ref} className="content-page">

        <div className="page-header">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>

        {headerContent && (
          <div className="page-hero-section">{headerContent}</div>
        )}

        <div className="rows-container">
          {categories.map((cat, idx) => (
            <MovieRow
              key={cat.id}
              id={cat.id}
              title={cat.title}
              movies={cat.items}
              onMovieSelect={handleMovieSelect}
              onFocus={onRowFocus}
              onRegisterFocus={onRegisterFocus}
              isFirstRow={idx === 0}
              isLastRow={idx === categories.length - 1}
            />
          ))}
        </div>

      </div>
    </FocusContext.Provider>
  );
}

export default ContentPage;
