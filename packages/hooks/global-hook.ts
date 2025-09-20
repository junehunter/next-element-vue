import { onUnmounted } from 'vue';
import elementResizeDetectorMaker from 'element-resize-detector';

/**
 * 监听元素宽高缩放
 * @param el
 * @param cb
 */
export const elementResize = (el: HTMLElement, cb: Function) => {
	const erd = elementResizeDetectorMaker();
	let timer: any = null;
	erd.listenTo(el, () => {
		// 添加防抖模式
		if (timer !== null) clearTimeout(timer);
		timer = setTimeout(() => {
			cb && cb(el);
			clearTimeout(timer);
		}, 200);
	});
	onUnmounted(() => {
		erd.removeListener(el, () => {});
	});
};
/**
 *  根据传入元素宽度动态设置col的span
 * @param el
 * @param minWidth
 * @returns
 */
export const updateColSpan = (el: HTMLElement, minWidth: number = 350) => {
	const el_width = el.clientWidth;
	// 一行最多多少列
	let span = Math.floor(el_width / minWidth);
	if (span > 4) span = 4;
	// 每列的span数量
	const colSpan = Math.ceil(24 / span);
	return colSpan;
};

/**
 * 深度克隆
 * @param source
 * @returns
 */
export const deepClone = (source: any) => {
	if (source === null || source === undefined) return source;
	let target: any;
	if (typeof source === 'object') {
		target = Array.isArray(source) ? [] : {};
		for (let key in source) {
			if (typeof source[key] === 'object') {
				target[key] = deepClone(source[key]);
			} else {
				target[key] = source[key];
			}
		}
	} else {
		target = source;
	}
	return target;
};
/**
 * 深度合并
 */
export const deepMerge = (target: any) => {
	return function (source: any) {
		if (!source) return deepClone(target);
		if (Object.prototype.toString.call(target) === '[object Object]' && Object.prototype.toString.call(source) === '[object Object]') {
			for (let k in source) {
				if (!target[k]) {
					target[k] = source[k];
				} else {
					target[k] = deepMerge(target[k])(source[k]);
				}
			}
		} else if (Object.prototype.toString.call(target) === '[object Array]' && Object.prototype.toString.call(source) === '[object Array]') {
			const temp = source.map((item: any, index: number) => {
				if (target[index]) {
					item = deepMerge(target[index])(item);
				}
				return item;
			});
			target = temp;
		} else {
			target = source;
		}
		return target;
	};
};
/**
 * 合并表单参数
 * @param target 目标对象
 * @param source 合并资源对象
 * @param isTrim 是否去掉为空的属性
 */
export const formParamsMerge = (target: any, source: any, isTrim: boolean = false) => {
	const cloneFormParams = deepClone(source);
	for (const key in cloneFormParams) {
		const val = cloneFormParams[key as string];
		if (val || val === 0) {
			target[key] = val;
		}
	}
	if (isTrim) {
		for (const key in target) {
			const val = target[key as string];
			if (!(val || val === 0)) {
				delete target[key];
			}
		}
	}
	return target;
};

/**
 * 数组对象根据指定属性去重
 * @param arr
 * @param property
 * @returns
 */
export const arrayObjNoRepeat = (arr: any[], property: string): any[] => {
	const result = [];
	const uniqueMap = new Map();
	for (const item of arr) {
		const key = item[property];
		if (!uniqueMap.has(key)) {
			uniqueMap.set(key, true);
			result.push(item);
		}
	}
	return result;
};

/**
 * 判断是否是Object
 * @param obj
 * @returns
 */
export const isObject = (obj: any): boolean => {
	if (!obj) return false;
	return Object.prototype.toString.call(obj) === '[object Object]';
};
/**
 * 判断是否空对象
 * @param obj
 * @returns
 */
export const isEmptyObject = (obj: any): boolean => {
	if (!obj) return true;
	if (isObject(obj) === false) return false;
	return Object.keys(obj).length === 0;
};
/**
 * 格式化对象为请求路径参数
 * @param obj
 * @returns
 */
export const formatArg = (obj: any): string => {
	let arg = <Array<string>>[];
	for (const key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			const value: any = obj[key];
			const temp = key + '=' + value;
			arg.push(temp);
		}
	}
	return arg.join('&');
};
/**
 * 判断值是否存在
 * @param value
 * @returns
 */
export const isValueExist = (value: any): boolean => {
	return value !== null && value !== undefined && (typeof value === 'string' ? value.trim() !== '' : value !== false);
};

/**
 * 取真实存在的值
 * @param arg
 * @returns
 */
export const valueExist = (...arg: any[]): any => {
	let exist = null;
	for (let i = 0; i < arg.length; i++) {
		const val = arg[i];
		if (val !== null && val !== undefined) {
			exist = val;
			break;
		}
	}
	return exist;
};

/**
 * 目标对象数据属性指向资源对象属性，属性共享
 * @param target
 * @param source
 * @param key
 */
export const shareObjectProperty = (target: any, source: any, key: string) => {
	Object.defineProperty(target, key, {
		get: () => {
			return source[key];
		},
	});
	return {
		target,
		source,
	};
};
/**
 * 日期格式化
 * @param date
 * @param format
 * @returns
 */
export const dateFormat = (date: Date | any, format = 'yyyy-MM-dd') => {
	if (date != 'Invalid Date') {
		const o: any = {
			'M+': date.getMonth() + 1, //month
			'd+': date.getDate(), //day
			'h+': date.getHours(), //hour
			'm+': date.getMinutes(), //minute
			's+': date.getSeconds(), //second
			'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
			S: date.getMilliseconds(), //millisecond
		};
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + '').substring(4 - RegExp.$1.length));
		for (const k in o) if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substring(('' + o[k]).length));
		return format;
	}
	return '';
};
/**
 * 时间唯一id
 * @returns
 */
export const timeUniqueId = () => {
	const date = new Date();
	const dateStr = dateFormat(date, 'yyyyMMddhhmmsss');
	const num = dateStr + Math.random().toString(10).substring(2, 8);
	return String(num);
};
