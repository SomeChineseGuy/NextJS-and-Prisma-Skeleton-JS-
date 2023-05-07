/**
 *
 * Derives appropriate sized keys from the end-user provided secret random string/passphrase using
 * HKDF (HMAC-based Extract-and-Expand Key Derivation Function) defined in RFC 8569.
 *
 * @see https://tools.ietf.org/html/rfc5869
 *
 */
export declare const encryption: (secret: string) => Promise<Uint8Array>;
export declare const signing: (secret: string) => Promise<Uint8Array>;
//# sourceMappingURL=hkdf.d.ts.map