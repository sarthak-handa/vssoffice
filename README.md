# VSS Salesco Experience Centre

Premium, concept-preview frontend for VSS Salesco. It is built as a Next.js App Router project, with Webflow treated as a CMS source rather than a runtime for the immersive frontend.

## Run locally

```powershell
npm install
npm run dev
```

Open `http://localhost:3000`.

## What is included

- Responsive guided experience-centre journey at `/`.
- Optional progressive R3F/Three.js camera sequence, controlled through GSAP ScrollTrigger.
- Lenis smooth scrolling, GSAP `quickTo` tactile links, persistent booking CTA and reduced-motion support.
- Separate `/experience` virtual-tour shell with keyboard navigation, fullscreen, gyroscope toggle, hotspot navigation, scene progress and no-WebGL fallback gallery.
- Webflow-ready CMS types and local mock content in `lib/cms/`.
- Product cards and AR-ready `model-viewer` component for GLB/USDZ assets.
- Booking endpoint that posts only when `BOOKING_WEBHOOK_URL` has been configured.

## Asset replacement

The images in `public/media/` are supplied concept renders and are labelled as **Experience Centre Preview** throughout the site. Replace them with approved production material before launch.

For each `Experience Scenes` CMS item, add:

- A responsive fallback still image.
- Optional low-resolution panorama and high-resolution equirectangular panorama.
- Optional future GLB scene asset.
- Hotspot JSON using the shape described in `docs/architecture.md`.

The virtual-tour fallback is deliberate: standard stills are never stretched into fake 360-degree imagery. When a real panorama asset is present in the CMS adapter, `PanoramaCanvas` renders it as an equirectangular Three.js scene.

## Webflow connection

1. Create the collections and fields listed in [`docs/architecture.md`](docs/architecture.md).
2. Add `WEBFLOW_API_TOKEN` and collection IDs to `.env.local`.
3. Map the final Webflow field slugs inside `lib/cms/webflow.ts`.
4. Keep the access token server-only. Never expose it in browser code.
5. Set `BOOKING_WEBHOOK_URL` to a vetted CRM, Webflow form relay, inbox automation or first-party form endpoint.

## Production asset requirements

- Compress GLB with Meshopt or Draco and use KTX2/Basis textures.
- Bake lighting in 3D room assets.
- Supply mobile poster images, low-resolution panoramas and multiresolution panorama tiles.
- Use only approved product images, logos, testimonials, case studies, dealer claims, music and address details.
- Confirm theatre AV, acoustic and HVAC specifications from a measured site design before publishing system claims.

## Quality checks

```powershell
npm run typecheck
npm run build
```
