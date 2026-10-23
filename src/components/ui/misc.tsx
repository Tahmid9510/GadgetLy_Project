import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      aria-hidden
      className={cn("animate-pulse rounded-md bg-surface-muted", className)}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

export function Rating({ value, reviews, className }: { value: number; reviews?: number; className?: string }) {
  if (!value) {
    return (
      <span className={cn("inline-flex items-center gap-1 text-sm font-semibold text-primary", className)}>
        New listing
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm tabular", className)}>
      <Star className="size-4 fill-signal text-signal" aria-hidden />
      <span className="font-semibold text-foreground">{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className="text-muted-foreground">({reviews.toLocaleString("en-US")})</span>
      )}
      <span className="sr-only">out of 5 stars</span>
    </span>
  );
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function PageHeader({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <h1 className="font-wide text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-base text-muted-foreground">{description}</p>}
      </div>
      {children}
    </div>
  );
}
