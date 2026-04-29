import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import LandscapeResultCard from './LandscapeResultCard';

// Image imports
import img0 from '../../../assets/movie-img/Card Image (1).png';
import img1 from '../../../assets/movie-img/Card Image (2).png';
import img2 from '../../../assets/movie-img/Card Image (3).png';
import img3 from '../../../assets/movie-img/Card Image (4).png';
import img4 from '../../../assets/movie-img/Card Image (1).png';

const IMAGES = [img0, img1, img2, img3, img4];

// Data array populated with fields required for the cards
const RESULT_ITEMS = [
  { id: 'lr-1', kinopoiskRating: '8.5', ageRating: '16+', language: 'RU' },
  { id: 'lr-2', kinopoiskRating: '7.2', ageRating: '12+', language: 'EN' },
  { id: 'lr-3', kinopoiskRating: '9.0', ageRating: '18+', language: 'UZ' },
  { id: 'lr-4', kinopoiskRating: '6.8', ageRating: '6+', language: 'RU' },
  { id: 'lr-5', kinopoiskRating: '7.5', ageRating: '16+', language: 'EN' },
].map((item, i) => ({ ...item, image: IMAGES[i] }));

function LandscapeResultRow({ onCollapseKeyboard, onScrollToTop }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-ROW-RESULTS',
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: 'SEARCH-LCARD-lr-1',
  });

  const handleCardFocus = useCallback((layout) => {
    // Scrolls the container when a card gains focus
    ref.current?.scrollTo({
      left: layout.x - 20, // Offset for better visibility
      behavior: 'smooth'
    });
  }, [ref]);

  return (
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className="landscape-result-row">
          {RESULT_ITEMS.map((item, i) => (
              <LandscapeResultCard
                  key={item.id}
                  item={item}
                  index={i}
                  totalItems={RESULT_ITEMS.length}
                  onFocus={handleCardFocus}
                  onCollapseKeyboard={onCollapseKeyboard}
                  onScrollToTop={onScrollToTop}
              />
          ))}
        </div>
      </FocusContext.Provider>
  );
}

export default LandscapeResultRow;