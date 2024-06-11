import { defineComponent, provide, ref, computed } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElScrollbar, ElIcon, ElImage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
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
		const updateActivateNode = (index: number) => {
			activateNodeIndex.value = index;
		};
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
					<footer class={[ns.b('footer')]}>
						<div class={[ns.be('footer', 'left')]}>
							<ElIcon size={24}>
								<ArrowLeft />
							</ElIcon>
						</div>
						<div class={[ns.be('footer', 'center')]}>
							<ElScrollbar>
								<ul class={[ns.bem('footer', 'center', 'list')]}>
									{list.map((item, index) => {
										return (
											<li key={index} onClick={() => updateActivateNode(index)}>
												<ElImage style="height: 100%" src={item.imageSrc} zoom-rate={1.2} max-scale={2} min-scale={0.2} fit="cover" />
											</li>
										);
									})}
								</ul>
							</ElScrollbar>
						</div>
						<div class={[ns.be('footer', 'right')]}>
							<ElIcon size={24}>
								<ArrowRight />
							</ElIcon>
						</div>
					</footer>
				</ElScrollbar>
			);
		};
		return () => renderContent();
	},
});
