/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { ClientFactory } from '../auth0-session';
import { Session, SessionCache } from '../session';
import { AuthorizationParameters, NextConfig } from '../config';
export type AfterRefresh = (req: NextApiRequest, res: NextApiResponse, session: Session) => Promise<Session> | Session;
/**
 * Custom options to get an access token.
 *
 * @category Server
 */
export interface AccessTokenRequest {
    /**
     * A list of desired scopes for your access token.
     */
    scopes?: string[];
    /**
     * If set to `true`, a new access token will be requested with the refresh token grant, regardless of whether
     * the access token has expired or not.
     *
     * **IMPORTANT** You need to request the `offline_access` scope on login to get a refresh token
     * from Auth0.
     */
    refresh?: boolean;
    /**
     * When the access token request refreshes the tokens using the refresh grant the session is updated with new tokens.
     * Use this to modify the session after it is refreshed.
     * Usually used to keep updates in sync with the {@link AfterCallback} hook.
     *
     * @see also the {@link AfterRefetch} hook.
     *
     * @example Modify the session after refresh
     *
     * ```js
     * // pages/api/my-handler.js
     * import { getAccessToken } from '@auth0/nextjs-auth0';
     *
     * const afterRefresh = (req, res, session) => {
     *   session.user.customProperty = 'foo';
     *   delete session.idToken;
     *   return session;
     * };
     *
     * export default async function MyHandler(req, res) {
     *   const accessToken = await getAccessToken(req, res, {
     *     refresh: true,
     *     afterRefresh,
     *   });
     * };
     * ```
     */
    afterRefresh?: AfterRefresh;
    /**
     * This is useful for sending custom query parameters in the body of the refresh grant request for use in rules.
     */
    authorizationParams?: Partial<AuthorizationParameters>;
}
/**
 * Response from requesting an access token.
 *
 * @category Server
 */
export interface GetAccessTokenResult {
    /**
     * Access token returned from the token cache.
     */
    accessToken?: string | undefined;
}
/**
 * Get an access token to access an external API.
 *
 * @throws {@link AccessTokenError}
 *
 * @category Server
 */
export type GetAccessToken = (req: IncomingMessage | NextApiRequest, res: ServerResponse | NextApiResponse, accessTokenRequest?: AccessTokenRequest) => Promise<GetAccessTokenResult>;
/**
 * @ignore
 */
export default function accessTokenFactory(config: NextConfig, getClient: ClientFactory, sessionCache: SessionCache): GetAccessToken;
//# sourceMappingURL=get-access-token.d.ts.map