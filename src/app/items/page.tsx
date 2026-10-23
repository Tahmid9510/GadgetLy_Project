import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, PageHeader } from "@/components/ui/misc";
import { ItemsBrowser, ItemsBrowserSkeleton } from "@/components/items/items-browser";

export const metadata: Metadata = { title: "Products" };

export default function ItemsPage() {
  return (
    <Container className="pt-12 pb-20">
      <PageHeader
        title="All products"
        description="Search the catalogue, then narrow it down by category, price and rating."
      />
      <Suspense fallback={<ItemsBrowserSkeleton />}>
        <ItemsBrowser />
      </Suspense>
    </Container>
  );
}
