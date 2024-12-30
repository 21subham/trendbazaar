import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <h1> hello world 123</h1>
      {/* render products*/}
      <Button>Click me</Button>
    </div>
  );
}
