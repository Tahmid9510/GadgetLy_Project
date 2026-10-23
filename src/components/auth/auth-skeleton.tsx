import { Skeleton } from "@/components/ui/misc";

export function AuthFormSkeleton({ fields = 2 }: { fields?: number }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-14 sm:py-20" aria-busy="true">
      <div className="rounded-2xl border bg-surface p-6 sm:p-8">
        <Skeleton className="size-10" />
        <Skeleton className="mt-6 h-7 w-2/3" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-6 h-11 w-full" />
        <div className="mt-8 space-y-5">
          {Array.from({ length: fields }, (_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
          <Skeleton className="h-11 w-full" />
        </div>
      </div>
    </div>
  );
}
