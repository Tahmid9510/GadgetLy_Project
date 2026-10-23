"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { authErrorMessage, useAuth } from "@/context/auth-context";

export function AuthShell({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const { configured } = useAuth();
  return (
    <div className="mx-auto w-full max-w-md px-4 py-14 sm:py-20">
      <div className="rounded-2xl border bg-surface p-6 shadow-[0_24px_50px_-30px_rgb(14_50_70/0.45)] sm:p-8">
        <LogoMark className="size-10" />
        <h1 className="mt-6 font-wide text-2xl font-bold tracking-tight">{title}</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
        {!configured && (
          <p role="status" className="mt-5 rounded-lg border border-signal/40 bg-signal-soft px-3.5 py-3 text-[13px] leading-relaxed text-foreground">
            Firebase keys are missing, so sign-in is turned off. Copy <code className="font-semibold">.env.example</code> to{" "}
            <code className="font-semibold">.env.local</code>, add your project&apos;s keys and restart the server.
          </p>
        )}
        <div className="mt-6">{children}</div>
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[18px]">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6H1.3a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}

export function GoogleButton({ onSuccess, disabled }: { onSuccess: () => void; disabled?: boolean }) {
  const { loginWithGoogle } = useAuth();
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    setPending(true);
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google");
      onSuccess();
    } catch (err) {
      toast.error(authErrorMessage(err));
    } finally {
      setPending(false);
    }
  };

  return (
    <Button type="button" variant="secondary" className="h-11 w-full" onClick={handleClick} disabled={disabled || pending}>
      {pending ? <LoaderCircle className="animate-spin" /> : <GoogleGlyph />}
      Continue with Google
    </Button>
  );
}

export function OrDivider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs font-medium text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      or use your email
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
