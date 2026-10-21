import ProtectedRoute from "@/components/ProtectedRoute";
import ManageProducts from "@/components/ManageProducts";

export const metadata = {
  title: "Manage products",
};

export default function ManageItemsPage() {
  return (
    <ProtectedRoute>
      <div className="page-container py-12 sm:py-16">
        <header className="mb-8 max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tightest sm:text-5xl">Manage products</h1>
          <p className="mt-3 text-lg text-muted">View or delete anything in the catalogue.</p>
        </header>
        <ManageProducts />
      </div>
    </ProtectedRoute>
  );
}
