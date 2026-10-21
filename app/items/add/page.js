import ProtectedRoute from "@/components/ProtectedRoute";
import AddProductForm from "@/components/AddProductForm";

export const metadata = {
  title: "Add product",
};

export default function AddItemPage() {
  return (
    <ProtectedRoute>
      <div className="page-container py-12 sm:py-16">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tightest sm:text-5xl">Add a product</h1>
          <p className="mt-3 text-lg text-muted">New products appear in the store straight away.</p>
        </header>
        <AddProductForm />
      </div>
    </ProtectedRoute>
  );
}
