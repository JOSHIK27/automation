import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer>
      <Separator className="w-full my-4" />
      <div className="text-center text-sm text-muted-foreground pb-8">
        © {new Date().getFullYear()} Automation. All rights reserved.
      </div>
    </footer>
  );
}
