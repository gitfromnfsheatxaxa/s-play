import React, { useEffect } from 'react';
import {
  FocusContext,
  getCurrentFocusKey,
  setFocus,
  useFocusable,
} from '@noriginmedia/norigin-spatial-navigation';
import './AuthScreen.css';
import GoogleIcon from '../../assets/icons/login/3.svg';

function KeyIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="auth-screen__icon-svg auth-screen__icon-svg--key"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M85 44.9997C84.9999 42.4406 84.0236 39.8815 82.0711 37.9289C80.1184 35.9763 77.5592 35 75 35M75 75C91.5685 75 105 61.5685 105 45C105 28.4315 91.5685 15 75 15C58.4315 15 45 28.4315 45 45C45 46.3684 45.0916 47.7154 45.2691 49.0352C45.5609 51.2059 45.7068 52.2913 45.6086 52.9779C45.5063 53.6933 45.376 54.0787 45.0234 54.7095C44.685 55.315 44.0885 55.9114 42.8957 57.1043L17.3431 82.6569C16.4784 83.5216 16.046 83.954 15.7368 84.4586C15.4627 84.9059 15.2606 85.3937 15.1382 85.9038C15 86.4793 15 87.0908 15 88.3137V97C15 99.8003 15 101.2 15.545 102.27C16.0243 103.211 16.7892 103.976 17.73 104.455C18.7996 105 20.1997 105 23 105H35V95H45V85H55L62.8957 77.1043C64.0886 75.9114 64.685 75.315 65.2905 74.9766C65.9213 74.624 66.3067 74.4937 67.0221 74.3914C67.7087 74.2932 68.7941 74.4391 70.9648 74.7309C72.2846 74.9084 73.6316 75 75 75Z"
        stroke="currentColor"
        strokeWidth="6.15385"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg
      viewBox="0 0 120 120"
      className="auth-screen__icon-svg auth-screen__icon-svg--qr"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M40 15H39C30.5992 15 26.3988 15 23.1901 16.6349C20.3677 18.073 18.073 20.3677 16.6349 23.1901C15 26.3988 15 30.5992 15 39V40M40 105H39C30.5992 105 26.3988 105 23.1901 103.365C20.3677 101.927 18.073 99.6323 16.6349 96.8099C15 93.6012 15 89.4008 15 81V80M105 40V39C105 30.5992 105 26.3988 103.365 23.1901C101.927 20.3677 99.6323 18.073 96.8099 16.6349C93.6012 15 89.4008 15 81 15H80M105 80V81C105 89.4008 105 93.6012 103.365 96.8099C101.927 99.6323 99.6323 101.927 96.8099 103.365C93.6012 105 89.4008 105 81 105H80M15 60H15.05M37.5 60H37.55M82.5 60H82.55M60 60H60.05M105 60H105.05"
        stroke="currentColor"
        strokeWidth="7.86885"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AuthOptionCard({
  focusKey,
  label,
  icon,
  iconClassName = '',
  onEnterPress,
  defaultFocused = false,
}) {
  const { ref, focused, focusSelf } = useFocusable({
    focusKey,
    onEnterPress,
  });

  useEffect(() => {
    if (!defaultFocused) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      focusSelf();
      setFocus(focusKey);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [defaultFocused, focusKey, focusSelf]);

  return (
    <div
      ref={ref}
      className={`auth-screen__card${focused ? ' auth-screen__card--focused' : ''}`}
      onClick={onEnterPress}
      role="button"
      tabIndex={-1}
    >
      <div className={`auth-screen__icon-wrap ${iconClassName}`.trim()}>{icon}</div>
      <div className="auth-screen__label">{label}</div>
    </div>
  );
}

function AuthScreen({
  focusKey = 'AUTH-SCREEN',
  onTraditionalLogin,
  onAppLogin,
  onGoogleLogin,
}) {
  const { ref, focusKey: containerFocusKey } = useFocusable({
    focusKey,
    trackChildren: true,
    saveLastFocusedChild: false,
    preferredChildFocusKey: 'auth-key',
  });

  useEffect(() => {
    const authFocusKeys = new Set([
      focusKey,
      'AUTH-SCREEN',
      'auth-key',
      'auth-app',
      'auth-google',
    ]);

    const restoreAuthFocus = () => {
      const currentKey = getCurrentFocusKey();

      if (!currentKey || !authFocusKeys.has(currentKey)) {
        setFocus('auth-key');
      }
    };

    const mountTimer = window.setTimeout(restoreAuthFocus, 0);

    const handleKeyDown = () => {
      window.requestAnimationFrame(restoreAuthFocus);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(mountTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [focusKey]);

  return (
    <FocusContext.Provider value={containerFocusKey}>
      <section ref={ref} className="auth-screen">
        <header className="auth-screen__header">
          Для просмотра контента SPlay вам
          <br />
          нужно авторизоваться
        </header>

        <div className="auth-screen__cards">
          <AuthOptionCard
            focusKey="auth-key"
            defaultFocused
            icon={<KeyIcon />}
            iconClassName="auth-screen__icon-wrap--key"
            label={(
              <>
                Вход или
                <br />
                регистрация
              </>
            )}
            onEnterPress={onTraditionalLogin}
          />

          <AuthOptionCard
            focusKey="auth-app"
            icon={<QrIcon />}
            iconClassName="auth-screen__icon-wrap--qr"
            label={(
              <>
                Способы входа
                <br />
                с помощью приложения
              </>
            )}
            onEnterPress={onAppLogin}
          />

          <AuthOptionCard
            focusKey="auth-google"
            icon={(
              <div className="auth-screen__google-badge">
                <img src={GoogleIcon} alt="" className="auth-screen__icon-image auth-screen__icon-image--google" />
              </div>
            )}
            iconClassName="auth-screen__icon-wrap--google"
            label={(
              <>
                Вход или регистрация
                <br />
                через Google
              </>
            )}
            onEnterPress={onGoogleLogin}
          />
        </div>
      </section>
    </FocusContext.Provider>
  );
}

export function AuthScreenExample() {
  return (
    <AuthScreen
      onTraditionalLogin={() => console.log('Navigate to login screen')}
      onAppLogin={() => console.log('Navigate to qr / app login')}
      onGoogleLogin={() => console.log('Navigate to google auth')}
    />
  );
}

export default AuthScreen;
