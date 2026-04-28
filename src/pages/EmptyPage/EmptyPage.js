import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './EmptyPage.css';

function EmptyPage({ title, focusKey }) {
  const { ref, focused } = useFocusable({
    focusKey,
    onArrowPress: (direction) => {
      // Allow LEFT to reach the sidebar; block all other edges
      if (direction === 'left') return true;
      return false;
    },
  });

  return (
    <div className="empty-page">
      <div
        ref={ref}
        className={`empty-page__card${focused ? ' empty-page__card--focused' : ''}`}
        tabIndex={-1}
      >
        <h1 className="empty-page__title">{title}</h1>
        <p className="empty-page__sub">Скоро появится</p>
      </div>
    </div>
  );
}

export default EmptyPage;
