import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import './Focusable.css';

function Focusable({
  id,
  children,
  onSelect,
  onFocus,
  onBlur,
  className = '',
  style,
  disabled = false,
  role = 'button',
  ariaLabel,
  ...rest
}) {
  // useFocusable returns { ref, focused, focusSelf, ... }
  // onEnterPress/onFocus/onBlur are inputs to the hook, not outputs
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => {
      if (onSelect && !disabled) onSelect();
    },
    onFocus: () => {
      if (onFocus && !disabled) onFocus();
    },
    onBlur: () => {
      if (onBlur && !disabled) onBlur();
    },
  });

  return (
    <div
      ref={ref}
      data-focusable
      data-focusable-id={id}
      role={role}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      tabIndex={-1}
      className={`focusable ${focused ? 'focused' : ''} ${disabled ? 'focusable-disabled' : ''} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Focusable;
