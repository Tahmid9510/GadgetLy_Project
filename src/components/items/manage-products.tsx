"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Eye, PackageOpen, Plus, RotateCcw, Search, Trash2 } from "lucide-react";
import type { Product } from "@/lib/products";
import { useProducts } from "@/context/products-context";
import { formatDate, formatPrice } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { Badge, Skeleton } from "@/components/ui/misc";
import { ConfirmDialog } from "@/components/ui/alert-dialog";
import { ProductArt } from "./product-art";

function RowActions({ product, onDelete }: { product: Product; onDelete: (p: Product) => void }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Link
        href={`/items/${product.id}`}
        className={buttonVariants({ variant: "ghost", size: "sm" })}
        aria-label={`View ${product.title}`}
      >
        <Eye /> View
      </Link>
      <ConfirmDialog
        title={`Delete ${product.title}?`}
        description={
          product.createdBy
            ? "This removes the product from the catalogue. It can't be undone."
            : "This removes the product from the catalogue. You can bring catalogue products back later with Restore catalogue."
        }
        confirmLabel="Delete product"
        onConfirm={() => onDelete(product)}
        trigger={
          <Button variant="destructive-ghost" size="sm" aria-label={`Delete ${product.title}`}>
            <Trash2 /> Delete
          </Button>
        }
      />
    </div>
  );
}

function SourceBadge({ product }: { product: Product }) {
  return product.createdBy ? (
    <Badge className="border-primary/30 bg-primary-soft text-primary">Added</Badge>
  ) : (
    <Badge>Catalogue</Badge>
  );
}

export function ManageProducts() {
  const { products, ready, deleteProduct, hiddenCount, restoreCatalogue } = useProducts();
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? products.filter((p) => `${p.title} ${p.brand} ${p.category}`.toLowerCase().includes(q))
      : products;
  }, [products, query]);

  const handleDelete = (p: Product) => {
    deleteProduct(p.id);
    toast.success("Product deleted", { description: `${p.title} was removed from the catalogue.` });
  };

  const handleRestore = () => {
    restoreCatalogue();
    toast.success("Catalogue restored", { description: `${hiddenCount} product${hiddenCount === 1 ? "" : "s"} brought back.` });
  };

  if (!ready) {
    return (
      <div className="mt-8 space-y-3" aria-busy="true">
        <Skeleton className="h-12 w-full max-w-sm" />
        {Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-16 w-full" />)}
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by name, brand or category"
            aria-label="Filter products"
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span aria-live="polite">
            <span className="font-semibold text-foreground tabular">{rows.length}</span> product{rows.length === 1 ? "" : "s"}
          </span>
          {hiddenCount > 0 && (
            <Button variant="secondary" size="sm" onClick={handleRestore}>
              <RotateCcw /> Restore catalogue
            </Button>
          )}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed bg-surface px-6 py-16 text-center">
          <PackageOpen className="size-10 text-muted-foreground" strokeWidth={1.4} aria-hidden />
          <h2 className="mt-4 text-lg font-bold">{query ? "No products match that filter" : "No products yet"}</h2>
          <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">
            {query ? "Try a different name or brand." : "Add your first product to start the catalogue."}
          </p>
          {!query && (
            <Link href="/items/add" className={buttonVariants({ className: "mt-6" })}>
              <Plus /> Add product
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Table: tablet and up */}
          <div className="mt-6 hidden overflow-hidden rounded-xl border bg-surface md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-surface-muted/60 text-xs font-semibold text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3">Product</th>
                  <th scope="col" className="px-4 py-3">Category</th>
                  <th scope="col" className="px-4 py-3 text-right">Price</th>
                  <th scope="col" className="hidden px-4 py-3 text-right lg:table-cell">Stock</th>
                  <th scope="col" className="hidden px-4 py-3 lg:table-cell">Source</th>
                  <th scope="col" className="px-4 py-3 text-right"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-surface-muted/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ProductArt product={p} className="size-12 shrink-0 rounded-lg" iconClassName="size-1/2" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{p.title}</p>
                          <p className="truncate text-xs text-muted-foreground">
                            {p.brand}, released {formatDate(p.releaseDate)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 text-right font-semibold tabular">{formatPrice(p.price)}</td>
                    <td className="hidden px-4 py-3 text-right tabular lg:table-cell">{p.stock}</td>
                    <td className="hidden px-4 py-3 lg:table-cell"><SourceBadge product={p} /></td>
                    <td className="px-4 py-3"><RowActions product={p} onDelete={handleDelete} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards: phones */}
          <ul className="mt-6 space-y-3 md:hidden">
            {rows.map((p) => (
              <li key={p.id} className="rounded-xl border bg-surface p-4">
                <div className="flex gap-3">
                  <ProductArt product={p} className="size-16 shrink-0 rounded-lg" iconClassName="size-1/2" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold leading-snug">{p.title}</p>
                      <SourceBadge product={p} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{p.category}, {p.stock} in stock</p>
                    <p className="mt-1 font-bold tabular">{formatPrice(p.price)}</p>
                  </div>
                </div>
                <div className="mt-3 border-t pt-2">
                  <RowActions product={p} onDelete={handleDelete} />
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
