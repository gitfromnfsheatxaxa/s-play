import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

/**
 * CatalogContext
 * 
 * Manages the currently focused/selected movie across the app.
 * Used to dynamically update the FeaturedHero section based on focus.
 * 
 * TV-Specific Decision: Using Context API instead of prop drilling
 * because focus events bubble through multiple component layers
 * and we need to update the hero section from anywhere in the tree.
 */

const CatalogContext = createContext(null);

export function CatalogProvider({ children }) {
  const [focusedMovie, setFocusedMovie] = useState(null);
  const [isHeroInteractive, setIsHeroInteractive] = useState(false);
  
  // Ref to track the last focused element's focusKey for focus restoration
  const lastFocusedKeyRef = useRef(null);

  // Update the currently focused movie
  const updateFocusedMovie = useCallback((movie) => {
    setFocusedMovie(movie);
  }, []);

  // Set the last focused element's key for focus restoration
  const setLastFocusedKey = useCallback((key) => {
    lastFocusedKeyRef.current = key;
  }, []);

  // Get the last focused key
  const getLastFocusedKey = useCallback(() => {
    return lastFocusedKeyRef.current;
  }, []);

  // Clear the focused movie (when focus leaves all content)
  const clearFocusedMovie = useCallback(() => {
    setFocusedMovie(null);
  }, []);

  // Control whether the hero should be interactive (showing buttons)
  const setHeroInteractive = useCallback((interactive) => {
    setIsHeroInteractive(interactive);
  }, []);

  return (
    <CatalogContext.Provider
      value={{
        focusedMovie,
        isHeroInteractive,
        updateFocusedMovie,
        clearFocusedMovie,
        setHeroInteractive,
        setLastFocusedKey,
        getLastFocusedKey,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
}

// Custom hook to use the CatalogContext
export function useCatalog() {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
}

export default CatalogContext;