import { NextResponse, type NextRequest } from 'next/server';

// Keep Vercel preview and *.vercel.app copies of the site out of search results, so Google
// only indexes samridhi.si. (Redirecting vercel.app to the real domain is set up in hosting.)
export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const host = req.headers.get('host') || '';
  if (host.endsWith('.vercel.app')) res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
}

export const config = { matcher: '/((?!_next/static|_next/image).*)' };
