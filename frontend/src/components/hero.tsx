"use client";

import { RainbowButton } from "@/components/ui/rainbow-button";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import AnimatedShinyText from "./ui/animated-shiny-text";
import { BsLightningChargeFill } from "react-icons/bs";
import { FadeText } from "./ui/fade-text";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAddUserMutation } from "@/hooks/mutations/useAddUserMutation";
import { setSessionToken } from "@/app/store/slices/session-token-slice";
import { useDispatch } from "react-redux";

export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex items-center justify-center mb-6 animate-fade-in">
      <div
        className={cn(
          "group rounded-full border border-black/10 bg-teal-50/80 text-base text-white backdrop-blur-sm transition-all duration-300 ease-in hover:cursor-pointer hover:bg-teal-50/90 hover:scale-105 hover:shadow-lg dark:border-white/5 dark:bg-neutral-900/80 dark:hover:bg-neutral-800/90"
        )}
      >
        <AnimatedShinyText className="inline-flex items-center w-fit justify-center px-6 py-2 text-sm font-medium transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <BsLightningChargeFill className="inline mr-2 text-teal-600" />
          Supercharge Your Workflow
        </AnimatedShinyText>
      </div>
    </div>
  );
}

export default function Hero({
  session,
  sessionToken,
}: {
  session: any;
  sessionToken: string;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const addUserMutation = useAddUserMutation(session);

  useEffect(() => {
    if (session) {
      addUserMutation.mutate();
      dispatch(setSessionToken(sessionToken));
    }
  }, [session]);

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center justify-center overflow-hidden bg-background px-4 sm:px-6 lg:px-8 mt-20 sm:mt-12">
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedShinyTextDemo />
        <div className="flex justify-center mb-4">
          <FadeText
            className="tracking-tighter text-[4rem] sm:text-[72px] lg:text-[86px] z-20 font-semibold leading-[1.15] text-center bg-gradient-to-b from-neutral-900 to-neutral-600 bg-clip-text text-transparent"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.1 } },
            }}
            text={session ? "Welcome Back to" : "Automate Your"}
          />
        </div>

        <div className="flex items-center justify-center">
          <FadeText
            className="tracking-tighter text-[4rem] sm:text-[72px] lg:text-[86px] z-20 font-semibold leading-[64px] text-center bg-gradient-to-r from-teal-500 to-teal-700 bg-clip-text text-transparent"
            direction="up"
            framerProps={{
              show: { transition: { delay: 0.3 } },
            }}
            text={session ? "Creator Stream" : "Content Creation"}
          />
        </div>

        <h3 className="text-xl sm:text-2xl z-20 font-medium mt-8 mx-auto max-w-2xl text-center text-neutral-600 dark:text-neutral-400 animate-fade-in">
          Focus on creating, not managing. Streamline your workflow and{" "}
          <span className="text-teal-600 rounded-none font-semibold">
            boost productivity by 10x
          </span>
          .
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 z-20">
          <Button
            className="z-20 px-8 py-6 text-lg font-medium bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 transition-all duration-300 w-full sm:w-auto shadow-md hover:shadow-xl hover:scale-105"
            onClick={() => router.push("/build-workflow")}
          >
            Get Started for Free
          </Button>
          {!session && (
            <RainbowButton
              className={`${cn(
                buttonVariants({
                  variant: "rainbow-outline",
                })
              )} z-20 px-8 py-6 text-lg font-medium w-full sm:w-auto`}
              onClick={() => signIn()}
            >
              Sign In
            </RainbowButton>
          )}
        </div>
      </div>

      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={2}
        repeatDelay={0.5}
        className={cn(
          "[mask-image:radial-gradient(800px_circle_at_center,white,transparent)]",
          "absolute inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    </section>
  );
}
