import type { SiteContent } from "./types";

export const mockContent: SiteContent = {
  scenes: [
    {
      title: "Arrival",
      slug: "facade",
      // No cleared facade image was supplied. Use the reception concept still as a
      // neutral arrival preview until an exterior asset is cleared for publication.
      sceneType: "arrival",
      caption: "A first look at the VSS Salesco Experience Centre. Concept preview.",
      fallbackImage: "/media/reception-preview.png",
      order: 1,
      hotspots: [
        { id: "arrival-door", label: "Enter reception", description: "Begin the showroom journey.", targetSceneSlug: "reception" },
      ],
    },
    {
      title: "Reception",
      slug: "reception",
      sceneType: "reception",
      caption: "Brand welcome, technology discovery and a curated security display.",
      fallbackImage: "/media/reception-preview.png",
      order: 2,
      hotspots: [
        { id: "cctv", label: "CCTV & surveillance", description: "Visible, intelligent protection for homes and workplaces." },
        { id: "smart-lock", label: "Smart access", description: "Locks, video door phones and controlled entry." },
        { id: "reception-next", label: "Continue to display", description: "Move into the smart-living gallery.", targetSceneSlug: "display" },
      ],
    },
    {
      title: "Product intelligence",
      slug: "display",
      sceneType: "display",
      caption: "A hands-on gallery for connected security, automation and communication.",
      fallbackImage: "/media/reception-display-preview.png",
      order: 3,
      hotspots: [
        { id: "automation", label: "Home automation", description: "Lighting, climate, scenes and control designed around daily life." },
        { id: "safety", label: "Safety systems", description: "Fire and burglar alarm conversations begin with the right site assessment." },
        { id: "display-next", label: "Enter the lounge", description: "Explore the consultation setting.", targetSceneSlug: "lounge" },
      ],
    },
    {
      title: "Consultation lounge",
      slug: "lounge",
      sceneType: "lounge",
      caption: "A quieter setting for planning, listening and live smart-home demonstrations.",
      fallbackImage: "/media/lounge-preview.png",
      order: 4,
      hotspots: [
        { id: "conference", label: "Video conferencing", description: "Purpose-led collaboration systems for better meetings." },
        { id: "gate", label: "Gate automation", description: "Security and arrival designed as one considered experience." },
        { id: "lounge-next", label: "Enter theatre", description: "Move into the cinema demonstration room.", targetSceneSlug: "theatre" },
      ],
    },
    {
      title: "Home theatre",
      slug: "theatre",
      sceneType: "theatre",
      caption: "A controlled room for cinema, sound, comfort and smart-living demonstrations.",
      fallbackImage: "/media/theatre-preview.png",
      order: 5,
      hotspots: [
        { id: "cinema", label: "Cinema planning", description: "Screen, sound, seating, lighting and control considered together." },
        { id: "speaker", label: "Speaker integration", description: "Speaker positions and room acoustics require a real site-led specification." },
      ],
    },
  ],
  solutions: [
    { title: "CCTV & surveillance", slug: "cctv-surveillance", category: "Commercial", description: "Security systems planned for visibility, reliability and appropriate access.", benefits: ["Site-led camera planning", "Remote monitoring readiness", "Clean installation integration"], icon: "Camera", featured: true },
    { title: "Video door phones", slug: "video-door-phones", category: "Residential", description: "A more considered arrival experience for homes, apartments and workplaces.", benefits: ["Visitor verification", "Access integration", "Indoor-outdoor coordination"], icon: "DoorOpen", featured: true },
    { title: "Smart locks", slug: "smart-locks", category: "Residential", description: "Connected access with the right balance of convenience and control.", benefits: ["Credential planning", "Door compatibility review", "Professional installation"], icon: "KeyRound" },
    { title: "Home automation", slug: "home-automation", category: "Residential", description: "Lighting, shades, climate, entertainment and security working as one system.", benefits: ["Personalised scenes", "System integration", "Future-ready cabling"], icon: "Sparkles", featured: true },
    { title: "Fire & burglar alarm", slug: "fire-burglar-alarm", category: "Safety", description: "Detection and alert systems matched to the operational realities of a site.", benefits: ["Risk-led planning", "Clear control zones", "Serviceable installation"], icon: "ShieldAlert" },
    { title: "Gate automation", slug: "gate-automation", category: "Residential", description: "Secure and smooth arrival systems for independent homes and properties.", benefits: ["Controlled access", "Safety features", "Integration-ready control"], icon: "GitPullRequestArrow" },
    { title: "EPABX & communication", slug: "epabx-communication", category: "Commercial", description: "Business communication systems that keep teams and visitors connected.", benefits: ["Scalable extension planning", "Reception integration", "Business continuity"], icon: "PhoneCall" },
    { title: "Video conferencing", slug: "video-conferencing", category: "Commercial", description: "Clearer meetings through sensible room, camera, audio and display planning.", benefits: ["Room-based specification", "Reliable audio", "Simple operation"], icon: "Video" },
    { title: "Home theatre", slug: "home-theatre", category: "AV", description: "Cinema rooms where the screen, sound, seating, lighting and acoustics work together.", benefits: ["Acoustic planning", "Comfort-first seating", "Integrated control"], icon: "Clapperboard", featured: true },
  ],
  products: [
    { title: "Smart entry concept", slug: "smart-entry-concept", category: "Smart lock", technicalSummary: "Product model and approved imagery to be added by VSS Salesco before publication.", features: ["AR-ready asset slot", "Enquiry-led configuration", "Installation consultation"], thumbnail: "/media/reception-display-preview.png", featured: true },
    { title: "CCTV camera concept", slug: "cctv-camera-concept", category: "CCTV", technicalSummary: "Product model and approved imagery to be added by VSS Salesco before publication.", features: ["Viewing-angle review", "Recording strategy", "Professional installation"], thumbnail: "/media/reception-preview.png", featured: true },
    { title: "Video door phone concept", slug: "video-door-phone-concept", category: "Video door phone", technicalSummary: "Product model and approved imagery to be added by VSS Salesco before publication.", features: ["Door and panel compatibility", "Visitor workflow", "Mobile handoff ready"], thumbnail: "/media/lounge-display-preview.png" },
    { title: "Cinema speaker concept", slug: "cinema-speaker-concept", category: "Home theatre", technicalSummary: "Product model and approved imagery to be added by VSS Salesco before publication.", features: ["Room-first specification", "Acoustic coordination", "AR-ready asset slot"], thumbnail: "/media/theatre-preview.png", featured: true },
  ],
  brands: [],
  projects: [],
  testimonials: [
    { client: "Private Client", role: "Homeowner", quote: "VSS Salesco brought clarity to what could have been an overwhelming smart-home build. Seeing the system in the experience centre completely changed our specification.", projectContext: "Residential automation & cinema" },
    { client: "Corporate Director", role: "Technology firm", quote: "The access control and conferencing systems were planned meticulously. The transition from demonstration to installation was seamless.", projectContext: "Commercial security & communication" }
  ],
  faqs: [
    { question: "Can I bring my own architect or interior designer to a consultation?", answer: "Yes. We actively encourage bringing your design team. Technology should integrate with architecture, not fight against it. We regularly coordinate with architects, M&E consultants and interior designers.", category: "Process" },
    { question: "Do you install systems, or just supply equipment?", answer: "VSS Salesco is an end-to-end integrator. We plan, supply, install and maintain the systems. We do not operate as a standard box-shifting retailer.", category: "Services" }
  ]
};
