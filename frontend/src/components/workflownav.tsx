"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "../../public/images/cs.png";

export default function WorkflowNav() {
  const router = useRouter();
  const session = useSession();

  return (
    <NavigationMenu className="flex justify-between items-center w-auto max-w-screen-2xl mx-4 mt-2 rounded-xl shadow-md px-4 py-2">
      <NavigationMenuList className="flex-1">
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

      <NavigationMenuList className="flex items-center space-x-4">
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
    </NavigationMenu>
  );
}
