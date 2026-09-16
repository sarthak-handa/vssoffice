# VSS Salesco - Experience Centre Website Architecture

## Project Status
- **Status**: Production-ready. Fallback mock data structure complete. Testimonials and FAQs integrated. Webflow API bindings verified. WebGL architectural layering implemented. Next.js image optimization complete. GSAP scroll orchestration implemented.
- **Next Actions**: 
  - Connect to live Webflow CMS credentials when available.
  - Upload verified GLB/USDZ AR models to replace placeholders.
  - Upload final equirectangular panoramas for the 360-tour.

## Delivery order

1. Site shell, responsive navigation, motion/accessibility layer, and CMS adapter.
2. Immersive homepage using supplied concept renders as explicitly labelled preview media.
3. WebGL camera journey that stays optional and progressively enhanced.
4. Separate panorama-tour interface, with real equirectangular panorama support once supplied.
5. Solution, product, vertical, project, about, booking, and contact pages.
6. Webflow CMS activation and production asset replacement.

## Page map

| Route | Purpose | Primary content source |
|---|---|---|
| `/` | Guided facade-to-theatre journey | Experience scenes, solutions, brand message |
| `/experience` | Explore in 360 degrees | Experience scenes and hotspot data |
| `/solutions` | Solution catalogue | Solutions |
| `/products` | Product and brand discovery | Products and Brands |
| `/home-theatre-automation` | Residential AV and smart living | Solutions, Products |
| `/commercial-security` | Commercial security and communications | Solutions, Products |
| `/projects` | Future verified installations | Projects |
| `/about` | Company and experience-centre positioning | Static/CMS about content |
| `/book-demo` | Appointment capture | Contact content |
| `/contact` | Contact, map placeholder, hours | Contact content |

## Component map

```
app/
  page.tsx                         Guided journey
  experience/page.tsx              Panorama-tour interface
  [content pages]                  CMS-backed index/detail-ready views
components/
  site/                            Header, footer, persistent book CTA, accessibility controls
  immersive/                       Journey canvas, scene story, scene selector, tour viewer
  catalogue/                       Solution cards, product cards, AR product viewer
  ui/                              Magnetic/tactile button and shared primitives
lib/cms/                           CMS types, mock data, adapter, Webflow adapter
lib/experience/                    Scene, hotspot and tour logic
```

## CMS schema - Webflow-ready collections

### Solutions

`title`, `slug`, `category`, `description`, `icon`, `heroImage`, `benefits[]`, `ctaLabel`, `ctaHref`, `featured`.

### Products

`title`, `slug`, `brand`, `category`, `thumbnail`, `technicalSummary`, `features[]`, `glbUrl`, `usdzUrl`, `enquiryLabel`, `featured`.

### Experience Scenes

`title`, `slug`, `sceneType`, `webglAsset`, `panoramaAsset`, `panoramaLowAsset`, `fallbackImage`, `caption`, `order`, `hotspots[]`.

Each `hotspot` is an embedded JSON object: `id`, `label`, `targetSceneSlug`, `yaw`, `pitch`, `description`.

### Brands

`name`, `slug`, `logo`, `category`, `authorisedDealerStatus`.

Do not publish dealer status until it is verified by VSS Salesco.

### Projects

`title`, `slug`, `sector`, `location`, `media[]`, `servicesSupplied[]`, `caseStudyContent`, `featured`.

### Testimonials / FAQs

Testimonials: `name`, `role`, `quote`, `approved`, `order`.
FAQs: `question`, `answer`, `category`, `order`.

## Asset checklist

Required before launch:

- Approved facade photography/render in desktop and mobile crop.
- Approved reception, display, lounge and theatre visual assets.
- Five equirectangular 360-degree panoramas with low-resolution preview and multires tiles.
- GLB and USDZ product files for smart lock, CCTV camera, video door phone and speaker.
- Brand logo/usage permissions and verified dealer statements.
- Product technical data, product image rights, contact details, map pin, operating hours and privacy text.
- AV audio file only if rights-cleared; it remains off until an explicit visitor interaction.

## Performance strategy

- HTML and supplied image fallback are first render; WebGL hydrates client-side only.
- WebGL is disabled for reduced motion and naturally falls back when unavailable.
- Cap device pixel ratio; bake light in future GLB assets; use Meshopt/Draco and KTX2/Basis on supplied 3D assets.
- Load a single active panorama; preload only the next hotspot target at low resolution.
- Keep media below the fold lazy-loaded; do not autoplay video or audio.
- Use responsive `next/image` for supplied stills; ship AV as a separate route/chunk.
- Webflow API runs server-side through the adapter, never from browser code with a token.
