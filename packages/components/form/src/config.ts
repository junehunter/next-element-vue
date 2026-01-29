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
	_defaultValue?: any;
	disabled?: boolean;
	editDisabled?: boolean;
	textareaAutosize?: boolean | { minRows?: number; maxRows?: number };
	textareaRows?: number;
	inputMinlength?: number;
	inputMaxlength?: number;
	required?: boolean;
	prefix?: Function;
	suffix?: Function;
	prepend?: Function;
	append?: Function;
	format?: string;
	placeholder?: string;
	startPlaceholder?: string;
	endPlaceholder?: string;
	rangeSeparator?: string;
	timePickerProps?: {
		isRange?: boolean;
		rangeSeparator?: string;
		arrowControl?: boolean;
		placement?: string;
		disabledHours?: Function;
		disabledMinutes?: Function;
		disabledSeconds?: Function;
	};
	timeSelectProps?: {
		start?: string;
		end?: string;
		step?: string;
		minTime?: string;
		maxTime?: string;
	};
	readonly?: boolean;
	filterable?: boolean;
	allowCreate?: boolean;
	clearable?: boolean;
	dicData?: DicData[];
	loadDicData?: Function;
	hide?: boolean;
	multiple?: boolean;
	collapseTags?: boolean;
	limit?: number;
	accept?: string;
	editable?: boolean;
	rules?: any;
	disabledDate?: Function;
	shortcuts?: any[];
	tip?: string;
	renderDivider?: Function;
	remark?: string;
	onChange?: Function;
	onClear?: Function;
	onBlur?: Function;
	onFocus?: Function;
	onExceed?: Function;
	tableSelect?: any;
	tableSelectRows?: any[];
	tableSelectProps?: {
		value: string | number;
		label: string;
		required?: boolean;
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
	dialogCloseOnClickModal: false,
	refreshBtn: true, // table刷新按钮
	settingBtn: true, // table设置按钮
	operations: false, // 是否显示操作栏
	dialogModal: true, // 是否显示遮罩层
};
export default {
	size: 'default', // large / default / small
	colSpan: 12,
	labelWidth: '6em',
	columnMinWidth: 350,
	columns: <FormItemProps | unknown>[],
	formDatum: <any>{},
	tableSelectConfig: tableSelectConfig,
	isEditing: true, // 是否编辑
	showResetBtn: true, // 是否显示重置按钮

	showFooter: true,
	submitText: null,
	resetText: null,
};
