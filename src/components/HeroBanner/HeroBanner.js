// src/components/HeroBanner/HeroBanner.js
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import kpIcon   from '../../assets/icons/small_kino poisk.svg';
import imdbIcon from '../../assets/icons/small imdb.svg';
import splayIcon from '../../assets/icons/small_splay.svg';
// Fixed backdrop — every movie shows the same Avengers background
import avengersBackdrop from '../../assets/background/image.png';
import './HeroBanner.css';

function HeroBanner({ movie, onFocus }) {
  const [displayMovie, setDisplayMovie] = useState(movie);
  const [fading, setFading] = useState(false);
  const fadeTimer = useRef(null);

  useEffect(() => {
    if (movie.id === displayMovie.id) return;
    setFading(true);
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setDisplayMovie(movie);
      setFading(false);
    }, 220);
    return () => clearTimeout(fadeTimer.current);
  }, [movie.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const { ref, focusKey } = useFocusable({
    focusKey: 'HERO',
    trackChildren: true,
    onFocus: () => { if (onFocus) onFocus(); },
  });


  const m = displayMovie;

  return (
    <FocusContext.Provider value={focusKey}>
      <section className={`hero ${fading ? 'hero--fading' : ''}`} ref={ref}>

        {/* Fixed Avengers backdrop — always shown regardless of focused movie */}
        <img src={avengersBackdrop} className="hero__backdrop" alt="" aria-hidden="true" />

        {/* Dark left + bottom readability vignette */}
        <div className="hero__overlay" />

        {/* Content */}
        <div className="hero__content">

          {/* ── LEFT column ── */}
          <div className="hero__info">

            {/* Small movie logo image — above ratings */}
            {m.heroLogoImage && (
              <img
                src={m.heroLogoImage}
                className="hero__logo-img"
                alt={m.heroTitle || m.title}
              />
            )}

            {/* Rating badges: KP · IMDb only (no SPlay) */}
            {( m.splayRating || m.kinopoiskRating || m.imdbRating) && (
              <div className="hero__ratings">
                {m.splayRating && (
                    <span className="hero__rating-badge">
                    <img src={splayIcon} alt="SP" className="hero__rating-icon" />
                      {m.splayRating}
                  </span>
                )}
                {m.kinopoiskRating && (
                  <span className="hero__rating-badge">
                    <img src={kpIcon} alt="КП" className="hero__rating-icon" />
                    {m.kinopoiskRating}
                  </span>
                )}
                {m.imdbRating && (
                  <span className="hero__rating-badge">
                    <img src={imdbIcon} alt="IMDb" className="hero__rating-icon" />
                    {m.imdbRating}
                  </span>
                )}
              </div>
            )}

            {/* Meta chips: year · quality · genres · age · language · platform */}
            <div className="hero__meta">
              {m.year && <span className="hero__meta-chip">{m.year}</span>}
              {m.quality && <span className="hero__meta-chip">{m.quality}</span>}
              {m.genres?.length > 0 && (
                <span className="hero__meta-chip">{m.genres.join('/')}</span>
              )}
              {m.ageRating && <span className="hero__meta-chip">{m.ageRating}</span>}
              {m.language && <span className="hero__meta-chip">{m.language}</span>}
              {m.platform && (
                <span className="hero__meta-chip small_one ">
                  <span className="hero__meta-play-icon">▶</span>
                  {m.platform}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="hero__title">{m.title}</h1>

            {/* Description */}
            {m.description && (
              <p className="hero__description">{m.description}</p>
            )}

          </div>

          {/* ── RIGHT column — large movie logo ── */}
          <div className="hero__visual">
            {m.heroLogoImage ? (
              <img
                src={m.heroLogoImage}
                className="hero__visual-logo"
                alt={m.heroTitle || m.title}
              />
            ) : (
              <div className="hero__movie-logo">

                {m.heroSubtitle && (
                  <div className="hero__movie-logo-subtitle">{m.heroSubtitle}</div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </FocusContext.Provider>
  );
}

export default HeroBanner;
