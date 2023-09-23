import { defineComponent, markRaw, ref, watchEffect, h, PropType, CSSProperties, provide } from 'vue';
import type { Component } from 'vue';
import { useNamespace } from 'packages/hooks';
import { merge } from 'lodash-unified';
import defaultConfig from './config';
import defaults from './defaults/index';
import transverse from './transverse/index';
import columns from './columns/index';
import classic from './classic/index';

const ns = useNamespace('layout');

// 引入布局组件
const layouts: any = {
	defaults: markRaw(defaults), // 默认布局
	transverse: markRaw(transverse), // 横向布局
	columns: markRaw(columns), // 分栏布局
	classic: markRaw(classic), // 经典布局
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
		layout: {
			type: String,
			values: ['defaults', 'transverse', 'columns', 'classic'],
			default: 'transverse',
		},
		options: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	emits: ['changeLanguage', 'changeUserDropdown'],
	setup(props, { slots, emit }) {
		const config = merge(defaultConfig, props.options);
		provide('options', config);
		provide('__ns__', ns);
		provide('__emit__', emit);
		provide('__slots__', slots);
		return { config };
	},
	render() {
		const props = this.$props;
		const slots = this.$slots;
		const activeLayout = ref<Component>(layouts[props.layout]);
		const updateLayout = () => {
			activeLayout.value = layouts[props.layout];
			// 当配置项没有定义时使用默认布局
			if (!activeLayout.value) {
				activeLayout.value = layouts.defaults;
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
