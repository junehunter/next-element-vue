export declare interface DicData {
	readonly value: string | number;
	readonly label: string;
	disabled?: boolean;
}
export interface FormItemProps {
	readonly type?: string;
	prop: string;
	label: string;
	sort?: number;
	span?: number;
	defaultValue?: any;
	placeholder?: string;
	disabled?: boolean;
	required?: boolean;
	prefix?: Function;
	suffix?: Function;
	prepend?: Function;
	append?: Function;
	tip?: string;
	format?: string;
	readonly?: boolean;
	filterable?: boolean;
	clearable?: boolean;
	dicData?: DicData[];
	loadDicData?: Function;
	hide?: boolean;
	multiple?: boolean;
	editable?: boolean;
	rules?: any;
	disabledDate?: Function;
	shortcuts?: any[];
	divider?: any;
	remark?: string;
	onChange?: Function;
	tableSelect?: any;
	tableSelectRows?: any[];
	tableSelectProps?: {
		label: string;
		value: string | number;
	};
	tableSelectDefaultValue?: Function;
	onTableSelect?: Function;
	// tree select
	nodeKey?: string;
	accordion?: boolean;
	checkStrictly?: boolean;
	showCheckbox?: boolean;
	leafOnly?: boolean;
	renderAfterExpand?: boolean;
	treeSelectProps?: Object;
	treeSelectNodeClick?: Function;
	treeSelectNodeContextmenu?: Function;
	treeSelectCheck?: Function;
	treeSelecCheckChange?: Function;
	treeSelecNodeExpand?: Function;
	treeSelecNodeCollapse?: Function;
	treeSelecCurrentChange?: Function;
}
export const tableSelectConfig = {
	selection: false, // 是否显示选项框
	selectType: 'radio', // radio, checkbox
	// 操作栏显示按钮
	addBtn: false,
	viewBtn: false,
	delBtn: false,
	editBtn: false,
	batchDelBtn: false, // 批量删除按钮
	dialogWidth: '60%',
	dialogFullscreen: false, // 是否全屏
	closeOnClickModal: false,
	refreshBtn: true, // table刷新按钮
	settingBtn: true, // table设置按钮
	operations: false, // 是否显示操作栏
};
export default {
	size: 'default', // large / default / small
	colSpan: 8,
	labelWidth: '6em',
	columnMinWidth: 350,
	columns: <FormItemProps | unknown>[],
	formDatum: <any>{},
	tableSelectConfig: tableSelectConfig,
	isEditing: true, // 是否编辑
	showResetBtn: true, // 是否显示重置按钮

	showFooter: true,
};
