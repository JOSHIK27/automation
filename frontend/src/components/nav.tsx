"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
import logo from "../../public/images/cs.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <NavigationMenu className="p-3 hidden sm:block bg-white shadow-sm border mx-auto rounded-xl fixed top-2 left-1/2 -translate-x-1/2 z-50 w-1/2">
        <div className="flex justify-between gap-20 items-center">
          <NavigationMenuList className="mr-60">
            <NavigationMenuItem className="mr-6">
              <Link href="/">
                <div className="flex items-center ml-2">
                  {/* <BsLightningChargeFill className="h-6 w-6 mr-2 text-teal-700" /> */}
                  <img src={logo.src} alt="logo" className="h-10 w-10 mr-2" />
                  <h1 className="text-2xl font-bold pt-1">Automate</h1>
                </div>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem className="mt-1">
              <NavigationMenuLink
                onClick={() => {
                  window.scrollTo({
                    top: 1400,
                    behavior: "smooth",
                  });
                }}
                className={`${navigationMenuTriggerStyle()} hover:text-black cursor-pointer`}
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} bg-teal-700 rounded-full text-white px-4 py-2 mr-2 hover:bg-teal-800 hover:text-white`}
                >
                  Sign In
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </div>
      </NavigationMenu>
      <div className="sm:hidden fixed top-0 left-0 w-full z-50">
        <div className="bg-white shadow-sm border p-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="flex items-center">
                <BsLightningChargeFill className="h-6 w-6 mr-2 text-teal-700" />
                <h1 className="text-2xl font-bold pt-1">Automate</h1>
              </div>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600"
            >
              {isMobileMenuOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <RxHamburgerMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {isMobileMenuOpen && (
            <div className="mt-4 space-y-4">
              <div
                onClick={() => {
                  window.scrollTo({
                    top: 1400,
                    behavior: "smooth",
                  });
                  setIsMobileMenuOpen(false);
                }}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                Pricing
              </div>
              <Link href="/docs">
                <div className="block px-4 py-2 text-white bg-teal-700 hover:bg-teal-800 rounded-lg text-center">
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
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
