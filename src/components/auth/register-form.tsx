"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { authErrorMessage, useAuth } from "@/context/auth-context";
import { zodResolver } from "@/lib/zod-resolver";
import { Button } from "@/components/ui/button";
import { FieldError, FieldHint, Input, Label } from "@/components/ui/form";
import { AuthShell, GoogleButton, OrDivider } from "./auth-shell";
import { PasswordInput, safeNext } from "./login-form";

const schema = z
  .object({
    name: z.string().trim().min(2, "Enter your name (at least 2 characters).").max(60, "Keep your name under 60 characters."),
    email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
    password: z
      .string()
      .min(6, "Use at least 6 characters.")
      .regex(/[A-Za-z]/, "Include at least one letter.")
      .regex(/\d/, "Include at least one number."),
    confirm: z.string().min(1, "Re-enter your password."),
  })
  .refine((v) => v.password === v.confirm, {
    path: ["confirm"],
    message: "Passwords don't match.",
  });

type Values = z.infer<typeof schema>;

export function RegisterForm() {
  const { register: createAccount, user, loading, configured } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const [justJoined, setJustJoined] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onTouched" });

  useEffect(() => {
    if (!loading && user && !justJoined) router.replace(next);
  }, [loading, user, justJoined, next, router]);

  const goNext = () => {
    setJustJoined(true);
    router.push(next);
  };

  const onSubmit = async ({ name, email, password }: Values) => {
    try {
      await createAccount(name, email, password);
      toast.success("Account created", { description: `Welcome to GadgetLy, ${name.split(" ")[0]}.` });
      goNext();
    } catch (err) {
      toast.error(authErrorMessage(err));
    }
  };

  const field = (name: keyof Values) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
    ...register(name),
  });

  return (
    <AuthShell
      title="Create your account"
      description="Register to add products and manage the catalogue."
      footer={
        <>
          Already have an account?{" "}
          <Link href={`/login${next !== "/" ? `?next=${encodeURIComponent(next)}` : ""}`} className="font-semibold text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <GoogleButton onSuccess={goNext} disabled={!configured} />
      <OrDivider />
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" autoComplete="name" placeholder="Ayesha Karim" {...field("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" {...field("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <PasswordInput id="password" autoComplete="new-password" {...field("password")} />
          {errors.password ? (
            <FieldError id="password-error" message={errors.password.message} />
          ) : (
            <FieldHint>At least 6 characters, with a letter and a number.</FieldHint>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <PasswordInput id="confirm" autoComplete="new-password" {...field("confirm")} />
          <FieldError id="confirm-error" message={errors.confirm?.message} />
        </div>
        <Button type="submit" className="h-11 w-full" disabled={isSubmitting || !configured}>
          {isSubmitting && <LoaderCircle className="animate-spin" />}
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}
