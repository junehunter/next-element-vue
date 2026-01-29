import { defineComponent, isRef, unref, inject, ref, watch } from 'vue';
import { NextForm } from 'packages/components/form';
import { deepClone, valueExist, warnHandlerIgnore } from 'packages/hooks/global-hook';
import type { FormColunmProps } from '../config';

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
		columns: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['close', 'submit'],
	setup(props, { slots, emit, expose }) {
		warnHandlerIgnore();
		const addEditFormSlots = inject('addEditFormSlots') as any;
		const form_slots = {};
		addEditFormSlots.value.forEach((slotName: string) => {
			form_slots[slotName] = (...arg: any[]) => slots[slotName] && slots[slotName](...arg);
		});
		const _options = inject('options', {} as any);
		const options = deepClone(isRef(_options) ? unref(_options) : _options);
		options.columnMinWidth = options.formColumnMinWidth;
		options.isEditing = props.isEditing;
		options.colSpan = options.formSpan;
		options.colSpanFixed = options.formSpanFixed;
		const formRef = ref();
		const formDatum = ref({});
		watch(
			() => props.formDatum,
			newVal => {
				formDatum.value = deepClone(isRef(newVal) ? unref(newVal) : newVal);
			},
			{ deep: true, immediate: true }
		);
		// 这里columns与search栏的columns共享原始数据，这里单独分开，避免操作相互影响
		const _columns = deepClone(props.columns).map((col: FormColunmProps) => {
			// 重新赋值hide，避免被search栏的影响
			col.hide = valueExist(col.formHide, col.hide, false);
			return col;
		});
		const onSubmit = (formParams: any, done: () => void, error: () => void) => {
			emit('submit', formParams, done, error);
		};
		const _getFormExpose = () => {
			return {
				formParams: formRef.value?.formParams,
				formColumns: formRef.value?.formColumns,
				formColumnsMap: formRef.value?.formColumnsMap,
			};
		};
		expose({
			getFormExpose: _getFormExpose,
		});
		const renderContent = () => {
			return (
				<NextForm ref={formRef} options={options} columns={_columns} formDatum={formDatum.value} onClose={() => emit('close')} onSubmit={onSubmit}>
					{form_slots}
				</NextForm>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
