"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";
import { toast } from "sonner";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function CheckoutBtn({
  price,
  quantity,
  productName,
}: {
  price: number;
  quantity: number;
  productName: string;
}) {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ price, quantity, productName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (!data.sessionId) {
        throw new Error("No session ID returned from server");
      }

      const result = await stripe?.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (result?.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      toast.error("Error during checkout");
    }
  };
  return (
    <Button
      className="w-full bg-gray-100 text-black hover:bg-white/80 rounded-full py-4"
      onClick={handleCheckout}
    >
      Purchase
    </Button>
  );
}
