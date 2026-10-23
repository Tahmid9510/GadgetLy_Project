"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { LoaderCircle, Plus, X } from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/products";
import { zodResolver } from "@/lib/zod-resolver";
import { useAuth } from "@/context/auth-context";
import { useProducts } from "@/context/products-context";
import { Button, buttonVariants } from "@/components/ui/button";
import { FieldError, FieldHint, Input, Label, NativeSelect, Textarea } from "@/components/ui/form";
import { ProductCard } from "./product-card";

const schema = z.object({
  title: z.string().trim().min(3, "Title needs at least 3 characters.").max(60, "Keep the title under 60 characters."),
  brand: z.string().trim().min(2, "Enter the brand name.").max(30, "Keep the brand under 30 characters."),
  category: z.enum(CATEGORIES, { error: "Choose a category." }),
  shortDescription: z
    .string()
    .trim()
    .min(20, "Write at least 20 characters so the card isn't empty.")
    .max(120, "Keep it under 120 characters. It shows on two lines."),
  description: z.string().trim().min(60, "Write at least 60 characters describing the product."),
  price: z
    .number({ error: "Enter a price." })
    .positive("Price must be more than $0.")
    .max(100000, "Price must be under $100,000."),
  stock: z
    .number({ error: "Enter how many are in stock." })
    .int("Stock must be a whole number.")
    .min(0, "Stock can't be negative."),
  releaseDate: z.string().min(1, "Choose a release date."),
  image: z.union([z.literal(""), z.url({ error: "Enter a full URL starting with https://" })]),
  specs: z
    .array(
      z.object({
        label: z.string().trim().min(1, "Add a name."),
        value: z.string().trim().min(1, "Add a value."),
      }),
    )
    .max(10, "Add up to 10 specifications."),
});

type Values = z.infer<typeof schema>;

const DEFAULTS: Partial<Values> = {
  title: "",
  brand: "",
  shortDescription: "",
  description: "",
  releaseDate: new Date().toISOString().slice(0, 10),
  image: "",
  specs: [{ label: "", value: "" }],
};

export function AddProductForm() {
  const { user } = useAuth();
  const { addProduct } = useProducts();
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: DEFAULTS,
  });
  const { fields, append, remove } = useFieldArray({ control, name: "specs" });
  const watched = useWatch({ control });

  const onSubmit = async (values: Values) => {
    // Brief pause so the loading state is visible; storage is synchronous.
    await new Promise((r) => setTimeout(r, 400));
    const product = addProduct({
      ...values,
      image: values.image || undefined,
      rating: 0,
      reviews: 0,
      createdBy: user?.displayName || user?.email || "a member",
    });
    toast.success("Product added", {
      description: `${product.title} is now listed in the catalogue.`,
      action: { label: "View", onClick: () => router.push(`/items/${product.id}`) },
    });
    reset(DEFAULTS);
  };

  const err = (name: string) => ({
    "aria-invalid": !!errors[name as keyof Values],
    "aria-describedby": errors[name as keyof Values] ? `${name}-error` : undefined,
  });

  const shortLen = watched.shortDescription?.length ?? 0;

  return (
    <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
        <fieldset className="space-y-5 rounded-xl border bg-surface p-5 sm:p-7">
          <legend className="sr-only">Basics</legend>
          <h2 className="text-lg font-bold">Basics</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g. Aria Noise-Cancelling Earbuds" {...err("title")} {...register("title")} />
              <FieldError id="title-error" message={errors.title?.message} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="brand">Brand</Label>
              <Input id="brand" placeholder="e.g. Halcyon" {...err("brand")} {...register("brand")} />
              <FieldError id="brand-error" message={errors.brand?.message} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <NativeSelect id="category" defaultValue="" {...err("category")} {...register("category")}>
                <option value="" disabled>Choose a category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </NativeSelect>
              <FieldError id="category-error" message={errors.category?.message} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-baseline justify-between">
                <Label htmlFor="shortDescription">Short description</Label>
                <span className={`text-xs tabular ${shortLen > 120 ? "font-semibold text-destructive" : "text-muted-foreground"}`}>
                  {shortLen}/120
                </span>
              </div>
              <Input id="shortDescription" placeholder="One line that appears on the product card" {...err("shortDescription")} {...register("shortDescription")} />
              <FieldError id="shortDescription-error" message={errors.shortDescription?.message} />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="description">Full description</Label>
              <Textarea id="description" rows={5} placeholder="What it does, who it's for, and what stands out in testing" {...err("description")} {...register("description")} />
              <FieldError id="description-error" message={errors.description?.message} />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-xl border bg-surface p-5 sm:p-7">
          <legend className="sr-only">Pricing and availability</legend>
          <h2 className="text-lg font-bold">Pricing and availability</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label htmlFor="price">Price (USD)</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                <Input id="price" type="number" inputMode="decimal" step="0.01" min="0" placeholder="199" className="pl-7 tabular" {...err("price")} {...register("price", { valueAsNumber: true })} />
              </div>
              <FieldError id="price-error" message={errors.price?.message} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" inputMode="numeric" min="0" step="1" placeholder="25" className="tabular" {...err("stock")} {...register("stock", { valueAsNumber: true })} />
              <FieldError id="stock-error" message={errors.stock?.message} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="releaseDate">Release date</Label>
              <Input id="releaseDate" type="date" {...err("releaseDate")} {...register("releaseDate")} />
              <FieldError id="releaseDate-error" message={errors.releaseDate?.message} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="image">Image URL <span className="font-normal text-muted-foreground">(optional)</span></Label>
            <Input id="image" type="url" placeholder="https://…" {...err("image")} {...register("image")} />
            {errors.image ? (
              <FieldError id="image-error" message={errors.image.message} />
            ) : (
              <FieldHint>Leave blank to use the category artwork.</FieldHint>
            )}
          </div>
        </fieldset>

        <fieldset className="rounded-xl border bg-surface p-5 sm:p-7">
          <legend className="sr-only">Specifications</legend>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold">Specifications</h2>
              <p className="mt-1 text-sm text-muted-foreground">Shown as a table on the product page.</p>
            </div>
            <Button type="button" variant="secondary" size="sm" onClick={() => append({ label: "", value: "" })} disabled={fields.length >= 10}>
              <Plus /> Add row
            </Button>
          </div>
          <ul className="mt-5 space-y-3">
            {fields.map((f, i) => (
              <li key={f.id} className="grid grid-cols-[1fr_1.3fr_auto] items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="space-y-1">
                  <Input placeholder="e.g. Battery" aria-label={`Specification ${i + 1} name`} aria-invalid={!!errors.specs?.[i]?.label} {...register(`specs.${i}.label`)} />
                  <FieldError message={errors.specs?.[i]?.label?.message} />
                </div>
                <div className="space-y-1">
                  <Input placeholder="e.g. 30 hours" aria-label={`Specification ${i + 1} value`} aria-invalid={!!errors.specs?.[i]?.value} {...register(`specs.${i}.value`)} />
                  <FieldError message={errors.specs?.[i]?.value?.message} />
                </div>
                <Button type="button" variant="ghost" size="icon" aria-label={`Remove specification ${i + 1}`} onClick={() => remove(i)}>
                  <X />
                </Button>
              </li>
            ))}
          </ul>
          {fields.length === 0 && <p className="mt-4 text-sm text-muted-foreground">No specifications yet. Add a row to list one.</p>}
        </fieldset>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Link href="/items/manage" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Cancel
          </Link>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className="animate-spin" />}
            {isSubmitting ? "Adding product…" : "Add product"}
          </Button>
        </div>
      </form>

      <aside className="lg:sticky lg:top-24 lg:self-start">
        <h2 className="text-sm font-semibold text-muted-foreground">Card preview</h2>
        <div className="pointer-events-none mt-3" aria-hidden>
          <ProductCard
            key={watched.image || "no-image"}
            product={{
              id: "preview",
              title: watched.title || "Product title",
              brand: watched.brand || "",
              category: (watched.category as Category) || "Audio",
              shortDescription: watched.shortDescription || "Your short description appears here, clipped to two lines.",
              description: "",
              price: Number.isFinite(watched.price) ? (watched.price as number) : 0,
              rating: 0,
              reviews: 0,
              stock: 0,
              releaseDate: watched.releaseDate || "",
              image: watched.image && /^https?:\/\//.test(watched.image) ? watched.image : undefined,
              specs: [],
            }}
          />
        </div>
      </aside>
    </div>
  );
}
