import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/cms/types";

export function ProductCard({ product }: { product: Product }) {
  return <Link href={`/catalog/${product.slug}`} className="product-card" aria-label={`View ${product.title}`}>{product.thumbnail && <Image src={product.thumbnail} alt="" fill style={{ objectFit: "cover" }} sizes="(max-width: 980px) 50vw, 25vw" />}<div><p className="eyebrow">{product.category}</p><h3>{product.title}</h3><span>View specification ↗</span></div></Link>;
}
