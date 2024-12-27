"use client";
import CheckoutBtn from "@/components/checkoutbtn";

export default function Checkout() {
  return (
    <div>
      <CheckoutBtn price={2000} quantity={1} productName="Creator Stream" />
    </div>
  );
}
