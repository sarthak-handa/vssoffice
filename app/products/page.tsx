import { ARProductViewer } from "@/components/catalog/ar-product-viewer";
import { ProductCard } from "@/components/catalog/product-card";
import { PageHero } from "@/components/site/page-hero";
import { SiteFooter } from "@/components/site/site-footer";
import { getProducts } from "@/lib/cms/adapter";

export default async function ProductsPage() {
  const products = await getProducts();
  return <><main className="page-main"><PageHero eyebrow="Products & brands" title={<>Explore technology <em>before it enters your space.</em></>} description="This preview intentionally avoids unverified product, dealer and performance claims. Approved product data and brand assets will be populated from Webflow CMS." image="/media/lounge-display-preview.png" /><section className="content-section"><div className="section-heading"><div><p className="eyebrow">Product pathways</p><h2>Choose the right system, not simply the nearest device.</h2></div><p>Each product slot is CMS-ready for approved imagery, specification, brand attribution, enquiry workflows and AR assets.</p></div><div className="product-grid">{products.map((product) => <ProductCard product={product} key={product.slug} />)}</div></section><section className="content-section" id={products[0]?.slug}><ARProductViewer product={products[0]} /></section></main><SiteFooter /></>;
}
