// src/components/TopTenRow/TopTenRow.js  (Рекомендации для [user])
import React, { useCallback } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import icon1 from '../../assets/icons/1.svg';
import icon2 from '../../assets/icons/2.svg';
import icon3 from '../../assets/icons/3.svg';
import icon4 from '../../assets/icons/4.svg';
import imdbIcon from '../../assets/icons/imdb-icon 1.png';
import kpIcon from '../../assets/icons/Group.png';
import './TopTenRow.css';

const NUMBER_ICONS = [icon1, icon2, icon3, icon4];

// ─── RecommendationCard — landscape card with rank number overlay ──────────────
function RecommendationCard({ item, index, totalItems, rank, onFocus, onCardFocus }) {
  const { ref, focused } = useFocusable({
    focusKey: `REC-CARD-${item.id}`,
    onEnterPress: () => {},
    onFocus: (layout) => {
      if (onFocus) onFocus(layout);
      if (onCardFocus) onCardFocus(item);
    },
    onArrowPress: (direction) => {
      if (direction === 'left' && index === 0) { setFocus('NAV-HOME'); return false; }
      if (direction === 'right' && index === totalItems - 1) return false;
      return true;
    },
  });

  const numberIcon = rank <= 4 ? NUMBER_ICONS[rank - 1] : null;

  const posterStyle = item.image
    ? { backgroundImage: `url("${item.image}")` }
    : { background: item.gradient };

  return (
    <div className="rec-item">
      {/* Large gradient rank number — bottom-left, partially behind card */}
      {numberIcon
        ? <img src={numberIcon} className="rec-number" alt="" aria-hidden="true" />
        : <span className="rec-number rec-number--text" aria-hidden="true">{rank}</span>
      }

      {/* Landscape card — same proportions as ContentCard, Norigin ref here */}
      <div
        ref={ref}
        className={`rec-card ${focused ? 'rec-card--focused' : ''}`}
      >
        <div className="rec-card__poster" style={posterStyle}>
          <span className={`card__badge ${item.badgeVariant === 'primary' ? 'card__badge--primary' : 'card__badge--warning'}`}>
            {item.badge}
          </span>

        </div>
      </div>
    </div>
  );
}

// ─── TopTenRow (Recommendations) ──────────────────────────────────────────────
function TopTenRow({ row, onCardFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: `ROW-${row.id}`,
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: row.items[0] ? `REC-CARD-${row.items[0].id}` : undefined,
  });

  const onInternalCardFocus = useCallback(
    (layout) => {
      ref.current?.scrollTo({ left: layout.x, behavior: 'smooth' });
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    },
    [ref]
  );

  if (!row.items || row.items.length === 0) return null;

  return (
    <div className="top10-row-wrapper">
      <h2 className="content-row__title">
        {row.title}{' '}
        {row.username && (
          <span className="rec-username">{row.username}</span>
        )}
      </h2>

      <FocusContext.Provider value={focusKey}>
        <div className="top10-row__scroll" ref={ref}>
          {row.items.map((item, idx) => (
            <RecommendationCard
              key={item.id}
              item={item}
              index={idx}
              totalItems={row.items.length}
              rank={idx + 1}
              onFocus={onInternalCardFocus}
              onCardFocus={onCardFocus}
            />
          ))}
        </div>
      </FocusContext.Provider>
    </div>
  );
}

export default TopTenRow;
