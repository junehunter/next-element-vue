import { defineComponent } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElUpload } from 'element-plus';
import { useNamespace } from 'packages/hooks';

const ns = useNamespace('upload');
export default defineComponent({
	name: 'NextUpload',
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
	setup() {
		return {};
	},
	render() {
		const props = this.$props;
		return <ElUpload class={[ns.b(), props.className]} style={props.style}></ElUpload>;
	},
});
