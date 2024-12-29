import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("authjs.session-token");

  if (!authCookie) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sample", "/workflow", "/workflow-history"],
};
