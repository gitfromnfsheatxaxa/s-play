import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import LandscapeResultCard from './LandscapeResultCard';

import img0 from '../../../assets/movie-img/Card Image.png';
import img1 from '../../../assets/movie-img/Card Image (1).png';
import img2 from '../../../assets/movie-img/Card Image (2).png';
import img3 from '../../../assets/movie-img/Card Image (3).png';
import img4 from '../../../assets/movie-img/Card Image (4).png';

const IMAGES = [img0, img1, img2, img3, img4];

const RESULT_ITEMS = [
  { id: 'lr-1' },
  { id: 'lr-2' },
  { id: 'lr-3' },
  { id: 'lr-4' },
  { id: 'lr-5' },
].map((item, i) => ({ ...item, image: IMAGES[i] }));

function LandscapeResultRow({ onCollapseKeyboard, onScrollToTop }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-ROW-RESULTS',
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: 'SEARCH-LCARD-lr-1',
  });

  const handleCardFocus = useCallback((layout) => {
    ref.current?.scrollTo({ left: layout.x, behavior: 'smooth' });
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
