import { products } from "@wix/stores";
import { Button, ButtonProps } from "./button";
import { addToCart } from "@/wix-api/cart";
import { wixBrowserClient } from "@/lib/wix-client.browser";
import LoadingButton from "../LoadingButton";
import { useAddItemToCart } from "@/hooks/cart";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
  quantity: number;
}

export default function AddToCartButton({
  product,
  selectedOptions,
  quantity,
  className,
  ...props
}: AddToCartButtonProps) {
  const mutation = useAddItemToCart();
  return (
    <LoadingButton
      onClick={() =>
        mutation.mutate({
          product,
          selectedOptions,
          quantity,
        })
      }
      loading={mutation.isPending}
      className={cn("flex gap-3", className)}
      {...props}
    >
      <ShoppingCart />
      Add to cart
    </LoadingButton>
  );
}
