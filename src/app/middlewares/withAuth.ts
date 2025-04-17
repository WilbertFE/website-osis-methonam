import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

const authPage = ["/login"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({ req, secret: process.env.AUTH_SECRET });

      // if not login
      if (!token) {
        if (!authPage.includes(pathname)) {
          const url = new URL("/login", req.url);
          return NextResponse.redirect(url);
        }
      }

      // if login
      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL(`/${token.username}`, req.url));
        }
      }
    }
    return middleware(req, next);
  };
}
