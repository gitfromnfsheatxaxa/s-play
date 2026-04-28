import React from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './SearchKeyboard.css';

// Exact keyboard layout from screenshots
const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','1','2','3'],
  [{ type:'mic', label:'mic', flex:1 }, 'A','S','D','F','G','H','J','K','L','4','5','6'],
  ['Z','X','C','V','B','N','M','P','.','7','8','9'],
  [
    { type:'symbols', label:'?!#',      flex:1.6 },
    { type:'lang',    label:'Рус',      flex:1.6 },
    { type:'space',   label:'',         flex:4.2 },
    { type:'shift',   label:'↑',        flex:1   },
    { type:'back',    label:'⌫',        flex:1   },
    { type:'clear',   label:'Очистить', flex:2.2 },
    { type:'zero',    label:'0',        flex:1   },
  ],
];

const CHIPS = ['Аватар', 'Аватар', 'Аватар', 'Аватар', 'Аватар', 'Аватар'];

// ─── Single keyboard key ───────────────────────────────────────────────────────
function KeyboardKey({ keyDef, rowIndex, colIndex, rowLength, isLastKeyRow, onChar, onBackspace, onClear, onSpace }) {
  const isStr    = typeof keyDef === 'string';
  const char     = isStr ? keyDef : keyDef.label;
  const type     = isStr ? 'char' : keyDef.type;
  const flexVal  = isStr ? 1 : (keyDef.flex || 1);
  const isFirstRow = rowIndex === 0;
  const isFirstCol = colIndex === 0;
  const isLastCol  = colIndex === rowLength - 1;

  const focusId = isStr
    ? `SEARCH-KEY-${char}`
    : `SEARCH-KEY-${type}`;

  const { ref, focused } = useFocusable({
    focusKey: focusId,
    onEnterPress: () => {
      if (type === 'char' || type === 'zero') { if (onChar) onChar(isStr ? char : '0'); }
      else if (type === 'back')    { if (onBackspace) onBackspace(); }
      else if (type === 'clear')   { if (onClear) onClear(); }
      else if (type === 'space')   { if (onSpace) onSpace(); }
    },
    onArrowPress: (direction) => {
      if (direction === 'up' && isFirstRow) {
        setFocus('SEARCH-BAR');
        return false;
      }
      if (direction === 'left' && isFirstCol) return false;
      if (direction === 'right' && isLastCol) return false;
      if (direction === 'down' && isLastKeyRow) {
        setFocus('SEARCH-CHIP-0');
        return false;
      }
      return true;
    },
  });

  return (
    <div
      ref={ref}
      style={{ flex: flexVal }}
      className={`kb-key ${focused ? 'kb-key--focused' : ''} kb-key--${type}`}
    >
      {type === 'mic' ? (
        <svg width="15" height="17" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2"/>
          <path d="M5 10a7 7 0 0014 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        char
      )}
    </div>
  );
}

// ─── Suggestion chip ──────────────────────────────────────────────────────────
function Chip({ text, index, total, onSelect, onDeactivate }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-CHIP-${index}`,
    onEnterPress: () => { if (onSelect) onSelect(text); },
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus('SEARCH-KEY-symbols');
        return false;
      }
      if (direction === 'left' && index === 0) return false;
      if (direction === 'right' && index === total - 1) return false;
      if (direction === 'down') {
        // Collapse keyboard then let Norigin find the row below.
        // The content card's onFocus will also call onCollapseKeyboard as a
        // safety net, but we close it here first to prevent layout shift
        // interfering with Norigin's target measurement.
        if (onDeactivate) onDeactivate();
        return true;
      }
      return true;
    },
  });

  return (
    <div ref={ref} className={`kb-chip ${focused ? 'kb-chip--focused' : ''}`}>
      {text}
    </div>
  );
}

// ─── Keyboard container ───────────────────────────────────────────────────────
function SearchKeyboard({ onChar, onBackspace, onClear, onSpace, onChipSelect, onDeactivate, chips = CHIPS }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-KEYBOARD',
    trackChildren: true,
  });

  const lastKeyRowIdx = KEYBOARD_ROWS.length - 1;

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="search-keyboard">
        {KEYBOARD_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="search-keyboard__row">
            {row.map((keyDef, cIdx) => (
              <KeyboardKey
                key={typeof keyDef === 'string' ? keyDef : keyDef.type}
                keyDef={keyDef}
                rowIndex={rIdx}
                colIndex={cIdx}
                rowLength={row.length}
                isLastKeyRow={rIdx === lastKeyRowIdx}
                onChar={onChar}
                onBackspace={onBackspace}
                onClear={onClear}
                onSpace={onSpace}
              />
            ))}
          </div>
        ))}

        <div className="search-keyboard__chips">
          {chips.map((text, i) => (
            <Chip
              key={i}
              text={text}
              index={i}
              total={chips.length}
              onSelect={onChipSelect}
              onDeactivate={onDeactivate}
            />
          ))}
        </div>
      </div>
    </FocusContext.Provider>
  );
}

export default SearchKeyboard;
