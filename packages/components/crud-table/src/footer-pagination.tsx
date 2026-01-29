import { defineComponent, isRef, unref, inject } from 'vue';
import { ElPagination } from 'element-plus';
import { valueExist } from 'packages/hooks/global-hook';
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
		const handleCurrentChange = (number: number) => {
			page.pageNo = number;
			emit('change', page);
		};
		const handleSizeChange = (size: number) => {
			page.pageSize = size;
			emit('change', page);
		};
		const renderContent = () => {
			return (
				<ElPagination
					v-model:currentPage={page.pageNo}
					v-model:pageSize={page.pageSize}
					total={page.total}
					size={options.size}
					layout="total, sizes, prev, pager, next, jumper"
					page-sizes={valueExist(page.pageSizes, [10, 20, 30, 40, 50, 100])}
					onCurrent-change={handleCurrentChange}
					onSize-change={handleSizeChange}
				></ElPagination>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
