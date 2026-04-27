import { useCallback, useRef, useEffect } from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';

/**
 * useTVFocusable - TV Navigation Hook with Focus Restoration
 * 
 * This hook wraps useFocusable and provides automatic focus restoration
 * when focus is lost at boundaries.
 * 
 * IMPORTANT: The autoRestore feature uses a gentle polling mechanism
 * that only activates when focus is actually lost, not during normal navigation.
 * 
 * @param {Object} options - useFocusable options
 * @param {string} options.focusKey - Unique identifier
 * @param {Function} options.onEnterPress - Enter key handler
 * @param {Function} options.onFocus - Focus callback
 * @param {boolean} options.autoRestore - Enable auto-restoration (default: false)
 * 
 * @returns {Object} { ref, focused, focusSelf }
 */
export function useTVFocusable(options = {}) {
  const {
    focusKey,
    onEnterPress,
    onFocus: customOnFocus,
    trackChildren = false,
    autoRestore = false,  // Disabled by default to not interfere with navigation
    ...restOptions
  } = options;

  const focusedRef = useRef(false);
  const lastFocusKeyRef = useRef(focusKey);

  // Handle focus - track that we have focus
  const handleFocus = useCallback((layout) => {
    focusedRef.current = true;
    lastFocusKeyRef.current = focusKey;
    
    if (customOnFocus) {
      customOnFocus(layout);
    }
  }, [focusKey, customOnFocus]);

  const { ref, focused, focusSelf } = useFocusable({
    focusKey,
    trackChildren,
    onEnterPress,
    onFocus: handleFocus,
    ...restOptions,
  });

  // Only run restoration polling if autoRestore is explicitly enabled
  useEffect(() => {
    if (!autoRestore) return;

    const pollInterval = setInterval(() => {
      if (focusedRef.current && !focused) {
        const lastKey = lastFocusKeyRef.current;
        try {
          setFocus(lastKey);
        } catch (e) {
          console.warn('[useTVFocusable] Failed to restore focus:', e);
        }
      }
    }, 200);

    return () => clearInterval(pollInterval);
  }, [focused, autoRestore]);

  // Update ref when focused changes
  useEffect(() => {
    focusedRef.current = focused;
  }, [focused]);

  return { ref, focused, focusSelf };
}

export default useTVFocusable;