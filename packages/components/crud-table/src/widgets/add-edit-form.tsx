import { defineComponent, isRef, unref, inject, ref } from 'vue';
import { NextForm } from 'packages/components/form';
import { deepClone } from 'packages/hooks/global-hook';

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
		const formRef = ref();
		const formDatum = deepClone(isRef(props.formDatum) ? unref(props.formDatum) : props.formDatum);
		// 这里columns与search栏的columns共享原始数据，这里单独分开，避免操作相互影响
		const _columns = deepClone(props.columns);
		const onSubmit = (...arg) => {
			emit('submit', ...arg);
		};
		const renderContent = () => {
			return <NextForm ref={formRef} options={options} columns={_columns} formDatum={formDatum} onClose={() => emit('close')} onSubmit={onSubmit}></NextForm>;
		};
		return () => <>{renderContent()}</>;
	},
});
