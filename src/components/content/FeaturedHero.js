import React, { useState, useEffect } from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useCatalog } from '../../contexts/CatalogContext';
import './FeaturedHero.css';

function FeaturedHero({ onPlay, onMoreInfo, defaultMovie, onRegisterFocus }) {
  const { focusedMovie } = useCatalog();
  const movie = focusedMovie || defaultMovie;

  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset load state every time the movie (and its image) changes
  const backgroundImage = movie ? (movie.backdrop || movie.image) : null;
  useEffect(() => {
    setImageLoaded(false);
  }, [backgroundImage]);

  if (!movie) return null;

  const { title, description, rating, year, genres } = movie;
  const showSkeleton = !backgroundImage || !imageLoaded;

  return (
    <section className="featured-hero" aria-label="Featured content">
      <div className="featured-background">

        {/* Skeleton — visible while image is absent or still loading */}
        {showSkeleton && <div className="featured-skeleton" aria-hidden="true" />}

        {backgroundImage && (
          <img
            key={backgroundImage}
            src={backgroundImage}
            alt=""
            className={`featured-background-image${imageLoaded ? ' loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)} /* hide skeleton even on error */
          />
        )}

        <div className="featured-gradient-top" />
        <div className="featured-gradient-bottom" />
        <div className="featured-gradient-left" />
        <div className="featured-gradient-right" />
      </div>

      <div className="featured-content">
        <div className="featured-badge">&#9654; Now Featured</div>

        <h1 className="featured-title">{title}</h1>

        <div className="featured-meta">
          {rating && <span className="featured-rating">★ {rating}</span>}
          {rating && year && <span className="featured-meta-dot" />}
          {year && <span className="featured-year">{year}</span>}
          {genres && genres.length > 0 && (
            <>
              <span className="featured-meta-dot" />
              <span className="featured-genres">{genres.slice(0, 3).join(' · ')}</span>
            </>
          )}
        </div>

        {description && <p className="featured-description">{description}</p>}

        <div className="featured-actions">
          <FeaturedButton
            id="featured-play-btn"
            variant="primary"
            size="large"
            onSelect={() => onPlay && onPlay(movie)}
            onRegisterFocus={onRegisterFocus}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </FeaturedButton>

          <FeaturedButton
            id="featured-info-btn"
            variant="secondary"
            size="large"
            onSelect={() => onMoreInfo && onMoreInfo(movie)}
            onRegisterFocus={onRegisterFocus}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
            More Info
          </FeaturedButton>
        </div>
      </div>

      {focusedMovie && (
        <div className="featured-dynamic-indicator">
          <span className="indicator-dot" />
          {title}
        </div>
      )}
    </section>
  );
}

function FeaturedButton({ id, variant, size, children, onSelect, onRegisterFocus }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: () => { if (onSelect) onSelect(); },
    onFocus: () => { if (onRegisterFocus) onRegisterFocus(id); },
    // FIX: Focus-loss prevention (Layer 1 — prevent).
    // The hero is the topmost content element. Pressing UP here finds nothing,
    // which would set Norigin's currentFocusKey=null and kill all navigation.
    onArrowPress: (direction) => {
      if (direction === 'up') return false;
      return true;
    },
  });

  return (
    <div
      ref={ref}
      tabIndex={0}
      className={`button button-${variant} button-${size}${focused ? ' focused' : ''}`}
      onClick={onSelect}
    >
      <div className="button-content">{children}</div>
    </div>
  );
}

export default FeaturedHero;
