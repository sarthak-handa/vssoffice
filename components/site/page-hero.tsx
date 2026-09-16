import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, description, image, children }: { eyebrow: string; title: ReactNode; description: string; image?: string; children?: ReactNode }) {
  return <section className={`page-hero ${image ? "has-image" : ""}`} style={image ? ({ "--hero-image": `url(${image})` } as React.CSSProperties) : undefined}><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{description}</p>{children}</section>;
}
