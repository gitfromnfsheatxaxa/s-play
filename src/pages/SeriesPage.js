import React, { useCallback, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories, getAllTVShows } from '../services/mockDataService';
import './Pages.css';

function SeriesPage({ onRegisterFocus, onMovieSelect }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SERIES-CONTENT',
    trackChildren: true,
  });

  const categories = getCategories()
    .filter(cat => cat.id === 'tv-shows' || cat.id === 'trending')
    .map(cat => ({ ...cat, id: `series-${cat.id}` }));

  const allShows = getAllTVShows();

  const handleMovieSelect = useCallback((movie) => {
    if (onMovieSelect) onMovieSelect(movie);
  }, [onMovieSelect]);

  const onRowFocus = useCallback(({ y }) => {
    ref.current?.scrollTo({ top: y, behavior: 'smooth' });
  }, [ref]);

  useEffect(() => {
    const t = setTimeout(() => setFocus('SERIES-CONTENT'), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-page">

        <div className="page-header">
          <h1 className="page-title">TV Series</h1>
          <p className="page-subtitle">Binge-watch your favourite TV shows</p>
        </div>

        <div className="page-hero-section">
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-number">{allShows.length}</span>
              <span className="stat-label">TV Shows</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">50+</span>
              <span className="stat-label">Seasons</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">HD</span>
              <span className="stat-label">Quality</span>
            </div>
          </div>
        </div>

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

export default SeriesPage;
