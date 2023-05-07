import * as jose from 'jose';
import { CookieSerializeOptions } from 'cookie';
import { Config } from '../config';
import { Cookies } from '../utils/cookies';
import { AbstractSession, Header, SessionPayload } from './abstract-session';
export declare class StatelessSession<Req, Res, Session extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> extends AbstractSession<Req, Res, Session> {
    protected config: Config;
    protected Cookies: new () => Cookies;
    private keys?;
    private chunkSize;
    constructor(config: Config, Cookies: new () => Cookies);
    private getKeys;
    encrypt(payload: jose.JWTPayload, { iat, uat, exp }: Header): Promise<string>;
    private decrypt;
    getSession(req: Req): Promise<SessionPayload<Session> | undefined | null>;
    setSession(req: Req, res: Res, session: Session, uat: number, iat: number, exp: number, cookieOptions: CookieSerializeOptions): Promise<void>;
    deleteSession(req: Req, res: Res, cookieOptions: CookieSerializeOptions): Promise<void>;
}
//# sourceMappingURL=stateless-session.d.ts.map