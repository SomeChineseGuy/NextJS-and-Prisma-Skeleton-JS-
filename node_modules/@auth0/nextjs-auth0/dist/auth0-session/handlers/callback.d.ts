/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
import { AuthorizationParameters, Config } from '../config';
import { ClientFactory } from '../client';
import TransientStore from '../transient-store';
import { SessionCache } from '../session-cache';
export type AfterCallback = (req: any, res: any, session: any, state?: Record<string, any>) => Promise<any> | any | undefined;
export type CallbackOptions = {
    afterCallback?: AfterCallback;
    redirectUri?: string;
    authorizationParams?: Partial<AuthorizationParameters>;
};
export type HandleCallback = (req: IncomingMessage, res: ServerResponse, options?: CallbackOptions) => Promise<void>;
export default function callbackHandlerFactory(config: Config, getClient: ClientFactory, sessionCache: SessionCache, transientCookieHandler: TransientStore): HandleCallback;
//# sourceMappingURL=callback.d.ts.map