import { useChangeColor } from 'packages/utils/theme';

const { getLightColor } = useChangeColor();
export const nextUseCssVar = (cssvar: string, value: string) => {
	const docEl = document.documentElement;
	docEl.style.setProperty(cssvar, value);
};

export const nextUseCssTheme = (cssvar: string, value: string) => {
	nextUseCssVar(cssvar, value);
	for (let i = 1; i < 10; i++) {
		nextUseCssVar(cssvar + '-light-' + i, getLightColor(value, i / 10));
	}
	nextUseCssVar(`${cssvar}-dark-2`, value);
};

export const updateThemeColor = (color: string) => {
	if (!color) return;
	nextUseCssTheme('--el-color-primary', color);
};

const themeColorCssEnum = {
	themeColor: '--el-color-primary',
	headerBarColor: '--next-layout-bg-color',
	headerBarFontColor: '--next-layout-font-color',
};
/**
 * 更新所有cssvar变量
 */
export const updateThemeColorCssVar = (conf: any) => {
	for (const key in themeColorCssEnum) {
		const cssVar = themeColorCssEnum[key];
		if (conf[key]) {
			nextUseCssTheme(cssVar, conf[key]);
		}
	}
	const body = document.documentElement as HTMLElement;
	if (conf.isDark) {
		body.setAttribute('data-theme', 'dark');
	} else {
		body.setAttribute('data-theme', '');
	}
};
