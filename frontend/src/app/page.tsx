import Hero from "@/components/hero";
import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import Benifits from "@/components/benifits";
import Faqs from "@/components/faqs";
import { auth } from "../../auth";
import CTA from "@/components/cta";
import HIWS from "@/components/htw";
import { HeroVideoDialogDemoTopInBottomOut } from "@/components/ui/videoDialog";
import { cookies } from "next/headers";
import { sessionTokenName } from "@/lib/constants/common";

export default async function Home() {
  const session = await auth();
  const cookieStore = await cookies();
  const sessionToken = cookieStore
    .getAll()
    .find((c) => c.name === sessionTokenName);

  return (
    <>
      <Hero session={session} sessionToken={sessionToken?.value ?? ""} />
      <HeroVideoDialogDemoTopInBottomOut />
      <HIWS />
      <Benifits />
      <Pricing session={session} />
      <Faqs />
      <CTA />
      <Footer />
    </>
  );
}
