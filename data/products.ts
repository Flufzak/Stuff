export type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  /* 
  category:string;
  tags:string;
  */
};

export async function fetchProducts(): Promise<{ products: Product[] }> {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}
