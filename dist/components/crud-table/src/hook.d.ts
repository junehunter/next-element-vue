/**
 * 自定义table中column的slot name
 * @param prop
 * @returns
 */
export declare const columnSlotNamePrefix = "column-";
export declare const columnSlotName: (prop: string) => string;
/**
 * 自定义搜索栏中form的slot name
 * @param prop
 * @returns
 */
export declare const searchFormSlotNamePrefix = "search-";
export declare const searchFormSlotName: (prop: string) => string;
/**
 * 自定义新增编辑表单中form的slot name
 * @param prop
 * @returns
 */
export declare const formSlotNamePrefix = "form-";
export declare const formSlotName: (prop: string) => string;
export declare const vaildData: (val: boolean, dafult: any) => any;
export declare const getColumnProp: () => void;
/**
 * 将已'-'分割的字符串转换为驼峰
 * @param str
 * @returns
 */
export declare const toHump: (str: string) => string;
/**
 * 获取菜单树默认展开节点keys
 * @param treeData
 * @returns
 */
export declare const getDefaultExpandedKeys: (treeData: any) => string[];
