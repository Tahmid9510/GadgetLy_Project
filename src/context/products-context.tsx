"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { SEED_PRODUCTS, type Product } from "@/lib/products";

/**
 * Products = seed catalogue (static) + products people add (localStorage),
 * minus any seed products that were deleted (their ids are kept in localStorage).
 */

const ADDED_KEY = "gadgetly:added-products";
const HIDDEN_KEY = "gadgetly:hidden-seed-ids";

type StoreState = { added: Product[]; hidden: string[] };

const EMPTY: StoreState = { added: [], hidden: [] };
let cache: StoreState | null = null;
const listeners = new Set<() => void>();

function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function getSnapshot(): StoreState {
  if (!cache) {
    cache = {
      added: readJSON<Product[]>(ADDED_KEY, []),
      hidden: readJSON<string[]>(HIDDEN_KEY, []),
    };
  }
  return cache;
}

function getServerSnapshot(): StoreState {
  return EMPTY;
}

function setState(next: StoreState) {
  cache = next;
  try {
    window.localStorage.setItem(ADDED_KEY, JSON.stringify(next.added));
    window.localStorage.setItem(HIDDEN_KEY, JSON.stringify(next.hidden));
  } catch {
    // Storage full or blocked: keep the in-memory change for this session.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === ADDED_KEY || e.key === HIDDEN_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

const subscribeHydration = () => () => {};

type ProductsContextValue = {
  products: Product[];
  /** False during server render / first paint, before localStorage is read */
  ready: boolean;
  getProduct: (id: string) => Product | undefined;
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Product;
  deleteProduct: (id: string) => void;
  /** Number of catalogue (seed) products that have been deleted */
  hiddenCount: number;
  /** Bring back deleted catalogue products */
  restoreCatalogue: () => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );

  const products = useMemo(() => {
    const seed = SEED_PRODUCTS.filter((p) => !state.hidden.includes(p.id));
    // Newest additions first, then the catalogue.
    return [...state.added, ...seed];
  }, [state]);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  );

  const addProduct = useCallback(
    (input: Omit<Product, "id" | "createdAt">) => {
      const current = getSnapshot();
      const product: Product = {
        ...input,
        id: `${slugify(input.title) || "product"}-${Date.now().toString(36)}`,
        createdAt: new Date().toISOString(),
      };
      setState({ ...current, added: [product, ...current.added] });
      return product;
    },
    [],
  );

  const deleteProduct = useCallback((id: string) => {
    const current = getSnapshot();
    const isAdded = current.added.some((p) => p.id === id);
    setState(
      isAdded
        ? { ...current, added: current.added.filter((p) => p.id !== id) }
        : { ...current, hidden: [...new Set([...current.hidden, id])] },
    );
  }, []);

  const restoreCatalogue = useCallback(() => {
    setState({ ...getSnapshot(), hidden: [] });
  }, []);

  const value = useMemo(
    () => ({
      products,
      ready,
      hiddenCount: state.hidden.length,
      getProduct,
      addProduct,
      deleteProduct,
      restoreCatalogue,
    }),
    [products, ready, state.hidden.length, getProduct, addProduct, deleteProduct, restoreCatalogue],
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>");
  return ctx;
}
