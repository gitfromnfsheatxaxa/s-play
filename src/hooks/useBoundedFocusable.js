import { useCallback, useRef } from 'react';
import { useFocusable, SpatialNavigation } from '@noriginmedia/norigin-spatial-navigation';

/**
 * useBoundedFocusable - Custom hook for TV boundary-safe navigation
 * 
 * This hook wraps useFocusable to ensure focus never gets lost at boundaries.
 * When an arrow key is pressed but there's no element in that direction,
 * the focus stays on the current element instead of being lost.
 * 
 * TV-Specific Behavior:
 * - UP/DOWN/LEFT/RIGHT at boundaries keeps focus on current element
 * - Prevents focus from "escaping" the screen
 * - Works with all Norigin features (trackChildren, navigationConstraints, etc.)
 * 
 * @param {Object} options - Same options as useFocusable
 * @param {string} options.focusKey - Unique identifier for this focusable element
 * @param {Function} options.onEnterPress - Handler for Enter/OK button
 * @param {Function} options.onArrowPress - Optional custom arrow press handler
 * @param {boolean} options.trackChildren - Whether to track child focusable elements
 * @param {Function} options.onFocus - Handler when this element receives focus
 * @param {Function} options.onBlur - Handler when this element loses focus
 * 
 * @returns {Object} Same as useFocusable: { ref, focused, focusSelf, ... }
 */
export function useBoundedFocusable(options = {}) {
  const {
    focusKey,
    onEnterPress,
    onArrowPress: customOnArrowPress,
    trackChildren = false,
    onFocus,
    onBlur,
    ...restOptions
  } = options;

  const currentFocusKeyRef = useRef(focusKey);
  
  // Update ref when focusKey changes
  currentFocusKeyRef.current = focusKey;

  // Handle arrow press with boundary protection
  const handleArrowPress = useCallback((direction) => {
    // First, call custom handler if provided
    if (customOnArrowPress) {
      const customResult = customOnArrowPress(direction);
      // If custom handler returns false, prevent default navigation
      if (customResult === false) {
        return false;
      }
    }

    // Try to find the next focusable element in this direction
    const currentKey = currentFocusKeyRef.current;
    const nextFocus = SpatialNavigation.getInstance().getNextFocusable(
      currentKey,
      direction
    );

    // If no next focusable element exists in this direction,
    // prevent the navigation and keep focus on current element
    if (!nextFocus) {
      // Return false to prevent default arrow behavior
      // This keeps focus on the current element
      return false;
    }

    // Allow default navigation to proceed
    return true;
  }, [customOnArrowPress]);

  // Use the wrapped useFocusable with boundary protection
  const { ref, focused, focusSelf, ...rest } = useFocusable({
    focusKey,
    trackChildren,
    onEnterPress,
    onArrowPress: handleArrowPress,
    onFocus,
    onBlur,
    ...restOptions,
  });

  return { ref, focused, focusSelf };
}

export default useBoundedFocusable;