import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { AuthFormSkeleton } from "@/components/auth/auth-skeleton";

export const metadata: Metadata = { title: "Register" };

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthFormSkeleton fields={4} />}>
      <RegisterForm />
    </Suspense>
  );
}
