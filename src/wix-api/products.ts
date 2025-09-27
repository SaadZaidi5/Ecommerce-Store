import { getWixClient } from "@/lib/wix-client.base";
import { cache } from "react";

/**
 * Fetch all products (default limit 50)
 */
export async function getAllProducts(limit = 50) {
  const wixClient = getWixClient();

  try {
    const res = await wixClient.products.queryProducts().limit(limit).find();
    return res.items;
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

/**
 * Fetch a single product by slug
 */
export const getProductBySlug = cache(async (slug: string) => {
  console.log("getProductBySlug");
  const wixClient = getWixClient();

  const { items } = await wixClient.products
    .queryProducts()
    .eq("slug", slug)
    .limit(1)
    .find();
  const product = items[0];

  if (!product || !product.visible) {
    return null;
  }

  return product;
});
