"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Button } from "./ui/button";
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
      const data = await response.json();
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  return (
    <Button className="w-full rounded-full py-4" onClick={handleCheckout}>
      Purchase
    </Button>
  );
}
