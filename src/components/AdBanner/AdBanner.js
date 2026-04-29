// src/components/AdBanner/AdBanner.js
import React from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import adSmall1 from '../../assets/ad/ad_small1.svg';
import adSmall3 from '../../assets/ad/ad_small3.svg';
import './AdBanner.css';

const ADS = [
  { id: 'AD-1', image: adSmall1 },
  { id: 'AD-2', image: adSmall3 },
  { id: 'AD-3', image: adSmall1 },
];

function SmallAd({ ad, index, total, onFocus: onParentFocus }) {
  const { ref, focused } = useFocusable({
    focusKey: `AD-SMALL-${ad.id}`,
    onFocus: () => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      if (onParentFocus) onParentFocus();
    },
    onArrowPress: (dir) => {
      if (dir === 'right' && index === total - 1) return false;
      return true;
    },
  });

  return (
    <div
      ref={ref}
      className={`ad-small ${focused ? 'ad-small--focused' : ''}`}
    >
      <img src={ad.image} alt="Advertisement" />
    </div>
  );
}

function AdBanner({ onFocus }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'AD-BANNER',
    trackChildren: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="ad-banner" ref={ref}>
        <div className="ad-banner__small">
          {ADS.map((ad, idx) => (
            <SmallAd key={ad.id} ad={ad} index={idx} total={ADS.length} onFocus={onFocus} />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default AdBanner;
