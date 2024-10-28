"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();
  return (
    <section className="relative overflow-hidden bg-background p-40">
      <h1 className="text-[72px] z-20 font-[600] leading-[72px] text-center bg-gradient-to-b from-black to-black/50 bg-clip-text text-transparent">
        Automate your <br /> Content Creation
      </h1>
      <h3 className="text-[20px] z-20 font-[400] mt-[16px] leading-[32px] text-center bg-gradient-to-b from-black/80 to-black/40 bg-clip-text text-transparent">
        Create content that converts & drives sales
      </h3>
      <div className="flex justify-center gap-[16px] mt-[32px] z-20">
        <RainbowButton className="z-20 px-12 py-4">Get Started</RainbowButton>
        <RainbowButton
          className={`${cn(
            buttonVariants({
              variant: "rainbow-outline",
            })
          )} z-20 px-16 py-4`}
        >
          {session ? "Sign Out" : "Sign In"}
        </RainbowButton>
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
