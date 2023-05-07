import { CookieSerializeOptions } from 'cookie';
import { Config } from '../config';
import { Cookies } from '../utils/cookies';
import { AbstractSession, SessionPayload } from './abstract-session';
export interface SessionStore<Session> {
    /**
     * Gets the session from the store given a session ID.
     */
    get(sid: string): Promise<SessionPayload<Session> | null | undefined>;
    /**
     * Upsert a session in the store given a session ID and `SessionData`.
     */
    set(sid: string, session: SessionPayload<Session>): Promise<void>;
    /**
     * Destroys the session with the given session ID.
     */
    delete(sid: string): Promise<void>;
}
export declare class StatefulSession<Req, Res, Session extends {
    [key: string]: any;
} = {
    [key: string]: any;
}> extends AbstractSession<Req, Res, Session> {
    protected config: Config;
    protected Cookies: new () => Cookies;
    private keys?;
    private store;
    constructor(config: Config, Cookies: new () => Cookies);
    private getKeys;
    getSession(req: Req): Promise<SessionPayload<Session> | undefined | null>;
    setSession(req: Req, res: Res, session: Session, uat: number, iat: number, exp: number, cookieOptions: CookieSerializeOptions, isNewSession: boolean): Promise<void>;
    deleteSession(req: Req, res: Res, cookieOptions: CookieSerializeOptions): Promise<void>;
}
//# sourceMappingURL=stateful-session.d.ts.map