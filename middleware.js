import { withAuth } from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
  function middleware(request) {
    const requestHeaders = new Headers(request.headers)
    const pathname = request.nextUrl.pathname

    requestHeaders.set("x-pathname", pathname)

    if (pathname === "/login" || pathname === "/register") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
)

export const config = { matcher: ["/dashboard/:path*", "/company/:path"] }