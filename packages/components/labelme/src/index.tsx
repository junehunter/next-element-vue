import { defineComponent, ref } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { useNamespace, useLocale } from 'packages/hooks';

const ns = useNamespace('labelme');
export default defineComponent({
	name: 'NextLabelme',
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
			default: () => ({}),
		},
		classes: {
			type: Array,
			default: () => [],
		},
		data: {
			type: Array as PropType<any[]>,
			default: () => [],
		},
	},
	setup(props) {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const { t } = useLocale();
		const isFullscreen = ref<boolean>(false);
		const renderContent = () => {
			return <div class={[ns.b(), props.className, isFullscreen.value ? ns.b('fullscreen') : '']} style={{ ...props.style }}></div>;
		};
		return () => <>{renderContent()}</>;
	},
});
