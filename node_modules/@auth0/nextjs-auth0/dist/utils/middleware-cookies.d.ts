import { Cookies } from '../auth0-session/utils/cookies';
import { NextRequest, NextResponse } from 'next/server';
export default class MiddlewareCookies extends Cookies {
    protected getSetCookieHeader(res: NextResponse): string[];
    protected setSetCookieHeader(res: NextResponse, cookies: string[]): void;
    getAll(req: NextRequest): Record<string, string>;
}
//# sourceMappingURL=middleware-cookies.d.ts.map