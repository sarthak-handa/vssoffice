import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { TactileLink } from "@/components/ui/tactile-button";
import Image from "next/image";

export default function HomeTheatreAutomationPage() {
  return <><main className="page-main"><PageHero eyebrow="Residential experience" title={<>A home that responds.<br /><em>A cinema that disappears into it.</em></>} description="Home theatre and automation need to be planned around the room, architecture, daily routine and long-term access—not treated as a late-stage equipment purchase." image="/media/theatre-preview.png"><div className="hero-actions"><TactileLink href="/book-demo">Discuss your project</TactileLink></div></PageHero><section className="split-feature"><div className="feature-media"><Image src="/media/lounge-preview.png" alt="Concept preview of the VSS Salesco consultation lounge" fill style={{ objectFit: "cover" }} sizes="50vw" /></div><div className="feature-copy"><p className="eyebrow">A joined-up process</p><h2>Comfort, control and confidence.</h2><p>Lighting, climate, access, entertainment and security are better when the drawings, services and final lifestyle are considered together.</p><ul className="mini-list"><li>Smart-home planning <span>01</span></li><li>Home-theatre coordination <span>02</span></li><li>Integrated security <span>03</span></li><li>After-install support pathway <span>04</span></li></ul></div></section></main><SiteFooter /></>;
}
