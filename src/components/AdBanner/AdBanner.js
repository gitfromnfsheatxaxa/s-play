// src/components/AdBanner/AdBanner.js
import React from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import adBig from '../../assets/ad/ad_big.png';
import adSmall1 from '../../assets/ad/ad_small1.png';
import adSmall2 from '../../assets/ad/ad_small2.png';
import adSmall3 from '../../assets/ad/ad_small3.png';
import './AdBanner.css';

const ADS = [
  { id: 'AD-1', image: adSmall1 },
  { id: 'AD-2', image: adSmall2 },
  { id: 'AD-3', image: adSmall3 },
];

// BigAd and SmallAd use scrollIntoView on their own ref because their layout.y
// from Norigin is relative to the AD-BANNER FocusContext, not the page scroll container.
// scrollIntoView always targets the nearest scrollable ancestor (.home-content) correctly.

function BigAd() {
  const { ref, focused } = useFocusable({
    focusKey: 'AD-BIG',
    onFocus: () => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    },
  });

  return (
    <div
      ref={ref}
      className={`ad-banner__big ${focused ? 'ad-banner__big--focused' : ''}`}
    >
      <img src={adBig} alt="Main Advertisement" />
    </div>
  );
}

function SmallAd({ ad }) {
  const { ref, focused } = useFocusable({
    focusKey: `AD-SMALL-${ad.id}`,
    onFocus: () => {
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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

function AdBanner() {
  const { ref, focusKey } = useFocusable({
    focusKey: 'AD-BANNER',
    trackChildren: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div className="ad-banner" ref={ref}>
        <BigAd />
        <div className="ad-banner__small">
          {ADS.map((ad) => (
            <SmallAd key={ad.id} ad={ad} />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default AdBanner;
