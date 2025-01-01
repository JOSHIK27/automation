import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sessionTokenName } from "./lib/constants/common";

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(sessionTokenName);

  if (!authCookie) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sample",
    "/workflow/:workflowid",
    "/workflow-history",
    "/build-workflow",
  ],
};
