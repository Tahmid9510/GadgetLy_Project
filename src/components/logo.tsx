import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect x="1" y="1" width="30" height="30" rx="8" className="fill-primary" />
      {/* A "G" drawn as a circuit trace ending in a solder pad */}
      <path
        d="M22 11.5A7.5 7.5 0 1 0 23.5 17H17"
        fill="none"
        className="stroke-primary-foreground"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="16.5" cy="17" r="2.2" className="fill-primary-foreground" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 rounded-md", className)}
      aria-label="GadgetLy home"
    >
      <LogoMark />
      <span className="font-wide text-lg font-bold tracking-tight">GadgetLy</span>
    </Link>
  );
}
