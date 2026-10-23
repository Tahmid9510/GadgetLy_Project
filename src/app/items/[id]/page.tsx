import type { Metadata } from "next";
import { Suspense } from "react";
import { SEED_PRODUCTS } from "@/lib/products";
import { Container } from "@/components/ui/misc";
import { ProductDetails, ProductDetailsSkeleton } from "@/components/items/product-details";

// Pre-render the catalogue; products people add are rendered on request
// and looked up from their browser's storage.
export async function generateStaticParams() {
  return SEED_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps<"/items/[id]">): Promise<Metadata> {
  const { id } = await params;
  const product = SEED_PRODUCTS.find((p) => p.id === id);
  return {
    title: product?.title ?? "Product details",
    description: product?.shortDescription,
  };
}

async function DetailsForParams({ params }: { params: PageProps<"/items/[id]">["params"] }) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}

export default function ItemDetailsPage({ params }: PageProps<"/items/[id]">) {
  return (
    <Container className="pt-10 pb-20">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <DetailsForParams params={params} />
      </Suspense>
    </Container>
  );
}
