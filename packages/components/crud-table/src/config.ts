export declare interface DictData {
	readonly value: string | number;
	readonly label: string;
}

export declare interface Column {
	readonly prop: string;
	label: string;
	type?: string;
	placeholder?: string;
	dicKey?: string;
	dicData?: DictData[];
	loadDicData?: Function;
	disabled?: boolean;
	readonly?: boolean;
	defaultValue?: any;
	labelWidth?: string | number;
	multiple?: boolean;
	prefix?: Function;
	suffix?: Function;
	prepend?: Function;
	append?: Function;
	sort?: number;
	required?: boolean;
	hide?: boolean;
	span?: number;
	tableSelect?: any;
	onChange?: Function;
}

export interface SearchColumnProps extends Column {
	searchType?: string;
	searchSort?: number;
	searchLabel?: string;
	searchLabelWidth?: string | number;
	searchDefaultValue?: any;
	searchDisabled?: boolean;
	searchReadonly?: boolean;
	searchHide?: boolean;
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
	searchDicKey?: string;
	searchDicData?: DictData[];
	searchLoadDicData?: Function;
	onChangeSearch?: Function;
	// tree select
	searchNodeKey?: string;
	searchAccordion?: boolean;
	searchLeafOnly?: boolean;
	searchShowCheckboxn?: boolean;
	searchCheckStrictly?: boolean;
	searchRenderAfterExpand?: boolean;
	searchTreeSelectProps?: string;
	treeSelectNodeClickSearch?: Function;
	treeSelectNodeContextmenuSearch?: Function;
	treeSelectCheckSearch?: Function;
	treeSelecCheckChangeSearch?: Function;
	treeSelecNodeExpandSearch?: Function;
	treeSelecNodeCollapseSearch?: Function;
	treeSelecCurrentChangeSearch?: Function;
}

export interface FormColunmProps extends Column {
	formSort?: number;
	formType?: string;
	formDefaultValue?: any;
	formPlaceholder?: string;
	formDisabled?: string;
	formClearable?: boolean;
	formReadonly?: boolean;
	formRequired?: boolean;
	formHide?: boolean;
	formPrefix?: Function;
	formSuffix?: Function;
	formPrepend?: Function;
	formAppend?: Function;
	formSpan?: number;
	formTip?: string;
	formLabel?: string;
	formMutiple?: boolean;
	formDisabledDate?: Function;
	formShortcuts?: any[];
	formDivider?: any;
	formRemark?: string;
	formRules?: any[];
	formDicKey?: string;
	formMultiple?: boolean;
	formLimit?: number;
	formDicData?: DictData[];
	formLoadDicData?: Function;
	formAccordion?: boolean;
	onChangeForm?: Function;
	// tree select
	formNodeKey?: string;
	formCheckStrictly?: boolean;
	formLeafOnly?: boolean;
	formShowCheckboxn?: boolean;
	formRenderAfterExpand?: boolean;
	formTreeSelectProps?: string;
	treeSelectNodeClickForm?: Function;
	treeSelectNodeContextmenuForm?: Function;
	treeSelectCheckForm?: Function;
	treeSelecCheckChangeForm?: Function;
	treeSelecNodeExpandForm?: Function;
	treeSelecNodeCollapseForm?: Function;
	treeSelecCurrentChangeForm?: Function;
}

export interface TableColumnProps extends SearchColumnProps, FormColunmProps {
	width?: string | number;
	minWidth?: string | number;
	fixed?: string | boolean;
	formatter?: Function;
	showOverflowTooltip?: boolean | object;
	headerAlign?: string;
	align?: string;
	sortable?: boolean;
	cellUnit?: string;
	children?: TableColumnProps[];
	renderColumnCell?: Function;
}

export const header_menu_slots_key = ['menu-left-prefix', 'menu-left-suffix', 'menu-right-prefix', 'menu-right-suffix'];
export const operation_column_slots_key = ['operation-column-prefix', 'operation-column-suffix'];

export default {
	initLoadData: true, // 初始是否默认加载数据
	defaultContentHeight: 300,
	fullscreenchangeContentHeight: false, // 是否开启监听全屏改变是动态设置table内容高度，默认关闭
	rowKey: 'id',
	size: 'default', // large / default / small
	fit: true,
	stripe: true, // 是否为斑马纹 table
	border: true,
	index: true, // 是否显示序号
	selection: true, // 是否显示选项框
	headerAlign: 'center',
	cellAlign: 'center',
	columnMinWidth: '100px',
	columns: <TableColumnProps | unknown>[],
	// 搜兰模块
	showSearchForm: true,
	showHeaderMenu: true,
	showSearchLabel: true,
	searchSpan: 4,
	searchGutter: 20,
	searchLabelWidth: '5em',
	searchColumnMinWidth: 300, // 搜索栏最小宽度
	searchColumns: <SearchColumnProps | unknown>[],
	// 操作栏显示按钮
	addBtn: true,
	viewBtn: true,
	delBtn: true,
	editBtn: true,
	batchDelBtn: false, // 批量删除按钮
	refreshBtn: true, // table刷新按钮
	settingBtn: true, // table设置按钮
	operations: true, // 是否显示操作栏
	operationsWidth: 260,
	operationsHeaderAlign: 'center',
	operationsColumnAlign: 'center',
	operationsBtnPlain: false,
	operationsBtnText: true,
	operationsBtnSize: 'small', // large / default / small
	addBtnText: '', // 新增按钮名称
	// 分页
	isPagination: true,
	// 新增/编辑/详情 弹框
	dialogTitle: '',
	dialogWidth: '60%',
	dialogFullscreen: false, // 是否全屏
	closeOnClickModal: false,
	formColumns: <FormColunmProps | unknown>[],
	formLabelWidth: '5em',
	formSpan: 12,
	formColumnMinWidth: 350,
};
