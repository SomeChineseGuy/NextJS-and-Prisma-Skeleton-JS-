/**
 * Prepare a state object to send.
 *
 * @param {object} stateObject
 *
 * @return {string}
 */
export declare function encodeState(stateObject: {
    [key: string]: any;
}): string;
/**
 * Decode a state value.
 *
 * @param {string} stateValue
 *
 * @return {object|undefined}
 */
export declare function decodeState(stateValue?: string): {
    [key: string]: any;
} | undefined;
//# sourceMappingURL=encoding.d.ts.map