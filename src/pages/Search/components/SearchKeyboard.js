import React, { useState } from 'react';
import { useFocusable, FocusContext, setFocus } from '@noriginmedia/norigin-spatial-navigation';
import './SearchKeyboard.css';

import arrowIcon from '../../../assets/icons/arrow.svg';
import microPhoneIcon from '../../../assets/icons/microphone-01.svg';
import deleteIcon from '../../../assets/icons/delete.svg';
import spaceIcon from '../../../assets/icons/Vector 3.svg';

const QWERTY_ROWS_EN = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'P', '.'],
  [
    { type: 'symbols', label: '?!#' },
    { type: 'lang', label: 'Рус' },
    { type: 'space', label: '' },
    { type: 'shift', label: '' },
    { type: 'back', label: '' },
    { type: 'clear', label: 'Clear' },
  ],
];

const QWERTY_ROWS_RU = [
  ['Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ'],
  ['З', 'Х', 'Ъ', 'Ф', 'Ы', 'В', 'А', 'П', 'Р'],
  ['О', 'Л', 'Д', 'Ж', 'Э', 'Я', 'Ч', 'С', 'М'],
  [
    { type: 'symbols', label: '?!#' },
    { type: 'lang', label: 'Eng' },
    { type: 'space', label: '' },
    { type: 'shift', label: '' },
    { type: 'back', label: '' },
    { type: 'clear', label: 'Очистить' },
  ],
];

const SYMBOL_ROWS = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  ['@', '#', '$', '%', '&', '*', '-', '_', '+'],
  ['!', '?', '.', ',', ':', ';', '/', '\\', '='],
  [
    { type: 'symbols', label: 'ABC' },
    { type: 'lang', label: 'Рус' },
    { type: 'space', label: '' },
    { type: 'shift', label: '' },
    { type: 'back', label: '' },
    { type: 'clear', label: 'Clear' },
  ],
];

const SHIFTED_SYMBOL_ROWS = [
  ['~', '`', '|', '^', '°', '№', '<', '>', '"'],
  ['(', ')', '[', ']', '{', '}', '€', '£', '¥'],
  ['!', '?', '.', ',', ':', ';', '/', '\\', '='],
  [
    { type: 'symbols', label: 'ABC' },
    { type: 'lang', label: 'Рус' },
    { type: 'space', label: '' },
    { type: 'shift', label: '' },
    { type: 'back', label: '' },
    { type: 'clear', label: 'Clear' },
  ],
];

const NUMPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  [{ type: 'zero', label: '0' }],
];

const CHIPS = ['Аватар', 'Аватар', 'Аватар', 'Аватар', 'Аватар', 'Аватар'];

function getFocusIdForKey(key, rowIndex, colIndex) {
  if (!key) return null;
  if (typeof key === 'string' && rowIndex === 0 && colIndex === 0) {
    return 'SEARCH-KEY-FIRST';
  }
  if (typeof key === 'string') return `SEARCH-KEY-${key}`;
  return `SEARCH-KEY-${key.type}`;
}

function MicKey({
  onMic,
  upFocusKey = 'SEARCH-BAR',
  leftFocusKey = 'SEARCH-SUGG-0',
  rightFocusKey = 'SEARCH-KEY-FIRST',
  downFocusKey = 'SEARCH-CHIP-0',
}) {
  const { ref, focused } = useFocusable({
    focusKey: 'SEARCH-KEY-mic',
    onEnterPress: () => {
      if (onMic) onMic();
    },
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus(upFocusKey);
        return false;
      }
      if (direction === 'left') {
        setFocus(leftFocusKey);
        return false;
      }
      if (direction === 'right') {
        setFocus(rightFocusKey);
        return false;
      }
      if (direction === 'down') {
        if (downFocusKey) setFocus(downFocusKey);
        return false;
      }
      return true;
    },
  });

  return (
    <div ref={ref} className={`kb-key kb-key--mic ${focused ? 'kb-key--focused' : ''}`}>
      <img src={microPhoneIcon} alt="mic" className="kb-icon" />
    </div>
  );
}

function KeyboardKey({
  keyDef,
  rowIndex,
  colIndex,
  isFirstRow,
  isLastKeyRow,
  onChar,
  onBackspace,
  onClear,
  onSpace,
  onShift,
  onLang,
  onSymbolsToggle,
  upFocusKey = 'SEARCH-BAR',
  leftFocusKey = 'SEARCH-KEY-mic',
  rightFocusKey,
  downFocusKey = 'SEARCH-CHIP-0',
}) {
  const isStr = typeof keyDef === 'string';
  const char = isStr ? keyDef : keyDef.label;
  const type = isStr ? 'char' : keyDef.type;

  const focusId = isStr && rowIndex === 0 && colIndex === 0
    ? 'SEARCH-KEY-FIRST'
    : isStr
      ? `SEARCH-KEY-${char}`
      : `SEARCH-KEY-${type}`;

  const { ref, focused } = useFocusable({
    focusKey: focusId,
    onEnterPress: () => {
      if (type === 'char' && onChar) onChar(char);
      if (type === 'back' && onBackspace) onBackspace();
      if (type === 'clear' && onClear) onClear();
      if (type === 'space' && onSpace) onSpace();
      if (type === 'shift' && onShift) onShift();
      if (type === 'lang' && onLang) onLang();
      if (type === 'symbols' && onSymbolsToggle) onSymbolsToggle();
    },
    onArrowPress: (direction) => {
      if (direction === 'up' && isFirstRow) {
        setFocus(upFocusKey);
        return false;
      }

      if (direction === 'left') {
        setFocus(leftFocusKey);
        return false;
      }

      if (direction === 'right') {
        setFocus(rightFocusKey);
        return false;
      }

      if (direction === 'down' && isLastKeyRow) {
        if (downFocusKey) setFocus(downFocusKey);
        return false;
      }

      return true;
    },
  });

  const renderContent = () => {
    if (type === 'shift') return <img src={arrowIcon} alt="shift" className="kb-icon" />;
    if (type === 'back') return <img src={deleteIcon} alt="backspace" className="kb-icon" />;
    if (type === 'space') {
      return (
        <img
          src={spaceIcon}
          alt="space"
          className="kb-icon"
          style={{ width: 'clamp(1.2rem, 10vw, 2.5rem)', height: 'auto', maxWidth: '60%', maxHeight: '40%' }}
        />
      );
    }

    return char;
  };

  return (
    <div ref={ref} className={`kb-key kb-key--${type} ${focused ? 'kb-key--focused' : ''}`}>
      {renderContent()}
    </div>
  );
}

function NumpadKey({
  keyDef,
  rowIndex,
  colIndex,
  rowLength,
  onChar,
  upFocusKey = 'SEARCH-BAR',
  leftColumnFocusKeys,
  downFocusKey = 'SEARCH-CHIP-0',
}) {
  const isStr = typeof keyDef === 'string';
  const char = isStr ? keyDef : keyDef.label;
  const type = isStr ? 'num' : keyDef.type;
  const focusId = `SEARCH-NUM-${char || type}`;

  const { ref, focused } = useFocusable({
    focusKey: focusId,
    onEnterPress: () => {
      if (onChar) onChar(char);
    },
    onArrowPress: (direction) => {
      if (direction === 'up' && rowIndex === 0) {
        setFocus(upFocusKey);
        return false;
      }

      if (direction === 'left' && colIndex === 0) {
        const qwertyLastKeys = leftColumnFocusKeys || ['SEARCH-KEY-O', 'SEARCH-KEY-L', 'SEARCH-KEY-.', 'SEARCH-KEY-clear'];
        setFocus(qwertyLastKeys[rowIndex] || 'SEARCH-KEY-O');
        return false;
      }

      if (direction === 'right' && colIndex === rowLength - 1) return false;

      if (direction === 'down' && rowIndex === NUMPAD_ROWS.length - 1) {
        if (downFocusKey) setFocus(downFocusKey);
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

function Chip({ text, index, total, onSelect, onDeactivate }) {
  const { ref, focused } = useFocusable({
    focusKey: `SEARCH-CHIP-${index}`,
    onEnterPress: () => {
      if (onSelect) onSelect(text);
    },
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus('SEARCH-KEY-symbols');
        return false;
      }
      if (direction === 'left' && index === 0) return false;
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
  showChips = true,
  initialIsRu = false,
  focusKey = 'SEARCH-KEYBOARD',
  micUpFocusKey = 'SEARCH-BAR',
  micLeftFocusKey = 'SEARCH-SUGG-0',
  micDownFocusKey = 'SEARCH-CHIP-0',
  qwertyUpFocusKey = 'SEARCH-BAR',
  qwertyDownFocusKey = 'SEARCH-CHIP-0',
  numpadUpFocusKey = 'SEARCH-BAR',
  numpadDownFocusKey = 'SEARCH-CHIP-0',
}) {
  const [isRu, setIsRu] = useState(initialIsRu);
  const [isShifted, setIsShifted] = useState(false);
  const [isSymbols, setIsSymbols] = useState(false);

  const { ref, focusKey: keyboardFocusKey } = useFocusable({
    focusKey,
    trackChildren: true,
  });

  const baseRows = isSymbols
    ? (isShifted ? SHIFTED_SYMBOL_ROWS : SYMBOL_ROWS)
    : (isRu ? QWERTY_ROWS_RU : QWERTY_ROWS_EN);

  const qwertyRows = baseRows.map((row) => row.map((keyDef) => {
    if (typeof keyDef !== 'string') {
      if (keyDef.type === 'lang' && isSymbols) {
        return { ...keyDef, label: isRu ? 'Eng' : 'Рус' };
      }

      return keyDef;
    }

    if (isSymbols) return keyDef;
    return isShifted ? keyDef.toUpperCase() : keyDef.toLowerCase();
  }));

  const lastKeyRowIdx = qwertyRows.length - 1;
  const rightColumnFocusKeys = qwertyRows.map((row, rowIndex) => {
    const lastKeyDef = row[row.length - 1];

    if (typeof lastKeyDef === 'string') {
      return rowIndex === 0 && row.length - 1 === 0
        ? 'SEARCH-KEY-FIRST'
        : `SEARCH-KEY-${lastKeyDef}`;
    }

    return `SEARCH-KEY-${lastKeyDef.type}`;
  });

  const handleLang = () => {
    setIsRu((prev) => !prev);
    setIsSymbols(false);
    setIsShifted(false);
    setTimeout(() => setFocus('SEARCH-KEY-mic'), 0);
  };

  const handleShift = () => {
    setIsShifted((prev) => !prev);
    setTimeout(() => setFocus('SEARCH-KEY-FIRST'), 0);
  };

  const handleSymbolsToggle = () => {
    setIsSymbols((prev) => !prev);
    setIsShifted(false);
    setTimeout(() => setFocus('SEARCH-KEY-FIRST'), 0);
  };

  const handleCharPress = (char) => {
    if (onChar) onChar(char);

    if (!isSymbols && isShifted) {
      setIsShifted(false);
      setTimeout(() => setFocus('SEARCH-KEY-FIRST'), 0);
    }
  };

  return (
    <FocusContext.Provider value={keyboardFocusKey}>
      <div ref={ref} className="search-keyboard">
        <div className="keyboard-main">
          <div className="mic-col">
            <MicKey
              onMic={onMic}
              upFocusKey={micUpFocusKey}
              leftFocusKey={micLeftFocusKey}
              downFocusKey={showChips ? micDownFocusKey : null}
            />
          </div>

          <div className="keyboard-grid">
            {qwertyRows.map((row, rowIndex) => (
              <div key={rowIndex} className="search-keyboard__row">
                {row.map((keyDef, colIndex) => (
                  (() => {
                    const leftNeighbor = row[colIndex - 1];
                    const rightNeighbor = row[colIndex + 1];
                    const leftNeighborFocusKey = getFocusIdForKey(leftNeighbor, rowIndex, colIndex - 1) || 'SEARCH-KEY-mic';
                    const numpadFocusKeys = ['SEARCH-NUM-1', 'SEARCH-NUM-4', 'SEARCH-NUM-7', 'SEARCH-NUM-0'];
                    const rightNeighborFocusKey = getFocusIdForKey(rightNeighbor, rowIndex, colIndex + 1) || numpadFocusKeys[rowIndex] || 'SEARCH-NUM-1';

                    return (
                  <KeyboardKey
                    key={typeof keyDef === 'string' ? `${rowIndex}-${keyDef}` : keyDef.type}
                    keyDef={keyDef}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    isFirstRow={rowIndex === 0}
                    isLastKeyRow={rowIndex === lastKeyRowIdx}
                    onChar={handleCharPress}
                    onBackspace={onBackspace}
                    onClear={onClear}
                    onSpace={onSpace}
                    onShift={onShift || handleShift}
                    onLang={handleLang}
                    onSymbolsToggle={handleSymbolsToggle}
                    upFocusKey={qwertyUpFocusKey}
                    leftFocusKey={leftNeighborFocusKey}
                    rightFocusKey={rightNeighborFocusKey}
                    downFocusKey={showChips ? qwertyDownFocusKey : null}
                  />
                    );
                  })()
                ))}
              </div>
            ))}
          </div>

          <div className="numpad-col">
            {NUMPAD_ROWS.map((row, rowIndex) => (
              <div key={rowIndex} className="search-keyboard__row">
                {row.map((keyDef, colIndex) => (
                  <NumpadKey
                    key={typeof keyDef === 'string' ? `${rowIndex}-${keyDef}` : keyDef.type}
                    keyDef={keyDef}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    rowLength={row.length}
                    onChar={handleCharPress}
                    upFocusKey={numpadUpFocusKey}
                    leftColumnFocusKeys={rightColumnFocusKeys}
                    downFocusKey={showChips ? numpadDownFocusKey : null}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {showChips && (
          <div className="search-keyboard__chips">
            {chips.map((text, index) => (
              <Chip
                key={`${text}-${index}`}
                text={text}
                index={index}
                total={chips.length}
                onSelect={onChipSelect}
                onDeactivate={onDeactivate}
              />
            ))}
          </div>
        )}
      </div>
    </FocusContext.Provider>
  );
}

export default SearchKeyboard;
