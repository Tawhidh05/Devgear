import ProductDetails from "@/components/ProductDetails";
import { seedProducts } from "@/lib/products";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = seedProducts.find((p) => p.id === id);
  return {
    title: product ? product.title : "Product details",
    description: product ? product.shortDescription : "View product details on DevGear.",
  };
}

export default async function ItemDetailsPage({ params }) {
  const { id } = await params;
  return <ProductDetails id={decodeURIComponent(id)} />;
}
