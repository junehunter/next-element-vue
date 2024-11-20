import { defineComponent, markRaw, ref, watchEffect, h, provide, watch } from 'vue';
import type { PropType, CSSProperties, Component } from 'vue';
import { useNamespace, updateThemeColorCssVar } from 'packages/hooks';
import { mergeWith } from 'lodash-unified';
import defaultConfig from './config';
import defaults from './defaults/index';
import transverse from './transverse/index';
import columns from './columns/index';
import classic from './classic/index';
import composite from './composite/index';

const ns = useNamespace('layout');

// 引入布局组件
const layouts: any = {
	defaults: markRaw(defaults), // 默认布局
	transverse: markRaw(transverse), // 横向布局
	columns: markRaw(columns), // 分栏布局
	classic: markRaw(classic), // 经典布局
	composite: markRaw(composite), // 综合布局，顶部一级菜单，左侧子菜单
};
// 如果是数组对象，则直接返回 srcValue，进行覆盖
const customizerCoverArray = (objValue, srcValue) => {
	if (Array.isArray(objValue)) {
		return srcValue;
	}
};
export default defineComponent({
	name: 'NextLayout',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		options: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	emits: ['changeLanguage', 'changeUserDropdown', 'changeOptions', 'tabsChange', 'tabsSelect', 'tabsClose'],
	setup(props, { slots, emit }) {
		const _config = ref<any>(mergeWith(defaultConfig, props.options, customizerCoverArray));
		provide('options', _config.value);
		provide('__ns__', ns);
		provide('__emit__', emit);
		provide('__slots__', slots);
		const updateOptions = (cfg: any) => {
			_config.value = mergeWith(_config.value, cfg, customizerCoverArray);
			updateThemeColorCssVar(_config.value?.setting);
			emit('changeOptions', _config.value);
		};
		provide('updateOptions', updateOptions);
		// 外部props数据触发更新
		watch(
			() => props.options,
			cfg => {
				updateOptions(cfg);
			},
			{
				deep: true,
				immediate: true,
			}
		);
		return { options: _config.value, updateOptions };
	},
	render() {
		const props = this.$props;
		const slots = this.$slots;
		const layout = this.options.setting?.layout || 'transverse';
		const activeLayout = ref<Component>(layouts[layout]);
		const updateLayout = () => {
			activeLayout.value = layouts[layout];
			// 当配置项没有定义时使用默认布局
			if (!activeLayout.value) {
				activeLayout.value = layouts.transverse;
			}
		};
		watchEffect(() => {
			updateLayout();
		});
		const _activeSlots: any = {};
		for (const key in slots) {
			if (Object.prototype.hasOwnProperty.call(slots, key)) {
				_activeSlots[key] = () => slots[key]?.();
			}
		}
		return (
			<div class={[ns.b(), props.className]} style={props.style}>
				{h(
					activeLayout.value,
					{},
					{
						..._activeSlots,
					}
				)}
			</div>
		);
	},
});
