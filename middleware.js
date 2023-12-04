import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    if (token && token.user.userType === "EMPLOYER" && (path === "/" || path === "/jobs")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (token && token.user.userType === "USER" && path === "/") {
      return NextResponse.redirect(new URL("/jobs", req.url));
    }

    if (token && (path === "/login" || path === "/register")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    if (!token && path.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return (
          !!token ||
          req.nextUrl.pathname.startsWith("/api") ||
          req.nextUrl.pathname.startsWith("/login") ||
          req.nextUrl.pathname.startsWith("/register") ||
          req.nextUrl.pathname.startsWith("/jobs") ||
          req.nextUrl.pathname.startsWith("/")
        );
      },
    },
  },
);

export const config = { matcher: ["/login", "/register", "/dashboard/:path*", "/", "/jobs"] };
