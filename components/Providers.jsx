"use client";

import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { ProductsProvider } from "@/context/ProductsContext";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ProductsProvider>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: { borderRadius: "10px", border: "1px solid #E3E7ED", color: "#0E1726", fontSize: "14px" },
          }}
        />
      </ProductsProvider>
    </AuthProvider>
  );
}
