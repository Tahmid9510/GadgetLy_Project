import type { Metadata } from "next";
import { Container, PageHeader, Skeleton } from "@/components/ui/misc";
import { ProtectedRoute } from "@/components/protected-route";
import { AddProductForm } from "@/components/items/add-product-form";

export const metadata: Metadata = { title: "Add product" };

function FormSkeleton() {
  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]" aria-busy="true">
      <div className="space-y-8">
        <Skeleton className="h-[440px] w-full rounded-xl" />
        <Skeleton className="h-56 w-full rounded-xl" />
      </div>
      <Skeleton className="hidden h-96 rounded-xl lg:block" />
    </div>
  );
}

export default function AddProductPage() {
  return (
    <Container className="pt-12 pb-20">
      <PageHeader
        title="Add a product"
        description="Fill in the details below. The product appears in the catalogue as soon as you add it."
      />
      <ProtectedRoute fallback={<FormSkeleton />}>
        <AddProductForm />
      </ProtectedRoute>
    </Container>
  );
}
