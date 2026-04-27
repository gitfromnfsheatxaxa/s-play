import React, { useCallback, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories } from '../services/mockDataService';
import './Pages.css';

function NewPopularPage({ onRegisterFocus, onMovieSelect }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'POPULAR-CONTENT',
    trackChildren: true,
  });

  const categories = getCategories()
    .map(cat => ({ ...cat, id: `popular-${cat.id}` }));

  const handleMovieSelect = useCallback((movie) => {
    if (onMovieSelect) onMovieSelect(movie);
  }, [onMovieSelect]);

  const onRowFocus = useCallback(({ y }) => {
    ref.current?.scrollTo({ top: y, behavior: 'smooth' });
  }, [ref]);

  useEffect(() => {
    const t = setTimeout(() => setFocus('POPULAR-CONTENT'), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-page">

        <div className="page-header">
          <h1 className="page-title">New & Popular</h1>
          <p className="page-subtitle">Discover what's trending now</p>
        </div>

        <div className="page-hero-section">
          <div className="trending-badge">
            <span className="badge-icon">🔥</span>
            <span className="badge-text">Trending Now</span>
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

export default NewPopularPage;
