// src/components/HeroBanner/HeroBanner.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import './HeroBanner.css';

function PlayButton({ movieId, onPlay }) {
  const { ref, focused } = useFocusable({
    focusKey: `BTN-HERO-PLAY-${movieId}`,
    onEnterPress: () => onPlay && onPlay(),
    onArrowPress: (direction) => {
      if (direction === 'up') return false; // nothing above hero
      return true;
    },
  });

  return (
    <button
      ref={ref}
      className={`hero-play-btn ${focused ? 'hero-play-btn--focused' : ''}`}
      onClick={() => onPlay && onPlay()}
    >
      <span className="hero-play-btn__icon">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span className="hero-play-btn__label">Смотреть</span>
    </button>
  );
}

function HeroBanner({ movie, onFocus }) {
  // displayMovie is what is currently rendered; it lags behind `movie` by one fade cycle.
  const [displayMovie, setDisplayMovie] = useState(movie);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);

  useEffect(() => {
    if (movie.id === displayMovie.id) return;

    // Fade out → swap content → fade in
    setFading(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setDisplayMovie(movie);
      setFading(false);
    }, 220); // must match CSS transition duration

    return () => clearTimeout(fadeTimer.current);
  }, [movie.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const { ref, focusKey } = useFocusable({
    focusKey: 'HERO',
    trackChildren: true,
    onFocus: () => { if (onFocus) onFocus(); },
  });

  const handlePlay = useCallback(() => {
    console.log('Playing:', displayMovie.title);
  }, [displayMovie.title]);

  const m = displayMovie;
  const metaParts = [
    m.year,
    m.quality,
    ...(m.genres ?? []),
    m.ageRating,
    m.language,
  ].filter(Boolean);

  return (
    <FocusContext.Provider value={focusKey}>
      <section
        className={`hero ${fading ? 'hero--fading' : ''}`}
        ref={ref}
      >
        {/* Real movie backdrop photo — lowest layer */}
        {m.heroImage && (
          <img src={m.heroImage} className="hero__backdrop" alt="" aria-hidden="true" />
        )}

        {/* Dynamic tinted gradient overlay on top of the backdrop */}
        <div
          className="hero__bg"
          style={{ background: m.backdropGradient ?? m.gradient ?? undefined }}
        />

        <div className="hero__stars" />
        <div className="hero__overlay" />

        <div className="hero__content">
          {/* Left column: metadata + title + description + play button */}
          <div className="hero__info">
            {metaParts.length > 0 && (
              <div className="hero__meta">
                {metaParts.map((part, i) => (
                  <React.Fragment key={i}>
                    <span className="hero__meta-item">{part}</span>
                    {i < metaParts.length - 1 && (
                      <span className="hero__meta-dot">•</span>
                    )}
                  </React.Fragment>
                ))}
                {m.platform && (
                  <span className="hero__meta-platform">
                    <span className="hero__meta-play-icon">▶</span>
                    {m.platform}
                  </span>
                )}
              </div>
            )}

            <h1 className="hero__title">{m.title}</h1>

            {m.description && (
              <p className="hero__description">{m.description}</p>
            )}

            <div className="hero__actions">
              <PlayButton movieId={m.id} onPlay={handlePlay} />
            </div>
          </div>

          {/* Right visual: large stylised movie title */}
          <div className="hero__visual">
            {m.heroBadge && (
              <div className="hero__marvel-badge">{m.heroBadge}</div>
            )}
            {m.heroTitle ? (
              <div className="hero__movie-logo">
                <div className="hero__movie-logo-title">{m.heroTitle}</div>
                {m.heroSubtitle && (
                  <div className="hero__movie-logo-subtitle">{m.heroSubtitle}</div>
                )}
              </div>
            ) : (
              <div className="hero__movie-logo">
                <div className="hero__movie-logo-title">{m.title.toUpperCase()}</div>
              </div>
            )}
          </div>
        </div>
      </section>
    </FocusContext.Provider>
  );
}

export default HeroBanner;
