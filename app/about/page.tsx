import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { TactileLink } from "@/components/ui/tactile-button";
import type { Metadata } from "next";
import { getTestimonials } from "@/lib/cms/adapter";

export const metadata: Metadata = {
  title: "About | VSS Salesco",
  description: "VSS Salesco is a premium integrator of smart-living, security and AV solutions.",
};

export default async function AboutPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <main className="page-main">
        <PageHero eyebrow="About VSS Salesco" title={<>A place to see the difference <em>before installation.</em></>} description="VSS Salesco is envisioned as an experience-led destination for smart-living, security and AV conversations—bringing people, spaces and technology into one carefully staged process." image="/media/reception-display-preview.png">
          <div className="hero-actions"><TactileLink href="/experience">Preview the centre</TactileLink></div>
        </PageHero>
        <section className="content-section">
          <div className="section-heading">
            <div><p className="eyebrow">Why the experience centre matters</p><h2>Complex technology becomes clearer when it is felt in a room.</h2></div>
            <p>The showroom is designed to make a client meeting more useful: see product scale, understand scenes, explore materials and discuss the actual site.</p>
          </div>
          <div className="card-grid">
            <article className="solution-card"><p className="category">01</p><h3>Understand the space</h3><p>Technology begins with architecture, circulation, services and the people using it every day.</p></article>
            <article className="solution-card"><p className="category">02</p><h3>Experience the system</h3><p>Displays and demonstrations help turn an equipment specification into a more informed decision.</p></article>
            <article className="solution-card"><p className="category">03</p><h3>Plan the installation</h3><p>Site verification, coordination and service access matter as much as the visible finish.</p></article>
          </div>
        </section>
        
        {testimonials.length > 0 && (
          <section className="content-section" style={{ background: "#251b17", color: "#f5e9d7" }}>
            <div className="section-heading">
              <div><p className="eyebrow" style={{ color: "#dc9b64" }}>Testimonials</p><h2>What our clients say.</h2></div>
            </div>
            <div className="card-grid">
              {testimonials.map((test, idx) => (
                <article key={idx} className="solution-card" style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <p className="category" style={{ color: "#e0ad75" }}>{test.projectContext}</p>
                  <p style={{ fontStyle: "italic", fontSize: "1.1rem", marginBottom: "1.5rem" }}>"{test.quote}"</p>
                  <div>
                    <strong>{test.client}</strong><br />
                    <span style={{ opacity: 0.7, fontSize: "0.9rem" }}>{test.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
