// src/components/Sidebar/NavItem.js
import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';

function NavItem({ id, icon, label, isActive, isFirst, isLast, onSelect }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => onSelect && onSelect(id),
    onFocus: () => {
      // When this item receives focus via arrow keys, update the active state
      if (onSelect) onSelect(id);
    },
    onArrowPress: (direction) => {
      // Never leave sidebar to the left
      if (direction === 'left') return false;

      // RIGHT from sidebar: jump directly to the Премьеры card row.
      // Spatial navigation alone routes to the hero play button (closer in Y).
      // Explicit setFocus is the reliable pattern for TV sidebars.
      if (direction === 'right') {
        setFocus('ROW-row-premieres');
        return false;
      }

      // Block UP from the very first sidebar item
      if (direction === 'up' && isFirst) return false;

      // Block DOWN from the very last sidebar item
      if (direction === 'down' && isLast) return false;

      return true;
    },
  });

  // Indicator only shows on the ACTIVE (selected) item, not on focused items.
  const showIndicator = isActive;

  return (
    <div
      ref={ref}
      className={[
        'nav-item',
        isActive  ? 'nav-item--active'  : '',
        focused   ? 'nav-item--focused' : '',
      ].join(' ')}
      onClick={() => onSelect && onSelect(id)}
    >
      {showIndicator && <span className="nav-item__indicator" />}

      <span className="nav-item__icon">
        <img src={icon} alt="" className="nav-item__icon-img" />
      </span>

      {label && <span className="nav-item__label">{label}</span>}
    </div>
  );
}

export default NavItem;
