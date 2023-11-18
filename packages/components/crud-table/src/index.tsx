import { ref, unref, defineComponent, reactive, provide, watch, onMounted, onUnmounted, nextTick, computed, toRaw } from 'vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { ElTable, ElEmpty, ElTableColumn } from 'element-plus';
import { merge } from 'lodash-unified';
import isEqual from 'lodash-es/isequal';
import { deepClone, elementResize, isValueExist } from 'packages/hooks/global-hook';
import defaultPropsConfig from './props';
import defaultConfig, { header_menu_solts_key } from './config';
import type { TableColumnProps, SearchColumnProps, FormColunmProps } from './config';
import { columnSlotNamePrefix, searchFormSlotNamePrefix, formSlotNamePrefix, updateFormColumns } from './hook';
import NextSpinLoading from 'packages/components/spin-loading/src';
import HeaderSearch from './header-search';
import HeaderMenu from './header-menu';
import TableColumnDynamic from './widgets/table-column-dynamic';
import TableColumnOperations from './widgets/table-column-operations';
import FooterPagination from './footer-pagination';
import NextDialog from 'packages/components/dialog/src';
import AddEditForm from './widgets/add-edit-form';

const ns = useNamespace('crud-table');
export default defineComponent({
	name: 'NextCrudTable',
	props: defaultPropsConfig,
	emits: ['confirm-search', 'clear-search', 'change-pagination', 'selection-change', 'row-click', 'click-add-edit', 'close-add-edit', 'delete-rows', 'delete-row', 'submit-form'],
	setup(props, { emit, slots, expose }) {
		const _config = deepClone(defaultConfig);
		const _options = computed(() => {
			const cfg = unref(props.options);
			return merge(_config, cfg);
		});
		const options = unref(_options);
		provide('options', computed(() => _options.value)); // prettier-ignore
		provide('ns', ns);
		const { t } = useLocale();
		const _columns = ref<TableColumnProps[]>(options.columns);
		const _searchColumns = ref<SearchColumnProps[]>([]);
		const _formColumns = ref<FormColunmProps[]>([]);
		updateFormColumns(options, ({ formColumns, searchColumns, columns }) => {
			// 获取搜索栏数据
			_searchColumns.value = searchColumns;
			// 获取新增编辑表单栏数据
			_formColumns.value = formColumns;
			// 获取table column数据
			_columns.value = columns;
		});
		const tableData = ref(props.data);
		const _getDefaultSearchFormParams = () => {
			const list = _searchColumns.value;
			let params: { [key: string]: any } = {};
			for (let i = 0; i < list.length; i++) {
				const item = list[i];
				// 设置搜索表单默认值，只取有值属性
				if (isValueExist(item.defaultValue)) {
					params[item.prop] = item.defaultValue;
				}
			}
			return params;
		};
		const _searchFormParams = ref<any>(_getDefaultSearchFormParams());
		const onConfirmSearch = (searchParams: any) => {
			const params = deepClone(toRaw(searchParams));
			// 参数对比，当查询参数有修改时设置分页为第一页
			if (!isEqual(_searchFormParams.value, params)) {
				props.page.pageIndex = 1;
				_searchFormParams.value = params;
			}
			emit('confirm-search', params);
		};
		const onClearSearch = () => {
			emit('clear-search');
		};
		const onClickRefresh = () => {
			onConfirmSearch(_searchFormParams.value);
		};
		watch(
			() => props.data,
			list => {
				tableData.value = list;
			},
			{
				immediate: true,
			}
		);
		const tableContentHeight = ref(options.defaultContentHeight);
		const crudTableRef = ref<HTMLElement>();
		const headerRef = ref<HTMLElement>();
		const tableRef = ref<HTMLElement>();
		const footerRef = ref<HTMLDivElement>();
		const addEditFormRef = ref<any>(null);
		const updateTableContentHeight = () => {
			nextTick(() => {
				const layoutCrudHeight = (crudTableRef.value as HTMLDivElement)?.clientHeight || 0;
				const headerHeight = (headerRef.value as HTMLDivElement)?.clientHeight || 0;
				const footerHeight = (footerRef.value as HTMLDivElement)?.clientHeight || 0;
				const contentHeight = layoutCrudHeight - (headerHeight + footerHeight);
				tableContentHeight.value = contentHeight;
			});
		};
		const fullscreenChangeListener = (event: any) => {
			if (event.key === 'F11' || event.type === 'fullscreenchange') {
				updateTableContentHeight();
			}
		};
		onMounted(() => {
			elementResize(crudTableRef.value as HTMLElement, () => {
				updateTableContentHeight();
			});
			if (options.initLoadData) {
				// 初始默认加载数据
				onConfirmSearch(_searchFormParams.value);
			}
			if (options.fullscreenchangeContentHeight) {
				document.addEventListener('fullscreenchange', fullscreenChangeListener);
				document.addEventListener('keydown', fullscreenChangeListener);
			}
		});
		onUnmounted(() => {
			if (options.fullscreenchangeContentHeight) {
				document.removeEventListener('fullscreenchange', fullscreenChangeListener);
				document.removeEventListener('keydown', fullscreenChangeListener);
			}
		});
		const onChangePagination = (page: any) => {
			props.page.pageIndex = page.pageIndex;
			props.page.pageSize = page.pageSize;
			emit('change-pagination', page);
			onConfirmSearch(_searchFormParams.value);
		};
		const multipleSelection = ref<any[]>([]);
		const onSelectionChange = (val: any) => {
			multipleSelection.value = val;
			emit('selection-change', multipleSelection.value);
		};
		provide('multipleSelection', multipleSelection);
		const addEditDialog = reactive({
			visible: false,
			title: t('next.table.add'),
			rowInfo: {} as any,
			isEditing: true,
		});
		const onClickHeaderAdd = () => {
			const { dialogTitle } = options;
			addEditDialog.visible = true;
			addEditDialog.isEditing = true;
			addEditDialog.title = dialogTitle + ' ' + t('next.table.add');
			nextTick(() => {
				emit('click-add-edit', {});
			});
		};
		const onClickDeleteRows = (rows: any) => {
			emit('delete-rows', rows, () => {
				onClickRefresh();
			});
		};
		const onClickDeleteRow = (scoped: any) => {
			emit('delete-row', scoped, () => {
				onClickRefresh();
			});
		};
		const onClickRowEdit = (scoped: any) => {
			const { dialogTitle } = options;
			addEditDialog.visible = true;
			addEditDialog.isEditing = true;
			addEditDialog.title = dialogTitle + ' ' + t('next.table.edit');
			addEditDialog.rowInfo = scoped.row;
			// 将编辑弹框中的表单数据传出去
			nextTick(() => {
				emit('click-add-edit', scoped.row);
			});
		};
		const onClickRowView = (scoped: any) => {
			const { dialogTitle } = options;
			addEditDialog.visible = true;
			addEditDialog.isEditing = false;
			addEditDialog.title = dialogTitle + ' ' + t('next.table.view');
			addEditDialog.rowInfo = scoped.row;
		};
		const onCloseAddEditDialog = () => {
			addEditDialog.visible = false;
			addEditDialog.title = '';
			addEditDialog.rowInfo = {};
			emit('close-add-edit');
		};
		const onSubmitAddEditDialog = (...arg) => {
			emit('submit-form', ...arg);
		};
		const columnSlots = ref<string[]>([]);
		const searchFormSlots = ref<string[]>([]);
		const addEditFormSlots = ref<string[]>([]);
		for (const key in slots) {
			if (key.includes(columnSlotNamePrefix)) {
				columnSlots.value.push(key);
			} else if (key.includes(searchFormSlotNamePrefix)) {
				searchFormSlots.value.push(key);
			} else if (key.includes(formSlotNamePrefix)) {
				addEditFormSlots.value.push(key);
			}
		}
		provide('columnSlots', columnSlots);
		provide('searchFormSlots', searchFormSlots);
		provide('addEditFormSlots', addEditFormSlots);
		// 自定义序号
		const _customRowIndex = (index: number) => {
			const { pageIndex, pageSize } = props.page;
			const order = (pageIndex - 1) * pageSize + (index + 1);
			return order;
		};
		// 根据总条数自动设置序号列宽度
		const _sortNumberMinWidth = computed(() => {
			const { total } = props.page;
			const tempElement = document.createElement('span');
			tempElement.innerText = total;
			tempElement.style.visibility = 'hidden'; // 隐藏临时元素
			document.body.appendChild(tempElement); // 将临时元素添加到文档中
			const width = tempElement.getBoundingClientRect().width;
			const minWidth = Math.ceil(width) + 25;
			document.body.removeChild(tempElement); // 从文档中移除临时元素
			return minWidth > 50 ? minWidth : 50;
		});
		const searchFrom_slots = {};
		searchFormSlots.value.forEach(slotName => {
			searchFrom_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		const column_slots = {};
		columnSlots.value.forEach(slotName => {
			column_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		const addEditForm_slots = {};
		addEditFormSlots.value.forEach(slotName => {
			addEditForm_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		const headerMenu_solts = {};
		header_menu_solts_key.forEach(slotName => {
			headerMenu_solts[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		expose({
			addEditFormRef: addEditFormRef,
		});
		const renderContent = () => {
			return (
				<>
					<div ref={crudTableRef} class={[ns.b(), props.className]} style={props.style}>
						{options.showSearchForm || options.showHeaderMenu ? (
							<header ref={headerRef} class={ns.b('header')}>
								{options.showSearchForm && (
									<HeaderSearch columns={_searchColumns.value} onZoomResize={updateTableContentHeight} onConfirmSearch={onConfirmSearch} onClearSearch={onClearSearch}>
										{searchFrom_slots}
									</HeaderSearch>
								)}
								{options.showHeaderMenu && (
									<HeaderMenu onClickAdd={onClickHeaderAdd} onDeleteRows={onClickDeleteRows} onClickRefresh={onClickRefresh}>
										{headerMenu_solts}
									</HeaderMenu>
								)}
								{slots['table-head-tip']?.()}
							</header>
						) : null}
						<NextSpinLoading loading={props.loading}>
							<div ref={tableRef} class={ns.b('content')}>
								<ElTable
									data={tableData.value}
									height={tableContentHeight.value}
									rowKey={options.rowKey}
									border={options.border}
									stripe={options.stripe}
									fit={options.fit}
									size={options.size}
									span-method={props.spanMethod}
									onSelection-change={onSelectionChange}
									onRow-click={(...arg) => emit('row-click', ...arg)}
									v-slots={{
										empty: () => <ElEmpty imageSize={tableContentHeight.value > 220 ? 100 : 50} description={t('next.table.notData')}></ElEmpty>,
									}}
								>
									{options.index ? (
										<ElTableColumn
											type="index"
											label="#"
											width={_sortNumberMinWidth.value}
											index={_customRowIndex}
											fixed="left"
											headerAlign={options.headerAlign}
											align={options.cellAlign}
										></ElTableColumn>
									) : null}
									{options.selection ? (
										<ElTableColumn
											type="selection"
											fixed="left"
											label={t('next.table.selectionAll')}
											width={55}
											headerAlign={options.headerAlign}
											align={options.cellAlign}
										></ElTableColumn>
									) : null}
									{slots.default?.()}
									{(_columns.value as TableColumnProps[]).map(col => {
										return (
											<TableColumnDynamic columnOption={col} key={col.prop}>
												{column_slots}
											</TableColumnDynamic>
										);
									})}
									{options.operations ? <TableColumnOperations onEditRow={onClickRowEdit} onViewRow={onClickRowView} onDeleteRow={onClickDeleteRow}></TableColumnOperations> : null}
								</ElTable>
							</div>
						</NextSpinLoading>
						{options.isPagination ? (
							<div ref={footerRef} class={ns.b('footer')}>
								<FooterPagination page={props.page} onChange={onChangePagination}></FooterPagination>
								{slots['table-footer-tip']?.()}
							</div>
						) : null}
						<NextDialog
							v-model={addEditDialog.visible}
							title={addEditDialog.title}
							width={options.dialogWidth}
							fullscreen={options.dialogFullscreen}
							closeOnClickModal={options.closeOnClickModal}
							onClose={onCloseAddEditDialog}
						>
							{{
								default: () => (
									<AddEditForm
										ref={addEditFormRef}
										formDatum={addEditDialog.rowInfo}
										columns={_formColumns.value}
										isEditing={addEditDialog.isEditing}
										onClose={onCloseAddEditDialog}
										onSubmit={onSubmitAddEditDialog}
									>
										{addEditForm_slots}
									</AddEditForm>
								),
							}}
						</NextDialog>
					</div>
				</>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
