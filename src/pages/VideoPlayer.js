import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  useFocusable,
  FocusContext,
  setFocus,
  pause,
  resume,
} from '@noriginmedia/norigin-spatial-navigation';
import './VideoPlayer.css';

// Fallback video — mock data has no videoUrl
const FALLBACK_SRC =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

// Stable focus key constants — never generate dynamically
const FK = {
  ROOT:     'VP_ROOT',
  TOP:      'VP_TOP',
  BACK:     'VP_BACK',
  SCRUB:    'VP_SCRUB',   // focusable progress bar — LEFT/RIGHT seek
  BOTTOM:   'VP_BOTTOM',
  RWIND:    'VP_RWIND',
  PLAY:     'VP_PLAY',
  FFWD:     'VP_FFWD',
  VOLUME:   'VP_VOLUME',
  SETTINGS: 'VP_SETTINGS',
  S_MODAL:  'VP_S_MODAL',
  S_AUTO:   'VP_S_AUTO',
  S_1080:   'VP_S_1080',
  S_720:    'VP_S_720',
  S_CLOSE:  'VP_S_CLOSE',
};

function formatTime(s) {
  if (!isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

// ─── VideoPlayer ──────────────────────────────────────────────
export default function VideoPlayer({ movie, onBack }) {
  const videoRef     = useRef(null);
  const hideTimerRef = useRef(null);

  // Refs for the global keydown listener — avoids stale closures
  // without re-registering the listener on every render
  const showControlsRef = useRef(true);
  const showSettingsRef = useRef(false);
  const handleBackRef   = useRef(null);
  const wakeRef         = useRef(null);
  const scheduleRef     = useRef(null);

  const [isPlaying,    setIsPlaying]    = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(0);
  const [volume,       setVolume]       = useState(1);
  const [isMuted,      setIsMuted]      = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Keep refs in sync with latest state/callbacks
  useEffect(() => { showControlsRef.current = showControls; }, [showControls]);
  useEffect(() => { showSettingsRef.current = showSettings; }, [showSettings]);

  // Root focus container — wraps the entire player
  const { ref: rootRef, focusKey: rootKey } = useFocusable({
    focusKey: FK.ROOT,
    trackChildren: true,
  });

  // Hide sidebar while player is visible
  useEffect(() => {
    const el = document.querySelector('.app-container');
    el?.classList.add('hide-navbar');
    return () => el?.classList.remove('hide-navbar');
  }, []);

  // ── Auto-hide helpers ────────────────────────────────────────
  const stopTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const scheduleHide = useCallback(() => {
    stopTimer();
    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
      pause(); // suspend spatial nav — keydown still reaches our own listener
    }, 4000);
  }, [stopTimer]);

  // wakeControls: called on first keypress when controls are hidden.
  // Norigin was paused, so the triggering key caused no action — user presses again to interact.
  const wakeControls = useCallback(() => {
    stopTimer();
    resume();
    setShowControls(true);
    setFocus(FK.PLAY);
    scheduleHide();
  }, [stopTimer, scheduleHide]);

  // Keep refs pointing to latest callbacks
  useEffect(() => { wakeRef.current    = wakeControls;  }, [wakeControls]);
  useEffect(() => { scheduleRef.current = scheduleHide; }, [scheduleHide]);

  // ── Mount: initial focus + start timer ──────────────────────
  useEffect(() => {
    const t = setTimeout(() => {
      setFocus(FK.PLAY);
      scheduleHide();
    }, 200);
    return () => {
      clearTimeout(t);
      stopTimer();
      resume(); // always resume on unmount so the rest of the app navigates normally
    };
  }, []); // intentionally empty — run once on mount/unmount

  // ── Global keydown (stable listener via refs) ────────────────
  useEffect(() => {
    const onKey = (e) => {
      const isBack = e.key === 'Escape' || e.keyCode === 10009 || e.keyCode === 461;

      if (isBack) {
        if (showSettingsRef.current) return; // let settings modal handle its own escape
        handleBackRef.current?.();
        return;
      }

      if (!showControlsRef.current) {
        wakeRef.current?.(); // first press wakes UI; Norigin was paused so no nav occurred
      } else {
        scheduleRef.current?.(); // reset hide timer on any key activity
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []); // empty — all freshness via refs above

  // ── Video events ─────────────────────────────────────────────
  const handleTimeUpdate = () => {
    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    setDuration(v.duration);
    v.volume = volume;
    v.muted  = isMuted;
    v.play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — ensure controls stay visible so user can press Play
        setShowControls(true);
        stopTimer();
      });
  };

  const handleEnded = () => {
    setIsPlaying(false);
    wakeControls();
  };

  // ── Controls ─────────────────────────────────────────────────
  const handleBack = useCallback(() => {
    videoRef.current?.pause();
    onBack?.();
  }, [onBack]);

  // Keep ref in sync after handleBack is (re)created
  useEffect(() => { handleBackRef.current = handleBack; }, [handleBack]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setIsPlaying(false);
    }
    scheduleHide();
  }, [scheduleHide]);

  const seek = useCallback((sec) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + sec));
    scheduleHide();
  }, [scheduleHide]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    const next = !isMuted;
    v.muted = next;
    setIsMuted(next);
    scheduleHide();
  }, [isMuted, scheduleHide]);

  const openSettings = useCallback(() => {
    stopTimer(); // keep controls visible while settings is open
    setShowSettings(true);
    setTimeout(() => setFocus(FK.S_AUTO), 80);
  }, [stopTimer]);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
    setTimeout(() => setFocus(FK.SETTINGS), 80);
    scheduleHide();
  }, [scheduleHide]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <FocusContext.Provider value={rootKey}>
      <div ref={rootRef} className="vp">

        {/* Video element */}
        <video
          ref={videoRef}
          className="vp__video"
          src={movie?.videoUrl || FALLBACK_SRC}
          poster={movie?.backdrop || movie?.image}
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onClick={togglePlay}
        />

        {/* Gradient scrims for text readability */}
        <div className={`vp__scrim vp__scrim--top${showControls ? ' is-visible' : ''}`} />
        <div className={`vp__scrim vp__scrim--bottom${showControls ? ' is-visible' : ''}`} />

        {/* Top bar — Back button + title */}
        <TopBar
          show={showControls}
          title={movie?.title}
          onBack={handleBack}
        />

        {/* Scrubber + bottom pill */}
        <div className={`vp__controls${showControls ? ' is-visible' : ''}`}>
          <Scrubber
            currentTime={currentTime}
            duration={duration}
            progress={progress}
            onSeek={seek}
          />
          <BottomBar
            isPlaying={isPlaying}
            isMuted={isMuted}
            volume={volume}
            onSeekBack={() => seek(-10)}
            onPlay={togglePlay}
            onSeekFwd={() => seek(10)}
            onToggleMute={toggleMute}
            onSettings={openSettings}
          />
        </div>

        {/* Settings modal — isFocusBoundary traps focus inside */}
        {showSettings && <SettingsModal onClose={closeSettings} />}
      </div>
    </FocusContext.Provider>
  );
}

// ─── TopBar ───────────────────────────────────────────────────
function TopBar({ show, title, onBack }) {
  const { ref, focusKey } = useFocusable({
    focusKey: FK.TOP,
    trackChildren: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className={`vp__top${show ? ' is-visible' : ''}`}>
        <BackBtn onBack={onBack} />
        {title && <span className="vp__title">{title}</span>}
      </div>
    </FocusContext.Provider>
  );
}

function BackBtn({ onBack }) {
  const { ref, focused } = useFocusable({
    focusKey: FK.BACK,
    onEnterPress: onBack,
    onArrowPress: (dir) => {
      if (dir === 'up' || dir === 'left') return false;          // dead ends
      if (dir === 'down') { setFocus(FK.SCRUB); return false; }  // down → scrubber
      return true;
    },
  });

  return (
    <div
      ref={ref}
      className={`vp__back${focused ? ' is-focused' : ''}`}
      onClick={onBack}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
      </svg>
      <span>Back</span>
    </div>
  );
}

// ─── Scrubber — focusable progress bar ───────────────────────
// LEFT / RIGHT: seek ±5 s (blocks spatial nav — stays on scrubber).
// UP: go to Back button.  DOWN: go to Play button.
function Scrubber({ currentTime, duration, progress, onSeek }) {
  const { ref, focused } = useFocusable({
    focusKey: FK.SCRUB,
    onArrowPress: (dir) => {
      if (dir === 'left')  { onSeek(-5);          return false; }
      if (dir === 'right') { onSeek(+5);           return false; }
      if (dir === 'up')    { setFocus(FK.BACK);    return false; }
      if (dir === 'down')  { setFocus(FK.PLAY);    return false; }
      return false;
    },
  });

  return (
    <div
      ref={ref}
      className={`vp__progress${focused ? ' is-focused' : ''}`}
      aria-label="Seek bar — left/right to seek"
    >
      <span className="vp__time">{formatTime(currentTime)}</span>

      <div className="vp__track">
        <div className="vp__fill"  style={{ width: `${progress}%` }} />
        <div className="vp__thumb" style={{ left:  `${progress}%` }} />
      </div>

      <span className="vp__time vp__time--right">{formatTime(duration)}</span>

      {/* Hint shown only while scrubber is focused */}
      {focused && (
        <span className="vp__scrub-hint">← → seek 5s</span>
      )}
    </div>
  );
}

// ─── BottomBar ────────────────────────────────────────────────
function BottomBar({ isPlaying, isMuted, volume, onSeekBack, onPlay, onSeekFwd, onToggleMute, onSettings }) {
  const { ref, focusKey } = useFocusable({
    focusKey: FK.BOTTOM,
    trackChildren: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="vp__bar">

        <CtrlBtn id={FK.RWIND} onClick={onSeekBack} isFirst ariaLabel="Rewind 10s">
          <RewindIcon />
          <span className="vp__btn-label">−10s</span>
        </CtrlBtn>

        <CtrlBtn id={FK.PLAY} onClick={onPlay} big ariaLabel={isPlaying ? 'Pause' : 'Play'}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </CtrlBtn>

        <CtrlBtn id={FK.FFWD} onClick={onSeekFwd} ariaLabel="Forward 10s">
          <ForwardIcon />
          <span className="vp__btn-label">+10s</span>
        </CtrlBtn>

        <div className="vp__divider" />

        {/* Volume button — shows level tooltip when focused, Enter = toggle mute */}
        <VolumeBtn isMuted={isMuted} volume={volume} onToggleMute={onToggleMute} />

        <CtrlBtn id={FK.SETTINGS} onClick={onSettings} isLast small ariaLabel="Settings">
          <SettingsIcon />
        </CtrlBtn>

      </div>
    </FocusContext.Provider>
  );
}

// ─── CtrlBtn — generic bottom bar button ─────────────────────
// isFirst / isLast block LEFT / RIGHT edge navigation.
// UP always bridges to the Back button in the top bar.
function CtrlBtn({ id, children, onClick, isFirst, isLast, big, small, ariaLabel }) {
  const { ref, focused } = useFocusable({
    focusKey: id,
    onEnterPress: onClick,
    onArrowPress: (dir) => {
      if (dir === 'up')               { setFocus(FK.SCRUB); return false; } // up → scrubber
      if (dir === 'left'  && isFirst) return false;
      if (dir === 'right' && isLast)  return false;
      return true;
    },
  });

  return (
    <div
      ref={ref}
      className={[
        'vp__btn',
        big   ? 'vp__btn--big'   : '',
        small ? 'vp__btn--small' : '',
        focused ? 'is-focused' : '',
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

// ─── VolumeBtn — mute toggle + visual level indicator ────────
function VolumeBtn({ isMuted, volume, onToggleMute }) {
  const { ref, focused } = useFocusable({
    focusKey: FK.VOLUME,
    onEnterPress: onToggleMute,
    onArrowPress: (dir) => {
      if (dir === 'up') { setFocus(FK.SCRUB); return false; } // up → scrubber
      return true;
    },
  });

  const pct = Math.round(volume * 100);

  return (
    <div className="vp__vol-wrap">
      {/* Level popup — cosmetic, shows current volume when button is focused */}
      {focused && (
        <div className="vp__vol-popup">
          <div className="vp__vol-track">
            <div
              className="vp__vol-fill"
              style={{ height: isMuted ? '0%' : `${pct}%` }}
            />
          </div>
          <span className="vp__vol-pct">{isMuted ? '0%' : `${pct}%`}</span>
        </div>
      )}

      <div
        ref={ref}
        className={`vp__btn vp__btn--small${focused ? ' is-focused' : ''}`}
        onClick={onToggleMute}
        aria-label={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <MuteIcon /> : <VolumeIcon />}
      </div>
    </div>
  );
}

// ─── SettingsModal ────────────────────────────────────────────
// isFocusBoundary: true — focus is trapped inside while the modal is open.
function SettingsModal({ onClose }) {
  const { ref, focusKey } = useFocusable({
    focusKey: FK.S_MODAL,
    trackChildren: true,
    isFocusBoundary: true,
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <div ref={ref} className="vp__settings-overlay">
        <div className="vp__settings-panel">
          <h3 className="vp__settings-title">Settings</h3>

          <div className="vp__settings-section">
            <p className="vp__settings-label">Quality</p>
            <div className="vp__settings-options">
              <SettingsOpt id={FK.S_AUTO}  label="Auto"  active />
              <SettingsOpt id={FK.S_1080} label="1080p" />
              <SettingsOpt id={FK.S_720}  label="720p"  />
            </div>
          </div>

          <SettingsCloseBtn onClick={onClose} />
        </div>
      </div>
    </FocusContext.Provider>
  );
}

function SettingsOpt({ id, label, active }) {
  const { ref, focused } = useFocusable({ focusKey: id });
  return (
    <div
      ref={ref}
      className={[
        'vp__settings-opt',
        active   ? 'is-active'  : '',
        focused  ? 'is-focused' : '',
      ].filter(Boolean).join(' ')}
    >
      {active && <span className="vp__settings-check">✓</span>}
      {label}
    </div>
  );
}

function SettingsCloseBtn({ onClick }) {
  const { ref, focused } = useFocusable({
    focusKey: FK.S_CLOSE,
    onEnterPress: onClick,
    onArrowPress: (dir) => {
      if (dir === 'down') return false; // nothing below close button
      return true;
    },
  });

  return (
    <div
      ref={ref}
      className={`vp__settings-close${focused ? ' is-focused' : ''}`}
      onClick={onClick}
    >
      Done
    </div>
  );
}

// ─── SVG Icons ────────────────────────────────────────────────
const PlayIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>;
const PauseIcon   = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>;
const RewindIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg>;
const ForwardIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg>;
const VolumeIcon  = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
  </svg>
);
const MuteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
  </svg>
);
const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.56-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);
