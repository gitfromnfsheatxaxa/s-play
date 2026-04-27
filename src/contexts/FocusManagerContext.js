import React, { createContext, useContext, useRef, useCallback } from 'react';
import { setFocus, SpatialNavigation } from '@noriginmedia/norigin-spatial-navigation';

/**
 * FocusManagerContext
 * 
 * Global focus management and restoration system for TV navigation.
 * 
 * This context provides:
 * 1. Tracking of the last focused element across the entire app
 * 2. Automatic restoration when focus is lost
 * 3. Section-based focus boundaries
 * 
 * TV-Specific: Focus must NEVER be lost on a TV app. This ensures
 * that even if Norigin fails to find a target, focus is restored.
 */

const FocusManagerContext = createContext(null);

export function FocusManagerProvider({ children }) {
  // Track the last focused element's focusKey
  const lastFocusKeyRef = useRef(null);
  
  // Track which section is currently active
  const currentSectionRef = useRef('main');

  // Register a focus event - called when any element receives focus
  const registerFocus = useCallback((focusKey) => {
    lastFocusKeyRef.current = focusKey;
  }, []);

  // Get the last focused key
  const getLastFocusKey = useCallback(() => {
    return lastFocusKeyRef.current;
  }, []);

  // Restore focus to the last known element
  const restoreFocus = useCallback(() => {
    const lastKey = lastFocusKeyRef.current;
    if (lastKey) {
      try {
        setFocus(lastKey);
        console.log('Focus restored to:', lastKey);
      } catch (e) {
        console.warn('Failed to restore focus to:', lastKey, e);
      }
    }
  }, []);

  // Set the current section (for bounded navigation)
  const setCurrentSection = useCallback((section) => {
    currentSectionRef.current = section;
  }, []);

  // Get the current section
  const getCurrentSection = useCallback(() => {
    return currentSectionRef.current;
  }, []);

  return (
    <FocusManagerContext.Provider
      value={{
        registerFocus,
        getLastFocusKey,
        restoreFocus,
        setCurrentSection,
        getCurrentSection,
      }}
    >
      {children}
    </FocusManagerContext.Provider>
  );
}

// Custom hook to use the FocusManagerContext
export function useFocusManager() {
  const context = useContext(FocusManagerContext);
  if (!context) {
    throw new Error('useFocusManager must be used within a FocusManagerProvider');
  }
  return context;
}

export default FocusManagerContext;