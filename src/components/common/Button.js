import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './Button.css';

/**
 * Button Component - TV-Optimized
 * 
 * TV-Specific Features:
 * - Uses plain useFocusable for reliable focus behavior
 * - Focus state: 6px red ring + scale(1.05) per design system
 */
function Button({
  id,
  variant = 'primary',
  size = 'medium',
  children,
  onSelect,
  disabled = false,
  className = '',
  style,
}) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => {
      if (!disabled && onSelect) {
        onSelect();
      }
    },
  });

  return (
    <div
      ref={ref}
      className={`button button-${variant} button-${size} ${focused ? 'focused' : ''} ${disabled ? 'button-disabled' : ''} ${className}`}
      style={style}
    >
      <div className="button-content">
        {children}
      </div>
    </div>
  );
}

export default Button;