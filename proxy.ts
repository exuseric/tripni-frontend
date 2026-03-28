import { PAGES } from "@constants/page-links.constant";
import { isAuthenticated } from "@utils/auth.util";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const { authenticated } = await isAuthenticated()

  if (authenticated) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL(PAGES.auth, request.url));
}

export const config = {
  matcher: ["/create/:path*", "/profile/:path*", "/trips/:path*"],
};
