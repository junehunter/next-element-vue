import { inject, isRef } from 'vue';
interface CrudTableConfig {
	btnText?: boolean;
	btnPlain?: boolean;
	btnSize?: 'large' | 'default' | 'small';
	dialogCloseOnClickModal?: boolean;
}
export interface ConfigProviderOptions {
	theme?: 'light' | 'dark';
	locale?: string;
	size?: 'large' | 'default' | 'small';
	crudTable?: CrudTableConfig;
}
export const defaultConfigProviderOptions: ConfigProviderOptions = {
	theme: 'light',
	locale: 'zh-CN',
	size: 'default',
	crudTable: {
		btnSize: 'small',
	},
};
export const configProviderContextKey = Symbol('configProviderContextKey');
export const getConfigProviderContext = () => {
	const configProvider = inject(configProviderContextKey, defaultConfigProviderOptions);
	const config = isRef(configProvider) ? configProvider.value : configProvider;
	return Object.assign({}, defaultConfigProviderOptions, config);
};
