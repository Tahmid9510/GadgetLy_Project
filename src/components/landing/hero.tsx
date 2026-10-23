import Link from "next/link";
import { BadgeCheck, Truck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container, Rating } from "@/components/ui/misc";
import { ProductArt } from "@/components/items/product-art";
import { SEED_PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/utils";

const featured = SEED_PRODUCTS[0];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b">
      {/* Faint trace lines, like a circuit board under the page */}
      <svg aria-hidden className="pointer-events-none absolute inset-0 h-full w-full text-primary/[0.07]" preserveAspectRatio="none">
        <defs>
          <pattern id="traces" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0 30h50l20 20h50M30 120V80l20-20V0" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="50" cy="30" r="3" fill="currentColor" />
            <circle cx="50" cy="60" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#traces)" />
      </svg>

      <Container className="relative grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-24">
        <div>
          <h1 className="rise font-wide text-[2.6rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Gear that earns its place on your desk.
          </h1>
          <p className="rise mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground [animation-delay:90ms]">
            Every phone, laptop and pair of headphones on GadgetLy spends a month
            with our testers before it&apos;s listed. You get the real numbers and
            two years of cover.
          </p>
          <div className="rise mt-9 flex flex-wrap gap-3 [animation-delay:180ms]">
            <Link href="/items" className={buttonVariants({ size: "lg" })}>
              Browse products
            </Link>
            <Link href="/about" className={buttonVariants({ size: "lg", variant: "secondary" })}>
              How we test
            </Link>
          </div>
          <ul className="rise mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground [animation-delay:260ms]">
            <li className="flex items-center gap-2">
              <Truck className="size-4 text-primary" aria-hidden /> Free 2-day delivery over $50
            </li>
            <li className="flex items-center gap-2">
              <BadgeCheck className="size-4 text-primary" aria-hidden /> 2-year warranty included
            </li>
          </ul>
        </div>

        {/* The memorable element: a featured product shown as its datasheet */}
        <Link
          href={`/items/${featured.id}`}
          className="rise group relative mx-auto block w-full max-w-md rounded-2xl border bg-surface shadow-[0_30px_60px_-30px_rgb(14_50_70/0.45)] transition-[transform,border-color] duration-300 [animation-delay:200ms] hover:-translate-y-1 hover:border-primary/60 lg:max-w-none"
          aria-label={`${featured.title}, ${formatPrice(featured.price)}. View datasheet`}
        >
          <div className="flex items-center justify-between border-b px-5 py-3 text-xs font-semibold text-muted-foreground">
            <span>{featured.brand} datasheet</span>
            <span className="flex items-center gap-1.5 text-primary">
              <span className="size-1.5 rounded-full bg-primary" /> In stock
            </span>
          </div>
          <div className="grid gap-0 sm:grid-cols-[0.9fr_1fr]">
            <ProductArt product={featured} className="aspect-[16/9] sm:aspect-auto sm:min-h-full" />
            <div className="p-5">
              <h2 className="text-xl font-bold leading-tight">{featured.title}</h2>
              <Rating value={featured.rating} reviews={featured.reviews} className="mt-2" />
              <dl className="mt-4 divide-y text-sm">
                {featured.specs.slice(0, 4).map((s) => (
                  <div key={s.label} className="flex justify-between gap-4 py-2">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd className="text-right font-semibold tabular">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex items-end justify-between">
                <span className="font-wide text-3xl font-bold tabular">{formatPrice(featured.price)}</span>
                <span className="text-sm font-semibold text-primary underline-offset-4 group-hover:underline">
                  View details
                </span>
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}
