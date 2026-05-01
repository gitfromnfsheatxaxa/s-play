import React, { useEffect, useState } from 'react';
import { FocusContext, getCurrentFocusKey, setFocus, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import SearchBar from '../../pages/Search/components/SearchBar';
import SearchKeyboard from '../../pages/Search/components/SearchKeyboard';
import backIcon from '../../assets/icons/login/flip-backward.svg';
import playIcon from '../../assets/icons/login/Vector.svg';
import './LoginScreen.css';

function PlayIcon() {
  return <img src={playIcon} alt="" className="login-screen__play-icon" aria-hidden="true" />;
}

function LoginActionButton({
  focusKey,
  label,
  onPress,
  variant = 'secondary',
  upFocusKey,
  downFocusKey,
  leftFocusKey,
  rightFocusKey,
}) {
  const { ref, focused } = useFocusable({
    focusKey,
    onEnterPress: onPress,
    onArrowPress: (direction) => {
      if (direction === 'up' && upFocusKey) {
        setFocus(upFocusKey);
        return false;
      }
      if (direction === 'down' && downFocusKey) {
        setFocus(downFocusKey);
        return false;
      }
      if (direction === 'left' && leftFocusKey) {
        setFocus(leftFocusKey);
        return false;
      }
      if (direction === 'right' && rightFocusKey) {
        setFocus(rightFocusKey);
        return false;
      }
      return false;
    },
  });

  return (
    <button
      ref={ref}
      type="button"
      className={`login-screen__action login-screen__action--${variant}${focused ? ' login-screen__action--focused' : ''}`}
      onClick={onPress}
    >
      <PlayIcon />
      <span>{label}</span>
    </button>
  );
}

function BackButton({ onBack }) {
  const { ref, focused } = useFocusable({
    focusKey: 'LOGIN-BACK',
    onEnterPress: onBack,
    onArrowPress: (direction) => {
      if (direction === 'right' || direction === 'down') {
        setFocus('LOGIN-INPUT');
        return false;
      }
      return false;
    },
  });

  return (
    <button
      ref={ref}
      type="button"
      className={`login-screen__back${focused ? ' login-screen__back--focused' : ''}`}
      onClick={onBack}
      aria-label="Назад"
    >
      <img src={backIcon} alt="" className="login-screen__back-icon" />
    </button>
  );
}

function LoginScreen({
  focusKey = 'PAGE-PROFILE-CONTENT',
  onBack,
  onSubmit,
  onSmsLogin,
  onForgotPassword,
}) {
  const [value, setValue] = useState('');

  const { ref, focusKey: screenFocusKey } = useFocusable({
    focusKey,
    trackChildren: true,
    preferredChildFocusKey: 'SEARCH-KEY-FIRST',
    saveLastFocusedChild: true,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setFocus('SEARCH-KEY-FIRST'), 60);
    const allowedFocusKeys = new Set([
      focusKey,
      'LOGIN-BACK',
      'LOGIN-INPUT',
      'LOGIN-FORGOT',
      'LOGIN-SMS',
      'LOGIN-CONTINUE',
      'LOGIN-KEYBOARD',
      'SEARCH-KEYBOARD',
      'SEARCH-KEY-mic',
      'SEARCH-KEY-FIRST',
    ]);

    const handleBackKey = (event) => {
      if (event.key === 'Escape' || event.key === 'BrowserBack' || event.code === 'Escape') {
        event.preventDefault();
        if (onBack) onBack();
      }
    };

    const restoreLoginFocus = () => {
      const currentFocusKey = getCurrentFocusKey();

      if (!currentFocusKey) {
        setFocus('LOGIN-BACK');
        return;
      }

      if (
        allowedFocusKeys.has(currentFocusKey) ||
        currentFocusKey.startsWith('SEARCH-KEY-') ||
        currentFocusKey.startsWith('SEARCH-NUM-')
      ) {
        return;
      }

      setFocus('LOGIN-BACK');
    };

    const handleKeyDown = () => {
      window.requestAnimationFrame(restoreLoginFocus);
    };

    window.addEventListener('keydown', handleBackKey);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleBackKey);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusKey, onBack]);

  return (
    <FocusContext.Provider value={screenFocusKey}>
      <section ref={ref} className="login-screen">
        <BackButton onBack={onBack} />

        <div className="login-screen__content">
          <header className="login-screen__header">
            <h1 className="login-screen__title">Вход или регистрация</h1>
            <p className="login-screen__subtitle">
              Нет своего профиля на SPlay? Он будет создан автоматически
            </p>
          </header>

          <div className="login-screen__input-wrap">
            <SearchBar
              focusKey="LOGIN-INPUT"
              value={value}
              keyboardActive={false}
              showCaretOnFocus
              placeholder="Введите E-mail или Номер телефона"
              showSearchIcon={false}
              leftFocusKey="LOGIN-BACK"
              rightFocusKey="LOGIN-INPUT"
              upFocusKey="LOGIN-BACK"
              downFocusKey="LOGIN-FORGOT"
              enterFocusKey="SEARCH-KEY-FIRST"
              onActivate={() => setFocus('SEARCH-KEY-FIRST')}
            />
          </div>

          <div className="login-screen__forgot-wrap">
            <LoginActionButton
              focusKey="LOGIN-FORGOT"
              label="Забыл пароль"
              onPress={() => onForgotPassword && onForgotPassword()}
              upFocusKey="LOGIN-INPUT"
              downFocusKey="LOGIN-SMS"
              leftFocusKey="LOGIN-BACK"
              rightFocusKey="LOGIN-SMS"
            />
          </div>

          <div className="login-screen__actions">
            <LoginActionButton
              focusKey="LOGIN-SMS"
              label="Вход через смс"
              onPress={() => onSmsLogin && onSmsLogin(value)}
              upFocusKey="LOGIN-FORGOT"
              downFocusKey="SEARCH-KEY-mic"
              leftFocusKey="LOGIN-FORGOT"
              rightFocusKey="LOGIN-CONTINUE"
            />

            <LoginActionButton
              focusKey="LOGIN-CONTINUE"
              label="Продолжить"
              variant="primary"
              onPress={() => onSubmit && onSubmit(value)}
              upFocusKey="LOGIN-FORGOT"
              downFocusKey="SEARCH-NUM-1"
              leftFocusKey="LOGIN-SMS"
              rightFocusKey="LOGIN-CONTINUE"
            />
          </div>
        </div>

        <div className="login-screen__keyboard-wrap">
          <SearchKeyboard
            focusKey="LOGIN-KEYBOARD"
            initialIsRu={false}
            showChips={false}
            onChar={(char) => setValue((prev) => prev + char)}
            onBackspace={() => setValue((prev) => prev.slice(0, -1))}
            onClear={() => setValue('')}
            onSpace={() => setValue((prev) => prev + ' ')}
            micUpFocusKey="LOGIN-SMS"
            micLeftFocusKey="LOGIN-SMS"
            micDownFocusKey={null}
            qwertyUpFocusKey="LOGIN-INPUT"
            qwertyDownFocusKey={null}
            numpadUpFocusKey="LOGIN-CONTINUE"
            numpadDownFocusKey={null}
          />
        </div>
      </section>
    </FocusContext.Provider>
  );
}

export default LoginScreen;
