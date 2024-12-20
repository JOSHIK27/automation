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
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16"
        >
          {/* Premium background effects */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-teal-500/10 backdrop-blur-[1px]" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to Transform Your Workflow?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-teal-50">
              Join thousands of content creators who are already saving time and
              boosting productivity with our automation platform.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!session ? (
                <Link href="/api/auth/signin">
                  <Button className="rounded-full px-8 py-6 bg-white text-teal-600 hover:bg-teal-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
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
                className="text-sm font-semibold leading-6 text-white hover:text-teal-100 transition-colors"
              >
                View Pricing <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Enhanced background effects */}
          <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl">
            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-teal-400 to-teal-500 opacity-25" />
          </div>
          <div className="absolute -bottom-24 left-0 -z-10 transform-gpu blur-3xl">
            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-teal-500 to-teal-400 opacity-25" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
