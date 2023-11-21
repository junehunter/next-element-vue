import { defineComponent, reactive, ref, toRaw, computed, watch } from 'vue';
import { ElButton, ElTableColumn, ElCheckbox, ElRadioGroup, ElRadio, ElTag, ElTooltip } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { merge } from 'lodash-unified';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone, valueExist, arrayObjNoRepeat } from 'packages/hooks/global-hook';
import tableDefaultConfig from 'packages/components/crud-table/src/config';
import { tableSelectConfig } from '../config';
import NextDialog from 'packages/components/dialog';
import NextCrudTable from 'packages/components/crud-table';
import type { DicData } from '../config';

const ns = useNamespace('form');
const InputTableSelect = defineComponent({
	name: 'InputTableSelect',
	props: {
		modelValue: {
			type: [Array, String, Number, Boolean, Object],
			default: function () {
				return [];
			},
		},
		column: {
			type: Object,
			default: () => ({}),
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		formParams: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['select'],
	setup(props, { emit }) {
		const { t } = useLocale();
		const _disabled = props.disabled;
		const _column = props.column;
		const _placeholder = _column.placeholder || t('next.form.select') + _column.label;
		const _tableDefaultConfig = deepClone(tableDefaultConfig);
		const _tableSelectConfig = deepClone(tableSelectConfig);
		const _options = merge(_tableDefaultConfig, _tableSelectConfig, _column.tableSelect);
		const tableSelectDialog = reactive({
			visible: false,
			title: _column.label + t('next.form.tableSelect'),
			dialogWidth: _options.dialogWidth,
		});
		const onClickTableDialog = () => {
			tableSelectDialog.visible = true;
		};
		const onCloseTableDialog = () => {
			tableSelectDialog.visible = false;
		};
		const tableReactive = reactive({
			loading: false,
			page: {
				pageIndex: 1,
				pageSize: 20,
				total: 0,
			},
			data: [],
		});
		const onConfirmSearch = (searchParams: any) => {
			tableReactive.loading = true;
			_options.loadData?.(searchParams, res => {
				tableReactive.data = res.data || [];
				tableReactive.page.total = res.total || 0;
				tableReactive.loading = false;
			});
		};
		const multipleSelection = ref<any[]>([]);
		_column.tableSelectDefaultValue?.(props.formParams, _column, (rows: any[]) => {
			if (rows?.length) {
				_column.tableSelectRows = rows;
				multipleSelection.value = rows;
			}
		});
		const sinleSelection = ref<string | number>('');
		const _disabledSelect = computed(() => {
			if (_options.selectType === 'radio') {
				return !sinleSelection.value;
			}
			return multipleSelection.value.length === 0;
		});
		const isSelected = row => {
			return multipleSelection.value.includes(row);
		};
		const onchangeCheckBox = (event, row) => {
			if (event) {
				multipleSelection.value.push(row);
			} else {
				const index = multipleSelection.value.indexOf(row);
				const included = index !== -1;
				if (included) {
					multipleSelection.value.splice(index, 1);
				}
			}
		};
		const onResetTableSelect = () => {
			multipleSelection.value = [];
			sinleSelection.value = '';
		};
		const onConfirmSelect = () => {
			const rows = toRaw(multipleSelection.value);
			onCloseTableDialog();
			emit('select', rows);
		};
		const onClickAddEdit = (row, tableFormParams) => {
			_column.addEditData?.(row, tableFormParams);
		};
		const renderSelectTypeContent = (row, index) => {
			const rowKey = _options.rowKey;
			const value = valueExist(row[rowKey], index);
			if (_options.selectType === 'checkbox') {
				return <ElCheckbox modelValue={isSelected(toRaw(row))} onChange={event => onchangeCheckBox(event, toRaw(row))}></ElCheckbox>;
			}
			return (
				<ElRadio
					label={value}
					onChange={() => {
						sinleSelection.value = value;
						multipleSelection.value = [row];
					}}
				></ElRadio>
			);
		};
		const { value, label } = _column.tableSelectProps || {};
		const tags = ref<DicData[]>([]);
		const tagsMore = ref<DicData[]>([]);
		const _updateTags = () => {
			const _rows = arrayObjNoRepeat(multipleSelection.value, value);
			const rows = _rows.map(row => {
				return {
					value: row[value || 'value'],
					label: row[label || 'label'],
				};
			});
			if (rows.length > 1) {
				tags.value = rows.splice(0, 1);
				tagsMore.value = rows;
			} else {
				tags.value = rows;
				tagsMore.value = [];
			}
		};
		watch(
			() => _column.tableSelectRows,
			() => {
				_updateTags();
			},
			{
				deep: true,
				immediate: true,
			}
		);
		const _onCloseTag = (tag: DicData, i: number) => {
			const rows = toRaw(multipleSelection.value);
			rows.splice(i, 1);
			multipleSelection.value = rows;
			_updateTags();
			emit('select', rows);
		};
		const renderContent = () => {
			return (
				<>
					<div class={['el-input', ns.e('input-table'), ns.is('disabled', _disabled)]}>
						<div class={'el-input__wrapper'}>
							{tags?.value.length ? (
								<span class={ns.em('input-table', 'value')}>
									{tags.value.map((tag, index) => {
										return (
											<ElTag closable={!_disabled} onClose={() => _onCloseTag(tag, index)}>
												{tag.label}
											</ElTag>
										);
									})}
									{tagsMore?.value?.length ? (
										<ElTooltip popper-class={ns.e('tooltip-tags')} placement="bottom" effect="light">
											{{
												default: () => <ElTag>+ {tagsMore.value.length}</ElTag>,
												content: () =>
													tagsMore.value.map((tag, index) => {
														return (
															<ElTag closable={!_disabled} onClose={() => _onCloseTag(tag, index + 1)}>
																{tag.label}
															</ElTag>
														);
													}),
											}}
										</ElTooltip>
									) : null}
								</span>
							) : (
								<span class={ns.em('input-table', 'placeholder')}>{_placeholder}</span>
							)}
						</div>
						<ElButton type="primary" class={ns.em('input-table', 'append')} disabled={_disabled} icon={Search} onClick={onClickTableDialog}></ElButton>
					</div>
					<NextDialog
						v-model={tableSelectDialog.visible}
						title={tableSelectDialog.title}
						closeOnClickModal={_options.closeOnClickModal}
						width={_options.dialogWidth}
						modal={false}
						onClose={onCloseTableDialog}
					>
						<div class={ns.em('input-table', 'content')}>
							<ElRadioGroup modelValue={sinleSelection.value}>
								<NextCrudTable
									options={_options}
									loading={tableReactive.loading}
									data={tableReactive.data}
									page={tableReactive.page}
									onConfirm-search={onConfirmSearch}
									onClick-add-edit={onClickAddEdit}
								>
									<ElTableColumn fixed="left" label={t('next.table.selection')} width={55} headerAlign={_options.headerAlign} align={_options.cellAlign}>
										{{
											default: ({ row, $index }) => renderSelectTypeContent(row, $index),
										}}
									</ElTableColumn>
								</NextCrudTable>
							</ElRadioGroup>
						</div>
						<div class={ns.em('input-table', 'footer')}>
							<ElButton onClick={onResetTableSelect}>{t('next.form.reset')}</ElButton>
							<ElButton type="primary" disabled={_disabledSelect.value} onClick={onConfirmSelect}>
								{t('next.form.confirm')}
							</ElButton>
						</div>
					</NextDialog>
				</>
			);
		};
		return () => <>{renderContent()}</>;
	},
});

export default InputTableSelect;
