import React, { useCallback } from 'react';
import { useFocusable, FocusContext } from '@noriginmedia/norigin-spatial-navigation';
import ActorCard from './ActorCard';
import jonnyImg from '../../../assets/icons/jonny.png';
import AvatarImg from '../../../assets/icons/Group 2087328756.png';

const ACTORS = [
  { id: 0, name: 'Джонни\nДепп', photo: jonnyImg },
  { id: 1, name: 'Джонни\nДепп', photo: AvatarImg },
  { id: 2, name: 'Джонни\nДепп', photo: AvatarImg },
  { id: 3, name: 'Джонни\nДепп', photo: AvatarImg },
  { id: 4, name: 'Джонни\nДепп', photo: AvatarImg },
  { id: 5, name: 'Джонни\nДепп', photo: AvatarImg },
  { id: 6, name: 'Джонни\nДепп', photo: AvatarImg },
  { id: 7, name: 'Джонни\nДепп', photo: AvatarImg },
];

function ActorRow({ onCollapseKeyboard }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-ROW-ACTORS',
    trackChildren: true,
    saveLastFocusedChild: true,
    preferredChildFocusKey: 'SEARCH-ACTOR-0',
  });

  const onInternalCardFocus = useCallback(
      (layout) => {
        const scrollOffset = layout.x - 5;
        ref.current?.scrollTo({
          left: Math.max(0, scrollOffset),
          behavior: 'smooth'
        });      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      },
      [ref]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="actor-row">
        {ACTORS.map((actor, i) => (
          <ActorCard
            key={actor.id}
            actor={actor}
            index={i}
            totalItems={ACTORS.length}
            onFocus={onInternalCardFocus}
            onCollapseKeyboard={onCollapseKeyboard}
          />
        ))}
      </div>
    </FocusContext.Provider>
  );
}

export default ActorRow;
