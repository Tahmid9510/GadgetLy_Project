import Link from "next/link";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { ProductArt } from "./product-art";
import { Rating, Skeleton } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_14px_30px_-18px_rgb(14_60_70/0.45)] focus-within:border-primary/60">
      <ProductArt
        product={product}
        className="aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground">
          <span>{product.category}</span>
          <Rating value={product.rating} className="text-xs [&_svg]:size-3.5" />
        </div>
        <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight">{product.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <span className="text-lg font-bold tabular">{formatPrice(product.price)}</span>
          <Link
            href={`/items/${product.id}`}
            className={buttonVariants({ variant: "secondary", size: "sm" })}
          >
            View Details
            <span className="absolute inset-0" aria-hidden />
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-surface">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex justify-between pt-3">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-28" />
        </div>
      </div>
    </div>
  );
}
