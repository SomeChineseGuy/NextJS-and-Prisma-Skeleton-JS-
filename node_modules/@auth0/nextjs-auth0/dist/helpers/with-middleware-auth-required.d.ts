import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { SessionCache } from '../session';
/**
 * Protect your pages with Next.js Middleware. For example:
 *
 * To protect all your routes:
 *
 * ```js
 * // middleware.js
 * import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
 *
 * export default withMiddlewareAuthRequired();
 * ```
 *
 * To protect specific routes:
 *
 * ```js
 * // middleware.js
 * import { withMiddlewareAuthRequired } from '@auth0/nextjs-auth0/edge';
 *
 * export default withMiddlewareAuthRequired();
 *
 * export const config = {
 *   matcher: '/about/:path*',
 * };
 * ```
 * For more info see: https://nextjs.org/docs/advanced-features/middleware#matching-paths
 *
 * To run custom middleware for authenticated users:
 *
 * ```js
 * // middleware.js
 * import { withMiddlewareAuthRequired, getSession } from '@auth0/nextjs-auth0/edge';
 *
 * export default withMiddlewareAuthRequired(async function middleware(req) {
 *   const res = NextResponse.next();
 *   const user = await getSession(req, res);
 *   res.cookies.set('hl', user.language);
 *   return res;
 * });
 * ```
 *
 * @category Server
 */
export type WithMiddlewareAuthRequired = (middleware?: NextMiddleware) => NextMiddleware;
/**
 * @ignore
 */
export default function withMiddlewareAuthRequiredFactory({ login, callback, unauthorized }: {
    login: string;
    callback: string;
    unauthorized: string;
}, getSessionCache: () => SessionCache<NextRequest, NextResponse>): WithMiddlewareAuthRequired;
//# sourceMappingURL=with-middleware-auth-required.d.ts.map