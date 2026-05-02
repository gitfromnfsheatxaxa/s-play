// src/pages/MovieDetail/MovieDetailHero.js
import React from 'react';
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import kpIcon from '../../assets/icons/small_kino poisk.svg';
import imdbIcon from '../../assets/icons/small imdb.svg';
import splayIcon from '../../assets/icons/small_splay.svg';
import './MovieDetailHero.css';

function MovieDetailHero({ movie, onPlayPress, onTrailerPress }) {
  const { ref: playRef, focused: playFocused } = useFocusable({
    focusKey: 'MOVIE-DETAIL-PLAY',
    onEnterPress: onPlayPress,
  });

  const { ref: trailerRef, focused: trailerFocused } = useFocusable({
    focusKey: 'MOVIE-DETAIL-TRAILER',
    onEnterPress: onTrailerPress,
  });

  const { ref: closeRef, focused: closeFocused } = useFocusable({
    focusKey: 'MOVIE-DETAIL-CLOSE',
    onEnterPress: () => window.history.back(),
  });

  const { ref: bookmarkRef, focused: bookmarkFocused } = useFocusable({
    focusKey: 'MOVIE-DETAIL-BOOKMARK',
    onEnterPress: () => console.log('Bookmark clicked'),
  });

  const { ref: favoriteRef, focused: favoriteFocused } = useFocusable({
    focusKey: 'MOVIE-DETAIL-FAVORITE',
    onEnterPress: () => console.log('Favorite clicked'),
  });

  return (
    <div className="movie-detail-hero">
      {/* Background Image with Gradient Overlay */}
      <div 
        className="movie-detail-hero__backdrop"
        style={{ 
          backgroundImage: `url("${movie.heroImage || movie.image}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      />
      <div className="movie-detail-hero__gradient" />

      {/* Close Button (Top Right) */}
      <div
        ref={closeRef}
        className={`movie-detail-hero__close ${closeFocused ? 'movie-detail-hero__close--focused' : ''}`}
      >
        <span className="movie-detail-hero__close-icon">&times;</span>
      </div>

      {/* Main Content */}
      <div className="movie-detail-hero__content">
        {/* Title Section */}
        <div className="movie-detail-hero__header">
          {movie.heroBadge && (
            <span className="movie-detail-hero__badge">{movie.heroBadge}</span>
          )}
          <h1 className="movie-detail-hero__title">{movie.title}</h1>
          {movie.heroSubtitle && (
            <h2 className="movie-detail-hero__subtitle">{movie.heroSubtitle}</h2>
          )}
        </div>

        {/* Ratings Row */}
        <div className="movie-detail-hero__ratings">
          {movie.splayRating && (
            <span className="movie-detail-hero__rating">
              <img src={splayIcon} alt="SPlay" className="movie-detail-hero__rating-icon" />
              <span className="movie-detail-hero__rating-value">{movie.splayRating}</span>
            </span>
          )}
          {movie.kinopoiskRating && (
            <span className="movie-detail-hero__rating">
              <img src={kpIcon} alt="KP" className="movie-detail-hero__rating-icon" />
              <span className="movie-detail-hero__rating-value">{movie.kinopoiskRating}</span>
            </span>
          )}
          {movie.imdbRating && (
            <span className="movie-detail-hero__rating">
              <img src={imdbIcon} alt="IMDb" className="movie-detail-hero__rating-icon" />
              <span className="movie-detail-hero__rating-value">{movie.imdbRating}</span>
            </span>
          )}
        </div>

        {/* Meta Info */}
        <div className="movie-detail-hero__meta">
          {movie.year && <span className="movie-detail-hero__meta-item">{movie.year}</span>}
          {movie.quality && <span className="movie-detail-hero__meta-item">{movie.quality}</span>}
          {movie.genres && movie.genres.length > 0 && (
            <span className="movie-detail-hero__meta-item">
              {movie.genres.join(' / ')}
            </span>
          )}
          {movie.ageRating && <span className="movie-detail-hero__meta-item">{movie.ageRating}</span>}
          {movie.language && <span className="movie-detail-hero__meta-item">{movie.language}</span>}
          {movie.platform && <span className="movie-detail-hero__meta-item movie-detail-hero__meta-item--primary">{movie.platform}</span>}
        </div>

        {/* Action Buttons */}
        <div className="movie-detail-hero__actions">
          <div
            ref={playRef}
            className={`movie-detail-hero__btn movie-detail-hero__btn--play ${playFocused ? 'movie-detail-hero__btn--focused' : ''}`}
          >
            <span className="movie-detail-hero__btn-play-icon">▶</span>
            <span className="movie-detail-hero__btn-text">{movie.episodeInfo || '1 сезон, 1 серия'}</span>
          </div>
          
          <div
            ref={trailerRef}
            className={`movie-detail-hero__btn movie-detail-hero__btn--trailer ${trailerFocused ? 'movie-detail-hero__btn--focused' : ''}`}
          >
            <span className="movie-detail-hero__btn-text">Трейлер</span>
          </div>

          <div className="movie-detail-hero__icons">
            <div
              ref={bookmarkRef}
              className={`movie-detail-hero__icon-btn ${bookmarkFocused ? 'movie-detail-hero__icon-btn--focused' : ''}`}
            >
              <span className="movie-detail-hero__icon-btn-inner">⌂</span>
            </div>
            <div
              ref={favoriteRef}
              className={`movie-detail-hero__icon-btn ${favoriteFocused ? 'movie-detail-hero__icon-btn--focused' : ''}`}
            >
              <span className="movie-detail-hero__icon-btn-inner">♡</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailHero;