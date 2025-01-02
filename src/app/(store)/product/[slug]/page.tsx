import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return <div></div>;
}

export default ProductPage;
