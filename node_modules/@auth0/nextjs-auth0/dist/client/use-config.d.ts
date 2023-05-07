import React, { ReactElement } from 'react';
export type ConfigContext = {
    loginUrl?: string;
};
export type ConfigProviderProps = React.PropsWithChildren<ConfigContext>;
export type UseConfig = () => ConfigContext;
export declare const useConfig: UseConfig;
declare const _default: ({ children, loginUrl }: ConfigProviderProps) => ReactElement<ConfigContext>;
export default _default;
//# sourceMappingURL=use-config.d.ts.map