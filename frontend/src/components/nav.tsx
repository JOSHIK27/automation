import Link from "next/link";
import { BsLightningChargeFill } from "react-icons/bs";
import { auth } from "../../auth";

export async function Nav() {
  const session = await auth();
  console.log(session);
  return (
    <nav className="bg-white shadow-sm border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-black">
            <BsLightningChargeFill className="text-2xl" />
          </Link>
          <div className="flex items-center">
            {session?.user?.image && (
              <img
                src={session?.user?.image ?? ""}
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
