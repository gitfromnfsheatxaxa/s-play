# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development server (localhost:3000)
npm start

# Production build
npm run build

# Run tests
npm test

# Run a single test file
npm test -- --testPathPattern=ComponentName
```

All commands run from `tv-movie-app/`.

## Architecture

**Stack:** React 19 (Create React App), no TypeScript, plain CSS with CSS Variables, `@noriginmedia/norigin-spatial-navigation` v3 for TV remote control.

**Target platform:** Smart TVs (Samsung Tizen, LG WebOS) — all interactions are remote-control driven, not mouse/touch.

### Routing

There is no React Router. `App.js` maintains a `currentPage` string in local state and a `renderPage()` switch that mounts one of the page components from `src/pages/`. Navigation is triggered by the `SideMenu` component calling `setCurrentPage`.

### Spatial Navigation (Norigin)

Every interactive element must be wrapped with `useFocusable` from `@noriginmedia/norigin-spatial-navigation`. The pattern:

```js
const { ref, focused, onEnterPress } = useFocusable({
  focusKey: 'unique-key',
  onFocus: (layout) => { /* optionally scroll to keep in view */ },
  onEnterPress: () => { /* handle selection */ },
});
return <div ref={ref} className={focused ? 'focused' : ''}>...</div>;
```

Group related focusables with `FocusContext` (also from Norigin). `MovieRow` wraps its cards in a `FocusContext`; `App.js` wraps the side menu items similarly.

Norigin is initialized once in `src/index.js` with `SpatialNavigation.init(...)` before `ReactDOM.render`.

### Data Layer

`src/services/mockDataService.js` is the sole data source. It exports:
- `getFeaturedContent()` — single featured item
- `getCategories()` — 6 rows (Trending, Action, Sci-Fi, Drama, Top Shows, New)
- `getAllMovies()`, `getAllTVShows()`
- `getMoviesByGenre(genre)`, `getTVShowsByGenre(genre)`
- `searchContent(query)`, `getContentById(id)`

Each item carries gradient color arrays and an accent color used directly in component inline styles for card backgrounds.

### Styling

- `src/styles/variables.css` — all CSS custom properties (colors, spacing, typography, focus states, breakpoints). Import this before component CSS.
- `src/styles/global.css` — resets and TV-specific optimizations (`user-select: none`, `cursor: none`, smooth scroll).
- Each component has a co-located `.css` file.

**Focus state convention:** focused cards get a 6px red (`var(--focus-ring-color)`) box-shadow and `scale(1.15)` transform. Use `var(--transition-normal)` (0.2s ease) for all transitions.

**TV layout:** Cards are `200×280px`. Rows auto-scroll horizontally to keep the focused card in view using `scrollIntoView` or manual `scrollLeft` adjustment in the `onFocus` callback.

### What Is Not Yet Implemented

Per `ARCHITECTURE.md` and `TASK_LIST.md`: search modal, video player, detail modal, Context API state management, error boundaries. The hooks/ and context/ directories exist but are empty.

---

## Spatial Navigation Bug Fixes (Norigin v3)

All fixes below are documented with `// FIX:` comments in the source. Do not remove them.

### Root cause: how Norigin loses focus

Norigin holds one internal `currentFocusKey`. When an arrow key press finds **no focusable target** in that direction, it sets `currentFocusKey = null`. Every subsequent press now has no starting point, so navigation dies completely until page refresh.

There are two independent causes in this app:
1. **Edge presses** — user presses into empty space (LEFT on first card, UP on top menu item, etc.)
2. **Stale recovery key** — the Layer 2 guard tried to restore focus using a card key that no longer existed because the page had changed and cards unmounted; `setFocus()` on a non-existent key silently fails and focus stays null

### Layer 1 — Prevention (`onArrowPress`)

Returning `false` from `onArrowPress` blocks Norigin from even attempting navigation in that direction. It never looks for a target, never nulls the focus key.

**`src/components/content/MovieCard.js`**
```js
onArrowPress: (direction) => {
  // LEFT at first card and RIGHT at last card are dead ends — nothing exists there
  if (direction === 'left' && index === 0) return false;
  if (direction === 'right' && index === totalCardsInRow - 1) return false;
  return true;
},
```

**`src/components/content/FeaturedHero.js` — `FeaturedButton`**
```js
onArrowPress: (direction) => {
  // Hero is the topmost element — nothing exists above it
  if (direction === 'up') return false;
  return true;
},
```

**`src/App.js` — `SideMenuItem`**
```js
onArrowPress: (direction) => {
  if (direction === 'left') return false;               // sidebar is leftmost element
  if (direction === 'up' && id === 'menu-home') return false;     // topmost item
  if (direction === 'down' && id === 'menu-profile') return false; // bottommost item
  return true;
},
```

### Layer 2 — Recovery (event-driven guard in `src/App.js`)

Catches any edge case Layer 1 misses. Fires on `keydown`, defers to `requestAnimationFrame` so Norigin has finished processing the key event before we check.

```js
// AppContent — lastValidFocusRef always holds a key confirmed alive by getCurrentFocusKey()
const lastValidFocusRef = useRef('menu-home');

useEffect(() => {
  const onKeyDown = () => {
    requestAnimationFrame(() => {
      const key = getCurrentFocusKey();
      if (key) {
        lastValidFocusRef.current = key;   // keep ref fresh
      } else if (lastValidFocusRef.current) {
        setFocus(lastValidFocusRef.current); // restore to last known-good key
      }
    });
  };
  window.addEventListener('keydown', onKeyDown);
  return () => window.removeEventListener('keydown', onKeyDown);
}, []);
```

**Critical: ref must be reset on page change.** In `handlePageChange`:
```js
// Reset to a menu key that is always mounted on the new page.
// Without this, lastValidFocusRef holds a card key from the old page.
// Those cards unmount → setFocus() silently fails → focus stays null forever.
lastValidFocusRef.current = `menu-${page}`;
```

### What was removed

**Broken polling safety net** (was in `AppContent`):
```js
// DELETED — do not restore this
setInterval(() => {
  if (!document.activeElement.classList.contains('focused')) {
    setFocus(lastFocusKey); // fired every 200ms, fought every navigation attempt
  }
}, 200);
```
This was wrong because Norigin manages `.focused` via React state (not DOM `.focus()`), so `document.activeElement` never had the `.focused` class. The check always passed, `setFocus` fired 5×/second, snapping focus back and overriding all user input.

**`onEnterPressRelease` with direction parameter** (was in `MovieRow` and `FeaturedHero`):
```js
// DELETED — do not restore this
onEnterPressRelease: (direction) => {
  if (direction === 'UP') { ... } // onEnterPressRelease does NOT receive direction
}
```
This callback fires on Enter/OK key release. It receives no direction argument. The direction checks were always false — dead code.

### Other fixes in the same session

**`src/components/content/MovieRow.js` — scroll formula**
```js
// FIXED: was getBoundingClientRect() + custom offset — drifted on every scroll
// Norigin's layout.x is already relative to the FocusContext container — use directly
const onCardFocus = useCallback(({ x }) => {
  scrollRef.current?.scrollTo({ left: x, behavior: 'smooth' });
}, []);
```

**`src/components/content/MovieRow.js` — `saveLastFocusedChild`**
```js
// ADDED: when user navigates DOWN then UP back to this row,
// Norigin restores the exact card that was last focused instead of jumping to first card
saveLastFocusedChild: true,
```

**`src/App.js` — modal focus restoration**
```js
// FIXED: was reconstructing key as CARD-row-trending-0 (wrong — first movie id is 'movie-1')
// Now saves getCurrentFocusKey() before opening, restores exact key on close
setPreModalFocusKey(getCurrentFocusKey());
```

**`src/pages/HomePage.js` — FeaturedHero play/info buttons**
```js
// FIXED: was console.log — now opens movie detail modal
onPlay={handleMovieSelect}
onMoreInfo={handleMovieSelect}
```

**`src/pages/VideoPlayer.js` — handleBack hoisting crash**
```js
// FIXED: handleBack was defined after the useEffect that used it.
// const is not hoisted — caused "Cannot access handleBack before initialization" crash.
// Moved definition above the useEffect.
```
