export declare interface DictData {
	readonly value: string | number;
	readonly label: string;
}

export declare interface Column {
	readonly prop: string;
	label: string;
	type?: string;
	placeholder?: string;
	dicData?: DictData[];
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
}

export interface SearchColumnProps extends Column {
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
	searchDicData?: DictData[];
	onChangeSearch?: Function;
}

export interface FormColunmProps extends Column {
	formSort: number;
	formType?: string;
	formDefaultValue?: any;
	formPlaceholder?: string;
	formDisabled?: string;
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
	formDivider?: any;
	formRemark?: string;
	formRules?: any[];
	formDicData?: DictData[];
	onChangeForm?: Function;
}

export interface TableColumnProps extends SearchColumnProps, FormColunmProps {
	expand?: string;
	width?: string | number;
	minWidth?: string | number;
	fixed?: string | boolean;
	formatter?: Function;
	showOverflowTooltip?: boolean | object;
	headerAlign?: string;
	align?: string;
	hide?: boolean;
	sortable?: boolean;
	children?: TableColumnProps[];
}

export const header_menu_solts_key = ['menu-left-prefix', 'menu-left-suffix', 'menu-right-prefix', 'menu-right-suffix'];

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
	searchSpan: 4,
	searchGutter: 20,
	searchLabelWidth: '5em',
	searchColumnMinWidth: 300, // 搜索栏最小宽度
	searchColumn: <SearchColumnProps | unknown>[],
	searchMore: true, // 更多查询按钮显示
	// 操作栏显示按钮
	addBtn: true,
	viewBtn: true,
	delBtn: true,
	editBtn: true,
	batchDelBtn: false, // 批量删除按钮
	refreshBtn: true, // table刷新按钮
	settingBtn: true, // table设置按钮
	operations: true, // 是否显示操作栏
	operationsBtnPlain: false,
	operationsBtnText: true,
	operationsWidth: 260,
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
