"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Eye, PackagePlus, RotateCcw, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import ProductArt from "@/components/ProductArt";
import { useProducts } from "@/context/ProductsContext";
import { formatDate, formatPrice } from "@/lib/utils";

function ConfirmDialog({ product, onCancel, onConfirm }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    cancelRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/50" onClick={onCancel} aria-hidden="true" />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-desc"
        className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <h2 id="confirm-title" className="text-xl font-semibold">
          Delete this product?
        </h2>
        <p id="confirm-desc" className="mt-2 text-sm leading-relaxed text-muted">
          <span className="font-semibold text-ink">{product.title}</span> will be removed from the store. You can
          restore the demo products with &ldquo;Reset demo data&rdquo;, but anything you added yourself cannot be
          recovered.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button ref={cancelRef} type="button" onClick={onCancel} className="btn btn-outline">
            Keep product
          </button>
          <button type="button" onClick={onConfirm} className="btn btn-danger">
            Delete product
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManageProducts() {
  const { products, deleteProduct, resetProducts } = useProducts();
  const [pendingDelete, setPendingDelete] = useState(null);

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteProduct(pendingDelete.id);
    toast.success(`"${pendingDelete.title}" was deleted.`);
    setPendingDelete(null);
  };

  const handleReset = () => {
    resetProducts();
    toast.success("Demo products restored.");
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          <span className="font-semibold text-ink">{products.length}</span> products in the store
        </p>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleReset} className="btn btn-outline">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset demo data
          </button>
          <Link href="/items/add" className="btn btn-primary">
            <PackagePlus className="h-4 w-4" aria-hidden="true" />
            Add product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="surface px-6 py-16 text-center">
          <h2 className="text-xl font-semibold">Your store has no products</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Add your first product, or restore the demo catalogue to get started.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link href="/items/add" className="btn btn-primary">
              Add product
            </Link>
            <button type="button" onClick={handleReset} className="btn btn-outline">
              Reset demo data
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Table: tablet and up */}
          <div className="surface hidden overflow-hidden md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-slate-50 text-muted">
                <tr>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Product</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Category</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Price</th>
                  <th scope="col" className="px-5 py-3.5 font-semibold">Stock</th>
                  <th scope="col" className="hidden px-5 py-3.5 font-semibold lg:table-cell">Added</th>
                  <th scope="col" className="px-5 py-3.5 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {products.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-4">
                        <ProductArt product={p} className="h-12 w-12 shrink-0 rounded-lg" iconClassName="h-6 w-6" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold">{p.title}</p>
                          <p className="truncate text-xs text-muted">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-700">{p.category}</td>
                    <td className="px-5 py-4 font-semibold">{formatPrice(p.price)}</td>
                    <td className="px-5 py-4 text-slate-700">{p.stock}</td>
                    <td className="hidden px-5 py-4 text-slate-700 lg:table-cell">{formatDate(p.createdAt)}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/items/${p.id}`} className="btn btn-outline px-3 py-2" aria-label={`View ${p.title}`}>
                          <Eye className="h-4 w-4" aria-hidden="true" />
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => setPendingDelete(p)}
                          className="btn border border-red-200 bg-white px-3 py-2 text-red-600 hover:bg-red-50"
                          aria-label={`Delete ${p.title}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards: mobile */}
          <ul className="space-y-4 md:hidden">
            {products.map((p) => (
              <li key={p.id} className="surface p-4">
                <div className="flex gap-4">
                  <ProductArt product={p} className="h-20 w-20 shrink-0 rounded-lg" iconClassName="h-9 w-9" />
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">{p.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {p.category} &middot; {p.stock} in stock
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold">{formatPrice(p.price)}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link href={`/items/${p.id}`} className="btn btn-outline">
                    <Eye className="h-4 w-4" aria-hidden="true" />
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => setPendingDelete(p)}
                    className="btn border border-red-200 bg-white text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {pendingDelete && (
        <ConfirmDialog product={pendingDelete} onCancel={() => setPendingDelete(null)} onConfirm={confirmDelete} />
      )}
    </div>
  );
}
