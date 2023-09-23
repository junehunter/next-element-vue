import type { App } from 'vue';
import './theme-chalk/index.scss';
export * from './hooks';
export * from './components';
export declare const version: string;
export declare const install: (app: App) => void;
declare const _default: {
    version: string;
    install: (app: App<any>) => void;
};
export default _default;
