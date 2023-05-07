/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import type { TokenSet } from 'openid-client';
import { Config, SessionCache as ISessionCache, AbstractSession } from '../auth0-session';
import Session from './session';
export default class SessionCache<Req extends object = IncomingMessage | NextApiRequest, // eslint-disable-line @typescript-eslint/ban-types
Res extends object = ServerResponse | NextApiResponse> implements ISessionCache<Req, Res, Session> {
    private config;
    private sessionStore;
    private cache;
    private iatCache;
    constructor(config: Config, sessionStore: AbstractSession<Req, Res, Session>);
    private init;
    save(req: Req, res: Res): Promise<void>;
    create(req: Req, res: Res, session: Session): Promise<void>;
    delete(req: Req, res: Res): Promise<void>;
    isAuthenticated(req: Req, res: Res): Promise<boolean>;
    getIdToken(req: Req, res: Res): Promise<string | undefined>;
    set(req: Req, res: Res, session: Session | null): Promise<void>;
    get(req: Req, res: Res): Promise<Session | null | undefined>;
    fromTokenSet(tokenSet: TokenSet): Session;
}
//# sourceMappingURL=cache.d.ts.map