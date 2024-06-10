import { defineComponent, provide, ref, computed } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElScrollbar } from 'element-plus';
import { useNamespace } from 'packages/hooks';
import CanvasContext from './widgets/canvas-context';

const ns = useNamespace('labelimg');
export default defineComponent({
	name: 'NextLabelimg',
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
	},
	emits: ['change'],
	setup(props, { emit }) {
		provide('ns', ns);
		provide('_emit', emit);
		const { classes, list } = props.options;
		const activateNodeIndex = ref<number>(0);
		const currentNode = computed(() => {
			if (!list) return {};
			const node = list[activateNodeIndex.value] || {};
			return node;
		});
		const renderContent = () => {
			return (
				<ElScrollbar class={[ns.b(), props.className]} style={{ ...props.style }}>
					<header class={[ns.b('header')]}>
						<ul>
							<li>工具</li>
						</ul>
						<ul>
							<li>全屏</li>
						</ul>
					</header>
					<div class={[ns.b('main')]}>
						<CanvasContext classes={classes} rowInfo={currentNode.value}></CanvasContext>
					</div>
					<footer class={[ns.b('footer')]}></footer>
				</ElScrollbar>
			);
		};
		return () => renderContent();
	},
});
