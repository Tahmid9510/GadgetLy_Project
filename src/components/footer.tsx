import Link from "next/link";
import { Logo } from "./logo";
import { Container } from "./ui/misc";
import { CATEGORIES } from "@/lib/products";

const SOCIALS = [
  {
    label: "GadgetLy on X",
    href: "https://x.com",
    path: <path d="M5 5l14 14M19 5L5 19" />,
  },
  {
    label: "GadgetLy on Instagram",
    href: "https://instagram.com",
    path: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" />
      </>
    ),
  },
  {
    label: "GadgetLy on YouTube",
    href: "https://youtube.com",
    path: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="M10.5 9.5v5l4.2-2.5z" fill="currentColor" />
      </>
    ),
  },
  {
    label: "GadgetLy on Facebook",
    href: "https://facebook.com",
    path: <path d="M14.5 4.5h-1.8a3 3 0 0 0-3 3V20M7.5 11h6.5" />,
  },
];

const COLUMNS = [
  {
    title: "Shop",
    links: CATEGORIES.slice(0, 4).map((c) => ({
      label: c,
      href: `/items?category=${encodeURIComponent(c)}`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About GadgetLy", href: "/about" },
      { label: "All products", href: "/items" },
      { label: "Support", href: "/support" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Shipping & delivery", href: "/support#shipping" },
      { label: "Returns", href: "/support#returns" },
      { label: "Warranty", href: "/support#warranty" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t bg-surface">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="col-span-2 max-w-xs sm:col-span-3 md:col-span-1">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Tested tech, honest specs and two-year cover on everything we sell.
          </p>
          <ul className="mt-6 flex gap-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid size-9 place-items-center rounded-md border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {s.path}
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-bold">{col.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <div className="border-t">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {2026} GadgetLy. All rights reserved.</p>
          <p>Built with Next.js and Firebase.</p>
        </Container>
      </div>
    </footer>
  );
}
