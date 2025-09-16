## SAI — AI Chat Learning Interface

A single‑page, animated “learning” UI with a feedback form that stores entries locally in the browser.

## Features
- **Animated learning robot**: head/body glow, blinking eyes, moving circuits, rotating gears.
- **Ambient background**: subtle grid and floating particles.
- **Status message**: “I am learning. I’ll be ready soon.”
- **Feedback capture**: users submit short feedback; last 10 entries are shown and saved to localStorage.
- **Responsive**: scales down cleanly for tablets and mobile.

## Tech Stack
- **HTML/CSS/JavaScript** (vanilla)
- **Google Fonts**: Orbitron, Exo 2
- **localStorage** for persistence

### Note on Tailwind/Lottie
- The current MVP uses vanilla CSS and CSS animations to keep the footprint small and avoid a build step. TailwindCSS and Lottie can be integrated later without disrupting the current structure.

## Project Structure
- `index.html` — markup for layout, robot, feedback form, and containers.
- `styles.css` — variables, background/particle effects, robot/gear animations, responsive styles.
- `script.js` — particle generation, animation activation (hover/touch/periodic), feedback CRUD via localStorage.

## Getting Started
- Open `index.html` directly in a modern browser. No build step or server required.

## Usage
- Move your mouse or touch to “wake” the animation; it also pulses periodically.
- Submit feedback in the form; recent feedback appears in a list and persists across reloads.
- To clear feedback: run `localStorage.removeItem('aiFeedbacks')` in DevTools Console.

### Accessibility & Motion
- The feedback form includes a visible label and helper text; status updates are announced via an `aria-live` region.
- If your system has “Reduce motion” enabled, most animations are minimized via `prefers-reduced-motion`.

## Key Implementation Notes
- **Animation triggers**: hover (`mouseenter`/`mouseleave`), touch (`touchstart`/`touchend`), and a 15s interval that toggles an `active` class on `#animationContainer`.
- **Feedback storage**: entries are prepended, time‑stamped, and capped at 10 in `localStorage` under `aiFeedbacks`.
- **Styling**: tweak theme via CSS variables in `:root` (colors, transitions). Media queries adapt sizes on ≤768px and ≤480px.

## Customization Tips
- Change colors in `styles.css` `:root` (e.g., `--primary`, `--secondary`, `--accent`).
- Adjust particle count/duration in `createParticles()` for more/less ambient motion.
- Modify the learning message in `#learningMessage` (HTML) or extend with dynamic states.

## Privacy & Compatibility
- No network calls; all data stays in the browser.
- Works on current Chrome/Edge/Firefox/Safari; touch handlers support mobile.

## License
MIT.
