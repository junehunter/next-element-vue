import { ElMessage } from 'element-plus';

const reg_hex = /^#([0-9A-F]{3}|[0-9A-F]{6}|[0-9A-F]{8})$/i;
const reg_rgba = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*(0|1|0?\.\d+)\s*\)$/i;
const reg_rgb = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/i;
/**
 * 颜色转换函数
 * @method hexToRgb hex 颜色转 rgb 颜色
 * @method rgbToHex rgb 颜色转 Hex 颜色
 * @method getDarkColor 加深颜色值
 * @method getLightColor 变浅颜色值
 */
export function useChangeColor() {
	// str 颜色值字符串
	const hexToRgb = (str: string): any => {
		let hexs: any = '';
		let reg = /^\#?[0-9A-Fa-f]{6}$/;
		if (!reg.test(str)) {
			ElMessage({
				type: 'warning',
				message: 'hex颜色值格式错误',
				grouping: true,
			});
			return '';
		}
		str = str.replace('#', '');
		hexs = str.match(/../g);
		for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
		return hexs;
	};
	const hexToRgba = (str: string, alpha = 1): any => {
		let hexs: any = '';
		let reg = /^\#?[0-9A-Fa-f]{6}$/;
		if (!reg.test(str)) {
			ElMessage({
				type: 'warning',
				message: 'hex颜色值格式错误',
				grouping: true,
			});
			return '';
		}
		str = str.replace('#', '');
		hexs = str.match(/../g);
		for (let i = 0; i < 3; i++) hexs[i] = parseInt(hexs[i], 16);
		return `rgba(${hexs.join(',')},${alpha})`;
	};
	// r 代表红色 | g 代表绿色 | b 代表蓝色
	const rgbToHex = (r: any, g: any, b: any): string => {
		let reg = /^\d{1,3}$/;
		if (!reg.test(r) || !reg.test(g) || !reg.test(b)) {
			ElMessage({
				type: 'warning',
				message: 'rgb颜色值格式错误',
				grouping: true,
			});
			return '';
		}
		let hexs = [r.toString(16), g.toString(16), b.toString(16)];
		for (let i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = `0${hexs[i]}`;
		return `#${hexs.join('')}`;
	};
	// rgba颜色转透明度hex
	const rgbaToHexAlpha = (rgba: string) => {
		const rgbaValues = rgba
			.replace(/^rgba?\(|\s+|\)$/g, '') // 去掉 "rgba(" 和 ")" 以及多余的空格
			.split(',')
			.map(value => parseFloat(value)); // 转换为数字数组
		const [r, g, b, a] = rgbaValues;
		const alpha = Math.round(a * 255)
			.toString(16)
			.padStart(2, '0'); // 转换 alpha 为 16 进制
		const hex = [r, g, b].map(value => Math.round(value).toString(16).padStart(2, '0')).join('');
		return `#${hex}${alpha}`.toUpperCase();
	};
	// rgba颜色转常规hex
	const rgbaToHex = (rgba: string) => {
		const rgbaValues = rgba
			.replace(/^rgba?\(|\s+|\)$/g, '') // 去掉 "rgba(" 和 ")" 以及多余的空格
			.split(',')
			.map(value => parseFloat(value)); // 转换为数字数组
		const [r, g, b] = rgbaValues;
		const hex = [r, g, b].map(value => Math.round(value).toString(16).padStart(2, '0')).join('');
		return `#${hex}`.toUpperCase();
	};
	// color 颜色值字符串 | level 变浅的程度，限0-1之间
	const getDarkColor = (color: string, level: number): string => {
		let _color = color;
		if (reg_rgba.test(_color)) {
			_color = rgbaToHex(_color);
		}
		if (reg_rgb.test(_color)) {
			_color = rgbaToHex(_color);
		}
		if (!reg_hex.test(_color)) {
			ElMessage({
				type: 'warning',
				message: 'hex颜色值格式错误',
				grouping: true,
			});
			return '';
		}
		let rgb = useChangeColor().hexToRgb(_color);
		for (let i = 0; i < 3; i++) rgb[i] = Math.floor(rgb[i] * (1 - level));
		return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2]);
	};
	// color 颜色值字符串 | level 加深的程度，限0-1之间
	const getLightColor = (color: string, level: number): string => {
		let _color = color;
		if (reg_rgba.test(_color)) {
			_color = rgbaToHex(_color);
		}
		if (reg_rgb.test(_color)) {
			_color = rgbaToHex(_color);
		}
		if (!reg_hex.test(_color)) {
			ElMessage({
				type: 'warning',
				message: 'hex颜色值格式错误',
				grouping: true,
			});
			return '';
		}
		let rgb = useChangeColor().hexToRgb(_color);
		for (let i = 0; i < 3; i++) rgb[i] = Math.floor((255 - rgb[i]) * level + rgb[i]);
		return useChangeColor().rgbToHex(rgb[0], rgb[1], rgb[2]);
	};
	// rgba颜色转hex颜色和透明度
	const rgbaToHexOpacity = (rgba: string): { color: string; opacity: number } => {
		if (!rgba) return { color: '', opacity: 1 };
		const regex = /^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/;
		const match = rgba.match(regex);
		if (!match) {
			return { color: rgba, opacity: 1 };
		}
		let [_, r, g, b, a] = match; // 解构获取 rgba 值
		r = parseInt(r).toString(16).padStart(2, '0'); // 转十六进制
		g = parseInt(g).toString(16).padStart(2, '0');
		b = parseInt(b).toString(16).padStart(2, '0');
		return {
			color: `#${r}${g}${b}`,
			opacity: parseFloat(a),
		};
	};
	return {
		hexToRgb,
		hexToRgba,
		rgbToHex,
		rgbaToHex,
		rgbaToHexAlpha,
		getDarkColor,
		getLightColor,
		rgbaToHexOpacity,
	};
}

export function randomColor16() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	// const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
	const hexColor = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
	return hexColor;
}
