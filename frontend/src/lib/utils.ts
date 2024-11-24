import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BiCaptions } from "react-icons/bi";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const iconsMap = {
//   "Generate Captions": () => <BiCaptions />,
// };
