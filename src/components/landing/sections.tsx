"use client";

import Link from "next/link";
import { BadgeCheck, FlaskConical, RotateCcw, Truck } from "lucide-react";
import { CATEGORIES } from "@/lib/products";
import { CATEGORY_STYLE } from "@/lib/category-style";
import { useProducts } from "@/context/products-context";
import { Container } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard, ProductCardSkeleton } from "@/components/items/product-card";
import { cn } from "@/lib/utils";

function SectionHeading({
  id,
  title,
  description,
  action,
}: {
  id: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h2 id={id} className="font-wide text-3xl font-bold tracking-tight sm:text-[2.25rem]">{title}</h2>
        {description && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

/* 1. Categories */
export function CategoriesSection() {
  const { products, ready } = useProducts();
  return (
    <section id="categories" className="py-20" aria-labelledby="categories-title">
      <Container>
        <SectionHeading id="categories-title" title="Shop by category" description="Six departments, each one stocked with gear our testers would buy themselves." />
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((category) => {
            const style = CATEGORY_STYLE[category];
            const Icon = style.icon;
            const count = products.filter((p) => p.category === category).length;
            return (
              <li key={category}>
                <Link
                  href={`/items?category=${encodeURIComponent(category)}`}
                  className="group flex h-full flex-col rounded-xl border bg-surface p-4 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[0_12px_26px_-18px_rgb(14_60_70/0.5)]"
                >
                  <span className={cn("grid size-12 place-items-center rounded-lg", style.panel)}>
                    <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                  </span>
                  <span className="mt-4 font-bold">{category}</span>
                  <span className="mt-1 text-[13px] leading-snug text-muted-foreground">{style.blurb}</span>
                  <span className="mt-auto pt-3 text-xs font-semibold text-primary tabular">
                    {ready ? `${count} ${count === 1 ? "product" : "products"}` : " "}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}

/* 2. New arrivals */
export function NewArrivalsSection() {
  const { products, ready } = useProducts();
  const latest = [...products]
    .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))
    .slice(0, 4);

  return (
    <section className="border-y bg-surface/60 py-20" aria-labelledby="new-title">
      <Container>
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 id="new-title" className="font-wide text-3xl font-bold tracking-tight sm:text-[2.25rem]">
              Just landed
            </h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              The newest releases that passed testing this season.
            </p>
          </div>
          <Link href="/items" className={buttonVariants({ variant: "secondary" })}>
            See all products
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ready
            ? latest.map((p) => <ProductCard key={p.id} product={p} />)
            : Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}
        </div>
      </Container>
    </section>
  );
}

/* 3. Why GadgetLy */
const PROMISES = [
  {
    icon: FlaskConical,
    title: "30 days of testing",
    text: "Products live with a tester for a month. If battery or build doesn't match the box, we don't list it.",
  },
  {
    icon: BadgeCheck,
    title: "Two-year warranty",
    text: "Every order is covered for two years. We handle the claim with the maker so you don't have to.",
  },
  {
    icon: Truck,
    title: "Free 2-day delivery",
    text: "Orders over $50 ship free and arrive within two working days, tracked from our warehouse.",
  },
  {
    icon: RotateCcw,
    title: "30-day returns",
    text: "Changed your mind? Send it back within 30 days in its box for a full refund.",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-20" aria-labelledby="why-title">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="why-title" className="font-wide text-3xl font-bold tracking-tight sm:text-[2.25rem]">
            Why people buy from GadgetLy
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            We sell fewer products than the big marketplaces, on purpose. What we
            do list comes with numbers we measured and support we stand behind.
          </p>
          <Link href="/about" className={cn(buttonVariants({ variant: "link" }), "mt-4 px-0")}>
            Read how we test
          </Link>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-2">
          {PROMISES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="bg-surface p-6 transition-colors hover:bg-primary-soft/40 sm:p-8">
              <Icon className="size-6 text-primary" strokeWidth={1.7} aria-hidden />
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* 4. Testimonials */
const REVIEWS = [
  {
    quote:
      "The spec table matched what I measured at home, down to the battery hours. That's why I keep coming back.",
    name: "Farhana Rahman",
    detail: "Bought Drift ANC Headphones",
  },
  {
    quote:
      "My laptop's hinge cracked at month fourteen. GadgetLy sorted the warranty claim and I had it back in a week.",
    name: "Daniel Okafor",
    detail: "Bought Atlas 14 Ultrabook",
  },
  {
    quote:
      "Ordered on Monday, wearing it Wednesday. The comparison filters made picking between two watches easy.",
    name: "Mei Lin Chen",
    detail: "Bought Pulse Smartwatch",
  },
];

export function TestimonialsSection() {
  return (
    <section className="border-t bg-surface/60 py-20" aria-labelledby="reviews-title">
      <Container>
        <SectionHeading id="reviews-title" title="What customers say" description="Rated 4.8 out of 5 across 12,000 verified orders." />
        <ul className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((r) => (
            <li key={r.name}>
              <figure className="flex h-full flex-col rounded-xl border bg-surface p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary/50">
                <svg viewBox="0 0 24 24" className="size-7 text-primary/70" aria-hidden>
                  <path fill="currentColor" d="M4 18v-5.5C4 8.4 6.2 6 10 5.5v2.6c-2 .5-3 1.8-3 4H10V18H4zm10 0v-5.5c0-4.1 2.2-6.5 6-7v2.6c-2 .5-3 1.8-3 4h3V18h-6z" />
                </svg>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed">{r.quote}</blockquote>
                <figcaption className="mt-6 border-t pt-4">
                  <span className="block text-sm font-bold">{r.name}</span>
                  <span className="block text-[13px] text-muted-foreground">{r.detail}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
