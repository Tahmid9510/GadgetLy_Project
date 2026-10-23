"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PackageOpen, Search, X } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { useProducts } from "@/context/products-context";
import { Input, Label, NativeSelect } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ProductCard, ProductCardSkeleton } from "./product-card";

export const PRICE_RANGES = [
  { value: "under-100", label: "Under $100", min: 0, max: 100 },
  { value: "100-500", label: "$100 – $500", min: 100, max: 500 },
  { value: "500-1000", label: "$500 – $1,000", min: 500, max: 1000 },
  { value: "over-1000", label: "Over $1,000", min: 1000, max: Infinity },
] as const;

const RATINGS = [
  { value: "4.5", label: "4.5 stars & up" },
  { value: "4", label: "4 stars & up" },
];

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "rating", label: "Top rated" },
];

export function ItemsBrowser() {
  const { products, ready } = useProducts();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [query, setQuery] = useState("");

  // Category, price, rating and sort live in the URL so results can be shared
  // and linked to (e.g. from the category tiles on the home page).
  const category = params.get("category") ?? "";
  const price = params.get("price") ?? "";
  const rating = params.get("rating") ?? "";
  const sort = params.get("sort") ?? "featured";

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const clearAll = () => {
    setQuery("");
    router.replace(pathname, { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const range = PRICE_RANGES.find((r) => r.value === price);
    const minRating = Number(rating) || 0;

    const list = products.filter((p) => {
      if (q && !`${p.title} ${p.brand} ${p.shortDescription} ${p.category}`.toLowerCase().includes(q)) return false;
      if (category && p.category !== category) return false;
      if (range && (p.price < range.min || p.price >= range.max)) return false;
      if (p.rating < minRating) return false;
      return true;
    });

    switch (sort) {
      case "newest":
        return list.sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      default:
        return list;
    }
  }, [products, query, category, price, rating, sort]);

  const activeCount = [query.trim(), category, price, rating].filter(Boolean).length;

  return (
    <div className="mt-8">
      <div className="rounded-xl border bg-surface p-4 sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, brand or feature"
            aria-label="Search products"
            className="h-12 pl-11 text-base"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="f-category" className="text-xs text-muted-foreground">Category</Label>
            <NativeSelect id="f-category" value={category} onChange={(e) => setParam("category", e.target.value)}>
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-price" className="text-xs text-muted-foreground">Price</Label>
            <NativeSelect id="f-price" value={price} onChange={(e) => setParam("price", e.target.value)}>
              <option value="">Any price</option>
              {PRICE_RANGES.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-rating" className="text-xs text-muted-foreground">Rating</Label>
            <NativeSelect id="f-rating" value={rating} onChange={(e) => setParam("rating", e.target.value)}>
              <option value="">Any rating</option>
              {RATINGS.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </NativeSelect>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="f-sort" className="text-xs text-muted-foreground">Sort by</Label>
            <NativeSelect id="f-sort" value={sort} onChange={(e) => setParam("sort", e.target.value === "featured" ? "" : e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </NativeSelect>
          </div>
        </div>
      </div>

      <div className="mt-6 flex min-h-9 items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {ready ? (
            <>
              Showing <span className="font-semibold text-foreground tabular">{filtered.length}</span> of{" "}
              <span className="tabular">{products.length}</span> products
            </>
          ) : (
            "Loading products…"
          )}
        </p>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll}>
            <X /> Clear filters
          </Button>
        )}
      </div>

      {!ready ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      ) : filtered.length ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-xl border border-dashed bg-surface px-6 py-16 text-center">
          <PackageOpen className="size-10 text-muted-foreground" strokeWidth={1.4} aria-hidden />
          <h2 className="mt-4 text-lg font-bold">No products match these filters</h2>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            Try a different search term, or widen the price or rating range.
          </p>
          <Button variant="secondary" className="mt-6" onClick={clearAll}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}

export function ItemsBrowserSkeleton() {
  return (
    <div className="mt-8">
      <div className="h-[170px] rounded-xl border bg-surface lg:h-[122px]" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
