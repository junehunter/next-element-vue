import type { Plugin } from 'vue';
export type SFCWithInstall<T> = T & Plugin;
export declare const withInstall: <T, E extends Record<string, any>>(main: T, extra?: E) => SFCWithInstall<T> & E;
