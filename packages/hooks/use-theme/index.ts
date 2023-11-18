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
