// src/components/Sidebar/NavItem.js
import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';

function NavItem({ id, icon, label, isActive, isFirst, isLast, onSelect, contentFocusKey }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => {
      if (onSelect) onSelect(id);
      if (contentFocusKey) setFocus(contentFocusKey);
    },
    onArrowPress: (direction) => {
      if (direction === 'left') return false;
      if (direction === 'right') {
        if (onSelect) onSelect(id);
        if (contentFocusKey) setFocus(contentFocusKey);
        return false;
      }
      if (direction === 'up' && isFirst) return false;
      if (direction === 'down' && isLast) return false;
      return true;
    },
  });

  return (
    <div
      ref={ref}
      className={[
        'nav-item',
        isActive ? 'nav-item--active'  : '',
        focused  ? 'nav-item--focused' : '',
      ].join(' ')}
      onClick={() => onSelect && onSelect(id)}
    >
      {isActive && <span className="nav-item__indicator" />}

      <span className="nav-item__icon">
        <img src={icon} alt="" className="nav-item__icon-img" />
      </span>

      {label && <span className="nav-item__label">{label}</span>}
    </div>
  );
}

export default NavItem;
