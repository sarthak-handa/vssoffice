import { PanoramaTour } from "@/components/immersive/panorama-tour";
import { SiteFooter } from "@/components/site/site-footer";
import { getScenes, getFaqs } from "@/lib/cms/adapter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience Centre | VSS Salesco",
  description: "Take a 360-degree virtual tour of the VSS Salesco showroom.",
};

export default async function ExperiencePage() {
  const scenes = await getScenes();
  const faqs = await getFaqs();
  
  return (
    <>
      <PanoramaTour scenes={scenes} />
      
      {faqs.length > 0 && (
        <section className="content-section" style={{ background: "var(--ivory)", color: "var(--ink)", padding: "5rem var(--space)" }}>
          <div className="section-heading">
            <div><p className="eyebrow">Common Questions</p><h2>Planning your visit.</h2></div>
          </div>
          <div style={{ maxWidth: "50rem", margin: "0 auto" }}>
            {faqs.map((faq, idx) => (
              <div key={idx} style={{ marginBottom: "2rem", paddingBottom: "2rem", borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <p className="eyebrow" style={{ color: "var(--brown)" }}>{faq.category}</p>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{faq.question}</h3>
                <p style={{ opacity: 0.8 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      
      <SiteFooter />
    </>
  );
}
