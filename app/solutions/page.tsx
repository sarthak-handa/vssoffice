import { SolutionCard } from "@/components/catalog/solution-card";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { TactileLink } from "@/components/ui/tactile-button";
import { getSolutions } from "@/lib/cms/adapter";

export default async function SolutionsPage() {
  const solutions = await getSolutions();
  return <><main className="page-main"><PageHero eyebrow="Solutions" title={<>Designed around <em>how life and work move.</em></>} description="VSS Salesco brings security, connected living, communication and cinema into one considered planning conversation." image="/media/reception-display-preview.png"><div className="hero-actions"><TactileLink href="/book-demo">Plan a consultation</TactileLink></div></PageHero><section className="content-section"><div className="section-heading"><div><p className="eyebrow">Systems with intent</p><h2>Technology should feel integrated, not added on.</h2></div><p>Every category begins with site conditions, daily behaviour, equipment coordination and serviceability—not a product list alone.</p></div><div className="card-grid">{solutions.map((solution) => <SolutionCard solution={solution} key={solution.slug} />)}</div></section></main><SiteFooter /></>;
}
