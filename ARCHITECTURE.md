# Architecture Notes

## Rendering boundary

The page shell and metadata are server-rendered. Interactive sections use client components only where browser APIs, Framer Motion, GSAP, Lenis or WebGL are required. Both Three.js scenes are dynamically imported with server rendering disabled, keeping the initial server render independent of WebGL. Each scene has a CSS 3D preview beneath the canvas, WebGL capability detection and an error boundary so a failed or delayed canvas does not leave an empty panel.

## Data integrity

Personal profile content lives in `data/portfolio.ts`. The GitHub module remains unconfigured until a real username is supplied. Project URLs are optional by design, and unavailable links render disabled private-state controls rather than guessed URLs. Recognition cards are based on the supplied CV rather than fabricated testimonials.

## Animation layers

1. Framer Motion handles component entrances, counters, cursor motion and micro-interactions.
2. GSAP and ScrollTrigger handle the desktop horizontal project sequence while the heading remains outside the pinned stage and mobile uses a normal vertical flow.
3. Lenis provides smooth wheel scrolling and is synchronized to the GSAP ticker.
4. React Three Fiber drives procedural 3D scene animation and pointer-based camera movement.
5. CSS handles ambient gradients, marquee motion, code cursors, light sweeps and project mockups.

## Accessibility strategy

- A keyboard-visible skip link bypasses navigation.
- Navigation and section landmarks use semantic elements.
- Decorative WebGL and project mockups are hidden from assistive technology.
- Interactive elements include labels and focus rings.
- Motion-heavy systems respect `prefers-reduced-motion`.
- Form errors are announced with a status region.
- Missing email-provider configuration triggers a prefilled mail client fallback instead of a false success state.

## Production hardening

Before a public launch:

- Add a real GitHub username and optional token.
- Configure a verified Resend sender domain.
- Move rate limiting to a shared production data store.
- Add real GitHub and live-demo links to public projects.
- Run type checking, linting and a production build in CI.
- Test WebGL behavior on Safari, lower-end Android devices and integrated graphics.
