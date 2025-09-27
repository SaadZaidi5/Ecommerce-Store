/* eslint-disable @typescript-eslint/no-explicit-any */
import { getWixClient } from "@/lib/wix-client.base";

/**
 * Fetch products for a given collection
 * @param collectionId - Wix collection ID
 * @param limit - Max number of products (default: 50)
 */
export async function getProductsByCollection(
  collectionId: string,
  limit = 50,
) {
  const wixClient = getWixClient();

  try {
    const allProductsRes = await wixClient.products
      .queryProducts()
      .limit(limit)
      .find();

    // Filter products that belong to the given collection
    const products = allProductsRes.items.filter((p: any) =>
      p.collectionIds?.includes(collectionId),
    );

    return products;
  } catch (error) {
    console.error(
      `Error fetching products for collection ${collectionId}:`,
      error,
    );
    throw error;
  }
}
