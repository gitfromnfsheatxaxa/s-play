import React, { useState, useCallback, useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import MovieRow from '../components/content/MovieRow';
import { getCategories } from '../services/mockDataService';
import './Pages.css';

function MyListPage({ onRegisterFocus, onMovieSelect }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'MYLIST-CONTENT',
    trackChildren: true,
  });

  const [myList] = useState(() =>
    getCategories().flatMap(cat => cat.items).slice(0, 12)
  );

  const categories = [
    { id: 'mylist-main',   title: 'Your List',      items: myList },
    { id: 'mylist-recent', title: 'Recently Added', items: myList.slice(0, 8) },
  ];

  const handleMovieSelect = useCallback((movie) => {
    if (onMovieSelect) onMovieSelect(movie);
  }, [onMovieSelect]);

  const onRowFocus = useCallback(({ y }) => {
    ref.current?.scrollTo({ top: y, behavior: 'smooth' });
  }, [ref]);

  useEffect(() => {
    const t = setTimeout(() => setFocus('MYLIST-CONTENT'), 200);
    return () => clearTimeout(t);
  }, []);

  if (myList.length === 0) {
    return (
      <div className="page-wrapper">
        <div className="empty-list">
          <div className="empty-icon">+</div>
          <h2>Your list is empty</h2>
          <p>Browse movies and series to add them to your list</p>
        </div>
      </div>
    );
  }

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="content-page">

        <div className="page-header">
          <h1 className="page-title">My List</h1>
          <p className="page-subtitle">Your personalised collection</p>
        </div>

        <div className="page-hero-section">
          <div className="list-stats">
            <span className="list-count">{myList.length} items</span>
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

export default MyListPage;
