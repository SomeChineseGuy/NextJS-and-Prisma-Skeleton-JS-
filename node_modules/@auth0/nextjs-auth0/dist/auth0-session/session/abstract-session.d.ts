import { CookieSerializeOptions } from 'cookie';
import { Config } from '../config';
import { Cookies } from '../utils/cookies';
export interface SessionPayload<Session> {
    header: {
        /**
         * Timestamp (in secs) when the session was created.
         */
        iat: number;
        /**
         * Timestamp (in secs) when the session was last touched.
         */
        uat: number;
        /**
         * Timestamp (in secs) when the session expires.
         */
        exp: number;
    };
    /**
     * The session data.
     */
    data: Session;
}
export type Header = {
    iat: number;
    uat: number;
    exp: number;
    [propName: string]: unknown;
};
export declare abstract class AbstractSession<Req, Res, Session> {
    protected config: Config;
    protected Cookies: new () => Cookies;
    constructor(config: Config, Cookies: new () => Cookies);
    abstract getSession(req: Req): Promise<SessionPayload<Session> | undefined | null>;
    abstract setSession(req: Req, res: Res, session: Session, uat: number, iat: number, exp: number, cookieOptions: CookieSerializeOptions, isNewSession: boolean): Promise<void>;
    abstract deleteSession(req: Req, res: Res, cookieOptions: CookieSerializeOptions): Promise<void>;
    read(req: Req): Promise<[Session?, number?]>;
    save(req: Req, res: Res, session: Session | null | undefined, createdAt?: number): Promise<void>;
    private calculateExp;
}
//# sourceMappingURL=abstract-session.d.ts.map