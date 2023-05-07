import React, { ReactElement } from 'react';
import { ConfigContext } from './use-config';
/**
 * The user claims returned from the {@link useUser} hook.
 *
 * @category Client
 */
export interface UserProfile {
    email?: string | null;
    email_verified?: boolean | null;
    name?: string | null;
    nickname?: string | null;
    picture?: string | null;
    sub?: string | null;
    updated_at?: string | null;
    org_id?: string | null;
    [key: string]: unknown;
}
/**
 * The user context returned from the {@link useUser} hook.
 *
 * @category Client
 */
export type UserContext = {
    user?: UserProfile;
    error?: Error;
    isLoading: boolean;
    checkSession: () => Promise<void>;
};
/**
 * The error thrown by the default {@link UserFetcher}.
 *
 * The `status` property contains the status code of the response. It is `0` when the request
 * fails, for example due to being offline.
 *
 * This error is not thrown when the status code of the response is `204`, because that means the
 * user is not authenticated.
 *
 * @category Client
 */
export declare class RequestError extends Error {
    status: number;
    constructor(status: number);
}
/**
 * Fetches the user from the profile API route to fill the {@link useUser} hook with the
 * {@link UserProfile} object.
 *
 * If needed, you can pass a custom fetcher to the {@link UserProvider} component via the
 * {@link UserProviderProps.fetcher} prop.
 *
 * @throws {@link RequestError}
 */
type UserFetcher = (url: string) => Promise<UserProfile | undefined>;
/**
 * Configure the {@link UserProvider} component.
 *
 * If you have any server-side rendered pages (using `getServerSideProps`), you should get the
 * user from the server-side session and pass it to the `<UserProvider>` component via the `user`
 * prop. This will prefill the {@link useUser} hook with the {@link UserProfile} object.
 * For example:
 *
 * ```js
 * // pages/_app.js
 * import React from 'react';
 * import { UserProvider } from '@auth0/nextjs-auth0/client';
 *
 * export default function App({ Component, pageProps }) {
 *   // If you've used `withPageAuthRequired`, `pageProps.user` can prefill the hook
 *   // if you haven't used `withPageAuthRequired`, `pageProps.user` is undefined so the hook
 *   // fetches the user from the API route
 *   const { user } = pageProps;
 *
 *   return (
 *     <UserProvider user={user}>
 *       <Component {...pageProps} />
 *     </UserProvider>
 *   );
 * }
 * ```
 *
 * In client-side rendered pages, the {@link useUser} hook uses a {@link UserFetcher} to fetch the
 * user from the profile API route. If needed, you can specify a custom fetcher here in the
 * `fetcher` option.
 *
 * **IMPORTANT** If you have used a custom url for your {@link HandleProfile} API route handler
 * (the default is `/api/auth/me`) then you need to specify it here in the `profileUrl` option.
 *
 * @category Client
 */
export type UserProviderProps = React.PropsWithChildren<{
    user?: UserProfile;
    profileUrl?: string;
    fetcher?: UserFetcher;
} & ConfigContext>;
/**
 * @ignore
 */
export declare const UserContext: React.Context<UserContext>;
/**
 * @ignore
 */
export type UseUser = () => UserContext;
/**
 * The `useUser` hook, which will get you the {@link UserProfile} object from the server-side session by fetching it
 * from the {@link HandleProfile} API route.
 *
 * ```js
 * // pages/profile.js
 * import Link from 'next/link';
 * import { useUser } from '@auth0/nextjs-auth0/client';
 *
 * export default function Profile() {
 *   const { user, error, isLoading } = useUser();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>{error.message}</div>;
 *   if (!user) return <Link href="/api/auth/login"><a>Login</a></Link>;
 *   return <div>Hello {user.name}, <Link href="/api/auth/logout"><a>Logout</a></Link></div>;
 * }
 * ```
 *
 * @category Client
 */
export declare const useUser: UseUser;
/**
 * To use the {@link useUser} hook, you must wrap your application in a `<UserProvider>` component.
 *
 * @category Client
 */
export type UserProvider = (props: UserProviderProps) => ReactElement<UserContext>;
declare const _default: ({ children, user: initialUser, profileUrl, loginUrl, fetcher }: UserProviderProps) => ReactElement<UserContext>;
export default _default;
//# sourceMappingURL=use-user.d.ts.map