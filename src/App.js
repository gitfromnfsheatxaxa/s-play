import React, { useEffect, useRef } from 'react';
import { setFocus, getCurrentFocusKey } from '@noriginmedia/norigin-spatial-navigation';
import Home from './pages/Home/Home';
import './styles/design-system.css';

function App() {
  const lastValidFocusRef = useRef('CARD-movie-1');

  // Layer 2 focus recovery: after every keydown, if Norigin loses its current
  // focus key (returns null), restore to the last known-good key.
  useEffect(() => {
    const onKeyDown = () => {
      requestAnimationFrame(() => {
        const key = getCurrentFocusKey();
        if (key) {
          lastValidFocusRef.current = key;
        } else if (lastValidFocusRef.current) {
          setFocus(lastValidFocusRef.current);
        }
      });
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <Home />;
}

export default App;
