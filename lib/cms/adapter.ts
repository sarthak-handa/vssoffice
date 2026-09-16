import { mockContent } from "./mock";
import type { ExperienceScene, FAQ, Product, SiteContent, Solution, Testimonial } from "./types";
import { getWebflowContent } from "./webflow";

export async function getSiteContent(): Promise<SiteContent> {
  const live = await getWebflowContent();
  return {
    ...mockContent,
    ...live,
    solutions: live?.solutions?.length ? live.solutions : mockContent.solutions,
    products: live?.products?.length ? live.products : mockContent.products,
    scenes: live?.scenes?.length ? live.scenes : mockContent.scenes,
    testimonials: live?.testimonials?.length ? live.testimonials : mockContent.testimonials,
    faqs: live?.faqs?.length ? live.faqs : mockContent.faqs,
  };
}

export async function getScenes(): Promise<ExperienceScene[]> {
  return (await getSiteContent()).scenes.sort((a, b) => a.order - b.order);
}

export async function getSolutions(): Promise<Solution[]> {
  return (await getSiteContent()).solutions;
}

export async function getProducts(): Promise<Product[]> {
  return (await getSiteContent()).products;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await getSiteContent()).testimonials;
}

export async function getFaqs(): Promise<FAQ[]> {
  return (await getSiteContent()).faqs;
}
