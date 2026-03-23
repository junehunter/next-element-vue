import { defineComponent, ref, watch } from 'vue';
import { ElCascader } from 'element-plus';
import { deepClone, valueExist, warnHandlerIgnore } from 'packages/hooks/global-hook';
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
		warnHandlerIgnore();
		const { t } = useLocale();
		const _modelValue = ref(props.modelValue);
		const _column = props.column;
		watch(
			() => props.modelValue,
			(val: any) => {
				_modelValue.value = val;
			}
		);
		const placeholder = _column.placeholder || t('next.form.select') + _column.label;
		const _defaultProps = {
			label: 'label',
			children: 'children',
		};
		const cascaderProps = valueExist(_column.treeSelectProps, _defaultProps);
		const _formParams = props.formParams;
		// cascader config 配置属性中添加 formParams 和 column 参数
		if (cascaderProps.lazy && cascaderProps.lazyLoad && typeof cascaderProps.lazyLoad === 'function') {
			cascaderProps._formParams = _formParams;
			cascaderProps._column = deepClone(_column);
		}
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
				<div v-loading={valueExist(_column._dictDataLoading, false)} style="width: 100%;">
					<ElCascader
						ref={treeSelectRef}
						v-model={_modelValue.value}
						placeholder={placeholder}
						props={cascaderProps}
						separator={valueExist(cascaderProps.separator, '/')}
						options={valueExist(_column.dicData, [])}
						disabled={valueExist(props.disabled, false)}
						clearable={valueExist(_column.clearable, true)}
						filterable={valueExist(_column.filterable, false)}
						show-all-levels={valueExist(_column.showAllLevels, true)}
						collapse-tags={valueExist(_column.collapseTags, true)}
						collapse-tags-tooltip={valueExist(_column.collapseTagsTooltip, true)}
						onChange={onChange}
					></ElCascader>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
