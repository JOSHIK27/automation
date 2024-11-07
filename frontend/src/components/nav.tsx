"use client";
import React from "react";
import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
import { auth } from "../../auth";
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

export function Nav() {
  // const session = await auth();

  return (
    <NavigationMenu className="p-3 bg-white shadow-sm border mx-auto rounded-xl fixed top-2 left-1/2 -translate-x-1/2 z-50 w-1/2">
      <div className="flex justify-between gap-20 items-center">
        <NavigationMenuList className="mr-60">
          <NavigationMenuItem className="mr-6">
            <Link href="/">
              <div className="flex items-center ml-2">
                <BsLightningChargeFill className="h-6 w-6 mr-2 text-teal-700" />
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

    // <nav className="bg-white shadow-sm border">
    //   <div className="container mx-auto px-4 py-3">
    //     <div className="flex justify-between items-center">
    //       <Link href="/" className="text-xl font-bold text-black">
    //         <BsLightningChargeFill className="text-2xl" />
    //       </Link>
    //       <div className="flex items-center">
    //         {session?.user?.image && (
    //           <img
    //             src={session?.user?.image ?? ""}
    //             alt="User Avatar"
    //             className="w-8 h-8 rounded-full"
    //           />
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </nav>
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
