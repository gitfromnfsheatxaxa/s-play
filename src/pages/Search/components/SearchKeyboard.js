import React from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './SearchKeyboard.css';

import arrowIcon      from "../../../assets/icons/arrow.svg";
import microPhoneIcon from "../../../assets/icons/microphone-01.svg";
import deleteIcon     from "../../../assets/icons/delete.svg";
import spaceIcon      from "../../../assets/icons/Vector 3.svg";

const QWERTY_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M','P','.'],
  [
    { type: 'symbols', label: '?!#' },
    { type: 'lang',    label: 'Рус' },
    { type: 'space',   label: ''    },
    { type: 'shift',   label: ''    },
    { type: 'back',    label: ''    },
    { type: 'clear',   label: 'Очистить' },
  ],
];

const NUMPAD_ROWS = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  [{ type: 'zero', label: '0' }],
];

const CHIPS = ['Аватар', 'Аватар', 'Аватар', 'Аватар', 'Аватар', 'Аватар'];

// ─── Mic ──────────────────────────────────────────────────────────────────────
function MicKey({ onMic }) {
  const { ref, focused } = useFocusable({
    focusKey: 'SEARCH-KEY-mic',
    onEnterPress: () => { if (onMic) onMic(); },
    onArrowPress: (direction) => {
      if (direction === 'up')    { setFocus('SEARCH-BAR');       return false; }
      if (direction === 'left')  { setFocus('SEARCH-SUGG-0');    return false; }
      if (direction === 'right') { setFocus('SEARCH-KEY-Q');     return false; }
      if (direction === 'down')  { setFocus('SEARCH-CHIP-0');    return false; }
      return true;
    },
  });

  return (
      <div ref={ref} className={`kb-key kb-key--mic ${focused ? 'kb-key--focused' : ''}`}>
        <img src={microPhoneIcon} alt="mic" className="kb-icon" />
      </div>
  );
}

// ─── QWERTY key ───────────────────────────────────────────────────────────────
function KeyboardKey({ keyDef, rowIndex, colIndex, rowLength, isLastKeyRow, onChar, onBackspace, onClear, onSpace, onShift }) {
  const isStr = typeof keyDef === 'string';
  const char  = isStr ? keyDef : keyDef.label;
  const type  = isStr ? 'char' : keyDef.type;

  const isFirstRow = rowIndex === 0;
  const isFirstCol = colIndex === 0;
  const isLastCol  = colIndex === rowLength - 1;

  const focusId = isStr ? `SEARCH-KEY-${char}` : `SEARCH-KEY-${type}`;

  const { ref, focused } = useFocusable({
    focusKey: focusId,
    onEnterPress: () => {
      if      (type === 'char')    { if (onChar)      onChar(char); }
      else if (type === 'back')    { if (onBackspace) onBackspace(); }
      else if (type === 'clear')   { if (onClear)     onClear(); }
      else if (type === 'space')   { if (onSpace)     onSpace(); }
      else if (type === 'shift')   { if (onShift)     onShift(); }
    },
    onArrowPress: (direction) => {
      if (direction === 'up' && isFirstRow) {
        setFocus('SEARCH-BAR');
        return false;
      }
      if (direction === 'left' && isFirstCol) {
        setFocus('SEARCH-KEY-mic');
        return false;
      }
      if (direction === 'right' && isLastCol) {
        const numFocusKeys = [
          'SEARCH-NUM-1',
          'SEARCH-NUM-4',
          'SEARCH-NUM-7',
          'SEARCH-NUM-0',
        ];
        setFocus(numFocusKeys[rowIndex] ?? 'SEARCH-NUM-1');
        return false;
      }
      if (direction === 'down' && isLastKeyRow) {
        setFocus('SEARCH-CHIP-0');
        return false;
      }
      return true;
    },
  });

  const renderContent = () => {
    if (type === 'shift') return (
        <img src={arrowIcon} alt="shift" className="kb-icon" />
    );
    if (type === 'back') return (
        <img src={deleteIcon} alt="backspace" className="kb-icon" />
    );
    if (type === 'space') return (
        <img
            src={spaceIcon}
            alt="space"
            className="kb-icon"
            style={{ width: 'clamp(1.2rem, 2vw, 2.5rem)', height: 'auto', maxWidth: '60%', maxHeight: '40%' }}
        />
    );
    return char;
  };

  return (
      <div ref={ref} className={`kb-key kb-key--${type} ${focused ? 'kb-key--focused' : ''}`}>
        {renderContent()}
      </div>
  );
}

// ─── Numpad key ───────────────────────────────────────────────────────────────
function NumpadKey({ keyDef, rowIndex, colIndex, rowLength, onChar }) {
  const isStr = typeof keyDef === 'string';
  const char  = isStr ? keyDef : keyDef.label;
  const type  = isStr ? 'num' : keyDef.type;

  const focusId = `SEARCH-NUM-${char || type}`;

  const { ref, focused } = useFocusable({
    focusKey: focusId,
    onEnterPress: () => { if (onChar) onChar(char); },
    onArrowPress: (direction) => {
      if (direction === 'up' && rowIndex === 0) {
        setFocus('SEARCH-BAR');
        return false;
      }
      if (direction === 'left' && colIndex === 0) {
        const qwertyLastKeys = [
          'SEARCH-KEY-O',
          'SEARCH-KEY-L',
          'SEARCH-KEY-.',
          'SEARCH-KEY-clear',
        ];
        setFocus(qwertyLastKeys[rowIndex] ?? 'SEARCH-KEY-O');
        return false;
      }
      if (direction === 'right' && colIndex === rowLength - 1) return false;
      if (direction === 'down' && rowIndex === NUMPAD_ROWS.length - 1) {
        setFocus('SEARCH-CHIP-0');
        return false;
      }
      return true;
    },
  });

  return (
      <div ref={ref} className={`kb-key kb-key--${type} ${focused ? 'kb-key--focused' : ''}`}>
        {char}
      </div>
  );
}

// ─── Chip ─────────────────────────────────────────────────────────────────────
function Chip({ text, index, total, onSelect, onDeactivate }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-CHIP-${index}`,
    onEnterPress: () => { if (onSelect) onSelect(text); },
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus('SEARCH-KEY-symbols');
        return false;
      }
      if (direction === 'left'  && index === 0)         return false;
      if (direction === 'right' && index === total - 1) return false;
      if (direction === 'down') {
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
function SearchKeyboard({
                          onChar,
                          onBackspace,
                          onClear,
                          onSpace,
                          onShift,
                          onMic,
                          onChipSelect,
                          onDeactivate,
                          chips = CHIPS,
                        }) {
  const { ref, focusKey } = useFocusable({
    focusKey: 'SEARCH-KEYBOARD',
    trackChildren: true,
  });

  const lastKeyRowIdx = QWERTY_ROWS.length - 1;

  return (
      <FocusContext.Provider value={focusKey}>
        <div ref={ref} className="search-keyboard">

          <div className="keyboard-main">

            {/* MIC */}
            <div className="mic-col">
              <MicKey onMic={onMic} />
            </div>

            {/* QWERTY */}
            <div className="keyboard-grid">
              {QWERTY_ROWS.map((row, rIdx) => (
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
                            onShift={onShift}
                        />
                    ))}
                  </div>
              ))}
            </div>

            {/* NUMPAD */}
            <div className="numpad-col">
              {NUMPAD_ROWS.map((row, rIdx) => (
                  <div key={rIdx} className="search-keyboard__row">
                    {row.map((keyDef, cIdx) => (
                        <NumpadKey
                            key={typeof keyDef === 'string' ? keyDef : keyDef.type}
                            keyDef={keyDef}
                            rowIndex={rIdx}
                            colIndex={cIdx}
                            rowLength={row.length}
                            onChar={onChar}
                        />
                    ))}
                  </div>
              ))}
            </div>

          </div>

          {/* CHIPS */}
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