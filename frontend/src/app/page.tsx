import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import Benifits from "@/components/benifits";
import Faqs from "@/components/faqs";
import { auth } from "../../auth";
import CTA from "@/components/cta";
import HIWS from "@/components/htw";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Hero session={session} />
      <HIWS />
      <Benifits />
      <Pricing session={session} />
      <Faqs />
      <CTA />
      <Footer />
    </>
  );
}
