import { defineComponent, inject, reactive, ref, isRef, unref, onMounted, getCurrentInstance } from 'vue';
import { ElForm, ElRow, ElCol, ElFormItem, ElButton, ElIcon } from 'element-plus';
import { Search, Delete, DArrowLeft, DArrowRight, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import type { SearchColumnProps } from './config';
import { elementResize, isValueExist } from 'packages/hooks/global-hook';
import SearchColumn from './widgets/search-column';
import { useLocale } from 'packages/hooks';

export default defineComponent({
	name: 'HeaderSearch',
	props: {
		columns: {
			type: Array,
			default: () => {
				return [];
			},
		},
	},
	emits: ['confirmSearch', 'clearSearch', 'zoomResize'],
	setup(props, { emit, slots }) {
		const _options = inject('options', {} as any);
		const options = isRef(_options) ? unref(_options) : _options;
		const ns = inject('ns', {} as any);
		const { t } = useLocale();
		const searchFormSlots = inject('searchFormSlots') as any;
		const searchFrom_slots = {};
		searchFormSlots.value.forEach(slotName => {
			searchFrom_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		const searchParams = reactive<any>({});
		const columns = ref<SearchColumnProps | any>(props.columns);
		// 初始化表单参数
		const _initSearchFormParams = () => {
			columns.value.forEach((col: SearchColumnProps) => {
				searchParams[col.prop] = '';
				if (isValueExist(col.defaultValue)) {
					searchParams[col.prop] = col.defaultValue;
				}
			});
		};
		_initSearchFormParams();
		const onConfirmSearch = () => {
			emit('confirmSearch', searchParams);
		};
		// 清空重置表单并查询
		const onClearSearch = () => {
			_initSearchFormParams();
			onConfirmSearch();
			emit('clearSearch');
		};
		const searchSpan = ref<number>(options.searchSpan);
		const columnsLength = columns.value.length;
		const sliceIndex = ref<number>(columnsLength);
		const showColumns = ref<SearchColumnProps | any>(columns.value);
		const moreColumns = ref<SearchColumnProps | any>([]);
		const isColumnMinWidth = ref<boolean>(false);
		const updateSearchSpan = (el: HTMLElement) => {
			const formWidth = el.clientWidth;
			const minWidth = options.searchColumnMinWidth;
			// 一行最多多少列
			let span = Math.floor(formWidth / minWidth);
			// 每列的span数量
			searchSpan.value = Math.ceil(24 / span);
			const remainder = 24 % searchSpan.value;
			if (remainder) {
				// 当不能被24除尽，取余作为span数量
				searchSpan.value = remainder;
				span = 24 / searchSpan.value;
			}
			sliceIndex.value = span;
			if (columnsLength >= sliceIndex.value) {
				const index = sliceIndex.value - 1;
				showColumns.value = columns.value.slice(0, index);
				moreColumns.value = columns.value.slice(index);
			} else {
				// 当总长度小于span时
				showColumns.value = columns.value;
				moreColumns.value = [];
			}
			// 当column小于最新宽度时修改缩小（展开/收起）按钮
			const columnWidth = Math.floor(formWidth / span);
			isColumnMinWidth.value = columnWidth < minWidth;
		};
		const { proxy } = getCurrentInstance() as any;
		onMounted(() => {
			const tableSearchFormEl = proxy.$refs.tableSearchForm?.$el;
			if (tableSearchFormEl) {
				elementResize(tableSearchFormEl, (el: HTMLElement) => {
					updateSearchSpan(el);
					// 头部搜索栏窗口大小发生变化时，更新table内容高度
					emit('zoomResize');
				});
			}
		});
		const isExpand = ref<boolean>(false);
		const onSwitchExpand = () => {
			isExpand.value = !isExpand.value;
		};
		const renderMoreBtn = () => {
			if (moreColumns.value.length) {
				if (isColumnMinWidth.value) {
					return (
						<ElButton type="primary" text bg circle class={ns.b('header-search-expandBtn')} onClick={onSwitchExpand}>
							{{
								icon: () => (isExpand.value ? <DArrowLeft /> : <DArrowRight />),
							}}
						</ElButton>
					);
				} else {
					return (
						<ElButton type="primary" text bg class={ns.b('header-search-expandBtn')} onClick={onSwitchExpand}>
							{{
								icon: () =>
									isExpand.value ? (
										<ElIcon>
											<ArrowUp />
										</ElIcon>
									) : (
										<ElIcon>
											<ArrowDown />
										</ElIcon>
									),
								default: () => (isExpand.value ? t('next.table.foldSearch') : t('next.table.unfoldSearch')),
							}}
						</ElButton>
					);
				}
			}
			return null;
		};
		const renderContent = () => {
			return columns.value.length ? (
				<ElForm ref="tableSearchForm" inline={true} size={options.size} model={searchParams} class={ns.b('header')}>
					<ElRow gutter={options.searchGutter} class={ns.b('header-search')}>
						<SearchColumn searchSpan={searchSpan.value} columns={showColumns.value} formParams={searchParams}>
							{searchFrom_slots}
						</SearchColumn>
						{isExpand.value ? (
							<SearchColumn searchSpan={searchSpan.value} columns={moreColumns.value} formParams={searchParams}>
								{searchFrom_slots}
							</SearchColumn>
						) : null}
						<ElCol span={searchSpan.value} class={ns.b('header-search-btns')}>
							<ElFormItem>
								<ElButton type="primary" onClick={onConfirmSearch}>
									{{
										icon: () => (
											<ElIcon>
												<Search />
											</ElIcon>
										),
										default: () => t('next.table.search'),
									}}
								</ElButton>
								<ElButton onClick={onClearSearch}>
									{{
										icon: () => (
											<ElIcon>
												<Delete />
											</ElIcon>
										),
										default: () => t('next.table.clear'),
									}}
								</ElButton>
								{renderMoreBtn()}
							</ElFormItem>
						</ElCol>
					</ElRow>
				</ElForm>
			) : null;
		};
		return () => <>{renderContent()}</>;
	},
});
