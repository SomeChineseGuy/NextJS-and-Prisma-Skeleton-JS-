import { NextApiResponse, NextApiRequest } from 'next';
import { ClientFactory } from '../auth0-session';
import { SessionCache, Session, GetAccessToken } from '../session';
export type AfterRefetch = (req: NextApiRequest, res: NextApiResponse, session: Session) => Promise<Session> | Session;
/**
 * Options to customize the profile handler.
 *
 * @see {@link HandleProfile}
 *
 * @category Server
 */
export type ProfileOptions = {
    /**
     * If set to `true` this will refetch the user profile information from `/userinfo` and save it
     * to the session.
     */
    refetch?: boolean;
    /**
     * Like {@link AfterCallback}  and {@link AfterRefresh} when a session is created, you can use
     * this function to validate or add/remove claims after the session is updated. Will only run if
     * {@link ProfileOptions.refetch} is `true`.
     */
    afterRefetch?: AfterRefetch;
};
/**
 * Options provider for the default profile handler.
 * Use this to generate options that depend on values from the request.
 *
 * @category Server
 */
export type ProfileOptionsProvider = (req: NextApiRequest) => ProfileOptions;
/**
 * Use this to customize the default profile handler without overriding it.
 * You can still override the handler if needed.
 *
 * @example Pass an options object
 *
 * ```js
 * // pages/api/auth/[...auth0].js
 * import { handleAuth, handleProfile } from '@auth0/nextjs-auth0';
 *
 * export default handleAuth({
 *   profile: handleProfile({ refetch: true })
 * });
 * ```
 *
 * @example Pass a function that receives the request and returns an options object
 *
 * ```js
 * // pages/api/auth/[...auth0].js
 * import { handleAuth, handleProfile } from '@auth0/nextjs-auth0';
 *
 * export default handleAuth({
 *   profile: handleProfile((req) => {
 *     return { refetch: true };
 *   })
 * });
 * ```
 *
 * This is useful for generating options that depend on values from the request.
 *
 * @example Override the profile handler
 *
 * ```js
 * import { handleAuth, handleProfile } from '@auth0/nextjs-auth0';
 *
 * export default handleAuth({
 *   profile: async (req, res) => {
 *     try {
 *       await handleProfile(req, res, { refetch: true });
 *     } catch (error) {
 *       console.error(error);
 *     }
 *   }
 * });
 * ```
 *
 * @category Server
 */
export type HandleProfile = {
    (req: NextApiRequest, res: NextApiResponse, options?: ProfileOptions): Promise<void>;
    (provider: ProfileOptionsProvider): ProfileHandler;
    (options: ProfileOptions): ProfileHandler;
};
/**
 * The handler for the `/api/auth/me` API route.
 *
 * @throws {@link HandlerError}
 *
 * @category Server
 */
export type ProfileHandler = (req: NextApiRequest, res: NextApiResponse, options?: ProfileOptions) => Promise<void>;
/**
 * @ignore
 */
export default function profileHandler(getClient: ClientFactory, getAccessToken: GetAccessToken, sessionCache: SessionCache): HandleProfile;
//# sourceMappingURL=profile.d.ts.map