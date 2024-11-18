import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { sessionTokenName } from "./constants/common";
import { cookies } from "next/headers";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
