import { Separator } from "@/components/ui/separator";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-20 px-4 sm:px-60">
      <Separator className="w-full mt-4 mb-6" />
      <span className="text-sm text-muted-foreground pb-8">Follow Us</span>
      <div className="flex items-center gap-4 mt-2 mb-4">
        <FaXTwitter className="text-2xl" />
        <FaLinkedin className="text-2xl" />
        <FaGithub className="text-2xl" />
      </div>
      <div className="text-sm text-muted-foreground pb-8 mt-20">
        © {new Date().getFullYear()} Creator Stream. All rights reserved.
      </div>
    </footer>
  );
}
