import { defineComponent, computed } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElScrollbar } from 'element-plus';
import { useNamespace } from 'packages/hooks';

const ns = useNamespace('container');
export default defineComponent({
	name: 'NextContainer',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		scrollbar: {
			type: Boolean,
			default: false,
		},
		padding: {
			type: [Boolean, String, Number],
			default: true,
		},
		card: {
			type: Boolean,
			default: false,
		},
	},
	setup(props, { slots }) {
		const styles = computed<CSSProperties>(() => {
			let style = {};
			const padding = props.padding;
			if (typeof padding === 'boolean') {
				if (padding) {
					style = {
						padding: '15px',
					};
				} else {
					style = {};
				}
			} else if (typeof padding === 'string') {
				style = {
					padding: padding,
				};
			} else if (typeof padding === 'number') {
				style = {
					padding: padding + 'px',
				};
			}
			return style;
		});
		const renderContent = () => {
			if (props.scrollbar) {
				return (
					<ElScrollbar class={[ns.b(), props.className]} style={props.style}>
						{slots.default?.()}
					</ElScrollbar>
				);
			} else {
				return (
					<div class={[ns.b(), props.className]} style={{ ...styles.value, ...props.style }}>
						{props.card ? <div class={ns.b('card')}>{slots.default?.()}</div> : slots.default?.()}
					</div>
				);
			}
		};
		return () => renderContent();
	},
});
