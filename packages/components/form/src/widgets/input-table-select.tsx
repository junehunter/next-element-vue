import { defineComponent, reactive, ref, toRaw, computed } from 'vue';
import { ElButton, ElTableColumn, ElCheckbox, ElRadioGroup, ElRadio } from 'element-plus';
import { Search } from '@element-plus/icons-vue';
import { merge } from 'lodash-unified';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone, valueExist } from 'packages/hooks/global-hook';
import tableDefaultConfig from 'packages/components/crud-table/src/config';
import { tableSelectConfig } from '../config';
import NextDialog from 'packages/components/dialog';
import NextCrudTable from 'packages/components/crud-table';

const ns = useNamespace('form');
const InputTableSelect = defineComponent({
	name: 'InputTableSelect',
	props: {
		modelValue: {
			type: [Array, String, Number, Boolean, Object],
			default: function () {
				return [null, null];
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
		const onClickAddEdit = (row, formParams) => {
			_column.addEditData?.(row, formParams);
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
		const renderContent = () => {
			return (
				<>
					<div class={['el-input', ns.e('input-table'), ns.is('disabled', _disabled)]}>
						<div class={'el-input__wrapper'}>
							{props.modelValue ? <span class={ns.em('input-table', 'value')}>{props.modelValue}</span> : <span class={ns.em('input-table', 'placeholder')}>{_placeholder}</span>}
						</div>
						<ElButton type="primary" class={ns.em('input-table', 'append')} disabled={_disabled} icon={Search} onClick={onClickTableDialog}></ElButton>
					</div>
					<NextDialog
						v-model={tableSelectDialog.visible}
						title={tableSelectDialog.title}
						closeOnClickModal={_options.closeOnClickModal}
						width={_options.dialogWidth}
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
