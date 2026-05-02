// src/pages/MovieDetail/MovieDetail.js
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import MovieDetailHero from './MovieDetailHero';
import ContentRow from '../../components/ContentRow/ContentRow';
import CreatorsRow from './CreatorsRow';
import './MovieDetail.css';

// Mock data for reviews
const REVIEWS = [
  {
    id: 'review-1',
    author: 'Кинокритик Pro',
    date: '15 апр 2024',
    rating: 9,
    text: 'Эпическое завершение фазы Infinity становится эталоном супергеройского кино. Блестящая режиссура и невероятная актёрская игра.',
  },
  {
    id: 'review-2',
    author: 'MovieMania',
    date: '12 апр 2024',
    rating: 8,
    text: 'Масштабное зрелищное приключение, которое держит в напряжении до последней минуты. Визуальные эффекты на высоте.',
  },
  {
    id: 'review-3',
    author: 'FilmStart',
    date: '10 апр 2024',
    rating: 9,
    text: 'Marvel создали настоящий шедевр. Эмоциональная глубина сочетается с невероятным экшеном.',
  },
  {
    id: 'review-4',
    author: 'Кинопоиск',
    date: '08 апр 2024',
    rating: 8,
    text: 'Финал, которого мы ждали. Все сюжетные линии красиво переплетаются в единое целое.',
  },
];

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock movie data - in production, fetch by id
  const movie = {
    id: id || 'avengers-iw',
    title: 'Мстители: Война Бесконечности',
    year: 2022,
    quality: 'CF',
    genres: ['Фантастика', 'Приключение', 'Боевик'],
    ageRating: '16+',
    language: 'RU',
    platform: 'PREMIER',
    imdbRating: '8.4',
    kinopoiskRating: '8.1',
    splayRating: '8.3',
    description: 'Кинематографическая вселенная Marvel представляет эпическое пересечение всех супергероев в самой масштабной битве за всю историю. Танос, самый могущественный злодей вселенной, собирает Камни Бесконечности, чтобы переписать реальность по своему усмотрению. Единственная надежда — объединённые силы Мстителей и Стражей Галактики. Эпическое противостояние добра и зла, где цена победы может оказаться слишком высокой. Фильм собирает вместе всех любимых героев в захватывающем приключении, полном экшена, драмы и неожиданных поворотов.',
    fullDescription: 'Кинематографическая вселенная Marvel — американская медиафраншиза, вымышленная общая вселенная и серия фильмов о супергероях, основанная на комиксах издательства Marvel Comics и разработанная кинокомпанией Marvel Studios. В этом эпическом пересечении все супергерои объединяются против самой большой угрозе вселенной. Танос, безжалостный титан, стремится собрать все шесть Камней Бесконечности — артефактов невероятной силы, способных изменить саму ткань реальности. Когда его план становится ясен, Мстители и Стражи Галактики должны объединить усилия как никогда раньше. Каждый герой играет свою crucial роль в этой битве за существование всей вселенной. От Нью-Йорка до Ваканды, от Вормира до Титана — битва разворачивается на множестве фронтов. Эмоциональная глубина сюжета сочетается с невероятным зрелищем, создавая фильм, который станет эталоном супергеройского кино.',
    episodeInfo: '1 сезон, 1 серия',
    duration: '2ч 41мин',
    country: 'США',
    director: 'Антони и Джо Руссо',
    cast: 'Роберт Дауни мл., Крис Эванс, Марк Руффало',
    heroImage: 'https://via.placeholder.com/1920x1080',
    image: 'https://via.placeholder.com/400x600',
    heroBadge: 'MARVEL',
    heroTitle: 'МСТИТЕЛИ',
    heroSubtitle: 'ВОЙНА БЕСКОНЕЧНОСТИ',
    similar: [
      { id: 'sim-1', title: 'Мстители: Финал', year: 2019, badge: 'Финал', badgeVariant: 'primary', image: 'https://via.placeholder.com/400x600' },
      { id: 'sim-2', title: 'Человек-паук: Нет пути домой', year: 2021, badge: 'Хит', badgeVariant: 'warning', image: 'https://via.placeholder.com/400x600' },
      { id: 'sim-3', title: 'Тор: Рагнарёк', year: 2017, badge: 'Новинка', badgeVariant: 'primary', image: 'https://via.placeholder.com/400x600' },
      { id: 'sim-4', title: 'Чёрная Пантера', year: 2018, badge: 'Хит', badgeVariant: 'warning', image: 'https://via.placeholder.com/400x600' },
      { id: 'sim-5', title: 'Капитан Марвел', year: 2019, badge: 'Новинка', badgeVariant: 'primary', image: 'https://via.placeholder.com/400x600' },
    ],
  };

  const { ref: contentRef, focusKey } = useFocusable({
    focusKey: 'MOVIE-DETAIL-CONTENT',
    trackChildren: true,
  });

  // Auto-focus play button on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setFocus('MOVIE-DETAIL-PLAY');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayPress = () => {
    console.log('Play pressed');
    // Navigate to video player
    navigate(`/player/${movie.id}`);
  };

  const handleTrailerPress = () => {
    console.log('Trailer pressed');
    // Navigate to trailer
    navigate(`/trailer/${movie.id}`);
  };

  const similarRow = {
    id: 'row-similar',
    title: 'Похожие',
    items: movie.similar,
  };

  return (
    <div className="movie-detail-page">
      {/* Hero Section */}
      <MovieDetailHero
        movie={movie}
        onPlayPress={handlePlayPress}
        onTrailerPress={handleTrailerPress}
      />

      {/* Main Content */}
      <div className="movie-detail-page__content" ref={contentRef}>
        <FocusContext.Provider value={focusKey}>
          {/* Description Section */}
          <div className="movie-detail-page__section">
            <h3 className="movie-detail-page__section-title">Описание</h3>
            <div className="movie-detail-page__description">
              {movie.fullDescription}
            </div>
          </div>

          {/* Two Column Grid: Description + Metadata */}
          <div className="movie-detail-page__grid">
            {/* Left: Extended Description */}
            <div className="movie-detail-page__left">
              <div className="movie-detail-page__meta-row">
                <span className="movie-detail-page__meta-label">Страна:</span>
                <span className="movie-detail-page__meta-value">{movie.country}</span>
              </div>
              <div className="movie-detail-page__meta-row">
                <span className="movie-detail-page__meta-label">Режиссёр:</span>
                <span className="movie-detail-page__meta-value">{movie.director}</span>
              </div>
              <div className="movie-detail-page__meta-row">
                <span className="movie-detail-page__meta-label">В ролях:</span>
                <span className="movie-detail-page__meta-value">{movie.cast}</span>
              </div>
            </div>

            {/* Right: Metadata Box */}
            <div className="movie-detail-page__metadata">
              <div className="movie-detail-page__meta-box">
                <div className="movie-detail-page__meta-box-row">
                  <span className="movie-detail-page__meta-box-label">Продолжительность</span>
                  <span className="movie-detail-page__meta-box-value">{movie.duration}</span>
                </div>
                <div className="movie-detail-page__meta-box-row">
                  <span className="movie-detail-page__meta-box-label">Рейтинг IMDb</span>
                  <span className="movie-detail-page__meta-box-value">{movie.imdbRating}</span>
                </div>
                <div className="movie-detail-page__meta-box-row">
                  <span className="movie-detail-page__meta-box-label">Рейтинг КП</span>
                  <span className="movie-detail-page__meta-box-value">{movie.kinopoiskRating}</span>
                </div>
                <div className="movie-detail-page__meta-box-row">
                  <span className="movie-detail-page__meta-box-label">Качество</span>
                  <span className="movie-detail-page__meta-box-value">{movie.quality}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Creators Section */}
          <div className="movie-detail-page__section">
            <h3 className="movie-detail-page__section-title">Создатели</h3>
            <CreatorsRow />
          </div>

          {/* Reviews Section */}
          <div className="movie-detail-page__section">
            <h3 className="movie-detail-page__section-title">Оценки и отзывы</h3>
            <div className="movie-detail-page__reviews">
              {REVIEWS.map((review, index) => (
                <div
                  key={review.id}
                  className={`movie-detail-page__review ${index === 0 ? 'movie-detail-page__review--highlighted' : ''}`}
                >
                  <div className="movie-detail-page__review-header">
                    <span className="movie-detail-page__review-author">{review.author}</span>
                    <span className="movie-detail-page__review-date">{review.date}</span>
                  </div>
                  <div className="movie-detail-page__review-rating">★{review.rating}</div>
                  <p className="movie-detail-page__review-text">{review.text}</p>
                  <button className="movie-detail-page__review-btn">Читать полностью</button>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Movies Section */}
          <div className="movie-detail-page__section">
            <h3 className="movie-detail-page__section-title">Похожие</h3>
            <ContentRow
              row={similarRow}
              onCardFocus={() => {}}
            />
          </div>
        </FocusContext.Provider>
      </div>
    </div>
  );
}

export default MovieDetail;