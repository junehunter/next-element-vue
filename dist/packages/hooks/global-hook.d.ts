/**
 * 监听元素宽高缩放
 * @param el
 * @param cb
 */
export declare const elementResize: (el: HTMLElement, cb: Function) => void;
/**
 *  根据传入元素宽度动态设置col的span
 * @param el
 * @param minWidth
 * @returns
 */
export declare const updateColSpan: (el: HTMLElement, minWidth?: number) => number;
/**
 * 深度克隆
 * @param source
 * @returns
 */
export declare const deepClone: (source: any) => any;
/**
 * 深度合并
 */
export declare const deepMerge: (target: any) => (source: any) => any;
/**
 * 合并表单参数
 * @param target 目标对象
 * @param source 合并资源对象
 * @param isTrim 是否去掉为空的属性
 */
export declare const formParamsMerge: (target: any, source: any, isTrim?: boolean) => any;
/**
 * 数组对象根据指定属性去重
 * @param arr
 * @param property
 * @returns
 */
export declare const arrayObjNoRepeat: (arr: any[], property: string) => any[];
/**
 * 判断是否是Object
 * @param obj
 * @returns
 */
export declare const isObject: (obj: any) => boolean;
/**
 * 判断是否空对象
 * @param obj
 * @returns
 */
export declare const isEmptyObject: (obj: any) => boolean;
/**
 * 格式化对象为请求路径参数
 * @param obj
 * @returns
 */
export declare const formatArg: (obj: any) => string;
/**
 * 判断值是否存在
 * @param value
 * @returns
 */
export declare const isValueExist: (value: any) => boolean;
/**
 * 取真实存在打值
 * @param arg
 * @returns
 */
export declare const valueExist: (...arg: any[]) => any;
