"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
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
import { useRouter } from "next/navigation";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="p-3 hidden sm:block bg-white/90 backdrop-blur-xl border border-gray-100/20 shadow-lg mx-auto rounded-2xl fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[70%] max-w-6xl">
        <div className="flex justify-between items-center px-4">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <div className="flex items-center">
                  <img src={logo.src} alt="logo" className="h-8 w-8 mr-3" />
                  <span className="font-semibold text-gray-800 text-lg">
                    Creator Stream
                  </span>
                </div>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList className="space-x-2">
            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() =>
                  window.scrollTo({ top: 1400, behavior: "smooth" })
                }
                className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 flex items-center gap-2 px-5 py-2 rounded-xl hover:bg-gray-50/80`}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                onClick={() => router.push("/workflow-history")}
                className={`${navigationMenuTriggerStyle()} cursor-pointer text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 flex items-center gap-2 px-5 py-2 rounded-xl hover:bg-gray-50/80`}
              >
                History
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                  Sign In
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed top-0 left-0 w-full z-50">
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100/20 shadow-sm p-4">
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
            className={`mt-4 space-y-2 transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
          >
            <div
              onClick={() => {
                window.scrollTo({ top: 1400, behavior: "smooth" });
                setIsMobileMenuOpen(false);
              }}
              className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl cursor-pointer font-medium transition-all duration-300"
            >
              Pricing
            </div>
            <Link href="/docs">
              <div className="block px-4 py-3 text-white bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 rounded-xl text-center font-medium transition-all duration-300 shadow-md">
                Sign In
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
