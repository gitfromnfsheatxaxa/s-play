import React, { useEffect } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './Modal.css';

/**
 * MovieDetailModal Component
 * 
 * TV-friendly movie detail modal showing full movie information.
 * Supports navigation with arrow keys and back button.
 * 
 * TV-Specific Features:
 * - Focus trapping inside modal
 * - Focus restoration on close
 * - Large, easily navigable elements
 * - Back button for easy exit
 */

function MovieDetailModal({ isOpen, onClose, movie, onPlay }) {
  const { ref: modalRef, focusKey: modalFocusKey, focusSelf } = useFocusable({
    focusKey: 'MODAL-MOVIE-DETAIL',
    trackChildren: true,
    isFocusBoundary: true, // traps focus inside modal while open
  });

  // Focus into modal when it opens
  useEffect(() => {
    if (isOpen && modalRef.current) {
      // First, set focus to the modal itself
      focusSelf();
      // Then, focus the play button after a short delay
      const focusTimer = setTimeout(() => {
        setFocus('detail-play-btn');
      }, 200);
      return () => clearTimeout(focusTimer);
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  const { title, description, rating, year, genres, image, backdrop, duration, director, cast, match } = movie;
  const backgroundImage = backdrop || image;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal movie-detail-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <FocusContext.Provider value={modalFocusKey}>
          {/* Background Image */}
          {backgroundImage && (
            <div className="detail-background">
              <img src={backgroundImage} alt="" className="detail-background-image" />
              <div className="detail-gradient" />
            </div>
          )}

          {/* Close Button */}
          <button className="modal-close detail-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>

          {/* Content */}
          <div className="detail-content">
            {/* Title and Meta */}
            <div className="detail-header">
              <h2 className="detail-title">{title}</h2>
              <div className="detail-meta">
                {match && <span className="detail-match">{match}% Match</span>}
                {year && <span className="detail-year">{year}</span>}
                {duration && <span className="detail-duration">{duration}</span>}
                {rating && <span className="detail-rating">★ {rating}</span>}
              </div>
              {genres && genres.length > 0 && (
                <div className="detail-genres">
                  {genres.map((genre, index) => (
                    <span key={index} className="detail-genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            {description && (
              <p className="detail-description">{description}</p>
            )}

            {/* Additional Info */}
            {(director || cast) && (
              <div className="detail-info">
                {director && (
                  <div className="detail-info-row">
                    <span className="detail-info-label">Director:</span>
                    <span className="detail-info-value">{director}</span>
                  </div>
                )}
                {cast && (
                  <div className="detail-info-row">
                    <span className="detail-info-label">Cast:</span>
                    <span className="detail-info-value">{cast.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="detail-actions">
              <DetailActionButton
                id="detail-play-btn"
                variant="primary"
                icon="play"
                label="Play"
                onSelect={() => onPlay && onPlay(movie)}
              />
              <DetailActionButton
                id="detail-add-btn"
                variant="secondary"
                icon="plus"
                label="Add to My List"
                onSelect={() => console.log('Added to list:', title)}
              />
              <DetailActionButton
                id="detail-share-btn"
                variant="secondary"
                icon="share"
                label="Share"
                onSelect={() => console.log('Share:', title)}
              />
            </div>
          </div>
        </FocusContext.Provider>
      </div>
    </div>
  );
}

function DetailActionButton({ id, variant, icon, label, onSelect }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: onSelect,
  });

  const icons = {
    play: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    ),
    plus: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
    ),
    share: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
      </svg>
    ),
  };

  return (
    <div
      ref={ref}
      className={`detail-action-btn detail-action-btn-${variant}${focused ? ' focused' : ''}`}
    >
      <div className="detail-action-icon">{icons[icon]}</div>
      <span className="detail-action-label">{label}</span>
    </div>
  );
}

export default MovieDetailModal;