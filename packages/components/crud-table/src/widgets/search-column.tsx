import { defineComponent, inject, reactive, ref, isRef, unref, watch } from 'vue';
import { ElCol, ElFormItem, ElInput, ElSelect, ElOption, ElDatePicker, ElInputNumber } from 'element-plus';
import type { SearchColumnProps } from '../config';
import { searchFormSlotName } from '../hook';
import { useLocale } from 'packages/hooks';
import { NextTextEllipsis, NextTreeSelect, NextTreeCascader } from 'packages/components';
import { valueExist } from 'packages/hooks/global-hook';

export default defineComponent({
	name: 'SearchColumn',
	props: {
		searchSpan: {
			type: Number,
			default: 4,
		},
		columns: {
			type: Array,
			default: () => [],
		},
		formParams: {
			type: Object,
			default: () => {},
		},
	},
	setup(props, { slots }) {
		const _options = inject('options', {} as any);
		const options = isRef(_options) ? unref(_options) : _options;
		const { t } = useLocale();
		const ns = inject('ns', {} as any);
		const columns = ref<SearchColumnProps[] | any[]>(props.columns);
		watch(
			() => props.columns,
			() => {
				columns.value = props.columns;
			},
			{
				deep: true,
			}
		);
		const formParams = reactive<any>(props.formParams);
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
		const _onInputInteger = (val: any, key: string) => {
			const value = val.replace(/\D/g, '');
			formParams[key] = value;
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
			formParams[key] = value;
		};
		const _onChangeNumberRange = (value: any, key: string) => {
			formParams[key] = value;
		};
		const renderColItemContent = (col: SearchColumnProps) => {
			const _disabled = valueExist(col.searchDisabled, col.disabled, false);
			if (slots[searchFormSlotName(col.prop)]) {
				return slots[searchFormSlotName(col.prop)]({ column: col });
			} else if (col.type === 'input' || !col.type) {
				const placeholder = t('next.form.input') + (col.searchPlaceholder || col.searchLabel || col.label);
				return (
					<ElInput v-model={formParams[col.prop]} clearable disabled={_disabled} placeholder={placeholder}>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'inputInteger') {
				const placeholder = t('next.form.input') + (col.searchPlaceholder || col.searchLabel || col.label);
				return (
					<ElInput v-model={formParams[col.prop]} clearable disabled={_disabled} placeholder={placeholder} onInput={e => _onInputInteger(e, col.prop)}>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'inputNumber') {
				const placeholder = t('next.form.input') + (col.searchPlaceholder || col.searchLabel || col.label);
				return (
					<ElInput v-model={formParams[col.prop]} clearable disabled={_disabled} placeholder={placeholder} onInput={e => _onInputNumber(e, col.prop)}>
						{{
							prefix: col.prefix ? () => col.prefix(formParams, col) : null,
							suffix: col.suffix ? () => col.suffix(formParams, col) : null,
							prepend: col.prepend ? () => col.prepend(formParams, col) : null,
							append: col.append ? () => col.append(formParams, col) : null,
						}}
					</ElInput>
				);
			} else if (col.type === 'select') {
				const placeholder = t('next.form.select') + (col.searchPlaceholder || col.searchLabel || col.label);
				// 当为多选且值为空字符会默认显示一个空标签，所以设置为空数组
				if (!formParams[col.prop] && col.multiple) {
					formParams[col.prop] = [];
				}
				return (
					<ElSelect v-model={formParams[col.prop]} clearable disabled={_disabled} placeholder={placeholder} multiple={col.multiple || false} collapse-tags collapse-tags-tooltip>
						{col.dicData &&
							(col.dicData as any[]).map(item => {
								return <ElOption value={item.value} label={item.label}></ElOption>;
							})}
					</ElSelect>
				);
			} else if (col.type === 'date') {
				const placeholder = t('next.form.select') + (col.searchPlaceholder || col.searchLabel || col.label);
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						type="date"
						value-format={col.searchFormat || 'YYYY-MM-DD'}
						format={col.searchFormat || 'YYYY-MM-DD'}
						clearable
						disabled-date={col.searchDisabledDate || _defaultDisabledDate}
						disabled={_disabled}
						placeholder={placeholder}
						editable={col.searchEditable || false}
					></ElDatePicker>
				);
			} else if (col.type === 'daterange') {
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						type="daterange"
						value-format={col.searchFormat || 'YYYY-MM-DD'}
						format={col.searchFormat || 'YYYY-MM-DD'}
						clearable
						range-separator={t('next.date.rangeSeparator')}
						start-placeholder={t('next.date.startPlaceholder')}
						end-placeholder={t('next.date.endPlaceholder')}
						disabled-date={col.searchDisabledDate || _defaultDisabledDate}
						disabled={_disabled}
						editable={col.searchEditable || false}
						shortcuts={col.searchShortcuts || _defaultShortcuts}
					></ElDatePicker>
				);
			} else if (col.type === 'datetimerange') {
				return (
					<ElDatePicker
						v-model={formParams[col.prop]}
						type="datetimerange"
						value-format={col.searchFormat || 'YYYY-MM-DD HH:mm:ss'}
						format={col.searchFormat || 'YYYY-MM-DD HH:mm:ss'}
						clearable
						range-separator={t('next.date.rangeSeparator')}
						start-placeholder={t('next.date.startPlaceholder')}
						end-placeholder={t('next.date.endPlaceholder')}
						disabled-date={col.searchDisabledDate || _defaultDisabledDate}
						disabled={_disabled}
						editable={col.searchEditable || false}
						shortcuts={col.searchShortcuts || _defaultShortcuts}
					></ElDatePicker>
				);
			} else if (col.type === 'numberRange') {
				const value = formParams[col.prop];
				const startNumber = ref(value[0]);
				const endNumber = ref(value[1]);
				const minNumber = ref(col.searchMin);
				const maxNumber = ref(col.searchMax);
				const controls = ref<boolean>(true);
				const onChangeStart = (num: number) => {
					startNumber.value = num;
					_onChangeNumberRange([startNumber.value, endNumber.value], col.prop);
				};
				const onChangeEnd = (num: number) => {
					endNumber.value = num;
					_onChangeNumberRange([startNumber.value, endNumber.value], col.prop);
				};
				return (
					<div class={ns.b('header-search-item-number-range')}>
						<ElInputNumber v-model={startNumber.value} min={minNumber.value} max={maxNumber.value} controls={controls.value} onChange={onChangeStart}></ElInputNumber>
						<span class="number-range-division">{t('next.date.rangeSeparator')}</span>
						<ElInputNumber v-model={endNumber.value} min={minNumber.value} max={maxNumber.value} controls={controls.value} onChange={onChangeEnd}></ElInputNumber>
					</div>
				);
			} else if (col.type === 'treeSelect') {
				return <NextTreeSelect v-model={formParams[col.prop]} disabled={col.disabled} column={col} formParams={formParams}></NextTreeSelect>;
			} else if (col.type === 'cascader') {
				return <NextTreeCascader v-model={formParams[col.prop]} disabled={col.disabled} column={col} formParams={formParams}></NextTreeCascader>;
			}
		};
		const renderContent = () => {
			return (
				<>
					{columns.value.map(col => {
						return (
							!col.hide && (
								<ElCol span={props.searchSpan} class={ns.b('header-search-item')}>
									<ElFormItem>
										{{
											label: () =>
												col.label && valueExist(options.showSearchLabel, true) ? (
													<NextTextEllipsis width={options.searchLabelWidth} content={col.label} textAlign="right"></NextTextEllipsis>
												) : null,
											default: () => renderColItemContent(col),
										}}
									</ElFormItem>
								</ElCol>
							)
						);
					})}
				</>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
