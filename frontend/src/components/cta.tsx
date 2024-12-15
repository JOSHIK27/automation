"use client";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CTA() {
  const { data: session } = useSession();

  return (
    <div className="relative isolate">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-24 text-center shadow-2xl rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Transform Your Workflow?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-100">
            Join thousands of businesses that are already saving time and money
            with our automation platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {!session ? (
              <Link href="/api/auth/signin">
                <Button className="rounded-full px-8 py-6 bg-white text-teal-600 hover:bg-gray-100">
                  Get Started for Free
                </Button>
              </Link>
            ) : (
              <Link href="/workflow">
                <Button className="rounded-full px-8 py-6 bg-white text-teal-600 hover:bg-gray-100">
                  Go to Dashboard
                </Button>
              </Link>
            )}
            <Link
              href="#pricing"
              className="text-sm font-semibold leading-6 text-white"
            >
              View Pricing <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Background blur effect */}
          <div
            className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl"
            aria-hidden="true"
          >
            <div className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-teal-400 to-teal-500 opacity-25"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
