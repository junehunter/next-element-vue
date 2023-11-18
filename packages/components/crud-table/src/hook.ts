import type { FormItemProps } from 'packages/components/form/src/config';
import type { FormColunmProps, TableColumnProps, SearchColumnProps } from './config';
import { deepClone, valueExist, arrayObjNoRepeat } from 'packages/hooks/global-hook';
import { reactive, ref } from 'vue';
/**
 * 自定义table中column的slot name
 * @param prop
 * @returns
 */
export const columnSlotNamePrefix = 'column-';
export const columnSlotName = (prop: string): string => {
	return columnSlotNamePrefix + prop;
};
/**
 * 自定义搜索栏中form的slot name
 * @param prop
 * @returns
 */
export const searchFormSlotNamePrefix = 'search-';
export const searchFormSlotName = (prop: string): string => {
	return searchFormSlotNamePrefix + prop;
};
/**
 * 自定义新增编辑表单中form的slot name
 * @param prop
 * @returns
 */
export const formSlotNamePrefix = 'form-';
export const formSlotName = (prop: string): string => {
	return formSlotNamePrefix + prop;
};
export const vaildData = (val: boolean, dafult: any) => {
	if (typeof val === 'boolean') {
		return val;
	}
	return dafult;
};

export const getColumnProp = () => {};

/**
 * 将已'-'分割的字符串转换为驼峰
 * @param str
 * @returns
 */
export const toHump = (str: string): string => {
	const arr = str.split('-');
	let res = '';
	arr.forEach(v => {
		res += v.charAt(0).toUpperCase() + v.slice(1);
	});
	return res;
};
/**
 * 获取菜单树默认展开节点keys
 * @param treeData
 * @returns
 */
export const getDefaultExpandedKeys = (treeData: any): string[] => {
	const loopTreeLevle = (tree: any) => {
		let maxDepth = 0;
		function traverse(node: any, depth: number) {
			if (depth > maxDepth) {
				maxDepth = depth;
			}

			if (node.children && node.children.length > 0) {
				for (let child of node.children) {
					traverse(child, depth + 1);
				}
			}
		}

		for (let node of tree) {
			traverse(node, 1);
		}

		return maxDepth;
	};
	const level = loopTreeLevle(treeData);
	const getTreeDataLevel = (tree: any, levels: number) => {
		const result = [] as any;
		function traverse(node: any, depth: any) {
			if (depth <= levels) {
				result.push(node.id);

				if (node.children && node.children.length > 0) {
					for (let child of node.children) {
						traverse(child, depth + 1);
					}
				}
			}
		}
		for (let node of tree) {
			traverse(node, 1);
		}
		return result;
	};
	const checkNode = getTreeDataLevel(treeData, level > 3 ? 3 : level);
	return checkNode;
};
/**
 * 获取筛选表单和新增编辑表单 columns
 * @param options
 * @returns
 */
export const updateFormColumns = async (options: any, cb: Function) => {
	// 获取表单模块column
	const _columns = reactive(options.columns);
	const loopFormColumns = (list: TableColumnProps[]) => {
		let cols = [];
		list.forEach(async (col: TableColumnProps) => {
			if (!col.dicData?.length && col.loadDicData) {
				await col.loadDicData(col, data => {
					if (data?.length) col.dicData = data;
				});
			}
			cols.push(col);
			if (col.children?.length) {
				cols.push(...loopFormColumns(col.children));
				if (col.children) delete col.children;
			}
		});
		return cols;
	};
	const evenColumns = await loopFormColumns(_columns);
	const formColumns = options.formColumns;
	const mergeColumns = evenColumns.concat(formColumns).map((col: FormColunmProps) => {
		const item: FormItemProps = {
			prop: col.prop,
			label: valueExist(col.formLabel, col.label, ''),
			type: valueExist(col.formType, col.type, ''),
			defaultValue: valueExist(col.formDefaultValue, col.defaultValue, ''),
			placeholder: valueExist(col.formPlaceholder, ''),
			required: valueExist(col.formRequired, col.required, false),
			sort: valueExist(col.formSort, col.sort, null),
			prefix: valueExist(col.formPrefix, col.prefix, null),
			suffix: valueExist(col.formSuffix, col.suffix, null),
			prepend: valueExist(col.formPrepend, col.prepend, null),
			append: valueExist(col.formAppend, col.append, null),
			hide: valueExist(col.formHide, false),
			disabled: valueExist(col.formDisabled, col.disabled, false),
			span: valueExist(col.formSpan, col.span, null),
			dicData: valueExist(col.formDicData, col.dicData, []),
			loadDicData: valueExist(col.formLoadDicData, col.loadDicData, null),
			onChange: valueExist(col.onChangeForm, col.onChange, null),
			tableSelect: valueExist(col.tableSelect, {}),
		};
		return item;
	});
	const filterColumns = mergeColumns.filter((o: FormItemProps) => o.sort && o.prop) as any[];
	const formColumnsLast = filterColumns.sort((a: FormItemProps, b: FormItemProps) => a.sort - b.sort);
	const _formColumnsLast: FormItemProps[] = deepClone(formColumnsLast);

	// 获取筛选表单column
	const searchColumn = ref<SearchColumnProps[]>([]);
	searchColumn.value = options.searchColumn.map((col: SearchColumnProps, index: number) => {
		const item = {
			...col,
			sort: index,
		};
		return item;
	});
	const searchColumnLength = searchColumn.value.length;
	const loopColumns = (list: TableColumnProps[]) => {
		let cols = [];
		list.forEach((col: TableColumnProps, index: number) => {
			if (col.searchType) {
				const item: SearchColumnProps = {
					prop: col.prop,
					type: valueExist(col.searchType, col.type),
					label: valueExist(col.searchLabel, col.label),
					defaultValue: valueExist(col.searchDefaultValue, col.defaultValue, null),
					placeholder: valueExist(col.searchPlaceholder, col.placeholder, null),
					dicData: valueExist(col.searchDicData, col.dicData, []),
					disabled: valueExist(col.searchDisabled, col.disabled, false),
					prefix: valueExist(col.searchPrefix, col.prefix, null),
					suffix: valueExist(col.searchSuffix, col.suffix, null),
					prepend: valueExist(col.searchPrepend, col.prepend, null),
					append: valueExist(col.searchAppend, col.append, null),
					sort: valueExist(col.searchSort, col.sort, searchColumnLength + index),
				};
				cols.push(item);
			}
			if (col.children?.length) {
				cols.push(...loopColumns(col.children));
			}
		});
		return cols;
	};
	searchColumn.value.push(...loopColumns(_columns));
	searchColumn.value = arrayObjNoRepeat(
		searchColumn.value.sort((a: SearchColumnProps, b: SearchColumnProps) => a.sort - b.sort),
		'prop'
	);
	const params = {
		formColumns: _formColumnsLast,
		searchColumns: searchColumn.value,
		columns: _columns,
	};
	cb && cb(params);
};
