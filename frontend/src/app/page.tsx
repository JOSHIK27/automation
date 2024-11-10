import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import Benifits from "@/components/benifits";
import Faqs from "@/components/faqs";
import { auth } from "../../auth";
import CTA from "@/components/cta";
export default async function Home() {
  const session = await auth();
  console.log(session?.user);
  const resp = await fetch("http://localhost:8000/user", {
    method: "POST",
    body: JSON.stringify({
      name: session?.user?.name,
      email: session?.user?.email,
      image: session?.user?.image,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <>
      <Hero />
      <HowItWorks />
      <Benifits />
      <Pricing session={session} />
      <Faqs />
      <CTA />
      <Footer />
    </>
  );
}
