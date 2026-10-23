import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Container, PageHeader, Skeleton } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/protected-route";
import { ManageProducts } from "@/components/items/manage-products";

export const metadata: Metadata = { title: "Manage products" };

function TableSkeleton() {
  return (
    <div className="mt-8 space-y-3" aria-busy="true">
      <Skeleton className="h-10 w-full max-w-sm" />
      {Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-16 w-full" />)}
    </div>
  );
}

export default function ManageProductsPage() {
  return (
    <Container className="pt-12 pb-20">
      <PageHeader
        title="Manage products"
        description="Every product in the catalogue. View a listing or delete ones you no longer sell."
      >
        <Link href="/items/add" className={buttonVariants()}>
          <Plus /> Add product
        </Link>
      </PageHeader>
      <ProtectedRoute fallback={<TableSkeleton />}>
        <ManageProducts />
      </ProtectedRoute>
    </Container>
  );
}
