import { defineComponent, provide, ref, computed, onMounted, onUnmounted } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElScrollbar, ElIcon, ElImage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone } from 'packages/hooks/global-hook';
import NextSpinLoading from 'packages/components/spin-loading/src';
import CanvasContext from './widgets/canvas-context';
import { convertToLabel, canvertToCanvas } from './hooks/canvas-context-hook';
import type { RectProps } from './hooks/canvas-context-hook';

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
	emits: ['change', 'save', 'prev-click', 'next-click'],
	setup(props, { emit, slots, expose }) {
		const { t } = useLocale();
		provide('ns', ns);
		provide('_emit', emit);
		const { classes, list } = props.options;
		const activateNodeIndex = ref<number>(0);
		const currentNode = computed(() => {
			if (!list) return {};
			const node = list[activateNodeIndex.value] || {};
			return node;
		});
		const imageLength = list.length;
		const loading = ref<boolean>(false);
		const formatNodeLabels = () => {
			const node = deepClone(currentNode.value);
			let yolo_label = [];
			node.labels.forEach((rect: RectProps) => {
				delete rect.typeName;
				const label_rect = convertToLabel(rect);
				yolo_label.push(label_rect.join(' '));
			});
			return {
				node,
				label_txt: yolo_label.join('\n'),
			};
		};
		const onKeydown = (e: KeyboardEvent) => {
			if (loading.value) return;
			loading.value = true;
			const { node, label_txt } = formatNodeLabels();
			emit(
				'save',
				{ node, label_txt },
				() => {
					if (e.code === 'KeyD') {
						activateNodeIndex.value++;
						if (activateNodeIndex.value >= imageLength) {
							activateNodeIndex.value = 0;
						}
					} else if (e.code === 'KeyA') {
						activateNodeIndex.value--;
						if (activateNodeIndex.value < 0) {
							activateNodeIndex.value = imageLength - 1;
						}
					}
					loading.value = false;
				},
				() => {
					loading.value = false;
				}
			);
		};
		const onChangeActivateNode = (index: number) => {
			if (loading.value) return;
			loading.value = true;
			const { node, label_txt } = formatNodeLabels();
			emit(
				'save',
				{ node, label_txt },
				() => {
					activateNodeIndex.value = index;
					loading.value = false;
				},
				() => {
					loading.value = false;
				}
			);
		};
		const onPaginationPrev = () => {
			emit('prev-click');
		};
		const onPaginationNext = () => {
			emit('next-click');
		};
		onMounted(() => {
			document.addEventListener('keydown', onKeydown);
		});
		onUnmounted(() => {
			document.removeEventListener('keydown', onKeydown);
		});
		expose({
			convertToLabel,
			canvertToCanvas,
		});
		const renderContent = () => {
			return (
				<NextSpinLoading loading={loading.value} tip={t('next.labelimg.saveTxt')} class={[ns.b('loading')]}>
					<ElScrollbar class={[ns.b(), props.className]} style={{ ...props.style }}>
						<header class={[ns.b('header')]}>
							{slots['header'] ? (
								slots['header']()
							) : (
								<>
									<ul></ul>
									<ul></ul>
								</>
							)}
						</header>
						<div class={[ns.b('main')]}>
							<CanvasContext classes={classes} rowInfo={currentNode.value}></CanvasContext>
						</div>
						<footer class={[ns.b('footer')]}>
							<div class={[ns.be('footer', 'left')]}>
								<ElIcon size={24} onClick={onPaginationPrev}>
									<ArrowLeft />
								</ElIcon>
							</div>
							<div class={[ns.be('footer', 'center')]}>
								<ElScrollbar>
									<ul class={[ns.bem('footer', 'center', 'list')]}>
										{list.map((item, index) => {
											return (
												<li key={index} onClick={() => onChangeActivateNode(index)} class={{ 'is-activate': activateNodeIndex.value === index }}>
													<ElImage style="height: 100%" src={item.imageSrc} zoom-rate={1.2} max-scale={2} min-scale={0.2} fit="cover" />
												</li>
											);
										})}
									</ul>
								</ElScrollbar>
							</div>
							<div class={[ns.be('footer', 'right')]}>
								<ElIcon size={24} onClick={onPaginationNext}>
									<ArrowRight />
								</ElIcon>
							</div>
						</footer>
					</ElScrollbar>
				</NextSpinLoading>
			);
		};
		return () => renderContent();
	},
});
