// src/components/HeroBanner/HeroBanner.js
import React, { useEffect, useRef, useState } from 'react';
import kpIcon from '../../assets/icons/small_kino poisk.svg';
import imdbIcon from '../../assets/icons/small imdb.svg';
import splayIcon from '../../assets/icons/small_splay.svg';
import avengersBackdrop from '../../assets/background/image.png';
import playIcon from '../../assets/icons/login/Vector.svg';
import './HeroBanner.css';

function HeroBanner({ movie, visible = true }) {
  // animKey increments every time the focused movie changes.
  // Used as `key` on inner elements so their CSS animations replay.
  const [animKey, setAnimKey] = useState(0);
  const prevIdRef = useRef(movie.id);

  useEffect(() => {
    if (movie.id === prevIdRef.current) return;
    prevIdRef.current = movie.id;
    setAnimKey(k => k + 1);
  }, [movie.id]);

  const m = movie;

  return (
    <section className={`hero${visible ? '' : ' hero--hidden'}`}>

      {/* Backdrop — re-keyed on change so the reveal animation replays */}
      <img
        key={`bd-${animKey}`}
        src={avengersBackdrop}
        className="hero__backdrop"
        alt=""
        aria-hidden="true"
      />

      <div className="hero__overlay" />

      {/* Content — re-keyed so every text animation replays from scratch */}
      <div key={`ct-${animKey}`} className="hero__content">

        {/* ── LEFT column ── */}
        <div className="hero__info">

          {m.heroLogoImage && (
            <img
              src={m.heroLogoImage}
              className="hero__logo-img"
              alt={m.heroTitle || m.title}
            />
          )}

          {(m.splayRating || m.kinopoiskRating || m.imdbRating) && (
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

          <div className="hero__meta">
            {m.year && <span className="hero__meta-chip">{m.year}</span>}
            {m.quality && <span className="hero__meta-chip">{m.quality}</span>}
            {m.genres?.length > 0 && (
              <span className="hero__meta-chip">{m.genres.join('/')}</span>
            )}
            {m.ageRating && <span className="hero__meta-chip">{m.ageRating}</span>}
            {m.language && <span className="hero__meta-chip">{m.language}</span>}
            {m.platform && (
              <span className="hero__meta-chip">

                <img src={playIcon} alt="" className="login-screen__play-icon" aria-hidden="true" />
                {m.platform}
              </span>
            )}
          </div>

          <h1 className="hero__title">{m.title}</h1>

          {m.description && (
            <p className="hero__description">{m.description}</p>
          )}

        </div>

        {/* ── RIGHT column ── */}
        {/*<div className="hero__visual">*/}
        {/*  {m.heroLogoImage ? (*/}
        {/*    <img*/}
        {/*      src={m.heroLogoImage}*/}
        {/*      className="hero__visual-logo"*/}
        {/*      alt={m.heroTitle || m.title}*/}
        {/*    />*/}
        {/*  ) : (*/}
        {/*    <div className="hero__movie-logo">*/}
        {/*      {m.heroSubtitle && (*/}
        {/*        <div className="hero__movie-logo-subtitle">{m.heroSubtitle}</div>*/}
        {/*      )}*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}

      </div>
    </section>
  );
}

export default HeroBanner;
