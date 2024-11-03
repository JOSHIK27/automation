"use client";

import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import Benifits from "@/components/benifits";
import Faqs from "@/components/faqs";
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benifits />
      <Pricing />
      <Faqs />
      <Footer />
    </>
  );
}
