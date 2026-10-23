"use client";

import Link from "next/link";
import { ArrowLeft, BadgeCheck, PackageOpen, RotateCcw, Truck } from "lucide-react";
import { useProducts } from "@/context/products-context";
import { getRelatedProducts } from "@/lib/products";
import { formatDate, formatPrice } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Badge, Rating, Skeleton } from "@/components/ui/misc";
import { ProductArt } from "./product-art";
import { ProductCard } from "./product-card";

function BackLink() {
  return (
    <Link href="/items" className={buttonVariants({ variant: "ghost", size: "sm", className: "-ml-3" })}>
      <ArrowLeft /> Back to products
    </Link>
  );
}

export function ProductDetails({ id }: { id: string }) {
  const { products, ready, getProduct } = useProducts();
  const product = getProduct(id);

  if (!ready) return <ProductDetailsSkeleton />;

  if (!product) {
    return (
      <>
        <BackLink />
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed bg-surface px-6 py-20 text-center">
          <PackageOpen className="size-10 text-muted-foreground" strokeWidth={1.4} aria-hidden />
          <h1 className="mt-4 text-xl font-bold">This product isn&apos;t available</h1>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            It may have been removed from the catalogue. Browse the full range to find something similar.
          </p>
          <Link href="/items" className={buttonVariants({ className: "mt-6" })}>
            Browse products
          </Link>
        </div>
      </>
    );
  }

  const related = getRelatedProducts(products, product);
  const inStock = product.stock > 0;

  const info = [
    { label: "Category", value: product.category },
    { label: "Brand", value: product.brand },
    { label: "Released", value: formatDate(product.releaseDate) },
    { label: "Availability", value: inStock ? `${product.stock} in stock` : "Out of stock" },
  ];

  return (
    <>
      <BackLink />

      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <ProductArt
          product={product}
          className="aspect-square w-full rounded-2xl border"
          iconClassName="max-h-40 max-w-40"
        />

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{product.category}</Badge>
            {product.createdBy && <Badge className="border-primary/30 bg-primary-soft text-primary">Listed by {product.createdBy}</Badge>}
          </div>
          <h1 className="mt-4 font-wide text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {product.title}
          </h1>
          <Rating value={product.rating} reviews={product.reviews} className="mt-3" />
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{product.shortDescription}</p>

          <p className="mt-6 font-wide text-4xl font-bold tabular">{formatPrice(product.price)}</p>

          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border">
            {info.map((i) => (
              <div key={i.label} className="bg-surface px-4 py-3">
                <dt className="text-xs font-semibold text-muted-foreground">{i.label}</dt>
                <dd className="mt-0.5 font-semibold">{i.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-center gap-2.5"><Truck className="size-4 text-primary" aria-hidden /> Free 2-day delivery on orders over $50</li>
            <li className="flex items-center gap-2.5"><BadgeCheck className="size-4 text-primary" aria-hidden /> Two-year GadgetLy warranty</li>
            <li className="flex items-center gap-2.5"><RotateCcw className="size-4 text-primary" aria-hidden /> 30-day returns</li>
          </ul>
        </div>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
        <section aria-labelledby="desc-title">
          <h2 id="desc-title" className="text-xl font-bold">About this product</h2>
          <p className="mt-4 max-w-prose whitespace-pre-line text-[15px] leading-7 text-foreground/90">
            {product.description}
          </p>
        </section>

        <section aria-labelledby="spec-title">
          <h2 id="spec-title" className="text-xl font-bold">Specifications</h2>
          {product.specs.length ? (
            <dl className="mt-4 divide-y overflow-hidden rounded-xl border bg-surface">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-[1fr_1.4fr] gap-4 px-4 py-3 text-sm">
                  <dt className="text-muted-foreground">{s.label}</dt>
                  <dd className="font-semibold tabular">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-4 text-sm text-muted-foreground">No specifications listed for this product.</p>
          )}
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t pt-12" aria-labelledby="related-title">
          <h2 id="related-title" className="font-wide text-2xl font-bold tracking-tight">You might also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </>
  );
}

export function ProductDetailsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading product">
      <Skeleton className="h-8 w-40" />
      <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <Skeleton className="aspect-square w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
