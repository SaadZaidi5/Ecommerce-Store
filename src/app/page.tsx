/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import banner from "@/assets/banner.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { delay } from "@/lib/utils";
import { Suspense } from "react";
import Product from "@/components/Product";
import { Skeleton } from "@/components/ui/skeleton";
import { getProductsByCollection } from "@/wix-api/collections";
import { getWixServerClient } from "@/lib/wix-client.server";

// You can swap this ID with any collection (passed to getProductsByCollection)
const FEATURED_COLLECTION_ID = "9650a71d-f85b-4dd1-90f0-86be2bdf7a21";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl space-y-10 px-5 py-10">
      {/* --- Banner Section --- */}
      <div className="bg-secondary flex items-center md:h-96">
        <div className="space-y-7 p-10 text-center md:w-1/2">
          <h1 className="text-3xl font-bold md:text-4xl">
            Fill the void in your heart
          </h1>
          <p>
            Tough day? Credit card maxed out? Buy some expensive stuff and
            become happy again!
          </p>
          <Button asChild>
            <Link href="/shop">
              Shop Now <ArrowRight className="ml-2 size-5" />
            </Link>
          </Button>
        </div>

        {/* Banner image (desktop only) */}
        <div className="relative hidden h-full w-1/2 md:block">
          <Image
            src={banner}
            alt="Ecommerce Store"
            className="h-full object-cover"
            priority
          />
          <div className="from-secondary absolute inset-0 bg-gradient-to-r via-transparent to-transparent" />
        </div>
      </div>

      {/* --- Featured Products Section --- */}
      <Suspense fallback={<LoadingSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  );
}

// --- FEATURED PRODUCTS COMPONENT ---
async function FeaturedProducts() {
  await delay(500); // optional suspense fallback delay (for smoother UX)

  const wixClient = getWixServerClient();

  const featuredProducts = await getProductsByCollection(
    await wixClient,
    FEATURED_COLLECTION_ID,
  );

  if (!featuredProducts.length) {
    return <p>No featured products found.</p>;
  }

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Featured Products</h2>
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {featuredProducts.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

// --- SKELETON LOADER ---
function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-5 pt-12 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-[26rem] w-full" />
      ))}
    </div>
  );
}
