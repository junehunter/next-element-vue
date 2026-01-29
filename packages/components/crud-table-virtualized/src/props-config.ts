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
};
