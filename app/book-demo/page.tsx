import { BookingForm } from "@/components/site/booking-form";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";

export default function BookDemoPage() {
  return <><main className="page-main"><PageHero eyebrow="Book a consultation" title={<>Bring the brief.<br /><em>We will make it tangible.</em></>} description="Arrange a showroom visit, site discussion or initial consultation. Final booking confirmation is provided by VSS Salesco after the booking destination is connected." image="/media/theatre-alt-preview.png" /><section className="content-section"><div className="section-heading"><div><p className="eyebrow">Start the conversation</p><h2>Tell us what you want the space to do.</h2></div><p>For a production launch, connect this form to a verified CRM, Webflow form, inbox or automation webhook through the environment configuration.</p></div><BookingForm /></section></main><SiteFooter /></>;
}
