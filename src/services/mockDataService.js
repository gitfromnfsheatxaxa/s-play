// src/services/mockDataService.js
// SPlay TV — mock content data

import cardImg0 from '../assets/movie-img/Card Image.png';
import cardImg1 from '../assets/movie-img/Card Image (1).png';
import cardImg2 from '../assets/movie-img/Card Image (2).png';
import cardImg3 from '../assets/movie-img/Card Image (3).png';
import cardImg4 from '../assets/movie-img/Card Image (4).png';
import avengersBackdrop from '../assets/movie-img/bb601d6df657da6513a2f04cd690442985476b53.png';
import avengersNewBackdrop from '../assets/background/image.png';
import everythingImg from '../assets/movie-img/c0ba1822a4d07f07daaa97b1d4a74154045659dc.png';
import minariImg from '../assets/movie-img/e64c099eb62683764d631aac905ea35506f1bd4b.png';
import herobannerLogo from '../assets/icons/herobannerlogo.png';

// Actor images for cast
import actor1 from '../assets/movie-img/Card Image.png';
import actor2 from '../assets/movie-img/Card Image (1).png';
import actor3 from '../assets/movie-img/Card Image (2).png';
import actor4 from '../assets/movie-img/Card Image (3).png';
import actor5 from '../assets/movie-img/Card Image (4).png';

// Shared values applied to every item
const SHARED = {
  heroImage: avengersNewBackdrop,
  heroLogoImage: herobannerLogo,
  platform: 'PREMIER',
};

export const FEATURED_MOVIE = {
  id: 'avengers-iw',
  title: 'Мстители: Война Бесконечности',
  year: 2022,
  quality: 'CF',
  genres: ['Фантастика', 'Приключение'],
  ageRating: '18+',
  language: 'RU',
  platform: 'PREMIER',
  imdbRating: '6.1',
  kinopoiskRating: '7',
  splayRating: '6.1',
  description:
    'Кинематографическая вселенная Marvel — американская медиафраншиза, вымышленная общая вселенная и серия фильмов о супергероях, основанная на комиксах издательства Marvel Comics и разработанная кинокомпанией Marvel Studios.',
  backdropGradient:
    'radial-gradient(ellipse at 65% 20%, rgba(80, 30, 160, 0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 65%, rgba(140, 50, 10, 0.45) 0%, transparent 50%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 65%, #020204 100%)',
  gradient: 'linear-gradient(160deg, #020618 0%, #0a0420 50%, #06020e 100%)',
  image: avengersBackdrop,
  heroImage: avengersNewBackdrop,
  heroLogoImage: herobannerLogo,
  heroBadge: 'MARVEL',
  heroTitle: 'МСТИТЕЛИ',
  heroSubtitle: 'ВОЙНА БЕСКОНЕЧНОСТИ',
  badge: 'Новинка',
  badgeVariant: 'primary',
};

const PREMIERES = [
  {
    ...SHARED,
    id: 'movie-1',
    title: 'Жажда мести',
    year: 2023,
    quality: 'HD',
    genres: ['Боевик', 'Триллер'],
    ageRating: '18+',
    language: 'RU',
    imdbRating: '6.8',
    kinopoiskRating: '6.2',
    splayRating: '6.5',
    description: 'Один человек объявляет войну преступному картелю, чтобы отомстить за гибель семьи. Напряжённый боевик о цене справедливости.',
    backdropGradient: 'radial-gradient(ellipse at 70% 30%, rgba(140,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #0a0000 0%, #2a0500 40%, #040000 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg3,
    gradient: 'linear-gradient(160deg, #2a0500 0%, #6b1000 50%, #c02020 100%)',
    heroTitle: 'ЖАЖДА МЕСТИ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'movie-2',
    title: 'Минари',
    year: 2021,
    quality: 'FullHD',
    genres: ['Драма', 'Семейный'],
    ageRating: '12+',
    language: 'UZ',
    imdbRating: '7.5',
    kinopoiskRating: '7.1',
    splayRating: '7.3',
    description: 'Корейская семья переезжает в американскую глубинку в поисках американской мечты. История о корнях, надежде и о том, что значит дом.',
    backdropGradient: 'radial-gradient(ellipse at 60% 40%, rgba(100,70,10,0.5) 0%, transparent 55%), linear-gradient(135deg, #020100 0%, #1a1000 45%, #050200 100%)',
    badge: 'Новинка',
    badgeVariant: 'warning',
    image: minariImg,
    gradient: 'linear-gradient(160deg, #1a1000 0%, #5a3000 50%, #a86000 100%)',
    heroTitle: 'МИНАРИ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'movie-3',
    title: 'Аватар',
    year: 2022,
    quality: 'FullHD',
    genres: ['Фантастика', 'Приключения'],
    ageRating: '6+',
    language: 'RU',
    imdbRating: '7.6',
    kinopoiskRating: '7.4',
    splayRating: '7.5',
    description: 'Возвращение на Пандору: семья Салли скрывается среди племён морского народа и открывает новые тайны этого удивительного мира.',
    backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000a08 0%, #001a18 45%, #000605 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #001a18 0%, #005044 50%, #008070 100%)',
    heroTitle: 'АВАТАР',
    heroSubtitle: 'ПУТЬ ВОДЫ',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'movie-4',
    title: 'Человек-паук',
    year: 2021,
    quality: 'FullHD',
    genres: ['Боевик', 'Фантастика'],
    ageRating: '12+',
    language: 'RU',
    imdbRating: '8.2',
    kinopoiskRating: '7.9',
    splayRating: '8.0',
    description: 'Питер Паркер сталкивается с мультивселенной и злодеями из других реальностей. Самое зрелищное приключение Человека-паука.',
    backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)',
    badge: 'Новинка',
    badgeVariant: 'warning',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)',
    heroTitle: 'ЧЕЛОВЕК-ПАУК',
    heroSubtitle: 'НЕТ ПУТИ ДОМОЙ',
    heroBadge: 'MARVEL',
  },
  {
    ...SHARED,
    id: 'movie-5',
    title: 'Мстители',
    year: 2022,
    quality: 'CF',
    genres: ['Боевик', 'Фантастика'],
    ageRating: '16+',
    language: 'RU',
    imdbRating: '8.4',
    kinopoiskRating: '7.8',
    splayRating: '8.1',
    description: 'Герои Marvel объединяются против нового врага, угрожающего самому существованию вселенной. Эпическое столкновение добра и зла.',
    backdropGradient: 'radial-gradient(ellipse at 65% 20%, rgba(80,30,160,0.55) 0%, transparent 55%), radial-gradient(ellipse at 85% 65%, rgba(140,50,10,0.45) 0%, transparent 50%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 65%, #020204 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #1a0202 0%, #600010 50%, #b00020 100%)',
    heroTitle: 'МСТИТЕЛИ',
    heroSubtitle: 'ВОЙНА БЕСКОНЕЧНОСТИ',
    heroBadge: 'MARVEL',
  },
  {
    ...SHARED,
    id: 'movie-6',
    title: 'Горизонт событий',
    year: 2023,
    quality: 'HD',
    genres: ['Ужасы', 'Фантастика'],
    ageRating: '18+',
    language: 'RU',
    imdbRating: '6.7',
    kinopoiskRating: '6.1',
    splayRating: '6.4',
    description: 'Спасательная команда отправляется на поиски пропавшего корабля и обнаруживает нечто ужасающее за пределами известной вселенной.',
    backdropGradient: 'radial-gradient(ellipse at 50% 30%, rgba(0,60,60,0.5) 0%, transparent 55%), linear-gradient(135deg, #000202 0%, #000a0a 45%, #000303 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #000a0a 0%, #002828 50%, #005040 100%)',
    heroTitle: 'ГОРИЗОНТ СОБЫТИЙ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'movie-7',
    title: 'Тёмный океан',
    year: 2023,
    quality: 'HD',
    genres: ['Триллер', 'Драма'],
    ageRating: '16+',
    language: 'RU',
    imdbRating: '7.1',
    kinopoiskRating: '6.8',
    splayRating: '6.9',
    description: 'Глубоководная исследовательская станция. Команда учёных находит нечто, что не должно было быть найдено. Время истекает.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,20,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #000002 0%, #000008 45%, #000102 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg4,
    gradient: 'linear-gradient(160deg, #00000a 0%, #000830 50%, #001060 100%)',
    heroTitle: 'ТЁМНЫЙ ОКЕАН',
    heroSubtitle: '',
    heroBadge: '',
  },
];

const POPULAR = [
  {
    ...SHARED,
    id: 'pop-1',
    title: 'Вечность',
    year: 2022,
    quality: 'HD',
    genres: ['Фантастика', 'Мистика'],
    ageRating: '12+',
    language: 'RU',
    imdbRating: '6.3',
    kinopoiskRating: '5.9',
    splayRating: '6.1',
    description: 'Бессмертная цивилизация скрывается среди людей тысячелетиями. Но древний враг возвращается, и им придётся раскрыть свои тайны.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(80,0,120,0.55) 0%, transparent 55%), linear-gradient(135deg, #030005 0%, #0a0010 45%, #020003 100%)',
    badge: 'Новинка',
    badgeVariant: 'warning',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #0a0010 0%, #300050 50%, #600090 100%)',
    heroTitle: 'ВЕЧНОСТЬ',
    heroSubtitle: '',
    heroBadge: 'MARVEL',
  },
  {
    ...SHARED,
    id: 'pop-2',
    title: 'Дикий север',
    year: 2022,
    quality: 'FullHD',
    genres: ['Приключения', 'Выживание'],
    ageRating: '16+',
    language: 'RU',
    imdbRating: '7.0',
    kinopoiskRating: '6.7',
    splayRating: '6.8',
    description: 'Экспедиция в арктические пустоши оборачивается борьбой за выживание. Человек против стихии в самых суровых условиях на планете.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(20,50,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #010200 0%, #050a00 45%, #010100 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg3,
    gradient: 'linear-gradient(160deg, #050a00 0%, #183000 50%, #306000 100%)',
    heroTitle: 'ДИКИЙ СЕВЕР',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'pop-3',
    title: 'Сломанные крылья',
    year: 2022,
    quality: 'HD',
    genres: ['Драма', 'Биография'],
    ageRating: '12+',
    language: 'RU',
    imdbRating: '7.2',
    kinopoiskRating: '7.0',
    splayRating: '7.1',
    description: 'История лётчика-испытателя, потерявшего всё ради мечты о небе. Путь через поражение к своему настоящему призванию.',
    backdropGradient: 'radial-gradient(ellipse at 65% 25%, rgba(80,70,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #030200 0%, #101000 45%, #020200 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #101000 0%, #3a3200 50%, #6a5800 100%)',
    heroTitle: 'СЛОМАННЫЕ КРЫЛЬЯ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'pop-4',
    title: 'Красный рассвет',
    year: 2022,
    quality: 'HD',
    genres: ['Боевик', 'Война'],
    ageRating: '18+',
    language: 'RU',
    imdbRating: '6.9',
    kinopoiskRating: '6.5',
    splayRating: '6.7',
    description: 'На рассвете начинается атака. Небольшой отряд должен остановить вторжение и спасти мирных жителей до прихода основных сил.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(140,10,10,0.6) 0%, transparent 55%), linear-gradient(135deg, #050000 0%, #200000 45%, #040000 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg4,
    gradient: 'linear-gradient(160deg, #200000 0%, #6a0000 50%, #c01010 100%)',
    heroTitle: 'КРАСНЫЙ РАССВЕТ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'pop-5',
    title: 'Последний герой',
    year: 2022,
    quality: 'FullHD',
    genres: ['Фантастика', 'Боевик'],
    ageRating: '16+',
    language: 'RU',
    imdbRating: '7.3',
    kinopoiskRating: '7.0',
    splayRating: '7.2',
    description: 'В мире, где супергерои исчезли, один обычный человек берёт на себя ответственность за судьбу города. Последний шанс на спасение.',
    backdropGradient: 'radial-gradient(ellipse at 65% 30%, rgba(0,40,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000105 0%, #001020 45%, #000103 100%)',
    badge: 'НОВИНКА',
    badgeVariant: 'warning',
    image: cardImg1,
    gradient: 'linear-gradient(160deg, #001020 0%, #003060 50%, #0050a0 100%)',
    heroTitle: 'ПОСЛЕДНИЙ ГЕРОЙ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'pop-6',
    title: 'Туманность',
    year: 2022,
    quality: 'HD',
    genres: ['Фантастика', 'Космос'],
    ageRating: '6+',
    language: 'RU',
    imdbRating: '6.8',
    kinopoiskRating: '6.5',
    splayRating: '6.6',
    description: 'Зонд обнаруживает на краю галактики аномалию, нарушающую все законы физики. Команда астронавтов отправляется разгадать загадку вселенной.',
    backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(100,0,100,0.5) 0%, transparent 55%), linear-gradient(135deg, #030003 0%, #100010 45%, #020002 100%)',
    badge: 'Новинка',
    badgeVariant: 'primary',
    image: cardImg2,
    gradient: 'linear-gradient(160deg, #100010 0%, #400050 50%, #800090 100%)',
    heroTitle: 'ТУМАННОСТЬ',
    heroSubtitle: '',
    heroBadge: '',
  },
  {
    ...SHARED,
    id: 'pop-7',
    title: 'Железный страж',
    year: 2022,
    quality: 'HD',
    genres: ['Боевик', 'Фантастика'],
    ageRating: '12+',
    language: 'RU',
    imdbRating: '6.5',
    kinopoiskRating: '6.2',
    splayRating: '6.3',
    description: 'Боевой робот нового поколения выходит из-под контроля. Его создатель — единственный, кто знает, как его остановить.',
    backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(60,55,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #020200 0%, #0a0800 45%, #010100 100%)',
    badge: 'Новинка',
    badgeVariant: 'warning',
    image: cardImg0,
    gradient: 'linear-gradient(160deg, #0a0800 0%, #302000 50%, #585000 100%)',
    heroTitle: 'ЖЕЛЕЗНЫЙ СТРАЖ',
    heroSubtitle: '',
    heroBadge: '',
  },
];

const BROADCASTS = [
  { ...SHARED, id: 'bc-1', title: 'Минари', year: 2020, quality: 'FullHD', ageRating: '12+', language: 'UZ', badge: 'Новинка', badgeVariant: 'warning', imdbRating: '7.5', kinopoiskRating: '7.1', splayRating: '7.3', image: minariImg, gradient: 'linear-gradient(160deg, #1a1000 0%, #5a3000 50%, #a86000 100%)', backdropGradient: 'radial-gradient(ellipse at 60% 40%, rgba(100,70,10,0.5) 0%, transparent 55%), linear-gradient(135deg, #020100 0%, #1a1000 45%, #050200 100%)', description: 'Корейская семья переезжает в американскую глубинку.', genres: ['Драма'], heroTitle: 'МИНАРИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'bc-2', title: 'Мстители', year: 2019, quality: 'CF', ageRating: '16+', language: 'RU', badge: 'Новинка', badgeVariant: 'primary', imdbRating: '8.4', kinopoiskRating: '7.8', splayRating: '8.1', image: cardImg0, gradient: 'linear-gradient(160deg, #1a0202 0%, #600010 50%, #b00020 100%)', backdropGradient: 'radial-gradient(ellipse at 65% 20%, rgba(80,30,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 100%)', description: 'Герои Marvel объединяются.', genres: ['Боевик'], heroTitle: 'МСТИТЕЛИ', heroSubtitle: 'ФИНАЛ', heroBadge: 'MARVEL' },
  { ...SHARED, id: 'bc-3', title: 'Тёмный океан', year: 2023, quality: 'HD', ageRating: '18+', language: 'RU', badge: 'Новинка', badgeVariant: 'primary', imdbRating: '7.1', kinopoiskRating: '6.8', splayRating: '6.9', image: cardImg4, gradient: 'linear-gradient(160deg, #00000a 0%, #000830 50%, #001060 100%)', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,20,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #000002 0%, #000008 45%, #000102 100%)', description: 'Глубоководная исследовательская станция.', genres: ['Триллер'], heroTitle: 'ТЁМНЫЙ ОКЕАН', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'bc-4', title: 'Жажда мести', year: 2023, quality: 'HD', ageRating: '18+', language: 'RU', badge: 'Новинка', badgeVariant: 'warning', imdbRating: '6.8', kinopoiskRating: '6.2', splayRating: '6.5', image: cardImg3, gradient: 'linear-gradient(160deg, #2a0500 0%, #6b1000 50%, #c02020 100%)', backdropGradient: 'radial-gradient(ellipse at 70% 30%, rgba(140,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #0a0000 0%, #2a0500 40%, #040000 100%)', description: 'Один человек против преступного мира.', genres: ['Боевик'], heroTitle: 'ЖАЖДА МЕСТИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'bc-5', title: 'Аватар', year: 2022, quality: 'FullHD', ageRating: '6+', language: 'UZ', badge: 'Новинка', badgeVariant: 'primary', imdbRating: '7.6', kinopoiskRating: '7.4', splayRating: '7.5', image: cardImg1, gradient: 'linear-gradient(160deg, #001a18 0%, #005044 50%, #008070 100%)', backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000a08 0%, #001a18 45%, #000605 100%)', description: 'Возвращение на Пандору.', genres: ['Фантастика'], heroTitle: 'АВАТАР', heroSubtitle: 'ПУТЬ ВОДЫ', heroBadge: '' },
  { ...SHARED, id: 'bc-6', title: 'Человек-паук', year: 2021, quality: 'FullHD', ageRating: '12+', language: 'RU', badge: 'Новинка', badgeVariant: 'warning', imdbRating: '8.2', kinopoiskRating: '7.9', splayRating: '8.0', image: cardImg2, gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)', description: 'Мультивселенная открылась.', genres: ['Боевик'], heroTitle: 'ЧЕЛОВЕК-ПАУК', heroSubtitle: 'НЕТ ПУТИ ДОМОЙ', heroBadge: 'MARVEL' },
];

const SHOWS = [
  { ...SHARED, id: 'show-1', title: 'Всё везде и сразу', year: 2022, quality: 'FullHD', ageRating: '16+', language: 'UZ', kinopoiskRating: '10', imdbRating: '7.8', splayRating: '8.0', badge: 'Новинка', badgeVariant: 'warning', image: everythingImg, gradient: 'linear-gradient(160deg, #200005 0%, #600015 50%, #c00030 100%)', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(160,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #080002 0%, #200005 45%, #050001 100%)', description: 'Пожилая китаянка открывает возможности мультивселенной.', genres: ['Боевик', 'Комедия'], heroTitle: 'ВСЁ ВЕЗДЕ И СРАЗУ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'show-2', title: 'Минари', year: 2020, quality: 'FullHD', ageRating: '16+', language: 'UZ', kinopoiskRating: '10', imdbRating: '7.5', splayRating: '7.3', badge: 'Новинка', badgeVariant: 'warning', image: minariImg, gradient: 'linear-gradient(160deg, #1a1000 0%, #5a3800 50%, #a06000 100%)', backdropGradient: 'radial-gradient(ellipse at 55% 40%, rgba(100,80,10,0.5) 0%, transparent 55%), linear-gradient(135deg, #020100 0%, #1a1200 45%, #050200 100%)', description: 'Корейская семья начинает новую жизнь в Арканзасе.', genres: ['Драма', 'Семейный'], heroTitle: 'МИНАРИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'show-3', title: 'Мстители', year: 2019, quality: 'CF', ageRating: '12+', language: 'RU', kinopoiskRating: '8', imdbRating: '8.4', splayRating: '8.1', badge: 'Новинка', badgeVariant: 'primary', image: cardImg0, gradient: 'linear-gradient(160deg, #1a0202 0%, #600010 50%, #b00020 100%)', backdropGradient: 'radial-gradient(ellipse at 65% 20%, rgba(80,30,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 100%)', description: 'Финальная битва против Таноса за судьбу вселенной.', genres: ['Боевик', 'Фантастика'], heroTitle: 'МСТИТЕЛИ', heroSubtitle: 'ФИНАЛ', heroBadge: 'MARVEL' },
  { ...SHARED, id: 'show-4', title: 'Человек-паук', year: 2021, quality: 'FullHD', ageRating: '12+', language: 'RU', kinopoiskRating: '8', imdbRating: '8.2', splayRating: '8.0', badge: 'Новинка', badgeVariant: 'warning', image: cardImg2, gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)', description: 'Питер Паркер и мультивселенная злодеев.', genres: ['Боевик', 'Фантастика'], heroTitle: 'ЧЕЛОВЕК-ПАУК', heroSubtitle: 'НЕТ ПУТИ ДОМОЙ', heroBadge: 'MARVEL' },
  { ...SHARED, id: 'show-5', title: 'Аватар', year: 2022, quality: 'FullHD', ageRating: '6+', language: 'UZ', kinopoiskRating: '7', imdbRating: '7.6', splayRating: '7.5', badge: 'Новинка', badgeVariant: 'primary', image: cardImg1, gradient: 'linear-gradient(160deg, #001a18 0%, #005044 50%, #008070 100%)', backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000a08 0%, #001a18 45%, #000605 100%)', description: 'Возвращение на Пандору, мир морского народа.', genres: ['Фантастика', 'Приключения'], heroTitle: 'АВАТАР', heroSubtitle: 'ПУТЬ ВОДЫ', heroBadge: '' },
  { ...SHARED, id: 'show-6', title: 'Тёмный океан', year: 2023, quality: 'HD', ageRating: '18+', language: 'RU', kinopoiskRating: '7', imdbRating: '7.1', splayRating: '6.9', badge: 'Новинка', badgeVariant: 'warning', image: cardImg4, gradient: 'linear-gradient(160deg, #00000a 0%, #000830 50%, #001060 100%)', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,20,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #000002 0%, #000008 45%, #000102 100%)', description: 'Команда учёных на глубоководной станции.', genres: ['Триллер', 'Ужасы'], heroTitle: 'ТЁМНЫЙ ОКЕАН', heroSubtitle: '', heroBadge: '' },
];

export const CONTENT_ROWS = [
  { id: 'row-premieres', title: 'Премьеры', items: PREMIERES },
  { id: 'row-films', title: 'Фильмы', items: POPULAR },
];

export const BROADCASTS_ROW = { id: 'row-broadcasts', title: 'Телепередачи', items: BROADCASTS };
export const SHOWS_ROW = { id: 'row-shows', title: 'Сериалы', items: SHOWS };

const TOP_TEN = [
  { ...SHARED, id: 'top10-1', title: 'Всё везде и сразу', year: 2022, quality: 'FullHD', ageRating: '16+', language: 'UZ', genres: ['Боевик', 'Комедия', 'Фантастика'], description: 'Пожилая китаянка открывает возможности мультивселенной и становится единственной, кто может спасти все миры.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(160,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #080002 0%, #200005 45%, #050001 100%)', imdbRating: '7.8', kinopoiskRating: '7.5', splayRating: '8.0', badge: 'Новинка', badgeVariant: 'warning', image: everythingImg, gradient: 'linear-gradient(160deg, #200005 0%, #600015 50%, #c00030 100%)', heroTitle: 'ВСЁ ВЕЗДЕ И СРАЗУ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'top10-2', title: 'Минари', year: 2020, quality: 'FullHD', ageRating: '12+', language: 'UZ', genres: ['Драма', 'Семейный'], description: 'Корейская семья начинает новую жизнь в Арканзасе. История о любви, упорстве и поиске места, которое можно назвать домом.', backdropGradient: 'radial-gradient(ellipse at 55% 40%, rgba(100,80,10,0.5) 0%, transparent 55%), linear-gradient(135deg, #020100 0%, #1a1200 45%, #050200 100%)', imdbRating: '7.5', kinopoiskRating: '7.2', splayRating: '7.3', badge: 'Новинка', badgeVariant: 'warning', image: minariImg, gradient: 'linear-gradient(160deg, #1a1000 0%, #5a3800 50%, #a06000 100%)', heroTitle: 'МИНАРИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'top10-3', title: 'Жажда мести', year: 2023, quality: 'HD', ageRating: '18+', language: 'RU', genres: ['Боевик', 'Триллер'], description: 'Один человек объявляет войну преступному картелю, чтобы отомстить за гибель семьи.', backdropGradient: 'radial-gradient(ellipse at 70% 30%, rgba(140,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #0a0000 0%, #2a0500 40%, #040000 100%)', imdbRating: '6.8', kinopoiskRating: '6.2', splayRating: '6.5', badge: 'Новинка', badgeVariant: 'primary', image: cardImg3, gradient: 'linear-gradient(160deg, #2a0500 0%, #6b1000 50%, #c02020 100%)', heroTitle: 'ЖАЖДА МЕСТИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'top10-4', title: 'Человек-паук', year: 2021, quality: 'FullHD', ageRating: '12+', language: 'RU', genres: ['Боевик', 'Фантастика'], description: 'Питер Паркер сталкивается с мультивселенной и злодеями из других реальностей.', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)', imdbRating: '8.2', kinopoiskRating: '7.9', splayRating: '8.0', badge: 'Новинка', badgeVariant: 'warning', image: cardImg2, gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)', heroTitle: 'ЧЕЛОВЕК-ПАУК', heroSubtitle: 'НЕТ ПУТИ ДОМОЙ', heroBadge: 'MARVEL' },
];

const RECOMMENDATIONS_USERNAME = 'Фaхриддин';
export const RECOMMENDATIONS_ROW = { id: 'row-recommendations', title: 'Рекомендации для', username: RECOMMENDATIONS_USERNAME, items: TOP_TEN };

const ANIME = [
  { ...SHARED, id: 'anime-1', title: 'Атака титанов', year: 2023, quality: 'FullHD', ageRating: '18+', language: 'RU', genres: ['Аниме', 'Боевик'], description: 'Человечество в осаде гигантских существ. Последний оплот цивилизации — за стенами.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(120,20,0,0.6) 0%, transparent 55%), linear-gradient(135deg, #060000 0%, #1a0000 45%, #040000 100%)', imdbRating: '9.0', kinopoiskRating: '8.7', splayRating: '8.9', badge: 'Новинка', badgeVariant: 'primary', image: cardImg0, gradient: 'linear-gradient(160deg, #1a0000 0%, #5a0000 50%, #a00000 100%)', heroTitle: 'АТАКА ТИТАНОВ', heroSubtitle: 'ФИНАЛЬНЫЙ СЕЗОН', heroBadge: '' },
  { ...SHARED, id: 'anime-2', title: 'Наруто', year: 2002, quality: 'HD', ageRating: '12+', language: 'RU', genres: ['Аниме', 'Приключения'], description: 'Молодой ниндзя мечтает стать величайшим в деревне. История о дружбе, воле и мечте.', backdropGradient: 'radial-gradient(ellipse at 65% 30%, rgba(200,80,0,0.55) 0%, transparent 55%), linear-gradient(135deg, #050200 0%, #1a0800 45%, #040200 100%)', imdbRating: '8.3', kinopoiskRating: '8.0', splayRating: '8.1', badge: 'Хит', badgeVariant: 'warning', image: cardImg1, gradient: 'linear-gradient(160deg, #1a0800 0%, #602000 50%, #c04000 100%)', heroTitle: 'НАРУТО', heroSubtitle: 'ШИППУДЕН', heroBadge: '' },
  { ...SHARED, id: 'anime-3', title: 'Клинок рассекающий демонов', year: 2021, quality: 'FullHD', ageRating: '16+', language: 'RU', genres: ['Аниме', 'Фэнтези'], description: 'Юный охотник на демонов ищет лекарство для сестры. Путь, полный опасностей и жертв.', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(160,0,0,0.6) 0%, transparent 55%), linear-gradient(135deg, #040000 0%, #120000 45%, #030000 100%)', imdbRating: '8.7', kinopoiskRating: '8.4', splayRating: '8.5', badge: 'Новинка', badgeVariant: 'primary', image: cardImg2, gradient: 'linear-gradient(160deg, #120000 0%, #450000 50%, #8a0000 100%)', heroTitle: 'КЛИНОК', heroSubtitle: 'РАССЕКАЮЩИЙ ДЕМОНОВ', heroBadge: '' },
  { ...SHARED, id: 'anime-4', title: 'Стальной алхимик', year: 2009, quality: 'HD', ageRating: '14+', language: 'RU', genres: ['Аниме', 'Приключения'], description: 'Два брата ищут философский камень. Цена запретного знания — дороже, чем они думали.', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(180,100,0,0.55) 0%, transparent 55%), linear-gradient(135deg, #050200 0%, #1e0a00 45%, #050200 100%)', imdbRating: '9.1', kinopoiskRating: '8.9', splayRating: '9.0', badge: 'Хит', badgeVariant: 'warning', image: cardImg3, gradient: 'linear-gradient(160deg, #1e0a00 0%, #703000 50%, #c06000 100%)', heroTitle: 'СТАЛЬНОЙ АЛХИМИК', heroSubtitle: 'БРАТСТВО', heroBadge: '' },
  { ...SHARED, id: 'anime-5', title: 'Тетрадь смерти', year: 2006, quality: 'HD', ageRating: '18+', language: 'RU', genres: ['Аниме', 'Психологический'], description: 'Студент находит тетрадь с возможностью убивать. Игра в кошки-мышки между гением и детективом.', backdropGradient: 'radial-gradient(ellipse at 50% 30%, rgba(0,0,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #000002 0%, #000010 45%, #000002 100%)', imdbRating: '8.6', kinopoiskRating: '8.5', splayRating: '8.5', badge: 'Хит', badgeVariant: 'primary', image: cardImg4, gradient: 'linear-gradient(160deg, #000010 0%, #000040 50%, #000080 100%)', heroTitle: 'ТЕТРАДЬ СМЕРТИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'anime-6', title: 'Моя геройская академия', year: 2022, quality: 'FullHD', ageRating: '12+', language: 'RU', genres: ['Аниме', 'Суперсила'], description: 'В мире суперспособностей мальчик без силы стремится стать величайшим героем.', backdropGradient: 'radial-gradient(ellipse at 65% 30%, rgba(20,50,180,0.55) 0%, transparent 55%), linear-gradient(135deg, #010208 0%, #061020 45%, #010208 100%)', imdbRating: '8.1', kinopoiskRating: '7.8', splayRating: '7.9', badge: 'Новинка', badgeVariant: 'warning', image: cardImg0, gradient: 'linear-gradient(160deg, #061020 0%, #183060 50%, #2050a0 100%)', heroTitle: 'МОЯ ГЕРОЙСКАЯ', heroSubtitle: 'АКАДЕМИЯ', heroBadge: '' },
];

const COMEDY = [
  { ...SHARED, id: 'com-1', title: 'Форс-мажоры', year: 2022, quality: 'FullHD', ageRating: '16+', language: 'RU', genres: ['Комедия', 'Драма'], description: 'Успешный юрист и его ассистент-самозванец. Дружба, ложь и корпоративные интриги в лучшем виде.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(20,60,120,0.55) 0%, transparent 55%), linear-gradient(135deg, #010308 0%, #081020 45%, #010308 100%)', imdbRating: '8.5', kinopoiskRating: '8.2', splayRating: '8.3', badge: 'Хит', badgeVariant: 'warning', image: cardImg1, gradient: 'linear-gradient(160deg, #081020 0%, #183060 50%, #2858a0 100%)', heroTitle: 'ФОРС-МАЖОРЫ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'com-2', title: 'Бруклин 9-9', year: 2022, quality: 'HD', ageRating: '12+', language: 'RU', genres: ['Комедия', 'Детектив'], description: 'Полицейский участок Бруклина полон эксцентричных детективов. Жизнь и расследования с юмором.', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(180,100,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #050200 0%, #1a0a00 45%, #050200 100%)', imdbRating: '8.4', kinopoiskRating: '8.0', splayRating: '8.1', badge: 'Хит', badgeVariant: 'primary', image: cardImg2, gradient: 'linear-gradient(160deg, #1a0a00 0%, #603000 50%, #b06000 100%)', heroTitle: 'БРУКЛИН 9-9', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'com-3', title: 'Офис', year: 2005, quality: 'HD', ageRating: '12+', language: 'RU', genres: ['Комедия', 'Мокьюментари'], description: 'Будни сотрудников бумажной компании под наблюдением документальной съёмки. Культовый ситком.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(0,80,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #000300 0%, #001200 45%, #000300 100%)', imdbRating: '9.0', kinopoiskRating: '8.7', splayRating: '8.8', badge: 'Хит', badgeVariant: 'warning', image: cardImg3, gradient: 'linear-gradient(160deg, #001200 0%, #003800 50%, #006800 100%)', heroTitle: 'ОФИС', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'com-4', title: 'Теория большого взрыва', year: 2019, quality: 'FullHD', ageRating: '12+', language: 'RU', genres: ['Комедия', 'Романтика'], description: 'Компания учёных-гиков и их соседка. Двенадцать сезонов смеха о физиках и жизни.', backdropGradient: 'radial-gradient(ellipse at 65% 30%, rgba(60,0,120,0.55) 0%, transparent 55%), linear-gradient(135deg, #020005 0%, #0a0018 45%, #020005 100%)', imdbRating: '8.1', kinopoiskRating: '7.9', splayRating: '8.0', badge: 'Хит', badgeVariant: 'primary', image: cardImg4, gradient: 'linear-gradient(160deg, #0a0018 0%, #300060 50%, #6000a0 100%)', heroTitle: 'ТЕОРИЯ', heroSubtitle: 'БОЛЬШОГО ВЗРЫВА', heroBadge: '' },
  { ...SHARED, id: 'com-5', title: 'Парки и зоны отдыха', year: 2015, quality: 'HD', ageRating: '12+', language: 'RU', genres: ['Комедия', 'Мокьюментари'], description: 'Чиновница маленького городка борется за каждый парк. Самый добрый ситком десятилетия.', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,100,50,0.5) 0%, transparent 55%), linear-gradient(135deg, #000400 0%, #001800 45%, #000500 100%)', imdbRating: '8.6', kinopoiskRating: '8.3', splayRating: '8.4', badge: 'Хит', badgeVariant: 'warning', image: everythingImg, gradient: 'linear-gradient(160deg, #001800 0%, #005020 50%, #008040 100%)', heroTitle: 'ПАРКИ И ЗОНЫ', heroSubtitle: 'ОТДЫХА', heroBadge: '' },
  { ...SHARED, id: 'com-6', title: 'Как я встретил вашу маму', year: 2014, quality: 'HD', ageRating: '16+', language: 'RU', genres: ['Комедия', 'Романтика'], description: 'Нью-йоркский архитектор рассказывает детям историю о том, как встретил их маму. 9 сезонов.', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(120,60,0,0.5) 0%, transparent 55%), linear-gradient(135deg, #040200 0%, #180800 45%, #040200 100%)', imdbRating: '8.3', kinopoiskRating: '8.0', splayRating: '8.1', badge: 'Хит', badgeVariant: 'primary', image: minariImg, gradient: 'linear-gradient(160deg, #180800 0%, #582800 50%, #a05000 100%)', heroTitle: 'КАК Я ВСТРЕТИЛ', heroSubtitle: 'ВАШУ МАМУ', heroBadge: '' },
];

const HORROR = [
  { ...SHARED, id: 'hor-1', title: 'Очень странные дела', year: 2022, quality: 'FullHD', ageRating: '16+', language: 'RU', genres: ['Ужасы', 'Фантастика'], description: 'Маленький городок. Пропавший мальчик. Параллельное измерение. Ретро-хоррор 80-х.', backdropGradient: 'radial-gradient(ellipse at 55% 30%, rgba(80,0,100,0.6) 0%, transparent 55%), linear-gradient(135deg, #030005 0%, #0f0018 45%, #030005 100%)', imdbRating: '8.7', kinopoiskRating: '8.5', splayRating: '8.6', badge: 'Новинка', badgeVariant: 'primary', image: cardImg0, gradient: 'linear-gradient(160deg, #0f0018 0%, #380060 50%, #700090 100%)', heroTitle: 'ОЧЕНЬ СТРАННЫЕ', heroSubtitle: 'ДЕЛА', heroBadge: '' },
  { ...SHARED, id: 'hor-2', title: 'Оно', year: 2017, quality: 'FullHD', ageRating: '18+', language: 'RU', genres: ['Ужасы', 'Триллер'], description: 'Дети в маленьком городе сталкиваются с древним злом, принимающим облик их страхов.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(160,0,0,0.65) 0%, transparent 55%), linear-gradient(135deg, #060000 0%, #1a0000 45%, #050000 100%)', imdbRating: '7.4', kinopoiskRating: '7.0', splayRating: '7.1', badge: 'Хит', badgeVariant: 'warning', image: cardImg1, gradient: 'linear-gradient(160deg, #1a0000 0%, #600000 50%, #b00000 100%)', heroTitle: 'ОНО', heroSubtitle: 'ГЛАВА ПЕРВАЯ', heroBadge: '' },
  { ...SHARED, id: 'hor-3', title: 'Прочь', year: 2017, quality: 'HD', ageRating: '18+', language: 'RU', genres: ['Ужасы', 'Триллер'], description: 'Молодой чернокожий фотограф едет знакомиться с семьёй подруги. Идеальный загородный кошмар.', backdropGradient: 'radial-gradient(ellipse at 50% 35%, rgba(0,30,0,0.6) 0%, transparent 55%), linear-gradient(135deg, #000100 0%, #000600 45%, #000100 100%)', imdbRating: '7.7', kinopoiskRating: '7.3', splayRating: '7.4', badge: 'Хит', badgeVariant: 'primary', image: cardImg2, gradient: 'linear-gradient(160deg, #000600 0%, #001800 50%, #003000 100%)', heroTitle: 'ПРОЧЬ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'hor-4', title: 'Реликвия', year: 2020, quality: 'HD', ageRating: '18+', language: 'RU', genres: ['Ужасы', 'Драма'], description: 'Женщина возвращается в дом пропавшей матери и обнаруживает нечто зловещее в его стенах.', backdropGradient: 'radial-gradient(ellipse at 55% 30%, rgba(40,40,0,0.55) 0%, transparent 55%), linear-gradient(135deg, #020200 0%, #0a0a00 45%, #020200 100%)', imdbRating: '6.9', kinopoiskRating: '6.5', splayRating: '6.6', badge: 'Новинка', badgeVariant: 'warning', image: cardImg3, gradient: 'linear-gradient(160deg, #0a0a00 0%, #282800 50%, #504800 100%)', heroTitle: 'РЕЛИКВИЯ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'hor-5', title: 'Ламберт', year: 2023, quality: 'FullHD', ageRating: '18+', language: 'RU', genres: ['Ужасы', 'Паранормальное'], description: 'Семья переезжает в старый дом. Прошлое дома не отпускает — и не намерено этого делать.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(80,0,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #040004 0%, #120012 45%, #040004 100%)', imdbRating: '7.0', kinopoiskRating: '6.7', splayRating: '6.8', badge: 'Новинка', badgeVariant: 'primary', image: cardImg4, gradient: 'linear-gradient(160deg, #120012 0%, #400040 50%, #700070 100%)', heroTitle: 'ЛАМБЕРТ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'hor-6', title: 'Тихое место', year: 2018, quality: 'FullHD', ageRating: '16+', language: 'RU', genres: ['Ужасы', 'Фантастика'], description: 'Мир захвачен существами, реагирующими на звук. Семья выживает в абсолютной тишине.', backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,40,40,0.55) 0%, transparent 55%), linear-gradient(135deg, #000202 0%, #000c0c 45%, #000202 100%)', imdbRating: '7.5', kinopoiskRating: '7.2', splayRating: '7.3', badge: 'Хит', badgeVariant: 'warning', image: everythingImg, gradient: 'linear-gradient(160deg, #000c0c 0%, #003030 50%, #006060 100%)', heroTitle: 'ТИХОЕ МЕСТО', heroSubtitle: '', heroBadge: '' },
];

const DOCUMENTARIES = [
  { ...SHARED, id: 'doc-1', title: 'Планета Земля III', year: 2023, quality: 'FullHD', ageRating: '0+', language: 'RU', genres: ['Документальный', 'Природа'], description: 'Дэвид Аттенборо возвращается с новым взглядом на дикую природу нашей планеты. Потрясающие съёмки.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(0,80,40,0.55) 0%, transparent 55%), linear-gradient(135deg, #000400 0%, #001800 45%, #000400 100%)', imdbRating: '9.3', kinopoiskRating: '9.0', splayRating: '9.1', badge: 'Новинка', badgeVariant: 'primary', image: cardImg1, gradient: 'linear-gradient(160deg, #001800 0%, #005020 50%, #009040 100%)', heroTitle: 'ПЛАНЕТА ЗЕМЛЯ III', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'doc-2', title: 'Наш мир', year: 2022, quality: 'FullHD', ageRating: '0+', language: 'RU', genres: ['Документальный', 'Природа'], description: 'Путешествие по семи континентам. Удивительные экосистемы и борьба за выживание в дикой природе.', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,50,100,0.5) 0%, transparent 55%), linear-gradient(135deg, #000205 0%, #000a18 45%, #000205 100%)', imdbRating: '8.7', kinopoiskRating: '8.4', splayRating: '8.5', badge: 'Хит', badgeVariant: 'warning', image: cardImg2, gradient: 'linear-gradient(160deg, #000a18 0%, #002860 50%, #0040a0 100%)', heroTitle: 'НАШ МИР', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'doc-3', title: '14 Пиков', year: 2021, quality: 'HD', ageRating: '6+', language: 'RU', genres: ['Документальный', 'Спорт'], description: 'Непальский альпинист ставит целью покорить все 14 восьмитысячников за 7 месяцев. Невозможное возможно.', backdropGradient: 'radial-gradient(ellipse at 65% 25%, rgba(120,120,120,0.4) 0%, transparent 55%), linear-gradient(135deg, #050505 0%, #181818 45%, #050505 100%)', imdbRating: '7.9', kinopoiskRating: '7.6', splayRating: '7.7', badge: 'Хит', badgeVariant: 'primary', image: cardImg3, gradient: 'linear-gradient(160deg, #181818 0%, #484848 50%, #787878 100%)', heroTitle: '14 ПИКОВ', heroSubtitle: 'НИЧТО НЕВОЗМОЖНО', heroBadge: '' },
  { ...SHARED, id: 'doc-4', title: 'Стекло', year: 2022, quality: 'HD', ageRating: '12+', language: 'RU', genres: ['Документальный', 'Технологии'], description: 'Как производится стекло? От песка до экрана смартфона — история удивительного материала.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(0,80,100,0.5) 0%, transparent 55%), linear-gradient(135deg, #000304 0%, #000e12 45%, #000304 100%)', imdbRating: '7.2', kinopoiskRating: '6.9', splayRating: '7.0', badge: 'Новинка', badgeVariant: 'warning', image: cardImg4, gradient: 'linear-gradient(160deg, #000e12 0%, #003040 50%, #006070 100%)', heroTitle: 'СТЕКЛО', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'doc-5', title: 'Тело говорит', year: 2022, quality: 'FullHD', ageRating: '12+', language: 'RU', genres: ['Документальный', 'Наука'], description: 'Учёные и профессионалы о языке тела. Как мы общаемся без слов и что скрывают наши движения.', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(60,0,100,0.5) 0%, transparent 55%), linear-gradient(135deg, #020005 0%, #0c0018 45%, #020005 100%)', imdbRating: '7.4', kinopoiskRating: '7.1', splayRating: '7.2', badge: 'Новинка', badgeVariant: 'primary', image: everythingImg, gradient: 'linear-gradient(160deg, #0c0018 0%, #380060 50%, #680090 100%)', heroTitle: 'ТЕЛО ГОВОРИТ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'doc-6', title: 'Космос: Пространство и время', year: 2014, quality: 'HD', ageRating: '0+', language: 'RU', genres: ['Документальный', 'Наука'], description: 'Нил деГрасс Тайсон проводит зрителя через историю вселенной — от Большого взрыва до наших дней.', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(0,0,120,0.6) 0%, transparent 55%), linear-gradient(135deg, #000004 0%, #000012 45%, #000004 100%)', imdbRating: '9.3', kinopoiskRating: '9.1', splayRating: '9.2', badge: 'Хит', badgeVariant: 'warning', image: minariImg, gradient: 'linear-gradient(160deg, #000012 0%, #000050 50%, #000090 100%)', heroTitle: 'КОСМОС', heroSubtitle: 'ПРОСТРАНСТВО И ВРЕМЯ', heroBadge: '' },
];

const TOP_WEEK = [
  { ...SHARED, id: 'tw-1', title: 'Мстители: Финал', year: 2019, quality: 'CF', ageRating: '16+', language: 'RU', genres: ['Боевик', 'Фантастика'], description: 'Финальная битва против Таноса. Все герои Marvel собираются ради одного последнего удара.', backdropGradient: 'radial-gradient(ellipse at 65% 20%, rgba(80,30,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #020618 0%, #0a0420 35%, #06020e 100%)', imdbRating: '8.4', kinopoiskRating: '8.1', splayRating: '8.3', badge: '№1 неделя', badgeVariant: 'primary', image: cardImg0, gradient: 'linear-gradient(160deg, #1a0202 0%, #600010 50%, #b00020 100%)', heroTitle: 'МСТИТЕЛИ', heroSubtitle: 'ФИНАЛ', heroBadge: 'MARVEL' },
  { ...SHARED, id: 'tw-2', title: 'Всё везде и сразу', year: 2022, quality: 'FullHD', ageRating: '16+', language: 'UZ', genres: ['Боевик', 'Комедия'], description: 'Пожилая женщина осваивает мультивселенную, чтобы спасти все существующие реальности.', backdropGradient: 'radial-gradient(ellipse at 60% 30%, rgba(160,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #080002 0%, #200005 45%, #050001 100%)', imdbRating: '7.8', kinopoiskRating: '7.5', splayRating: '8.0', badge: '№2 неделя', badgeVariant: 'warning', image: everythingImg, gradient: 'linear-gradient(160deg, #200005 0%, #600015 50%, #c00030 100%)', heroTitle: 'ВСЁ ВЕЗДЕ', heroSubtitle: 'И СРАЗУ', heroBadge: '' },
  { ...SHARED, id: 'tw-3', title: 'Аватар: Путь воды', year: 2022, quality: 'FullHD', ageRating: '6+', language: 'RU', genres: ['Фантастика', 'Приключения'], description: 'Джейк Салли и семья скрываются среди морского народа. Пандора открывает новые секреты.', backdropGradient: 'radial-gradient(ellipse at 65% 35%, rgba(0,120,100,0.55) 0%, transparent 55%), linear-gradient(135deg, #000a08 0%, #001a18 45%, #000605 100%)', imdbRating: '7.6', kinopoiskRating: '7.4', splayRating: '7.5', badge: '№3 неделя', badgeVariant: 'primary', image: cardImg1, gradient: 'linear-gradient(160deg, #001a18 0%, #005044 50%, #008070 100%)', heroTitle: 'АВАТАР', heroSubtitle: 'ПУТЬ ВОДЫ', heroBadge: '' },
  { ...SHARED, id: 'tw-4', title: 'Человек-паук', year: 2021, quality: 'FullHD', ageRating: '12+', language: 'RU', genres: ['Боевик', 'Фантастика'], description: 'Питер Паркер открывает мультивселенную и встречает версии себя из других реальностей.', backdropGradient: 'radial-gradient(ellipse at 60% 25%, rgba(30,50,160,0.55) 0%, transparent 55%), linear-gradient(135deg, #010108 0%, #08101a 45%, #020308 100%)', imdbRating: '8.2', kinopoiskRating: '7.9', splayRating: '8.0', badge: '№4 неделя', badgeVariant: 'warning', image: cardImg2, gradient: 'linear-gradient(160deg, #080a1a 0%, #18204a 50%, #2c3878 100%)', heroTitle: 'ЧЕЛОВЕК-ПАУК', heroSubtitle: 'НЕТ ПУТИ ДОМОЙ', heroBadge: 'MARVEL' },
  { ...SHARED, id: 'tw-5', title: 'Жажда мести', year: 2023, quality: 'HD', ageRating: '18+', language: 'RU', genres: ['Боевик', 'Триллер'], description: 'Один человек объявляет войну преступному картелю, чтобы отомстить за гибель семьи.', backdropGradient: 'radial-gradient(ellipse at 70% 30%, rgba(140,20,20,0.6) 0%, transparent 55%), linear-gradient(135deg, #0a0000 0%, #2a0500 40%, #040000 100%)', imdbRating: '6.8', kinopoiskRating: '6.2', splayRating: '6.5', badge: '№5 неделя', badgeVariant: 'primary', image: cardImg3, gradient: 'linear-gradient(160deg, #2a0500 0%, #6b1000 50%, #c02020 100%)', heroTitle: 'ЖАЖДА МЕСТИ', heroSubtitle: '', heroBadge: '' },
  { ...SHARED, id: 'tw-6', title: 'Тёмный океан', year: 2023, quality: 'HD', ageRating: '18+', language: 'RU', genres: ['Триллер', 'Драма'], description: 'Глубоководная исследовательская станция. Команда учёных находит нечто, что не должно быть найдено.', backdropGradient: 'radial-gradient(ellipse at 55% 35%, rgba(0,20,80,0.6) 0%, transparent 55%), linear-gradient(135deg, #000002 0%, #000008 45%, #000102 100%)', imdbRating: '7.1', kinopoiskRating: '6.8', splayRating: '6.9', badge: '№6 неделя', badgeVariant: 'warning', image: cardImg4, gradient: 'linear-gradient(160deg, #00000a 0%, #000830 50%, #001060 100%)', heroTitle: 'ТЁМНЫЙ ОКЕАН', heroSubtitle: '', heroBadge: '' },
];

export const ANIME_ROW       = { id: 'row-anime',       title: 'Аниме',              items: ANIME };
export const COMEDY_ROW      = { id: 'row-comedy',      title: 'Комедии',            items: COMEDY };
export const HORROR_ROW      = { id: 'row-horror',      title: 'Ужасы',              items: HORROR };
export const DOCS_ROW        = { id: 'row-docs',        title: 'Документальные',     items: DOCUMENTARIES };
export const TOP_WEEK_ROW    = { id: 'row-top-week',    title: 'Топ недели',         items: TOP_WEEK };

export function getAnimeRow()       { return ANIME_ROW; }
export function getComedyRow()      { return COMEDY_ROW; }
export function getHorrorRow()      { return HORROR_ROW; }
export function getDocsRow()        { return DOCS_ROW; }
export function getTopWeekRow()     { return TOP_WEEK_ROW; }

export function getFeaturedContent() { return FEATURED_MOVIE; }
export function getContentRows() { return CONTENT_ROWS; }
export function getRecommendationsRow() { return RECOMMENDATIONS_ROW; }
export function getShowsRow() { return SHOWS_ROW; }
export function getBroadcastsRow() { return BROADCASTS_ROW; }

// Legacy exports
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
