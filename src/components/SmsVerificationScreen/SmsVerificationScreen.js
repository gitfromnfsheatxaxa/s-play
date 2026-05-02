import React, { useEffect, useMemo, useState } from 'react';
import {
  FocusContext,
  getCurrentFocusKey,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import backIcon from '../../assets/icons/login/flip-backward.svg';
import playIcon from '../../assets/icons/login/Vector.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import './SmsVerificationScreen.css';

const DIGIT_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

function SmsBackButton({ onBack }) {
  const { ref, focused } = useFocusable({
    focusKey: 'SMS-BACK',
    onEnterPress: onBack,
    onArrowPress: (direction) => {
      if (direction === 'right' || direction === 'down') {
        setFocus('SMS-RESEND');
        return false;
      }
      return false;
    },
  });

  return (
    <button
      ref={ref}
      type="button"
      className={`sms-screen__back${focused ? ' sms-screen__back--focused' : ''}`}
      onClick={onBack}
      aria-label="Назад"
    >
      <img src={backIcon} alt="" className="sms-screen__back-icon" aria-hidden="true" />
    </button>
  );
}

function ResendButton({ onPress }) {
  const { ref, focused } = useFocusable({
    focusKey: 'SMS-RESEND',
    onEnterPress: onPress,
    onArrowPress: (direction) => {
      if (direction === 'up' || direction === 'left') {
        setFocus('SMS-BACK');
        return false;
      }
      if (direction === 'down' || direction === 'right') {
        setFocus('SMS-NUMPAD-1');
        return false;
      }
      return false;
    },
  });

  return (
    <button
      ref={ref}
      type="button"
      className={`sms-screen__resend${focused ? ' sms-screen__resend--focused' : ''}`}
      onClick={onPress}
    >
      <span className="span-resend">Отправить код повторно</span>
    </button>
  );
}

function NumpadKey({ value, index, total, onEnter }) {
  const focusKey = value === 'backspace' ? 'SMS-NUMPAD-BACKSPACE' : `SMS-NUMPAD-${value}`;
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onEnter,
    onArrowPress: (direction) => {
      if (direction === 'up') {
        setFocus('SMS-RESEND');
        return false;
      }
      if (direction === 'left' && index === 0) {
        return false;
      }
      if (direction === 'right' && index === total - 1) {
        return false;
      }
      return true;
    },
  });

  const isBackspace = value === 'backspace';

  return (
    <button
      ref={ref}
      type="button"
      className={`sms-screen__key${focused ? ' sms-screen__key--focused' : ''}`}
      onClick={onEnter}
      aria-label={isBackspace ? 'Удалить' : `Цифра ${value}`}
    >
      {isBackspace ? (
        <img src={deleteIcon} alt="" className="sms-screen__key-icon" aria-hidden="true" />
      ) : (
        <span>{value}</span>
      )}
    </button>
  );
}

function SmsVerificationScreen({
  focusKey = 'PAGE-PROFILE-CONTENT',
  email = 'madiyarovfaxriddin@gmail.com',
  attemptsLeft = 3,
  expectedCode = '123456',
  onBack,
  onResend,
}) {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(attemptsLeft);

  const isLocked = remainingAttempts <= 0;

  const { ref, focusKey: screenFocusKey } = useFocusable({
    focusKey,
    trackChildren: true,
    preferredChildFocusKey: 'SMS-BACK',
    saveLastFocusedChild: true,
  });

  const numpadKeys = useMemo(() => [...DIGIT_KEYS, 'backspace'], []);

  useEffect(() => {
    const timer = window.setTimeout(() => setFocus('SMS-BACK'), 60);
    const allowedFocusKeys = new Set([
      focusKey,
      'SMS-BACK',
      'SMS-RESEND',
      ...numpadKeys.map((key) => (key === 'backspace' ? 'SMS-NUMPAD-BACKSPACE' : `SMS-NUMPAD-${key}`)),
    ]);

    const handleBackKey = (event) => {
      if (event.key === 'Escape' || event.key === 'BrowserBack' || event.code === 'Escape') {
        event.preventDefault();
        if (onBack) onBack();
      }
    };

    const restoreSmsFocus = () => {
      const currentFocusKey = getCurrentFocusKey();

      if (!currentFocusKey || !allowedFocusKeys.has(currentFocusKey)) {
        setFocus('SMS-BACK');
      }
    };

    const handleKeyDown = () => {
      window.requestAnimationFrame(restoreSmsFocus);
    };

    window.addEventListener('keydown', handleBackKey);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleBackKey);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusKey, numpadKeys, onBack]);

  const commitCode = (nextCode) => {
    if (nextCode.length === 6) {
      if (nextCode !== expectedCode) {
        const nextRemainingAttempts = Math.max(remainingAttempts - 1, 0);
        setRemainingAttempts(nextRemainingAttempts);
        setCode('');
        setHasError(true);
        return;
      }

      setCode(nextCode);
      setHasError(false);
      return;
    }

    setCode(nextCode);
    setHasError(false);
  };

  const handleDigit = (digit) => {
    if (isLocked) {
      return;
    }

    const nextCode = hasError && code.length === 6
      ? digit
      : `${code}${digit}`.slice(0, 6);

    commitCode(nextCode);
  };

  const handleBackspace = () => {
    if (isLocked) {
      return;
    }

    if (!code) {
      setHasError(false);
      return;
    }

    commitCode(code.slice(0, -1));
  };

  const handleResend = () => {
    setCode('');
    setHasError(false);
    if (onResend) onResend();
  };

  return (
    <FocusContext.Provider value={screenFocusKey}>
      <section ref={ref} className="sms-screen">
        <SmsBackButton onBack={onBack} />

        <div className="sms-screen__layout">
          <div className="sms-screen__content">
            <header className="sms-screen__header">
              <h1 className="sms-screen__title">Введите код из смс</h1>
              <p className="sms-screen__subtitle">
                Мы отправили верификационный код на <mark>{email}</mark> введите этот код в поля ниже
              </p>
            </header>

            <div className="sms-screen__otp" aria-label="Поле ввода кода">
              {Array.from({ length: 6 }, (_, index) => {
                const digit = code[index] ?? '';
                const isFilled = Boolean(digit);
                const isActive = !hasError && index === Math.min(code.length, 5);

                return (
                  <div
                    key={`otp-slot-${index}`}
                    className={[
                      'sms-screen__otp-slot',
                      isFilled ? 'sms-screen__otp-slot--filled' : '',
                      isActive ? 'sms-screen__otp-slot--active' : '',
                      hasError && isFilled ? 'sms-screen__otp-slot--error' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {digit}
                  </div>
                );
              })}
            </div>

            <p className={`sms-screen__error${(hasError || isLocked) ? ' sms-screen__error--visible' : ''}`}>
              {isLocked
                ? 'Вы использовали все доступные попытки получения кода верификации. Пожалуйста, попробуйте снова через 2 часа.'
                : 'Неправильный код'}
            </p>

            <ResendButton onPress={handleResend} />
            <p className="sms-screen__attempts">
              {isLocked ? 'Попытки исчерпаны' : `Осталось ${remainingAttempts} попытки`}
            </p>
          </div>

          <div className="sms-screen__numpad" aria-label="Цифровая клавиатура">
            {numpadKeys.map((key, index) => (
              <NumpadKey
                key={key}
                value={key}
                index={index}
                total={numpadKeys.length}
                onEnter={() => (key === 'backspace' ? handleBackspace() : handleDigit(key))}
              />
            ))}
          </div>
        </div>
      </section>
    </FocusContext.Provider>
  );
}

export default SmsVerificationScreen;
