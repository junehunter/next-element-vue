import { defineComponent, ref, watch } from 'vue';
import { ElCascader } from 'element-plus';
import { valueExist } from 'packages/hooks/global-hook';
import { useLocale } from 'packages/hooks';

export default defineComponent({
	name: 'NextTreeCascader',
	props: {
		modelValue: {
			type: [Number, String, Boolean, Object, Array],
			default: '',
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
	emits: ['change', 'clear', 'expand-change', 'visible-change', 'remove-tag', 'blur', 'focus'],
	setup(props, { emit, expose }) {
		const { t } = useLocale();
		const _modelValue = ref(props.modelValue);
		watch(
			() => props.modelValue,
			(val: any) => {
				_modelValue.value = val;
			}
		);
		const _column = props.column;
		const placeholder = _column.placeholder || t('next.form.select') + _column.label;
		const _defaultProps = {
			label: 'label',
			children: 'children',
		};
		const onChange = (val: any) => {
			const checkedNodes = treeSelectRef.value.getCheckedNodes();
			const nodes = checkedNodes.map((item: any) => item.data);
			props.formParams[_column.prop] = val;
			_modelValue.value = val;
			emit('change', val, nodes);
		};
		const onClearValue = () => {
			props.formParams[_column.prop] = '';
			_modelValue.value = '';
		};
		const treeSelectRef = ref<any>();
		const getInstance = () => {
			return treeSelectRef.value;
		};
		if (_column.loadInstance) {
			_column.loadInstance(getInstance());
		}
		expose({
			getInstance,
			onClearValue,
		});
		const renderContent = () => {
			return (
				<ElCascader
					ref={treeSelectRef}
					v-model={_modelValue.value}
					placeholder={placeholder}
					options={valueExist(_column.dicData, [])}
					props={valueExist(_column.treeSelectProps, _defaultProps)}
					disabled={valueExist(props.disabled, false)}
					clearable={valueExist(_column.clearable, true)}
					filterable={valueExist(_column.filterable, false)}
					collapse-tags
					collapse-tags-tooltip
					onChange={onChange}
				></ElCascader>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
