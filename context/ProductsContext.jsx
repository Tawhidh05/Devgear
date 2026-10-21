"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { seedProducts } from "@/lib/products";

const STORAGE_KEY = "devgear.products.v1";
const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  // Start with the seed data so the first (server) render already has content.
  const [products, setProducts] = useState(seedProducts);
  const [ready, setReady] = useState(false);

  // Load saved products (added/deleted by the user) from localStorage.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setProducts(parsed);
      }
    } catch {
      // Ignore corrupted storage and fall back to the seed data.
    }
    setReady(true);
  }, []);

  // Persist every change after the initial load.
  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Storage can be full or disabled; the app keeps working in memory.
    }
  }, [products, ready]);

  const addProduct = useCallback((data) => {
    const id = `u-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const product = {
      id,
      rating: 0,
      reviews: 0,
      featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
      ...data,
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  }, []);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const resetProducts = useCallback(() => {
    setProducts(seedProducts);
  }, []);

  const value = useMemo(
    () => ({ products, ready, addProduct, deleteProduct, resetProducts }),
    [products, ready, addProduct, deleteProduct, resetProducts]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>");
  return ctx;
}
