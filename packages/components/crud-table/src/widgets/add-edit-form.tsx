import { defineComponent, isRef, unref, inject, toRaw, ref } from 'vue';
import { NextForm } from 'packages/components/form';
import { deepClone, valueExist } from 'packages/hooks/global-hook';
import type { FormColunmProps, TableColumnProps } from '../config';
import type { FormItemProps } from 'packages/components/form/src/config';

export default defineComponent({
	name: 'AddEditForm',
	props: {
		formDatum: {
			type: Object,
			default: () => ({}),
		},
		isEditing: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['close', 'submit'],
	setup(props, { slots, emit }) {
		const addEditFormSlots = inject('addEditFormSlots') as any;
		const form_slots = {};
		addEditFormSlots.value.forEach(slotName => {
			form_slots[slotName] = (...arg) => slots[slotName] && slots[slotName](...arg);
		});
		const _options = inject('options', {} as any);
		const options = deepClone(isRef(_options) ? unref(_options) : _options);
		options.columnMinWidth = options.formColumnMinWidth;
		options.isEditing = props.isEditing;
		const _columns = toRaw(options.columns);
		const formDatum = deepClone(isRef(props.formDatum) ? unref(props.formDatum) : props.formDatum);
		const formRef = ref();
		const loopFormColumns = (list: TableColumnProps[]) => {
			let cols = [];
			list.forEach((col: TableColumnProps) => {
				cols.push(col);
				if (col.children?.length) {
					cols.push(...loopFormColumns(col.children));
					if (col.children) delete col.children;
				}
			});
			return cols;
		};
		const columns = loopFormColumns(_columns);
		const formColumns = toRaw(options.formColumns);
		const mergeColumns = columns.concat(formColumns).map((col: FormColunmProps) => {
			const item: FormItemProps = {
				prop: col.prop,
				label: valueExist(col.formLabel, col.label, ''),
				type: valueExist(col.formType, col.type, ''),
				defaultValue: valueExist(col.formDefaultValue, col.defaultValue, ''),
				placeholder: valueExist(col.formPlaceholder, ''),
				required: valueExist(col.formRequired, col.required, false),
				sort: valueExist(col.formSort, col.sort, null),
				prefix: valueExist(col.formPrefix, col.prefix, null),
				suffix: valueExist(col.formSuffix, col.suffix, null),
				prepend: valueExist(col.formPrepend, col.prepend, null),
				append: valueExist(col.formAppend, col.append, null),
				hide: valueExist(col.formHide, false),
				disabled: valueExist(col.formDisabled, col.disabled, false),
				span: valueExist(col.formSpan, col.span, null),
				dicData: valueExist(col.formDicData, col.dicData, []),
				onChange: col.onChangeForm || null,
				tableSelect: valueExist(col.tableSelect, {}),
			};
			return item;
		});
		const filterColumns = mergeColumns.filter((o: FormItemProps) => o.sort && o.prop) as any[];
		const formColumnsLast = filterColumns.sort((a: FormItemProps, b: FormItemProps) => a.sort - b.sort);
		const _formColumnsLast: FormItemProps[] = deepClone(formColumnsLast);
		const onSubmit = (...arg) => {
			emit('submit', ...arg);
		};
		const renderContent = () => {
			return <NextForm ref={formRef} options={options} columns={_formColumnsLast} formDatum={formDatum} onClose={() => emit('close')} onSubmit={onSubmit}></NextForm>;
		};
		return () => <>{renderContent()}</>;
	},
});
