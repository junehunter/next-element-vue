import type { FormItemProps } from 'packages/components/form/src/config';
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
/**
 * 获取筛选表单和新增编辑表单 columns
 * @param options
 * @returns
 */
export declare const useFormColumns: (options: any) => {
    formColumns: FormItemProps[];
    searchColumns: {
        searchType?: string;
        searchSort?: number;
        searchLabel?: string;
        searchLabelWidth?: string | number;
        searchDefaultValue?: any;
        searchDisabled?: boolean;
        searchMultiple?: boolean;
        searchFormat?: string;
        searchDisabledDate?: string;
        searchEditable?: boolean;
        searchShortcuts?: any;
        searchMin?: number;
        searchMax?: number;
        searchPlaceholder?: string;
        searchPrefix?: Function;
        searchSuffix?: Function;
        searchPrepend?: Function;
        searchAppend?: Function;
        searchDicData?: {
            readonly value: string | number;
            readonly label: string;
        }[];
        onChangeSearch?: Function;
        readonly prop: string;
        label: string;
        type?: string;
        placeholder?: string;
        dicData?: {
            readonly value: string | number;
            readonly label: string;
        }[];
        loadDicData?: Function;
        disabled?: boolean;
        defaultValue?: any;
        labelWidth?: string | number;
        multiple?: boolean;
        prefix?: Function;
        suffix?: Function;
        prepend?: Function;
        append?: Function;
        sort?: number;
        required?: boolean;
        span?: number;
        tableSelect?: any;
        onChange?: Function;
    }[];
};
