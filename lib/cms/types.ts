export type Hotspot = {
  id: string;
  label: string;
  description: string;
  targetSceneSlug?: string;
  yaw?: number;
  pitch?: number;
};

export type ExperienceScene = {
  title: string;
  slug: string;
  sceneType: "arrival" | "facade" | "reception" | "display" | "lounge" | "theatre";
  caption: string;
  fallbackImage: string;
  panoramaAsset?: string;
  panoramaLowAsset?: string;
  webglAsset?: string;
  order: number;
  hotspots: Hotspot[];
};

export type Solution = {
  title: string;
  slug: string;
  category: "Residential" | "Commercial" | "AV" | "Safety";
  description: string;
  benefits: string[];
  icon: string;
  featured?: boolean;
};

export type Product = {
  title: string;
  slug: string;
  category: string;
  brand?: string;
  technicalSummary: string;
  features: string[];
  thumbnail?: string;
  glbUrl?: string;
  usdzUrl?: string;
  featured?: boolean;
};

export type Brand = {
  name: string;
  slug: string;
  category: string;
  logo?: string;
  authorisedDealerStatus?: "verified";
};

export type Project = {
  title: string;
  slug: string;
  sector: string;
  location: string;
  media: string[];
  servicesSupplied: string[];
  caseStudyContent: string;
};

export type SiteContent = {
  solutions: Solution[];
  products: Product[];
  brands: Brand[];
  scenes: ExperienceScene[];
  projects: Project[];
};
