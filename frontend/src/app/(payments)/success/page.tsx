import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F1] flex justify-center items-center">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200/50 p-8 text-center">
        <div className="mb-8">
          <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Successful
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-3 
            bg-teal-600 hover:bg-teal-700 text-white rounded-xl
            font-medium text-sm
            shadow-sm hover:shadow-md
            transition-all duration-200
            hover:scale-105 active:scale-95"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
