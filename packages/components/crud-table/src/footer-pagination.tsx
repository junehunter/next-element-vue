import { defineComponent, isRef, unref, inject } from 'vue';
import { ElPagination } from 'element-plus';
export default defineComponent({
	name: 'FooterPagination',
	props: {
		page: {
			type: Object,
			default: () => {},
		},
	},
	emits: ['change'],
	setup(props, { emit }) {
		const _options = inject('options', {} as any);
		const options = isRef(_options) ? unref(_options) : _options;
		const page = props.page;
		const handleCurrentChange = (index: number) => {
			page.pageIndex = index;
			emit('change', page);
		};
		const handleSizeChange = (size: number) => {
			page.pageSize = size;
			emit('change', page);
		};
		const renderContent = () => {
			return (
				<ElPagination
					v-model:currentPage={page.pageIndex}
					v-model:pageSize={page.pageSize}
					total={page.total}
					small={options.size === 'small'}
					layout="total, sizes, prev, pager, next, jumper"
					page-sizes={[10, 20, 30, 40, 50, 100]}
					onCurrent-change={handleCurrentChange}
					onSize-change={handleSizeChange}
				></ElPagination>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
