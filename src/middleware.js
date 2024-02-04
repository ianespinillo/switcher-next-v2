import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req) {
    console.log(req.nextauth.token);
    if (
      req.nextUrl.pathname === "/admin/dashboard" &&
      req.nextauth.token?.role !== "admin"
    ) {
      return new NextResponse.redirect('/')
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/admin/:path", "/dashboard", "/checkout", "/dashboard/:path*" ] };