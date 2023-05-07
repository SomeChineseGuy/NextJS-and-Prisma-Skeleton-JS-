/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import { CookieSerializeOptions } from 'cookie';
export declare abstract class Cookies {
    protected cookies: string[];
    constructor();
    set(name: string, value: string, options?: CookieSerializeOptions): void;
    clear(name: string, options?: CookieSerializeOptions): void;
    commit(res: unknown, filterCookiePrefix?: string): void;
    protected abstract getSetCookieHeader(res: unknown): string[];
    protected abstract setSetCookieHeader(res: unknown, cookies: string[]): void;
    abstract getAll(req: unknown): Record<string, string>;
}
export default class NodeCookies extends Cookies {
    protected getSetCookieHeader(res: ServerResponse): string[];
    protected setSetCookieHeader(res: ServerResponse, cookies: string[]): void;
    getAll(req: IncomingMessage): Record<string, string>;
}
//# sourceMappingURL=cookies.d.ts.map