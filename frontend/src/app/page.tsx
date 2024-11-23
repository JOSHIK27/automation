import Hero from "@/components/hero";
import Footer from "@/components/footer";
import HowItWorks from "@/components/howitworks";
import Pricing from "@/components/pricing";
import Benifits from "@/components/benifits";
import Faqs from "@/components/faqs";
import { auth } from "../../auth";
import CTA from "@/components/cta";
import { cookies } from "next/headers";
import { sessionTokenName } from "@/lib/constants/common";

export default async function Home() {
  const session = await auth();
  const sessionToken = await getSessionToken();
  console.log(sessionToken);

  // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
  //   method: "POST",
  //   body: JSON.stringify(session?.user),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${sessionToken ?? "notsignedin"}`,
  //   },
  // });

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

async function getSessionToken() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore
    .getAll()
    .find((c) => c.name === sessionTokenName);
  return sessionToken?.value;
}
