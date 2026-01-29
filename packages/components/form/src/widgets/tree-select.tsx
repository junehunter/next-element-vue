import { defineComponent, ref, watch } from 'vue';
import { ElTreeSelect } from 'element-plus';
import { valueExist, warnHandlerIgnore } from 'packages/hooks/global-hook';
import { useLocale } from 'packages/hooks';

export default defineComponent({
	name: 'NextTreeSelect',
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
	emits: ['change', 'clear', 'node-click', 'node-contextmenu', 'check', 'check-change', 'node-expand', 'node-collapse', 'current-change'],
	setup(props, { emit, expose }) {
		warnHandlerIgnore();
		const { t } = useLocale();
		const _modelValue = ref(props.modelValue);
		watch(
			() => props.modelValue,
			(val: any) => {
				_modelValue.value = val;
			}
		);
		const _column = props.column;
		const valueKey = valueExist(_column.treeSelectProps?.value, _column.nodeKey, 'id');
		const _formParams = props.formParams;
		const _defaultProps = {
			label: 'label',
			children: 'children',
		};
		const placeholder = _column.placeholder || t('next.form.select') + _column.label;
		const onChange = (val: any) => {
			props.formParams[_column.prop] = val;
			_modelValue.value = val;
			emit('change', val);
		};
		const onClearValue = () => {
			props.formParams[_column.prop] = '';
			_modelValue.value = '';
			emit('clear');
		};
		const onNodeClick = (item: any, node: any) => {
			emit('node-click', item, node, _formParams);
			const val = item[valueKey];
			_column.treeSelectNodeClick?.(item, node, _formParams);
			onChange(val);
		};
		const onNodeContextmenu = (...arg) => {
			emit('node-contextmenu', ...arg);
			_column.treeSelectNodeContextmenu?.(...arg);
		};
		const onCheck = (item: any, checkedNode: any) => {
			emit('check', item, checkedNode, _formParams);
			_column.treeSelectCheck?.(item, checkedNode, _formParams);
			const { checkedKeys } = checkedNode;
			onChange(checkedKeys);
		};
		const onCheckChange = (...arg) => {
			emit('check-change', ...arg);
			_column.treeSelecCheckChange?.(...arg, _formParams);
		};
		const onNodeExpand = (...arg) => {
			emit('node-expand', ...arg);
			_column.treeSelecNodeExpand?.(...arg);
		};
		const onNodeCollapse = (...arg) => {
			emit('node-collapse', ...arg);
			_column.treeSelecNodeCollapse?.(...arg);
		};
		const onCurrentChange = (...arg) => {
			emit('current-change', ...arg);
			_column.treeSelecCurrentChange?.(...arg);
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
				<ElTreeSelect
					ref={treeSelectRef}
					v-model={_modelValue.value}
					placeholder={placeholder}
					data={valueExist(_column.dicData, [])}
					node-key={valueExist(_column.nodeKey, 'id')}
					filterable={valueExist(_column.filterable, true)}
					show-checkbox={valueExist(_column.showCheckbox, false)}
					leaf-only={valueExist(_column.leafOnly, false)}
					render-after-expand={valueExist(_column.renderAfterExpand, true)}
					check-strictly={valueExist(_column.checkStrictly, false)}
					disabled={valueExist(props.disabled, false)}
					clearable={valueExist(_column.clearable, true)}
					accordion={valueExist(_column.accordion, false)}
					multiple={valueExist(_column.multiple, false)}
					collapse-tags
					collapse-tags-tooltip
					props={valueExist(_column.treeSelectProps, _defaultProps)}
					value-key={valueKey}
					onNode-click={onNodeClick}
					onNode-contextmenu={onNodeContextmenu}
					onCheck={onCheck}
					onCheck-change={onCheckChange}
					onNode-expand={onNodeExpand}
					onNode-collapse={onNodeCollapse}
					onCurrent-change={onCurrentChange}
					onClear={onClearValue}
				></ElTreeSelect>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
