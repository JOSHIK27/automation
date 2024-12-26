"use client";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CTA() {
  const { data: session } = useSession();

  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative isolate overflow-hidden bg-gradient-to-br from-[#2E8B57] to-[#006D5B] px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Automate Your Content Workflow?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-200">
              Join creators who are saving hours every week with our AI-powered
              automation platform. Start building your custom workflows today.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!session ? (
                <Link href="/api/auth/signin">
                  <Button
                    className="rounded-full px-8 py-6 bg-white text-[#2E8B57] hover:bg-teal-50 
                    shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.15)] 
                    transition-all duration-300 hover:scale-105 active:scale-95 font-medium"
                  >
                    Get Started for Free
                    <svg
                      className="w-5 h-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </Link>
              ) : (
                <Link href="/workflow">
                  <Button className="rounded-full px-8 py-6 bg-white text-teal-600 hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                    Go to Dashboard
                    <svg
                      className="w-5 h-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </Link>
              )}
              <Link
                href="#pricing"
                className="text-sm font-semibold leading-6 text-white relative after:absolute 
                  after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-white 
                  hover:after:w-full after:transition-all after:duration-300"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-[64px]">
            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-teal-400/40 to-teal-500/40" />
          </div>
          <div className="absolute -bottom-24 left-0 -z-10 transform-gpu blur-[64px]">
            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-teal-500/40 to-teal-400/40" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
