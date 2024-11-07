"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { BsLightningChargeFill } from "react-icons/bs";
import { FadeText } from "./ui/fade-text";
import { useRouter } from "next/navigation";
export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex items-center justify-center mb-4">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-teal-50 text-base text-white transition-all ease-in hover:cursor-pointer dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span className="">
            <BsLightningChargeFill className="inline mr-2" />
            Supercharge Your Workflow
          </span>
        </AnimatedShinyText>
      </div>
    </div>
  );
}

export default function Hero() {
  const { data: session } = useSession();
  const router = useRouter();
  // if (!session) return null;

  return (
    <section className="relative overflow-hidden bg-background p-40">
      <AnimatedShinyTextDemo />
      <div className="flex items-center justify-center">
        <FadeText
          className="text-[72px] z-20 font-[600] leading-[72px] text-center bg-gradient-to-b from-black to-black/50 bg-clip-text text-transparent"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.1 } },
          }}
          text=" Automate your"
        />
      </div>
      <div className="flex items-center justify-center">
        <FadeText
          className="text-[72px] z-20 font-[600] leading-[72px] text-center text-teal"
          direction="up"
          framerProps={{
            show: { transition: { delay: 0.3 } },
          }}
          text="Content Creation"
        />
      </div>

      <h3 className="text-[20px] z-20 font-[400] mt-[16px] leading-[32px] text-center bg-gradient-to-b from-black/80 to-black/40 bg-clip-text text-transparent">
        Focus on creating content, not managing uploads
      </h3>
      <div className="flex justify-center gap-[16px] mt-[32px] z-20">
        {/* <RainbowButton
          className="z-20 px-12 py-4 bg-teal"
          onClick={() => router.push("/workflow")}
        >
          Get Started
        </RainbowButton> */}
        <Button
          className="z-20 px-12 py-4 bg-teal text-white hover:bg-teal/80"
          onClick={() => router.push("/workflow")}
        >
          Get Started
        </Button>
        {session ? (
          <RainbowButton
            className={`${cn(
              buttonVariants({
                variant: "rainbow-outline",
              })
            )} z-20 px-16 py-4`}
            onClick={() => signOut()}
          >
            Sign Out
          </RainbowButton>
        ) : (
          <RainbowButton
            className={`${cn(
              buttonVariants({
                variant: "rainbow-outline",
              })
            )} z-20 px-16 py-4`}
            onClick={() => signIn()}
          >
            Sign In
          </RainbowButton>
        )}
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={1}
        repeatDelay={1}
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </section>
  );
}
