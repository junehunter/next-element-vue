import type { FormItemProps } from 'packages/components/form/src/config';
import type { FormColunmProps, TableColumnProps, SearchColumnProps } from './config';
import { valueExist, arrayObjNoRepeat, shareObjectProperty } from 'packages/hooks/global-hook';
import { reactive } from 'vue';
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
export const updateFormColumns = (options: any, cb: Function) => {
	// 处理表单模块column，这里使用reactive是关键，当数据更新后界面更新
	const _columns = reactive(options.columns);
	const _loadDicData = (col: any) => {
		if (!col.dicData?.length && col.loadDicData) {
			col.loadDicData(col, data => {
				if (data?.length) col.dicData = data;
			});
		}
	};
	const loopTableColumns = (list: TableColumnProps[]) => {
		let cols = [];
		list.forEach((col: TableColumnProps) => {
			_loadDicData(col);
			cols.push(col);
			if (col.children?.length) {
				cols.push(...loopTableColumns(col.children));
				if (col.children) delete col.children;
			}
		});
		return cols;
	};
	const evenTableColumns = loopTableColumns(_columns);
	const formColumns = options.formColumns.map((col: FormItemProps) => {
		_loadDicData(col);
		return col;
	});
	const mergeFormColumns = evenTableColumns.concat(formColumns).map((col: FormColunmProps & FormItemProps) => {
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
			hide: valueExist(col.formHide, col.hide, false),
			disabled: valueExist(col.formDisabled, col.disabled, false),
			clearable: valueExist(col.formClearable, col.clearable, true),
			readonly: valueExist(col.formReadonly, col.readonly, false),
			disabledDate: valueExist(col.formDisabledDate, col.disabledDate, false),
			shortcuts: valueExist(col.formShortcuts, col.shortcuts, null),
			tip: valueExist(col.formTip, col.tip, null),
			rules: valueExist(col.formRules, col.rules, null),
			span: valueExist(col.formSpan, col.span, null),
			multiple: valueExist(col.formMultiple, col.multiple, false),
			limit: valueExist(col.formLimit, col.limit, 1),
			dicData: valueExist(col.formDicData, col.dicData, []),
			loadDicData: valueExist(col.formLoadDicData, col.loadDicData, null),
			onChange: valueExist(col.onChangeForm, col.onChange, null),
			tableSelect: valueExist(col.tableSelect, {}),
			tableSelectRows: valueExist(col.tableSelectRows, []),
			tableSelectProps: valueExist(col.tableSelectProps, null),
			tableSelectDefaultValue: valueExist(col.tableSelectDefaultValue, null),
			onTableSelect: valueExist(col.onTableSelect, null),
			filterable: valueExist(col.filterable, false),
			nodeKey: valueExist(col.formNodeKey, col.nodeKey),
			accordion: valueExist(col.formAccordion, col.accordion, false),
			leafOnly: valueExist(col.formLeafOnly, col.leafOnly, false),
			showCheckbox: valueExist(col.formShowCheckboxn, col.showCheckbox, false),
			checkStrictly: valueExist(col.formCheckStrictly, col.checkStrictly, false),
			renderAfterExpand: valueExist(col.formRenderAfterExpand, col.renderAfterExpand, false),
			treeSelectProps: valueExist(col.formTreeSelectProps, col.treeSelectProps, null),
			treeSelectNodeClick: valueExist(col.treeSelectNodeClickForm, col.treeSelectNodeClick, null),
			treeSelectNodeContextmenu: valueExist(col.treeSelectNodeContextmenuForm, col.treeSelectNodeContextmenu, null),
			treeSelectCheck: valueExist(col.treeSelectCheckForm, col.treeSelectCheck, null),
			treeSelecCheckChange: valueExist(col.treeSelecCheckChangeForm, col.treeSelecCheckChange, null),
			treeSelecNodeExpand: valueExist(col.treeSelecNodeExpandForm, col.treeSelecNodeExpand, null),
			treeSelecNodeCollapse: valueExist(col.treeSelecNodeCollapseForm, col.treeSelecNodeCollapse, null),
			treeSelecCurrentChange: valueExist(col.treeSelecCurrentChangeForm, col.treeSelecCurrentChange, null),
		};
		/**
		 * 对应属性指向原数据，search和form共享数据和方法
		 * 好处是数据共享，缺点是共享数据会相互篡改
		 */
		// return Object.assign(col, item);
		if (!col.dicData?.length && col.loadDicData) {
			// 只共享dicData属性，替换 Object.assign
			shareObjectProperty(item, col, 'dicData');
		}
		return item;
	});
	const filterFormColumns = mergeFormColumns.filter((o: FormItemProps) => o.sort && o.prop) as any[];
	const _formColumns = filterFormColumns.sort((a: FormItemProps, b: FormItemProps) => a.sort - b.sort);
	// 处理查询表单column
	const _formatSearchColumn = (col: SearchColumnProps & FormItemProps, index: number) => {
		const item: SearchColumnProps & FormItemProps = {
			prop: col.prop,
			type: valueExist(col.searchType, col.type),
			multiple: valueExist(col.searchMultiple, col.multiple),
			searchFormat: valueExist(col.searchFormat, null),
			label: valueExist(col.searchLabel, col.label),
			defaultValue: valueExist(col.searchDefaultValue, col.defaultValue, null),
			placeholder: valueExist(col.searchPlaceholder, col.placeholder, null),
			dicData: valueExist(col.searchDicData, col.dicData, []),
			loadDicData: valueExist(col.searchLoadDicData, col.loadDicData, null),
			disabled: valueExist(col.searchDisabled, col.disabled, false),
			readonly: valueExist(col.searchReadonly, col.readonly, false),
			prefix: valueExist(col.searchPrefix, col.prefix, null),
			suffix: valueExist(col.searchSuffix, col.suffix, null),
			prepend: valueExist(col.searchPrepend, col.prepend, null),
			append: valueExist(col.searchAppend, col.append, null),
			hide: valueExist(col.searchHide, false),
			sort: valueExist(col.searchSort, col.sort, index),
			// tree select
			nodeKey: valueExist(col.searchNodeKey, col.nodeKey),
			accordion: valueExist(col.searchAccordion, col.accordion, false),
			leafOnly: valueExist(col.searchLeafOnly, col.leafOnly, false),
			showCheckbox: valueExist(col.searchShowCheckboxn, col.showCheckbox, false),
			checkStrictly: valueExist(col.searchCheckStrictly, col.checkStrictly, false),
			renderAfterExpand: valueExist(col.searchRenderAfterExpand, col.renderAfterExpand, false),
			treeSelectProps: valueExist(col.searchTreeSelectProps, col.treeSelectProps, null),
			treeSelectNodeClick: valueExist(col.treeSelectNodeClickSearch, col.treeSelectNodeClick, null),
			treeSelectNodeContextmenu: valueExist(col.treeSelectNodeContextmenuSearch, col.treeSelectNodeContextmenu, null),
			treeSelectCheck: valueExist(col.treeSelectCheckSearch, col.treeSelectCheck, null),
			treeSelecCheckChange: valueExist(col.treeSelecCheckChangeSearch, col.treeSelecCheckChange, null),
			treeSelecNodeExpand: valueExist(col.treeSelecNodeExpandSearch, col.treeSelecNodeExpand, null),
			treeSelecNodeCollapse: valueExist(col.treeSelecNodeCollapseSearch, col.treeSelecNodeCollapse, null),
			treeSelecCurrentChange: valueExist(col.treeSelecCurrentChangeSearch, col.treeSelecCurrentChange, null),
		};
		// 对应属性指向原数据，search和form共享数据和方法
		// return Object.assign(col, item);
		if (!col.dicData?.length && col.loadDicData) {
			// 只共享dicData属性，替换 Object.assign
			shareObjectProperty(item, col, 'dicData');
		}
		return item;
	};
	const initSearchColumns = options.searchColumns.map((col: SearchColumnProps, index: number) => {
		_loadDicData(col);
		return _formatSearchColumn(col, index);
	});
	const initSearchColumnsLength = initSearchColumns.length;
	const filterTableSearchColumns = (list: TableColumnProps[]) => {
		let cols = [];
		list.forEach((col: TableColumnProps, index: number) => {
			if (col.searchType) {
				cols.push(_formatSearchColumn(col, index + initSearchColumnsLength));
			}
		});
		return cols;
	};
	const mergeSearchColumns = initSearchColumns.concat(filterTableSearchColumns(evenTableColumns));
	const _searchColumns = arrayObjNoRepeat(
		mergeSearchColumns.sort((a: SearchColumnProps, b: SearchColumnProps) => a.sort - b.sort),
		'prop'
	);
	const params = {
		formColumns: _formColumns,
		searchColumns: _searchColumns,
		columns: _columns,
	};
	cb && cb(params);
};
