"use client";

import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth-context";
import { ProductsProvider } from "@/context/products-context";
import { ThemeProvider, useTheme } from "@/context/theme-context";

function ThemedToaster() {
  const { theme } = useTheme();
  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      closeButton
      toastOptions={{
        classNames: {
          toast: "!rounded-lg !border !border-border !bg-surface !text-foreground !font-sans",
          description: "!text-muted-foreground",
        },
      }}
    />
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductsProvider>
          {children}
          <ThemedToaster />
        </ProductsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
