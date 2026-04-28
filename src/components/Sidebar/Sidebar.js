// src/components/Sidebar/Sidebar.js
import React from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import NavItem from './NavItem';

import home     from '../../assets/icons/Divider.png';
import search   from '../../assets/icons/Bell Icon.png';
import catalog  from '../../assets/icons/Frame 163203.png';
import tv       from '../../assets/icons/Frame 163204.png';
import myList   from '../../assets/icons/Frame 163205.png';
import bell     from '../../assets/icons/Frame 163206.png';
import settings from '../../assets/icons/Frame 163206 (1).png';
import LogoCollapsed from '../../assets/icons/version_2.png';
import LogoExpanded  from '../../assets/icons/Blue.svg';
import Avatars  from '../../assets/icons/Avatars.png';

import './Sidebar.css';

const TOP_NAV = [
  { id: 'NAV-HOME',      icon: home,    label: 'Главная'    },
  { id: 'NAV-SEARCH',    icon: search,  label: 'Поиск'      },
  { id: 'NAV-CATALOG',   icon: catalog, label: 'Каталог'    },
  { id: 'NAV-CHANNELS',  icon: tv,      label: 'Телеканалы' },
  { id: 'NAV-FAVORITES', icon: myList,  label: 'Мой'        },
];

const BOTTOM_NAV = [
  { id: 'NAV-NOTIFICATIONS', icon: bell,     label: 'Уведомления' },
  { id: 'NAV-SETTINGS',      icon: settings, label: 'Настройки'   },
];

// ─── Profile Avatar ───────────────────────────────────────────────────────────
function ProfileAvatar({ id, isActive, onSelect, contentFocusKey }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onFocus: () => { if (onSelect) onSelect(id); },
    onEnterPress: () => { if (contentFocusKey) setFocus(contentFocusKey); },
    onArrowPress: (direction) => {
      if (direction === 'left') return false;
      if (direction === 'right') {
        if (contentFocusKey) setFocus(contentFocusKey);
        return false;
      }
      return true;
    },
  });

  return (
    <div
      ref={ref}
      className={[
        'nav-item nav-item--avatar',
        isActive ? 'nav-item--active'  : '',
        focused  ? 'nav-item--focused' : '',
      ].join(' ')}
      onClick={() => onSelect && onSelect(id)}
    >
      {isActive && <span className="nav-item__indicator" />}
      <span className="nav-item__icon nav-item__icon--avatar">
        <img src={Avatars} alt="Profile" className="sidebar-avatar-img" />
      </span>
      <span className="nav-item__label">Профиль</span>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ activeItem, onNavigate, contentFocusKey }) {
  const { ref, focusKey, hasFocusedChild } = useFocusable({
    focusKey: 'SIDEBAR',
    trackChildren: true,
  });

  const isExpanded = hasFocusedChild;

  return (
    <FocusContext.Provider value={focusKey}>
      <aside
        className={`sidebar${isExpanded ? ' sidebar--expanded' : ''}`}
        ref={ref}
      >
        {/* ── Logo ── */}
        <div className="sidebar-logo">
          <img
            src={isExpanded ? LogoExpanded : LogoCollapsed}
            alt="SPlay"
            className={isExpanded ? 'sidebar-logo-img--expanded' : 'sidebar-logo-img--collapsed'}
          />
        </div>

        {/* ── Top navigation buttons ── */}
        <div className="sidebar-buttons">
          {TOP_NAV.map((item, idx) => (
            <NavItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.id}
              isFirst={idx === 0}
              isLast={false}
              onSelect={onNavigate}
              contentFocusKey={contentFocusKey}
            />
          ))}
        </div>

        {/* ── Bottom settings ── */}
        <div className="sidebar-settings">
          <ProfileAvatar
            id="NAV-PROFILES"
            isActive={activeItem === 'NAV-PROFILES'}
            onSelect={onNavigate}
            contentFocusKey={contentFocusKey}
          />
          {BOTTOM_NAV.map((item, idx) => (
            <NavItem
              key={item.id}
              id={item.id}
              icon={item.icon}
              label={item.label}
              isActive={activeItem === item.id}
              isFirst={false}
              isLast={idx === BOTTOM_NAV.length - 1}
              onSelect={onNavigate}
              contentFocusKey={contentFocusKey}
            />
          ))}
        </div>
      </aside>
    </FocusContext.Provider>
  );
}

export default Sidebar;
