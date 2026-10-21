"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useProducts } from "@/context/ProductsContext";
import { CATEGORIES } from "@/lib/products";
import { formatDate } from "@/lib/utils";

const INITIAL = {
  title: "",
  shortDescription: "",
  description: "",
  price: "",
  category: CATEGORIES[0].name,
  brand: "",
  stock: "",
  image: "",
};

function validate(values) {
  const errors = {};
  if (values.title.trim().length < 3) errors.title = "Enter a title with at least 3 characters.";
  else if (values.title.trim().length > 80) errors.title = "Keep the title under 80 characters.";

  const short = values.shortDescription.trim();
  if (short.length < 10) errors.shortDescription = "Write at least 10 characters.";
  else if (short.length > 120) errors.shortDescription = "Keep it under 120 characters so it fits on a card.";

  if (values.description.trim().length < 30) errors.description = "Describe the product in at least 30 characters.";

  if (values.price === "" || Number.isNaN(Number(values.price))) errors.price = "Enter a price.";
  else if (Number(values.price) <= 0) errors.price = "Price must be greater than 0.";
  else if (Number(values.price) > 100000) errors.price = "Price looks too high. Check the amount.";

  if (!values.category) errors.category = "Choose a category.";

  if (values.stock !== "") {
    const n = Number(values.stock);
    if (!Number.isInteger(n) || n < 0) errors.stock = "Stock must be a whole number, 0 or more.";
  }

  if (values.image.trim()) {
    try {
      const url = new URL(values.image.trim());
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("bad protocol");
    } catch {
      errors.image = "Enter a full image URL starting with https://";
    }
  }
  return errors;
}

function Field({ label, htmlFor, error, hint, optional, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="field-label">
        {label}
        {optional && <span className="ml-1.5 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="field-error" role="alert">
          {error}
        </p>
      ) : (
        hint && <p className="field-hint">{hint}</p>
      )}
    </div>
  );
}

export default function AddProductForm() {
  const { addProduct } = useProducts();
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [created, setCreated] = useState(null);

  const errors = validate(values);
  const showError = (name) => (touched[name] ? errors[name] : undefined);

  const inputProps = (name) => ({
    id: name,
    name,
    value: values[name],
    onChange: (e) => setValues((v) => ({ ...v, [name]: e.target.value })),
    onBlur: () => setTouched((t) => ({ ...t, [name]: true })),
    "aria-invalid": Boolean(showError(name)),
    "aria-describedby": showError(name) ? `${name}-error` : undefined,
    className: "field-input",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(INITIAL).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (Object.keys(errors).length > 0) {
      toast.error("Fix the highlighted fields and try again.");
      const first = Object.keys(INITIAL).find((key) => errors[key]);
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500)); // small delay to show the loading state

    const product = addProduct({
      title: values.title.trim(),
      shortDescription: values.shortDescription.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      category: values.category,
      brand: values.brand.trim() || "DevGear",
      stock: values.stock === "" ? 10 : Number(values.stock),
      image: values.image.trim(),
      specs: [
        { label: "Category", value: values.category },
        { label: "Brand", value: values.brand.trim() || "DevGear" },
        { label: "Listed on", value: formatDate(new Date()) },
      ],
    });

    setSubmitting(false);
    setCreated(product);
    setValues(INITIAL);
    setTouched({});
    toast.success(`"${product.title}" was added to the store.`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handleSubmit} noValidate className="surface space-y-6 p-6 sm:p-8">
        <Field label="Title" htmlFor="title" error={showError("title")}>
          <input {...inputProps("title")} type="text" placeholder="e.g. Tactile 75 Mechanical Keyboard" maxLength={80} />
        </Field>

        <Field
          label="Short description"
          htmlFor="shortDescription"
          error={showError("shortDescription")}
          hint={`${values.shortDescription.trim().length}/120. Shown on product cards.`}
        >
          <input {...inputProps("shortDescription")} type="text" placeholder="One or two lines that sell the product" />
        </Field>

        <Field label="Full description" htmlFor="description" error={showError("description")}>
          <textarea {...inputProps("description")} rows={6} placeholder="Describe what it does, who it suits and what makes it different." />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Price (USD)" htmlFor="price" error={showError("price")}>
            <input {...inputProps("price")} type="number" inputMode="decimal" min="0" step="0.01" placeholder="99.00" />
          </Field>
          <Field label="Category" htmlFor="category" error={showError("category")}>
            <select {...inputProps("category")}>
              {CATEGORIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Brand" htmlFor="brand" optional>
            <input {...inputProps("brand")} type="text" placeholder="e.g. Keywright" />
          </Field>
          <Field label="Stock" htmlFor="stock" error={showError("stock")} optional hint="Defaults to 10 if left empty.">
            <input {...inputProps("stock")} type="number" inputMode="numeric" min="0" step="1" placeholder="25" />
          </Field>
        </div>

        <Field
          label="Image URL"
          htmlFor="image"
          error={showError("image")}
          optional
          hint="Without an image, we show an illustration for the category."
        >
          <input {...inputProps("image")} type="url" placeholder="https://example.com/product.jpg" />
        </Field>

        <div className="flex flex-wrap items-center gap-3 border-t border-line pt-6">
          <button type="submit" disabled={submitting} className="btn btn-primary btn-lg">
            {submitting && <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />}
            {submitting ? "Adding product" : "Add product"}
          </button>
          <Link href="/items/manage" className="btn btn-outline btn-lg">
            Manage products
          </Link>
        </div>
      </form>

      <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
        {created ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5" role="status">
            <div className="flex items-center gap-2 text-emerald-800">
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              <h2 className="font-display text-lg font-semibold">Product added</h2>
            </div>
            <p className="mt-2 text-sm text-emerald-900">
              <span className="font-semibold">{created.title}</span> is now live in the store.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={`/items/${created.id}`} className="btn btn-dark px-3 py-2">
                View product
              </Link>
              <button type="button" className="btn btn-outline px-3 py-2" onClick={() => setCreated(null)}>
                Add another
              </button>
            </div>
          </div>
        ) : (
          <div className="surface p-5">
            <h2 className="font-display text-lg font-semibold">Tips for a good listing</h2>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
              <li>Lead the title with the product name, then the key feature.</li>
              <li>Keep the short description to one or two lines so cards stay even.</li>
              <li>Use a square image for the cleanest result on cards.</li>
            </ul>
          </div>
        )}
      </aside>
    </div>
  );
}
