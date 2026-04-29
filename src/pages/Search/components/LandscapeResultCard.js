import React from 'react';
import { useFocusable, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './LandscapeResultCard.css';
import StartIcon from "../../../assets/icons/START.svg";


function LandscapeResultCard({ item, index, totalItems, onFocus, onCollapseKeyboard, onScrollToTop }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-LCARD-${item.id}`,
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCollapseKeyboard) onCollapseKeyboard();
      if (onScrollToTop) onScrollToTop();
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) {
        // Replace 'NAV-SEARCH' with your Sidebar's specific focus key
        setFocus('NAV-SEARCH');
        return false; // Prevent default engine behavior
      }      if (direction === 'right' && index === totalItems - 1) return false;
      if (direction === 'up') {
        setFocus('SEARCH-BAR');
        return false;
      }
      if (direction === 'down') {
        setFocus('SEARCH-CARD-movie-1');
        return false;
      }
      return true;
    },
  });

  // Note: We wrap the image path in double quotes inside the url()
  // to handle spaces/parentheses in filenames.
  const cardStyle = {
    backgroundImage: item.image ? `url("${item.image}")` : 'none',
  };

  return (
      <div
          ref={ref}
          className={`landscape-card ${focused ? 'landscape-card--focused' : ''}`}
      >
        <div className="landscape-card__bg" style={cardStyle} />
        <div className="landscape-card__overlay" />

        <span className="landscape-card__badge-kino">Новинка</span>

        <div className="landscape-card__chips-container">
          {focused ? (
              <>
                {item.kinopoiskRating && <span className="show-chip">{item.kinopoiskRating} ☆</span>}
                {item.ageRating && <span className="show-chip">{item.ageRating}</span>}
                {item.language && <span className="show-chip">{item.language}</span>}
                <img className="show-chip show-chip-img" src={StartIcon} alt=""/>
              </>
          ) : (
              <img className="show-chip show-chip-img" src={StartIcon} alt=""/>
          )}
        </div>
      </div>
  );
}

export default LandscapeResultCard;