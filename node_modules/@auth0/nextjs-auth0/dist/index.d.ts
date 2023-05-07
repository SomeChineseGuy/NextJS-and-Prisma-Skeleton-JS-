import { SessionStore as GenericSessionStore, SessionPayload } from './auth0-session';
import { Handlers, HandleAuth, HandleLogin, HandleProfile, HandleLogout, HandleCallback, LoginOptions, LogoutOptions, GetLoginState, ProfileOptions, CallbackOptions, AfterCallback, AfterRefetch, OnError } from './handlers';
import { SessionCache, GetSession, GetAccessToken, Session, AccessTokenRequest, GetAccessTokenResult, Claims, TouchSession, UpdateSession } from './session/';
import { WithApiAuthRequired, WithPageAuthRequired, GetServerSidePropsResultWithSession, WithPageAuthRequiredOptions, PageRoute } from './helpers';
import { ConfigParameters } from './config';
/**
 * The SDK server instance.
 *
 * This is created for you when you use the named exports, or you can create your own using {@link InitAuth0}.
 *
 * See {@link ConfigParameters} for more info.
 *
 * @category Server
 */
export interface Auth0Server {
    /**
     * Session getter.
     */
    getSession: GetSession;
    /**
     * Update the expiry of a rolling session when autoSave is disabled.
     */
    touchSession: TouchSession;
    /**
     * Append properties to the user.
     */
    updateSession: UpdateSession;
    /**
     * Access token getter.
     */
    getAccessToken: GetAccessToken;
    /**
     * Login handler which will redirect the user to Auth0.
     */
    handleLogin: HandleLogin;
    /**
     * Callback handler which will complete the transaction and create a local session.
     */
    handleCallback: HandleCallback;
    /**
     * Logout handler which will clear the local session and the Auth0 session.
     */
    handleLogout: HandleLogout;
    /**
     * Profile handler which return profile information about the user.
     */
    handleProfile: HandleProfile;
    /**
     * Helper that adds auth to an API route.
     */
    withApiAuthRequired: WithApiAuthRequired;
    /**
     * Helper that adds auth to a Page route.
     */
    withPageAuthRequired: WithPageAuthRequired;
    /**
     * Create the main handlers for your api routes.
     */
    handleAuth: HandleAuth;
}
/**
 * Initialise your own instance of the SDK.
 *
 * See {@link ConfigParameters}.
 *
 * @category Server
 */
export type InitAuth0 = (params?: ConfigParameters) => Auth0Server;
export declare const initAuth0: InitAuth0;
export declare const _initAuth: (params?: ConfigParameters) => Auth0Server & {
    sessionCache: SessionCache;
};
export declare const getSession: GetSession;
export declare const updateSession: UpdateSession;
export declare const getAccessToken: GetAccessToken;
export declare const withApiAuthRequired: WithApiAuthRequired;
export declare const withPageAuthRequired: WithPageAuthRequired;
export declare const handleLogin: HandleLogin;
export declare const handleLogout: HandleLogout;
export declare const handleCallback: HandleCallback;
export declare const handleProfile: HandleProfile;
export declare const handleAuth: HandleAuth;
export { AuthError, AccessTokenErrorCode, AccessTokenError, HandlerError, CallbackHandlerError, LoginHandlerError, LogoutHandlerError, ProfileHandlerError } from './utils/errors';
export { MissingStateCookieError, MissingStateParamError, IdentityProviderError, ApplicationError } from './auth0-session';
export { ConfigParameters, HandleAuth, HandleLogin, HandleProfile, HandleLogout, HandleCallback, ProfileOptions, Handlers, GetServerSidePropsResultWithSession, WithPageAuthRequiredOptions, PageRoute, WithApiAuthRequired, WithPageAuthRequired, SessionCache, GetSession, TouchSession, UpdateSession, GetAccessToken, Session, Claims, AccessTokenRequest, GetAccessTokenResult, CallbackOptions, AfterCallback, AfterRefetch, LoginOptions, LogoutOptions, GetLoginState, OnError };
export type SessionStore = GenericSessionStore<Session>;
export type SessionStorePayload = SessionPayload<Session>;
//# sourceMappingURL=index.d.ts.map