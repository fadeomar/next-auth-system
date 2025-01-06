import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: Request) {
  const pathname = req.nextUrl.pathname; // Current request path

  // Define protected routes
  const protectedRoutes = ["/protected"];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Get the user's token (from cookies, typically)
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  // Allow the request to continue if authenticated or not a protected route
  return NextResponse.next();
}

// Apply middleware only to specific routes
export const config = {
  matcher: ["/protected/:path*"], // Protect all pages under /protected
};
