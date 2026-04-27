import React, { useCallback, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories, getAllMovies } from '../services/mockDataService';
import './Pages.css';

function MoviesPage({ onRegisterFocus, onMovieSelect }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'MOVIES-CONTENT',
    trackChildren: true,
  });

  const categories = getCategories()
    .filter(cat => cat.id !== 'tv-shows' && cat.id !== 'new')
    .map(cat => ({ ...cat, id: `movies-${cat.id}` }));

  const allMovies = getAllMovies();

  const handleMovieSelect = useCallback((movie) => {
    if (onMovieSelect) onMovieSelect(movie);
  }, [onMovieSelect]);

  const onRowFocus = useCallback(({ y }) => {
    ref.current?.scrollTo({ top: y, behavior: 'smooth' });
  }, [ref]);

  // Pull focus into content area — prevents sidebar staying focused on this page
  useEffect(() => {
    const t = setTimeout(() => setFocus('MOVIES-CONTENT'), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-page">

        <div className="page-header">
          <h1 className="page-title">Movies</h1>
          <p className="page-subtitle">Browse our extensive collection of movies</p>
        </div>

        <div className="page-hero-section">
          <div className="stats-row">
            <div className="stat-card">
              <span className="stat-number">{allMovies.length}</span>
              <span className="stat-label">Total Movies</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">98%</span>
              <span className="stat-label">Top Rated</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Streaming</span>
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

export default MoviesPage;
