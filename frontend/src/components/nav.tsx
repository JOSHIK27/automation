import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
export function Nav() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-black">
              <BsLightningChargeFill className="text-2xl" />
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-black hover:text-gray-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/services"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Services
            </Link>
            <Link
              href="/contact"
              className="text-black hover:text-gray-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
