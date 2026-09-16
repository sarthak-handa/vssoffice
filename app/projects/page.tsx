import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { TactileLink } from "@/components/ui/tactile-button";

export default function ProjectsPage() {
  return <><main className="page-main"><PageHero eyebrow="Projects & installations" title={<>The proof should be <em>real.</em></>} description="VSS Salesco will publish case studies only when project media, client permission, scope and outcomes have been verified. No sample projects or fabricated testimonials appear here." image="/media/lounge-display-preview.png"><div className="hero-actions"><TactileLink href="/book-demo">Discuss your requirement</TactileLink></div></PageHero><section className="content-section"><div className="section-heading"><div><p className="eyebrow">Verified work only</p><h2>Case studies are ready for CMS publishing.</h2></div><p>The Webflow-ready Projects collection supports approved media, sector, location, service scope and narrative case-study content.</p></div><p className="notice">No verified project case studies have been supplied for this preview. Populate the Projects collection only with approved material and permissions.</p></section></main><SiteFooter /></>;
}
