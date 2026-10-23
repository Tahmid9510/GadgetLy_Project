"use client";

import { useState } from "react";
import { CATEGORY_STYLE } from "@/lib/category-style";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

/**
 * Product visual: the product's own image when one was given,
 * otherwise a category-tinted panel with the category icon on a dot grid.
 */
export function ProductArt({
  product,
  className,
  iconClassName,
}: {
  product: Pick<Product, "title" | "category" | "image">;
  className?: string;
  iconClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const style = CATEGORY_STYLE[product.category];
  const Icon = style.icon;

  if (product.image && !failed) {
    return (
      <div className={cn("relative overflow-hidden bg-surface-muted", className)}>
        {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary user-supplied URLs */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${product.title} (${product.category})`}
      className={cn("relative grid place-items-center overflow-hidden", style.panel, className)}
    >
      <div className="dot-grid absolute inset-0 opacity-[0.16]" />
      <Icon strokeWidth={1.25} className={cn("relative size-1/3 max-h-28 max-w-28", iconClassName)} />
    </div>
  );
}
