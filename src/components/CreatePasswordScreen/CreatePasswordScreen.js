import React, {useEffect, useMemo, useState} from 'react';
import {FocusContext, getCurrentFocusKey, setFocus, useFocusable,} from '@noriginmedia/norigin-spatial-navigation';
import SearchKeyboard from '../../pages/Search/components/SearchKeyboard';
import backIcon from '../../assets/icons/login/flip-backward.svg';
import playIcon from '../../assets/icons/login/Vector.svg';
import eyeClosedIcon from '../../assets/icons/login/Vector (1).svg';
import eyeOpenedIcon from '../../assets/icons/login/eye.svg';
import './CreatePasswordScreen.css';

function BackButton({onBack}) {
    const {ref, focused} = useFocusable({
        focusKey: 'PASSWORD-BACK',
        onEnterPress: onBack,
        onArrowPress: (direction) => {
            if (direction === 'right' || direction === 'down') {
                setFocus('PASSWORD-INPUT');
                return false;
            }
            return false;
        },
    });

    return (
        <button
            ref={ref}
            type="button"
            className={`create-password__back${focused ? ' create-password__back--focused' : ''}`}
            onClick={onBack}
            aria-label="Назад"
        >
            <img src={backIcon} alt="" className="create-password__back-icon" aria-hidden="true"/>
        </button>
    );
}

function PasswordField({value, visible, onActivate}) {
    const {ref, focused} = useFocusable({
        focusKey: 'PASSWORD-INPUT',
        onEnterPress: onActivate,
        onArrowPress: (direction) => {
            if (direction === 'up') {
                setFocus('PASSWORD-BACK');
                return false;
            }
            if (direction === 'left') {
                setFocus('PASSWORD-BACK');
                return false;
            }
            if (direction === 'right') {
                setFocus('PASSWORD-TOGGLE');
                return false;
            }
            if (direction === 'down') {
                setFocus('PASSWORD-CONFIRM');
                return false;
            }
            return false;
        },
    });

    const displayValue = value
        ? (visible ? value : '*'.repeat(value.length))
        : '********';

    return (
        <button
            ref={ref}
            type="button"
            className={`create-password__field${focused ? ' create-password__field--focused' : ''}`}
            onClick={onActivate}
            aria-label="Поле ввода пароля"
        >
      <span className={`create-password__field-text${value ? '' : ' create-password__field-text--placeholder'}`}>
        {displayValue}
      </span>
        </button>
    );
}

function ToggleButton({visible, onToggle}) {
    const {ref, focused} = useFocusable({
        focusKey: 'PASSWORD-TOGGLE',
        onEnterPress: onToggle,
        onArrowPress: (direction) => {
            if (direction === 'up') {
                setFocus('PASSWORD-BACK');
                return false;
            }
            if (direction === 'left') {
                setFocus('PASSWORD-INPUT');
                return false;
            }
            if (direction === 'down') {
                setFocus('PASSWORD-CONFIRM');
                return false;
            }
            return false;
        },
    });

    return (
        <button
            ref={ref}
            type="button"
            className={`create-password__toggle${focused ? ' create-password__toggle--focused' : ''}`}
            onClick={onToggle}
            aria-label={visible ? 'Скрыть пароль' : 'Показать пароль'}
        >
            {visible ? <img src={eyeOpenedIcon} alt="" className="create-password__toggle-icon" aria-hidden="true"/>
                : <img src={eyeClosedIcon} alt="" className="create-password__toggle-icon" aria-hidden="true"/>}

        </button>
    );
}

function ConfirmButton({onConfirm}) {
    const {ref, focused} = useFocusable({
        focusKey: 'PASSWORD-CONFIRM',
        onEnterPress: onConfirm,
        onArrowPress: (direction) => {
            if (direction === 'up') {
                setFocus('PASSWORD-INPUT');
                return false;
            }
            if (direction === 'left') {
                setFocus('PASSWORD-INPUT');
                return false;
            }
            if (direction === 'right') {
                setFocus('PASSWORD-TOGGLE');
                return false;
            }
            if (direction === 'down') {
                setFocus('SEARCH-KEY-mic');
                return false;
            }
            return false;
        },
    });

    return (
        <button
            ref={ref}
            type="button"
            className={`create-password__confirm${focused ? ' create-password__confirm--focused' : ''}`}
            onClick={onConfirm}
        >
            <img src={playIcon} alt="" className="create-password__confirm-icon" aria-hidden="true"/>
            <span>Подтвердить</span>
        </button>
    );
}

function CreatePasswordScreen({
                                  focusKey = 'PAGE-PROFILE-CONTENT',
                                  onBack,
                                  onConfirm,
                              }) {
    const [password, setPassword] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const {ref, focusKey: screenFocusKey} = useFocusable({
        focusKey,
        trackChildren: true,
        preferredChildFocusKey: 'PASSWORD-INPUT',
        saveLastFocusedChild: true,
    });

    const allowedFocusKeys = useMemo(() => new Set([
        focusKey,
        'PASSWORD-BACK',
        'PASSWORD-INPUT',
        'PASSWORD-TOGGLE',
        'PASSWORD-CONFIRM',
        'PASSWORD-KEYBOARD',
        'SEARCH-KEYBOARD',
        'SEARCH-KEY-mic',
        'SEARCH-KEY-FIRST',
    ]), [focusKey]);

    useEffect(() => {
        const timer = window.setTimeout(() => setFocus('PASSWORD-INPUT'), 60);

        const handleBackKey = (event) => {
            if (event.key === 'Escape' || event.key === 'BrowserBack' || event.code === 'Escape') {
                event.preventDefault();
                if (onBack) onBack();
            }
        };

        const restoreFocus = () => {
            const currentFocusKey = getCurrentFocusKey();

            if (
                currentFocusKey &&
                (allowedFocusKeys.has(currentFocusKey) ||
                    currentFocusKey.startsWith('SEARCH-KEY-') ||
                    currentFocusKey.startsWith('SEARCH-NUM-'))
            ) {
                return;
            }

            setFocus('PASSWORD-INPUT');
        };

        const handleKeyDown = () => {
            window.requestAnimationFrame(restoreFocus);
        };

        window.addEventListener('keydown', handleBackKey);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.clearTimeout(timer);
            window.removeEventListener('keydown', handleBackKey);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [allowedFocusKeys, onBack]);

    const handleConfirm = () => {
        if (onConfirm) {
            onConfirm(password);
        }
    };

    return (
        <FocusContext.Provider value={screenFocusKey}>
            <section ref={ref} className="create-password">
                <BackButton onBack={onBack}/>

                <div className="create-password__content">
                    <header className="create-password__header">
                        <h1 className="create-password__title">Придумайте пароль</h1>
                        <p className="create-password__subtitle">
                            Защитите свой аккаунт, создав уникальный пароль, длинной не менее 6 символов
                        </p>
                    </header>

                    <div className="create-password__row">
                        <PasswordField
                            value={password}
                            visible={isVisible}
                            onActivate={() => setFocus('SEARCH-KEY-FIRST')}
                        />
                        <ToggleButton
                            visible={isVisible}
                            onToggle={() => setIsVisible((prev) => !prev)}
                        />
                    </div>

                    <ConfirmButton onConfirm={handleConfirm}/>
                </div>

                <div className="create-password__keyboard-wrap">
                    <SearchKeyboard
                        focusKey="PASSWORD-KEYBOARD"
                        initialIsRu={false}
                        showChips={false}
                        onChar={(char) => setPassword((prev) => prev + char)}
                        onBackspace={() => setPassword((prev) => prev.slice(0, -1))}
                        onClear={() => setPassword('')}
                        onSpace={() => setPassword((prev) => prev + ' ')}
                        micUpFocusKey="PASSWORD-CONFIRM"
                        micLeftFocusKey="PASSWORD-CONFIRM"
                        micDownFocusKey={null}
                        qwertyUpFocusKey="PASSWORD-INPUT"
                        qwertyDownFocusKey={null}
                        numpadUpFocusKey="PASSWORD-CONFIRM"
                        numpadDownFocusKey={null}
                    />
                </div>
            </section>
        </FocusContext.Provider>
    );
}

export default CreatePasswordScreen;
