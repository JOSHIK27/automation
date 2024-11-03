import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="mt-20 flex flex-col items-center justify-center space-y-6">
      <div className="text-center space-y-4">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        <h1 className="text-3xl font-bold">Payment Successful!</h1>
        <p className="text-gray-600">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
      </div>

      <div className="flex flex-col">
        <Link href="/">
          <Button variant="outline" className="min-w-[200px]">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
