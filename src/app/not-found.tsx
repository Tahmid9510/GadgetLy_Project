import Link from "next/link";
import { Container } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <p className="font-wide text-7xl font-extrabold text-primary tabular">404</p>
      <h1 className="mt-4 text-2xl font-bold">This page doesn&apos;t exist</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        The link may be broken or the page may have moved. Head back to the store to keep browsing.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className={buttonVariants()}>Go to home</Link>
        <Link href="/items" className={buttonVariants({ variant: "secondary" })}>Browse products</Link>
      </div>
    </Container>
  );
}
