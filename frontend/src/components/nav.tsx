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

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <NavigationMenu className="p-4 hidden sm:block bg-white/80 backdrop-blur-md shadow-lg border-0 mx-auto rounded-2xl fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <div className="flex justify-between items-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/">
                <div className="flex items-center">
                  <img src={logo.src} alt="logo" className="h-8 w-8 mr-2" />
                  <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                    Creator Stream
                  </h1>
                </div>
              </Link>
            </NavigationMenuItem>

            {/* <NavigationMenuItem className="ml-10">
              <NavigationMenuLink
                onClick={() => {
                  window.scrollTo({
                    top: 1400,
                    behavior: "smooth",
                  });
                }}
                className={`${navigationMenuTriggerStyle()} text-gray-600 hover:text-gray-900 font-medium cursor-pointer transition-colors`}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem> */}
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-2.5 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition-all duration-200 shadow-sm hover:shadow-md">
                  Sign In
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>

      {/* Mobile Navigation */}
      <div className="sm:hidden fixed top-0 left-0 w-full z-50">
        <div className="bg-white/80 backdrop-blur-md shadow-lg p-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center">
                <img src={logo.src} alt="logo" className="h-7 w-7 mr-2" />
                <h1 className="text-lg font-semibold tracking-tight text-gray-900">
                  Creator Stream
                </h1>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <IoClose className="h-5 w-5" />
              ) : (
                <RxHamburgerMenu className="h-5 w-5" />
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-4 space-y-2">
              <div
                onClick={() => {
                  window.scrollTo({
                    top: 1400,
                    behavior: "smooth",
                  });
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg cursor-pointer font-medium transition-colors"
              >
                Pricing
              </div>
              <Link href="/docs">
                <div className="block px-4 py-2.5 text-white bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 rounded-lg text-center font-medium shadow-sm transition-all duration-200">
                  Sign In
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
