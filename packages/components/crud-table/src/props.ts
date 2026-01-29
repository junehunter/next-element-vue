import type { PropType, CSSProperties } from 'vue';
export default {
	className: {
		type: String,
		default: '',
	},
	style: {
		type: Object as PropType<CSSProperties>,
		default: () => ({}),
	},
	options: {
		type: Object,
		default: () => {
			return {};
		},
	},
	loading: {
		type: Boolean,
		default: false,
	},
	data: {
		type: Array,
		default: () => {
			return [];
		},
	},
	page: {
		type: Object,
		default: () => {
			return {
				pageNo: 1,
				pageSize: 10,
				total: 0,
			};
		},
	},
	rowStyle: {
		type: Function,
		default: undefined,
	},
	rowClassName: {
		type: Function,
		default: undefined,
	},
	cellStyle: {
		type: Function,
		default: undefined,
	},
	cellClassName: {
		type: Function,
		default: undefined,
	},
	headerRowStyle: {
		type: Function,
		default: undefined,
	},
	headerRowClassName: {
		type: Function,
		default: undefined,
	},
	headerCellStyle: {
		type: Function,
		default: undefined,
	},
	headerCellClassName: {
		type: Function,
		default: undefined,
	},
	spanMethod: {
		type: Function,
		default: undefined,
	},
};
