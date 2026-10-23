import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/misc";
import { buttonVariants } from "@/components/ui/button";
import { CATEGORY_STYLE } from "@/lib/category-style";
import { CATEGORIES } from "@/lib/products";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Why GadgetLy exists and how we test every product before it's listed.",
};

const STEPS = [
  {
    title: "Shortlist",
    text: "We read the spec sheets and reviews, then buy the products worth a closer look. Makers don't send us free units.",
  },
  {
    title: "Live with it for 30 days",
    text: "A tester uses the product as their daily device: commutes, workdays, travel. Battery and performance are measured, not copied from the box.",
  },
  {
    title: "Publish the real numbers",
    text: "Specs on each product page come from our own measurements. If a claim didn't hold up, the product doesn't get listed.",
  },
  {
    title: "Stand behind it",
    text: "Everything we sell carries a two-year warranty and 30-day returns, handled by our own support team.",
  },
];

const FIGURES = [
  { value: "2019", label: "Founded in Dhaka" },
  { value: "340+", label: "Products tested" },
  { value: "1 in 4", label: "Pass and get listed" },
  { value: "4.8 / 5", label: "Average customer rating" },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20">
          <div>
            <h1 className="font-wide text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
              About GadgetLy
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              GadgetLy is a small electronics store built around one idea: you
              should know how a gadget performs before you pay for it. We test
              everything we sell and publish what we find, good and bad.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              We stock six categories, from headphones to handheld consoles, and
              keep the range deliberately short so every product can get a full
              month of real use.
            </p>
            <Link href="/items" className={buttonVariants({ size: "lg", className: "mt-8" })}>
              Browse products
            </Link>
          </div>

          {/* The "test bench": one tile per category we stock */}
          <div className="grid grid-cols-3 gap-3" aria-hidden>
            {CATEGORIES.map((c, i) => {
              const style = CATEGORY_STYLE[c];
              const Icon = style.icon;
              return (
                <div
                  key={c}
                  className={cn(
                    "relative grid aspect-square place-items-center overflow-hidden rounded-xl",
                    style.panel,
                    i % 2 === 1 && "translate-y-6",
                  )}
                >
                  <div className="dot-grid absolute inset-0 opacity-[0.16]" />
                  <Icon className="relative size-1/3" strokeWidth={1.25} />
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-20" aria-labelledby="process-title">
        <Container>
          <h2 id="process-title" className="font-wide text-3xl font-bold tracking-tight sm:text-[2.25rem]">
            How a product gets listed
          </h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground">
            Every product goes through the same four steps, in this order.
          </p>
          <ol className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative rounded-xl border bg-surface p-6">
                <span className="grid size-9 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground tabular">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-y bg-surface/60 py-16" aria-label="GadgetLy in figures">
        <Container>
          <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {FIGURES.map((f) => (
              <div key={f.label} className="border-l-2 border-primary pl-5">
                <dt className="text-sm text-muted-foreground">{f.label}</dt>
                <dd className="mt-1 font-wide text-3xl font-bold tabular">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}
