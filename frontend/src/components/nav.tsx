"use client";
import React, { useState } from "react";
import Link from "next/link";
import logo from "../../public/images/cs.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WorkflowNav from "@/components/workflownav";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const pathname = usePathname();
  const isWorkflowPage =
    pathname.startsWith("/build-workflow") ||
    pathname.startsWith("/workflow-history") ||
    pathname.startsWith("/workflow");

  if (isWorkflowPage) {
    return <WorkflowNav />;
  }

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="p-4 hidden sm:block bg-white/95 backdrop-blur-xl border border-gray-200/30 shadow-xl mx-auto rounded-2xl fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[70%] max-w-6xl bg-gradient-to-b from-white/95 to-gray-50/95">
        <div className="flex justify-between items-center px-6">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" className="group">
                <div className="flex items-center transition-transform duration-300 hover:scale-105">
                  <img
                    src={logo.src}
                    alt="logo"
                    className="h-10 w-10 mr-4 drop-shadow-sm"
                  />
                  <span className="font-bold text-xl text-gray-800">
                    CreatorStream
                  </span>
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className="space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => {
                  const pricingSection = document.getElementById("pricing");
                  pricingSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-gray-50/80 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => {
                  const faqsSection = document.getElementById("faqs");
                  faqsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-gray-50/80 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`}
              >
                FAQs
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => router.push("/workflow-history")}
                className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 flex items-center gap-2 px-5 py-2.5 rounded-xl hover:bg-gray-50/80 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-800 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300`}
              >
                History
              </NavigationMenuLink>
            </NavigationMenuItem>
            {session.data?.user && (
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <img
                      src={session.data?.user?.image ?? ""}
                      alt="Profile"
                      className="h-10 w-10 rounded-full border-2 border-gray-100 shadow-sm transition-transform duration-300 hover:scale-110"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/profile">
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="cursor-pointer">
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      Subscription
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="cursor-pointer"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </div>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed top-0 left-0 w-full z-50">
        <div className="bg-gradient-to-b from-white/95 to-gray-50/95 backdrop-blur-xl border-b border-gray-200/30 shadow-md p-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center">
                <img src={logo.src} alt="logo" className="h-8 w-8 mr-3" />
                <h1 className="text-lg font-semibold text-gray-800">
                  Creator Stream
                </h1>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 p-2.5 hover:bg-gray-100/80 rounded-xl transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <IoClose className="h-5 w-5" />
              ) : (
                <RxHamburgerMenu className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={` mt-4 space-y-2 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "hidden opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div
              onClick={() => {
                const pricingSection = document.getElementById("pricing");
                pricingSection?.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl cursor-pointer font-medium transition-all duration-300"
            >
              Pricing
            </div>

            <div
              onClick={() => (session.data?.user ? signOut() : signIn())}
              className="block px-4 py-3 text-white bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 rounded-xl text-center font-medium transition-all duration-300 shadow-md"
            >
              {session.data?.user ? "Sign Out" : "Sign In"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
