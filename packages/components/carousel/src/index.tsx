import { defineComponent } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { useNamespace } from 'packages/hooks';
/**
 * https://swiperjs.com/
 */
const ns = useNamespace('container');
export default defineComponent({
	name: 'NextCarousel',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
	},
	setup(props, { slots }) {
		const renderContent = () => {
			return (
				<div class={[ns.b(), props.className]} style={{ ...props.style }}>
					{slots.default?.()}
				</div>
			);
		};
		return () => renderContent();
	},
});
