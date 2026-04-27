import React from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import './Modal.css';

/**
 * ProfileModal Component
 * 
 * TV-friendly profile/settings modal showing:
 * - Current user profile info
 * - Account settings options
 * - Sign out option
 * 
 * TV-Specific Design:
 * - Large, easily focusable menu items
 * - Clear visual feedback on focus
 * - Simple navigation with arrow keys
 */

function ProfileModal({ isOpen, onClose, userProfile, onSignOut }) {
  const { ref: modalRef, focusKey: modalFocusKey, focusSelf } = useFocusable({
    focusKey: 'MODAL-PROFILE',
    trackChildren: true,
    isFocusBoundary: true, // traps focus inside modal while open
  });

  // Direct focus into modal as soon as it opens
  React.useEffect(() => {
    if (isOpen) focusSelf();
  }, [isOpen, focusSelf]);

  const menuItems = [
    { id: 'profile-info', label: 'Profile Info', icon: 'user', action: () => console.log('Profile Info') },
    { id: 'account-settings', label: 'Account Settings', icon: 'settings', action: () => console.log('Account Settings') },
    { id: 'preferences', label: 'Preferences', icon: 'tune', action: () => console.log('Preferences') },
    { id: 'help-support', label: 'Help & Support', icon: 'help', action: () => console.log('Help') },
    { id: 'sign-out', label: 'Sign Out', icon: 'logout', action: onSignOut, danger: true },
  ];

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        ref={modalRef}
        className="modal profile-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <FocusContext.Provider value={modalFocusKey}>
          {/* Header */}
          <div className="modal-header">
            <h2 className="modal-title">Profile & Settings</h2>
            <button className="modal-close" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
              </svg>
            </button>
          </div>

          {/* Profile Info Section */}
          <div className="profile-info-section">
            <div className="profile-avatar">
              {userProfile?.avatar ? (
                <img src={userProfile.avatar} alt={userProfile.name} />
              ) : (
                <span>{userProfile?.name?.charAt(0) || 'U'}</span>
              )}
            </div>
            <div className="profile-details">
              <h3>{userProfile?.name || 'User'}</h3>
              <p>{userProfile?.email || 'user@example.com'}</p>
              <span className="profile-status">Premium Member</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="profile-menu">
            {menuItems.map((item) => (
              <ProfileMenuItem
                key={item.id}
                id={item.id}
                label={item.label}
                icon={item.icon}
                danger={item.danger}
                onClick={item.action}
              />
            ))}
          </div>
        </FocusContext.Provider>
      </div>
    </div>
  );
}

function ProfileMenuItem({ id, label, icon, onClick, danger = false }) {
  const { ref, focused } = useFocusable({
    focusKey: `profile-menu-${id}`,
    onEnterPress: onClick,
  });

  const icons = {
    user: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    ),
    settings: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
      </svg>
    ),
    tune: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
      </svg>
    ),
    help: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"/>
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
      </svg>
    ),
  };

  return (
    <div
      ref={ref}
      className={`profile-menu-item ${focused ? 'focused' : ''} ${danger ? 'danger' : ''}`}
    >
      <div className="profile-menu-icon">{icons[icon]}</div>
      <span className="profile-menu-label">{label}</span>
      {danger && <span className="profile-menu-danger-indicator" />}
    </div>
  );
}

export default ProfileModal;