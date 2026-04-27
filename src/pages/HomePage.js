import React from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import FeaturedHero from '../components/content/FeaturedHero';
import { getCategories, getFeaturedContent } from '../services/mockDataService';
import './HomePage.css';

function HomePage({ onRegisterFocus, onMovieSelect }) {
  const { ref, focusKey } = useFocusable({ 
    focusKey: 'HOME-CONTENT',
    trackChildren: true,
  });
  
  const categories = getCategories();
  const featuredContent = getFeaturedContent();

  const handleMovieSelect = React.useCallback((movie) => {
    if (onMovieSelect) {
      onMovieSelect(movie);
    }
  }, [onMovieSelect]);

  const onRowFocus = React.useCallback(
    ({ y }) => {
      ref.current?.scrollTo({ top: y, behavior: 'smooth' });
    },
    [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="home-page">
        {/* Hero is fixed — spacer reserves its space in the scroll flow */}
        <FeaturedHero
          defaultMovie={featuredContent}
          onPlay={handleMovieSelect}
          onMoreInfo={handleMovieSelect}
          onRegisterFocus={onRegisterFocus}
        />
        <div className="hero-spacer" aria-hidden="true" />

        {/* Movie Rows */}
        <div className="rows-container">
          {categories.map((category, idx) => (
            <MovieRow
              key={category.id}
              id={`row-${category.id}`}
              title={category.title}
              movies={category.items}
              onMovieSelect={handleMovieSelect}
              onFocus={onRowFocus}
              onRegisterFocus={onRegisterFocus}
              // isFirstRow intentionally omitted — UP from first row must reach FeaturedHero
              isLastRow={idx === categories.length - 1}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default HomePage;