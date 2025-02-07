import { defineComponent, reactive, ref, toRaw, onMounted, computed, watch } from 'vue';
import {
	ElForm,
	ElFormItem,
	ElRow,
	ElCol,
	ElInput,
	ElTooltip,
	ElIcon,
	ElButton,
	ElSelect,
	ElOption,
	ElTimeSelect,
	ElRadioGroup,
	ElRadio,
	ElDatePicker,
	ElCheckboxGroup,
	ElCheckbox,
} from 'element-plus';
import { InfoFilled } from '@element-plus/icons-vue';
import { merge } from 'lodash-unified';
import type { FormInstance, FormRules } from 'element-plus';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone, updateColSpan, elementResize, isValueExist, valueExist, arrayObjNoRepeat } from 'packages/hooks/global-hook';
import defaultConfig from './config';
import type { FormItemProps, DicData } from './config';
import { NextTextEllipsis, NextSpinLoading } from 'packages/components';
import { formSlotName } from 'packages/components/crud-table/src/hook';
import NumberRangePicker from './widgets/number-range-picker';
import InputTableSelect from './widgets/input-table-select';
import UploadImage from './widgets/upload-image';
import NextTreeSelect from './widgets/tree-select';
import NestTreeCascader from './widgets/tree-cascader';

const ns = useNamespace('form');
export default defineComponent({
	name: 'NextForm',
	props: {
		options: {
			type: Object,
			default: () => {
				return {};
			},
		},
		columns: {
			type: Array,
			default: () => {
				return [];
			},
		},
		formDatum: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['submit', 'close', 'reset'],
	setup(props, { slots, emit, expose }) {
		const _config = deepClone(defaultConfig);
		const options = reactive(merge(_config, props.options));
		const _isEditing = computed(() => {
			if (typeof options.isEditing === 'boolean') {
				return options.isEditing;
			}
			return true;
		});
		const { t } = useLocale();
		const colSpan = ref<number>(options.colSpan);
		const formDatum = reactive(props.formDatum) || {};
		const formParams = reactive<any>(merge({}, formDatum));
		const _formColumns = ref<FormItemProps[]>([]);
		const formRules = reactive<FormRules>({}) as any;
		const _updateFormColumns = () => {
			const columns = props.columns as FormItemProps[];
			_formColumns.value = columns;
			// 可以编辑时
			for (let i = 0; i < columns.length; i++) {
				const col = columns[i];
				// 编辑时传入的值
				const value = formDatum[col.prop];
				if (isValueExist(value)) {
					formParams[col.prop] = value;
				} else {
					formParams[col.prop] = isValueExist(col.defaultValue) ? col.defaultValue : '';
				}
				// 设置表单验证rules
				const rules = [];
				const { label } = col;
				if (col.required) {
					rules.push({
						required: true,
						message: label + t('next.form.requiredInput'),
						trigger: ['blur', 'change'],
					});
				}
				if (col.rules?.length) {
					rules.push(...col.rules);
				}
				formRules[col.prop] = rules;
				if (!col.dicData?.length && col.loadDicData) {
					col.loadDicData(
						col,
						data => {
							if (data?.length) col.dicData = data;
						},
						formParams
					);
				}
				// 当默认设置了disabled时不操作，只有当默认没有设置或者为false时才跟随isEditing
				if (typeof col.disabled !== 'boolean' || !col.disabled) {
					col.disabled = !_isEditing.value;
				}
			}
		};
		watch(
			() => [props.columns, props.formDatum],
			() => {
				_updateFormColumns();
			},
			{
				deep: true,
				immediate: true,
			}
		);
		const formColumns = arrayObjNoRepeat(_formColumns.value, 'prop');
		const spanResizeLoading = ref<boolean>(false);
		onMounted(() => {
			const formEl = ruleFormRef.value?.$el;
			let timer: any = null;
			elementResize(formEl, (el: HTMLElement) => {
				if (timer !== null) {
					clearTimeout(timer);
				} else {
					spanResizeLoading.value = true;
				}
				timer = setTimeout(() => {
					colSpan.value = updateColSpan(el, options.columnMinWidth);
					spanResizeLoading.value = false;
					clearTimeout(timer);
				}, 200);
			});
		});
		const ruleFormRef = ref<FormInstance>();
		const submitLoading = ref<boolean>(false);
		const onCancel = () => {
			emit('close');
		};
		const onSubmitAddEdit = async () => {
			const formInstance = ruleFormRef.value;
			if (!formInstance) return;
			await formInstance.validate((valid, fields) => {
				if (valid) {
					const params = toRaw(formParams);
					submitLoading.value = true;
					emit(
						'submit',
						params,
						() => {
							submitLoading.value = false;
							onCancel();
						},
						() => {
							submitLoading.value = false;
						}
					);
				} else {
					// eslint-disable-next-line no-console
					console.error('error submit!', fields);
				}
			});
		};
		const onResetForm = () => {
			const formInstance = ruleFormRef.value;
			if (!formInstance) return;
			formInstance.resetFields();
			submitLoading.value = false;
			emit('reset', formParams);
		};
		const _onInputInteger = (event: any, key: string) => {
			const value = event.replace(/\D/g, '');
			formParams[key] = value ? Number(value) : '';
		};
		const _onInputNumber = (val: any, key: string) => {
			let value = val;
			value = value.replace(/[^0-9\.]/g, '');
			// 如果有多个小数点，则只保留第一个
			value = value.replace(/^\./, '0.');
			value = value.replace(/\.{2,}/g, '.');
			value = value.replace('.', 'DUMMY');
			value = value.replace(/\./g, '');
			value = value.replace('DUMMY', '.');
			formParams[key] = Number(value);
		};
		const _onChangeNumberRange = (value: any, key: string) => {
			if (!Array.isArray(formParams[key])) formParams[key] = [];
			formParams[key] = Number(value);
		};
		const _onInputTableSelect = (rows, col) => {
			if (rows) col.tableSelectRows = rows;
			const { value } = col.tableSelectProps || {};
			formParams[col.prop] = rows.map(row => row[value || 'value']);
			col.onTableSelect?.(formParams, rows, col);
		};
		const _defaultDisabledDate = (time: Date) => {
			return time.getTime() > Date.now();
		};
		const _defaultShortcuts: any = [
			{
				text: t('next.date.oneWeekAge'),
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					return [start, end];
				},
			},
			{
				text: t('next.date.oneMonthAge'),
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					return [start, end];
				},
			},
			{
				text: t('next.date.threeMonthsAge'),
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
					return [start, end];
				},
			},
			{
				text: t('next.date.oneYearAge'),
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
					return [start, end];
				},
			},
			{
				text: t('next.date.threeYearsAge'),
				value: () => {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 365 * 3);
					return [start, end];
				},
			},
		];
		const renderFormItem = (col: FormItemProps) => {
			if (slots[formSlotName(col.prop)]) {
				return slots[formSlotName(col.prop)]({ column: col, formParams });
			} else if (col.type === 'input' || !col.type) {
				const placeholder = col.placeholder || t('next.form.input') + col.label;
				return (
					<ElInput
						v-model={formParams[col.prop]}
						clearable={valueExist(col.clearable, true)}
						readonly={valueExist(col.readonly, false)}
						disabled={valueExist(col.disabled, false)}
						placeholder={placeholder}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'password') {
				const placeholder = col.placeholder || t('next.form.input') + col.label;
				return (
					<ElInput
						v-model={formParams[col.prop]}
						type="password"
						clearable={valueExist(col.clearable, true)}
						show-password
						readonly={valueExist(col.readonly, false)}
						disabled={col.disabled}
						placeholder={placeholder}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'inputInteger') {
				const placeholder = col.placeholder || t('next.form.input') + col.label;
				return (
					<ElInput
						v-model={formParams[col.prop]}
						clearable={valueExist(col.clearable, true)}
						readonly={valueExist(col.readonly, false)}
						disabled={col.disabled}
						placeholder={placeholder}
						onInput={(event: Event) => _onInputInteger(event, col.prop)}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'inputNumber') {
				const placeholder = col.placeholder || t('next.form.input') + col.label;
				return (
					<ElInput
						v-model={formParams[col.prop]}
						clearable={valueExist(col.clearable, true)}
						readonly={valueExist(col.readonly, false)}
						disabled={col.disabled}
						placeholder={placeholder}
						onInput={(event: Event) => _onInputNumber(event, col.prop)}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'textarea') {
				const placeholder = col.placeholder || t('next.form.input') + col.label;
				return (
					<ElInput
						v-model={formParams[col.prop]}
						type="textarea"
						clearable={valueExist(col.clearable, true)}
						readonly={valueExist(col.readonly, false)}
						disabled={col.disabled}
						placeholder={placeholder}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'select') {
				const placeholder = col.placeholder || t('next.form.select') + col.label;
				return (
					<ElSelect
						v-model={formParams[col.prop]}
						placeholder={placeholder}
						clearable={valueExist(col.clearable, true)}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						multiple={valueExist(col.multiple, false)}
						filterable={valueExist(col.filterable, false)}
						collapse-tags-tooltip
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{col.dicData &&
							(col.dicData as DicData[]).map((item: DicData) => {
								return <ElOption key={item.value} value={item.value} label={item.label} disabled={valueExist(item.disabled, false)}></ElOption>;
							})}
					</ElSelect>
				);
			} else if (col.type === 'time') {
				const placeholder = col.placeholder || t('next.form.select') + col.label;
				return (
					<ElTimeSelect
						v-model={formParams[col.prop]}
						start="00:00"
						step="00:30"
						end="23:59"
						clearable={valueExist(col.clearable, true)}
						editable={valueExist(col.editable, false)}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						placeholder={placeholder}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{{
							prefix: () => (col.prefix ? col.prefix(formParams, col) : null),
							suffix: () => (col.suffix ? col.suffix(formParams, col) : null),
						}}
					</ElTimeSelect>
				);
			} else if (col.type === 'radio') {
				return (
					<ElRadioGroup
						v-model={formParams[col.prop]}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{col.dicData &&
							(col.dicData as DicData[]).map((item: DicData) => {
								return (
									<ElRadio key={item.value} value={item.value} disabled={valueExist(item.disabled, false)}>
										{item.label}
									</ElRadio>
								);
							})}
					</ElRadioGroup>
				);
			} else if (col.type === 'checkbox') {
				if (!isValueExist(formParams[col.prop])) {
					formParams[col.prop] = [];
				}
				return (
					<ElCheckboxGroup
						v-model={formParams[col.prop]}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						onChange={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					>
						{col.dicData &&
							(col.dicData as DicData[]).map((item: DicData) => {
								return (
									<ElCheckbox key={item.value} label={item.value} disabled={valueExist(item.disabled, false)}>
										{item.label}
									</ElCheckbox>
								);
							})}
					</ElCheckboxGroup>
				);
			} else if (col.type === 'date') {
				const placeholder = col.placeholder || t('next.form.select') + col.label;
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						placeholder={placeholder}
						type="date"
						valueFormat={col.format || 'YYYY-MM-DD'}
						format={col.format || 'YYYY-MM-DD'}
						clearable={valueExist(col.clearable, true)}
						disabledDate={(time: Date) => (col.disabledDate ? col.disabledDate(time, formParams) : _defaultDisabledDate(time))}
						editable={valueExist(col.editable, false)}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						onUpdate:modelValue={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					></ElDatePicker>
				);
			} else if (col.type === 'datetime') {
				const placeholder = col.placeholder || t('next.form.select') + col.label;
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						placeholder={placeholder}
						type="datetime"
						valueFormat={col.format || 'YYYY-MM-DD HH:mm:ss'}
						format={col.format || 'YYYY-MM-DD HH:mm:ss'}
						clearable={valueExist(col.clearable, true)}
						disabledDate={(time: Date) => (col.disabledDate ? col.disabledDate(time, formParams) : _defaultDisabledDate(time))}
						editable={valueExist(col.editable, false)}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						onUpdate:modelValue={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					></ElDatePicker>
				);
			} else if (col.type === 'daterange') {
				const placeholder = col.placeholder || t('next.form.select') + col.label;
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						placeholder={placeholder}
						type="daterange"
						valueFormat={col.format || 'YYYY-MM-DD '}
						format={col.format || 'YYYY-MM-DD'}
						range-separator={t('next.date.rangeSeparator')}
						start-placeholder={t('next.date.startPlaceholder')}
						end-placeholder={t('next.date.endPlaceholder')}
						disabledDate={(time: Date) => (col.disabledDate ? col.disabledDate(time, formParams) : _defaultDisabledDate(time))}
						clearable={valueExist(col.clearable, true)}
						editable={valueExist(col.editable, false)}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						shortcuts={col.shortcuts || _defaultShortcuts}
						onUpdate:modelValue={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					></ElDatePicker>
				);
			} else if (col.type === 'datetimerange') {
				const placeholder = col.placeholder || t('next.form.select') + col.label;
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						placeholder={placeholder}
						type="datetimerange"
						valueFormat={col.format || 'YYYY-MM-DD HH:mm:ss'}
						format={col.format || 'YYYY-MM-DD HH:mm:ss'}
						range-separator={t('next.date.rangeSeparator')}
						start-placeholder={t('next.date.startPlaceholder')}
						end-placeholder={t('next.date.endPlaceholder')}
						disabledDate={(time: Date) => (col.disabledDate ? col.disabledDate(time, formParams) : _defaultDisabledDate(time))}
						clearable={valueExist(col.clearable, true)}
						editable={valueExist(col.editable, false)}
						disabled={valueExist(col.disabled, false)}
						readonly={valueExist(col.readonly, false)}
						shortcuts={col.shortcuts || _defaultShortcuts}
						onUpdate:modelValue={(event: Event) => col.onChange?.(event, col, formParams, formColumns)}
					></ElDatePicker>
				);
			} else if (col.type === 'numberRange') {
				return <NumberRangePicker v-model={formParams[col.prop]} disabled={col.disabled} onChange={(event: Event) => _onChangeNumberRange(event, col.prop)}></NumberRangePicker>;
			} else if (col.type === 'inputTableSelect') {
				return (
					<InputTableSelect
						v-model={formParams[col.prop]}
						formParams={formParams}
						column={col}
						disabled={valueExist(col.disabled, false)}
						onSelect={(rows: any) => _onInputTableSelect(rows, col)}
					></InputTableSelect>
				);
			} else if (col.type === 'uploadImage') {
				return (
					<UploadImage
						v-model={formParams[col.prop]}
						disabled={valueExist(col.disabled, false)}
						multiple={valueExist(col.multiple, false)}
						limit={col.limit}
						onChange={(...arg: any) => col.onChange?.(...arg, col, formParams, formColumns)}
						onExceed={(...arg: any) => col.onExceed?.(...arg, col, formParams, formColumns)}
					></UploadImage>
				);
			} else if (col.type === 'treeSelect') {
				return (
					<NextTreeSelect
						v-model={formParams[col.prop]}
						disabled={valueExist(col.disabled, false)}
						column={col}
						formParams={formParams}
						onChange={(...arg: any) => col.onChange?.(...arg, col, formParams, formColumns)}
					></NextTreeSelect>
				);
			} else if (col.type === 'cascader') {
				return (
					<NestTreeCascader
						v-model={formParams[col.prop]}
						disabled={valueExist(col.disabled, false)}
						column={col}
						formParams={formParams}
						onChange={(...arg: any) => col.onChange?.(...arg, col, formParams, formColumns)}
					></NestTreeCascader>
				);
			}
		};
		const getFormInstance = () => {
			const formInstance = ruleFormRef.value;
			return formInstance;
		};
		expose({
			formParams: toRaw(formParams),
			ruleFormRef,
			formColumns,
			getFormInstance,
			getFormParams: () => {
				return toRaw(formParams);
			},
		});
		const renderContent = () => {
			return (
				<ElForm ref={ruleFormRef} class={ns.b()} inline={false} model={formParams} size={options.size}>
					<ElRow gutter={20}>
						{formColumns.map(column => {
							return (
								!column.hide && (
									<ElCol span={valueExist(column.span, colSpan.value)}>
										<ElFormItem
											prop={column.prop}
											required={column.required}
											rules={formRules[column.prop]}
											style={{ '--form-label-width': valueExist(options.formLabelWidth, options.labelWidth) }}
										>
											{{
												label: () =>
													column.label ? (
														<>
															<NextTextEllipsis content={t(column.label)} class={ns.e('item-label')}></NextTextEllipsis>
															{column.tip ? (
																<ElTooltip effect="dark" content={column.tip} placement="top">
																	<ElIcon style={{ 'margin-left': '5px' }} color="#f3d19e">
																		<InfoFilled />
																	</ElIcon>
																</ElTooltip>
															) : null}
														</>
													) : null,
												default: () => renderFormItem(column),
											}}
										</ElFormItem>
									</ElCol>
								)
							);
						})}
					</ElRow>
					{_isEditing.value && options.showFooter ? (
						<div class={ns.e('footer')}>
							<ElButton type="primary" loading={submitLoading.value} onClick={onSubmitAddEdit}>
								{t(options.submitText) || t('next.form.submit')}
							</ElButton>
							{options.showResetBtn ? <ElButton onClick={onResetForm}>{t(options.resetText) || t('next.form.reset')}</ElButton> : null}
						</div>
					) : null}
				</ElForm>
			);
		};
		return () => <NextSpinLoading loading={spanResizeLoading.value}>{renderContent()}</NextSpinLoading>;
	},
});
