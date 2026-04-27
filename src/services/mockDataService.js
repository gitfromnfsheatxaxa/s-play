// src/services/mockDataService.js
// SPlay TV — mock content data

import cardImg0 from '../assets/movie-img/Card Image.png';
import cardImg1 from '../assets/movie-img/Card Image (1).png';
import cardImg2 from '../assets/movie-img/Card Image (2).png';
import cardImg3 from '../assets/movie-img/Card Image (3).png';
import cardImg4 from '../assets/movie-img/Card Image (4).png';
import avengersBackdrop from '../assets/movie-img/bb601d6df657da6513a2f04cd690442985476b53.png';
import everythingImg from '../assets/movie-img/c0ba1822a4d07f07daaa97b1d4a74154045659dc.png';
import minariImg from '../assets/movie-img/e64c099eb62683764d631aac905ea35506f1bd4b.png';

export const FEATURED_MOVIE = {
  id: 'avengers-iw',
  title: 'Мстители: Война Бесконечности',
  year: 2022,
  quality: 'CIF',
  genres: ['Фантастика', 'Приключения'],
  ageRating: '16+',
  language: 'RU',
  platform: 'PREMIER',
  description:
    'Мстители и их союзники — Marvel — многочисленные супергерои общей вселенной Marvel, история фильмов и сериалов об их мирах, персонажах и созданиях вселенной Marvel Comics и Marvel Studios.',
  backdropGradient:
    'radial-gradient(ellipse at 65% 20%, rgba(80, 30, 160, 0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 65%, rgba(140, 50, 10, 0.45) 0%, transparent 50%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 65%, #020204 100%)',
  heroImage: avengersBackdrop,
  heroBadge: 'MARVEL',
  heroTitle: 'МСТИТЕЛИ',
  heroSubtitle: 'ВОЙНА БЕСКОНЕЧНОСТИ',
};

const PREMIERES = [
  {
    id: 'movie-1',
    title: 'Жажда мести',
    year: 2023,
    genres: ['Боевик', 'Триллер'],
    description: 'Один человек объявляет войну преступному картелю, чтобы отомстить за гибель семьи. Напряжённый боевик о цене справедливости.',
    backdropGradient: 'radial-gradient(ellipse at 70% 30%, rgba(140,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #0a0000 0%, #2a0500 40%, #040000 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    imdbRating: '6.8',
    kinopoiskRating: '6.2',
    image: cardImg3,
    gradient: 'linear-gradient(160deg, #2a0500 0%, #6b1000 50%, #c02020 100%)',
  },
  {
    id: 'movie-2',
    title: 'Минари',
    year: 2021,
    genres: ['Драма', 'Семейный'],
    description: 'Корейская семья переезжает в американскую глубинку в поисках американской мечты. История о корнях, надежде и о том, что значит дом.',
    backdropGradient: 'radial-gradient(ellipse at 60% 40%, rgba(100,70,10,0.5) 0%, transparent 55%), linear-gradient(135deg, #020100 0%, #1a1000 45%, #050200 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    imdbRating: '7.5',
    kinopoiskRating: '7.1',
    image: minariImg,
    gradient: 'linear-gradient(160deg, #1a1000 0%, #5a3000 50%, #a86000 100%)',
  },
  {
    id: 'movie-3',
    title: 'Аватар',
    year: 2022,
    genres: ['Фантастика', 'Приключения'],
    description: 'Возвращение на Пандору: семья Салли скрывается среди племён морского народа и открывает новые тайны этого удивительного мира.',
    backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000a08 0%, #001a18 45%, #000605 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    imdbRating: '7.6',
    kinopoiskRating: '7.4',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #001a18 0%, #005044 50%, #008070 100%)',
  },
  {
    id: 'movie-4',
    title: 'Человек-паук',
    year: 2021,
    genres: ['Боевик', 'Фантастика'],
    description: 'Питер Паркер сталкивается с мультивселенной и злодеями из других реальностей. Самое зрелищное приключение Человека-паука.',
    backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    imdbRating: '8.2',
    kinopoiskRating: '7.9',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)',
  },
  {
    id: 'movie-5',
    title: 'Мстители',
    year: 2022,
    genres: ['Боевик', 'Фантастика'],
    description: 'Герои Marvel объединяются против нового врага, угрожающего самому существованию вселенной. Эпическое столкновение добра и зла.',
    backdropGradient: 'radial-gradient(ellipse at 65% 20%, rgba(80,30,160,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 65%, rgba(140,50,10,0.45) 0%, transparent 50%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 65%, #020204 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    imdbRating: '8.4',
    kinopoiskRating: '7.8',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #1a0202 0%, #600010 50%, #b00020 100%)',
  },
  {
    id: 'movie-6',
    title: 'Горизонт событий',
    year: 2023,
    genres: ['Ужасы', 'Фантастика'],
    description: 'Спасательная команда отправляется на поиски пропавшего корабля и обнаруживает нечто ужасающее за пределами известной вселенной.',
    backdropGradient: 'radial-gradient(ellipse at 50% 30%, rgba(0,60,60,0.5) 0%, transparent 55%), linear-gradient(135deg, #000202 0%, #000a0a 45%, #000303 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    imdbRating: '6.7',
    kinopoiskRating: '6.1',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #000a0a 0%, #002828 50%, #005040 100%)',
  },
  {
    id: 'movie-7',
    title: 'Тёмный океан',
    year: 2023,
    genres: ['Триллер', 'Драма'],
    description: 'Глубоководная исследовательская станция. Команда учёных находит нечто, что не должно было быть найдено. Время истекает.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,20,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #000002 0%, #000008 45%, #000102 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    imdbRating: '7.1',
    kinopoiskRating: '6.8',
    image: cardImg4,
    gradient: 'linear-gradient(160deg, #00000a 0%, #000830 50%, #001060 100%)',
  },
];

const POPULAR = [
  {
    id: 'pop-1',
    title: 'Вечность',
    year: 2022,
    genres: ['Фантастика', 'Мистика'],
    description: 'Бессмертная цивилизация скрывается среди людей тысячелетиями. Но древний враг возвращается, и им придётся раскрыть свои тайны.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(80,0,120,0.55) 0%, transparent 55%), linear-gradient(135deg, #030005 0%, #0a0010 45%, #020003 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #0a0010 0%, #300050 50%, #600090 100%)',
  },
  {
    id: 'pop-2',
    title: 'Дикий север',
    year: 2022,
    genres: ['Приключения', 'Выживание'],
    description: 'Экспедиция в арктические пустоши оборачивается борьбой за выживание. Человек против стихии в самых суровых условиях на планете.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(20,50,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #010200 0%, #050a00 45%, #010100 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    image: cardImg3,
    gradient: 'linear-gradient(160deg, #050a00 0%, #183000 50%, #306000 100%)',
  },
  {
    id: 'pop-3',
    title: 'Сломанные крылья',
    year: 2022,
    genres: ['Драма', 'Биография'],
    description: 'История лётчика-испытателя, потерявшего всё ради мечты о небе. Путь через поражение к своему настоящему призванию.',
    backdropGradient: 'radial-gradient(ellipse at 65% 25%, rgba(80,70,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #030200 0%, #101000 45%, #020200 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #101000 0%, #3a3200 50%, #6a5800 100%)',
  },
  {
    id: 'pop-4',
    title: 'Красный рассвет',
    year: 2022,
    genres: ['Боевик', 'Война'],
    description: 'На рассвете начинается атака. Небольшой отряд должен остановить вторжение и спасти мирных жителей до прихода основных сил.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(140,10,10,0.6) 0%, transparent 55%), linear-gradient(135deg, #050000 0%, #200000 45%, #040000 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    image: cardImg4,
    gradient: 'linear-gradient(160deg, #200000 0%, #6a0000 50%, #c01010 100%)',
  },
  {
    id: 'pop-5',
    title: 'Последний герой',
    year: 2022,
    genres: ['Фантастика', 'Боевик'],
    description: 'В мире, где супергерои исчезли, один обычный человек берёт на себя ответственность за судьбу города. Последний шанс на спасение.',
    backdropGradient: 'radial-gradient(ellipse at 65% 30%, rgba(0,40,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000105 0%, #001020 45%, #000103 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #001020 0%, #003060 50%, #0050a0 100%)',
  },
  {
    id: 'pop-6',
    title: 'Туманность',
    year: 2022,
    genres: ['Фантастика', 'Космос'],
    description: 'Зонд обнаруживает на краю галактики аномалию, нарушающую все законы физики. Команда астронавтов отправляется разгадать загадку вселенной.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(100,0,100,0.5) 0%, transparent 55%), linear-gradient(135deg, #030003 0%, #100010 45%, #020002 100%)',
    badge: 'СТАРТ',
    badgeVariant: 'primary',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #100010 0%, #400050 50%, #800090 100%)',
  },
  {
    id: 'pop-7',
    title: 'Железный страж',
    year: 2022,
    genres: ['Боевик', 'Фантастика'],
    description: 'Боевой робот нового поколения выходит из-под контроля. Его создатель — единственный, кто знает, как его остановить.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(60,55,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #020200 0%, #0a0800 45%, #010100 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #0a0800 0%, #302000 50%, #585000 100%)',
  },
];

export const CONTENT_ROWS = [
  { id: 'row-premieres', title: 'Премьеры', items: PREMIERES },
  { id: 'row-popular', title: 'Популярное', items: POPULAR },
];

const TOP_TEN = [
  {
    id: 'top10-1',
    title: 'Всё везде и сразу',
    year: 2022,
    genres: ['Боевик', 'Комедия', 'Фантастика'],
    description: 'Пожилая китаянка открывает возможности мультивселенной и становится единственной, кто может спасти все миры.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(160,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #080002 0%, #200005 45%, #050001 100%)',
    imdbRating: '7.8',
    kinopoiskRating: '7.5',
    image: everythingImg,
    gradient: 'linear-gradient(160deg, #200005 0%, #600015 50%, #c00030 100%)',
  },
  {
    id: 'top10-2',
    title: 'Минари',
    year: 2020,
    genres: ['Драма', 'Семейный'],
    description: 'Корейская семья начинает новую жизнь в Арканзасе. История о любви, упорстве и поиске места, которое можно назвать домом.',
    backdropGradient: 'radial-gradient(ellipse at 55% 40%, rgba(100,80,10,0.5) 0%, transparent 55%), linear-gradient(135deg, #020100 0%, #1a1200 45%, #050200 100%)',
    imdbRating: '7.5',
    kinopoiskRating: '7.2',
    image: minariImg,
    gradient: 'linear-gradient(160deg, #1a1000 0%, #5a3800 50%, #a06000 100%)',
  },
  {
    id: 'top10-3',
    title: 'Жажда мести',
    year: 2023,
    genres: ['Боевик', 'Триллер'],
    description: 'Один человек объявляет войну преступному картелю, чтобы отомстить за гибель семьи.',
    backdropGradient: 'radial-gradient(ellipse at 70% 30%, rgba(140,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #0a0000 0%, #2a0500 40%, #040000 100%)',
    imdbRating: '6.8',
    kinopoiskRating: '6.2',
    image: cardImg3,
    gradient: 'linear-gradient(160deg, #2a0500 0%, #6b1000 50%, #c02020 100%)',
  },
  {
    id: 'top10-4',
    title: 'Человек-паук',
    year: 2021,
    genres: ['Боевик', 'Фантастика'],
    description: 'Питер Паркер сталкивается с мультивселенной и злодеями из других реальностей.',
    backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)',
    imdbRating: '8.2',
    kinopoiskRating: '7.9',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)',
  },
  {
    id: 'top10-5',
    title: 'Вечность',
    year: 2021,
    genres: ['Фантастика', 'Боевик'],
    description: 'Бессмертная цивилизация скрывается среди людей тысячелетиями. Но древний враг возвращается.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(80,0,120,0.55) 0%, transparent 55%), linear-gradient(135deg, #030005 0%, #0a0010 45%, #020003 100%)',
    imdbRating: '6.3',
    kinopoiskRating: '5.9',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #0a0010 0%, #300050 50%, #600090 100%)',
  },
  {
    id: 'top10-6',
    title: 'Аватар',
    year: 2022,
    genres: ['Фантастика', 'Приключения'],
    description: 'Возвращение на Пандору: семья Салли скрывается среди племён морского народа.',
    backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000a08 0%, #001a18 45%, #000605 100%)',
    imdbRating: '7.6',
    kinopoiskRating: '7.4',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #001a18 0%, #005044 50%, #008070 100%)',
  },
  {
    id: 'top10-7',
    title: 'Мстители',
    year: 2019,
    genres: ['Боевик', 'Фантастика'],
    description: 'Герои Marvel объединяются против Таноса в финальной битве за судьбу вселенной.',
    backdropGradient: 'radial-gradient(ellipse at 65% 20%, rgba(80,30,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 100%)',
    imdbRating: '8.4',
    kinopoiskRating: '7.8',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #1a0202 0%, #600010 50%, #b00020 100%)',
  },
  {
    id: 'top10-8',
    title: 'Дикий север',
    year: 2022,
    genres: ['Приключения', 'Выживание'],
    description: 'Экспедиция в арктические пустоши оборачивается борьбой за выживание.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(20,50,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #010200 0%, #050a00 45%, #010100 100%)',
    imdbRating: '7.0',
    kinopoiskRating: '6.7',
    image: cardImg3,
    gradient: 'linear-gradient(160deg, #050a00 0%, #183000 50%, #306000 100%)',
  },
];

export const TOP_TEN_ROW = { id: 'row-top10', title: 'Топ 10 сегодня', items: TOP_TEN };

export function getFeaturedContent() {
  return FEATURED_MOVIE;
}

export function getContentRows() {
  return CONTENT_ROWS;
}

export function getTopTenRow() {
  return TOP_TEN_ROW;
}

// Legacy exports kept for old pages that import them
export function getAllMovies() { return PREMIERES; }
export function getAllTVShows() { return POPULAR; }
export function searchContent(query) {
  const q = query.toLowerCase();
  const all = [...PREMIERES, ...POPULAR];
  return { all: all.filter((i) => i.title.toLowerCase().includes(q)) };
}
export function getContentById(id) {
  return [...PREMIERES, ...POPULAR].find((i) => i.id === id) || null;
}
