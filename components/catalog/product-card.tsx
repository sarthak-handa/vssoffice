import Link from "next/link";
import type { Product } from "@/lib/cms/types";

export function ProductCard({ product }: { product: Product }) {
  return <article className="product-card">
    {product.thumbnail && <img src={product.thumbnail} alt="" loading="lazy" />}
    <div><p>{product.category} / preview placeholder</p><h3>{product.title}</h3><Link href={`/products#${product.slug}`}>View product pathway ↗</Link></div>
  </article>;
}
