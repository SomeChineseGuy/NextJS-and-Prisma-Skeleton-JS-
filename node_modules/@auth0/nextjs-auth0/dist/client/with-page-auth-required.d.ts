import React, { ComponentType } from 'react';
import { UserProfile } from './use-user';
/**
 * Options to customize the withPageAuthRequired higher order component.
 *
 * @category Client
 */
export interface WithPageAuthRequiredOptions {
    /**
     * ```js
     * withPageAuthRequired(Profile, {
     *   returnTo: '/profile'
     * });
     * ```
     *
     * Add a path to return the user to after login.
     */
    returnTo?: string;
    /**
     * ```js
     * withPageAuthRequired(Profile, {
     *   onRedirecting: () => <div>Redirecting you to the login...</div>
     * });
     * ```
     *
     * Render a message to show that the user is being redirected to the login.
     */
    onRedirecting?: () => JSX.Element;
    /**
     * ```js
     * withPageAuthRequired(Profile, {
     *   onError: error => <div>Error: {error.message}</div>
     * });
     * ```
     *
     * Render a fallback in case of error fetching the user from the profile API route.
     */
    onError?: (error: Error) => JSX.Element;
}
/**
 * @ignore
 */
export interface WithPageAuthRequiredProps {
    [key: string]: any;
}
export interface UserProps {
    user: UserProfile;
}
/**
 * ```js
 * const MyProtectedPage = withPageAuthRequired(MyPage);
 * ```
 *
 * When you wrap your pages in this higher order component and an anonymous user visits your page,
 * they will be redirected to the login page and then returned to the page they were redirected from (after login).
 *
 * @category Client
 */
export type WithPageAuthRequired = <P extends WithPageAuthRequiredProps>(Component: ComponentType<P & UserProps>, options?: WithPageAuthRequiredOptions) => React.FC<P>;
/**
 * @ignore
 */
declare const withPageAuthRequired: WithPageAuthRequired;
export default withPageAuthRequired;
//# sourceMappingURL=with-page-auth-required.d.ts.map