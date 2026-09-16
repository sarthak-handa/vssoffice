# Completion Plan: VSS Salesco Experience Centre

## Current State
- **Architecture**: Next.js 14 (App Router) + React Three Fiber + GSAP + Lenis + Webflow-ready CMS adapter.
- **Completed Functionality**: 
  - All 10 page routes exist and return 200.
  - CMS adapter pattern with mock data is implemented.
  - Basic responsive CSS skeleton (3 breakpoints).
  - Tactile magnetic buttons via GSAP quickTo.
  - Booking API route and basic form.
- **Visual Deficiencies**: 
  - Uses generic fallback fonts (Arial/Helvetica).
  - No scroll-reveal animations or cinematic pacing.
  - The WebGL journey uses primitive boxes rather than an architectural representation.
  - Lacks premium micro-interactions (hover states, subtle parallax).
- **Technical Deficiencies**:
  - Raw `<img>` tags used instead of `next/image`, harming performance.
  - SEO metadata is missing on individual pages.
  - 360° tour lacks an interactive minimap and real panoramas (relies entirely on fallback).
  - AR component is missing the `model-viewer` script injection.
- **Content Risks**:
  - Some concept renders may contain unverified dealer/brand claims (to be scrubbed/masked).
  - Concept renders must be clearly labeled as "Preview".
- **Performance Risks**:
  - Missing image optimization.
  - WebGL needs strict lazy-loading and capped device pixel ratios.

## Exact Implementation Order

1. **Phase 2: Premium Visual System**
   - Inject premium fonts (`Outfit` / `Inter`) via `next/font/google`.
   - Upgrade `globals.css` with refined colors, typography scale, and utility classes for GSAP animations.
2. **Phase 3: Homepage & WebGL Journey**
   - Refactor `journey-canvas.tsx` to use a 2.5D layered image plane approach using the supplied concept renders instead of 3D boxes.
   - Implement GSAP ScrollTrigger for cinematic reveals on the homepage (`experience-journey.tsx`).
3. **Phase 8 & 9: 360° Tour & AR**
   - Upgrade `/experience` with a schematic minimap.
   - Inject `<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js">` dynamically for AR.
4. **Phase 10: CMS & Trust**
   - Add Testimonials and FAQs to CMS types and mock data.
   - Review concept renders; crop or mask any problematic brand claims if detected via CSS or canvas.
5. **Phase 12: All Site Pages**
   - Convert all `<img>` tags to `next/image`.
   - Add GSAP reveal animations to inner pages.
   - Inject SEO metadata per page.
6. **Phase 22 & 23: QA & Build Validation**
   - Run `npm run lint`, `npm run typecheck`, `npm run build`.
   - Fix any hydration or accessibility errors.
7. **Phase 25: Documentation**
   - Update `architecture.md`, `asset-replacement-guide.md`, etc.
