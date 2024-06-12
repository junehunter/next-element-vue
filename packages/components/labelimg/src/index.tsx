import { defineComponent, provide, ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElScrollbar, ElIcon, ElImage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone, elementResize } from 'packages/hooks/global-hook';
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
			default: () => ({ classes: [], list: [] }),
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
		const onKeydownPrevNext = (e: KeyboardEvent) => {
			if (loading.value) return;
			if (!['KeyA', 'KeyD'].includes(e.code)) return;
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
		const layoutRef = ref<HTMLElement>();
		const headerRef = ref<HTMLElement>();
		const mainRef = ref<HTMLElement>();
		const footerRef = ref<HTMLDivElement>();
		const mainContentHeight = ref(500);
		const updateMainContentHeight = () => {
			nextTick(() => {
				const layoutCrudHeight = (layoutRef.value as HTMLDivElement)?.clientHeight || 0;
				const headerHeight = (headerRef.value as HTMLDivElement)?.clientHeight || 0;
				const footerHeight = (footerRef.value as HTMLDivElement)?.clientHeight || 0;
				const contentHeight = layoutCrudHeight - (headerHeight + footerHeight);
				mainContentHeight.value = contentHeight;
			});
		};
		onMounted(() => {
			document.addEventListener('keydown', onKeydownPrevNext);
			elementResize(layoutRef.value as HTMLElement, () => {
				updateMainContentHeight();
			});
		});
		onUnmounted(() => {
			document.removeEventListener('keydown', onKeydownPrevNext);
		});
		expose({
			convertToLabel,
			canvertToCanvas,
		});
		const renderContent = () => {
			return (
				<div ref={layoutRef} class={[ns.b(), props.className]} style={{ ...props.style }}>
					<NextSpinLoading loading={loading.value} tip={t('next.labelimg.saveTxt')} class={[ns.b('loading')]}>
						<ElScrollbar>
							<header ref={headerRef} class={[ns.b('header')]}>
								{slots['header'] ? (
									slots['header']()
								) : (
									<>
										<ul></ul>
										<ul></ul>
									</>
								)}
							</header>
							<div ref={mainRef} class={[ns.b('main')]}>
								<CanvasContext classes={classes} rowInfo={currentNode.value}></CanvasContext>
							</div>
							<footer ref={footerRef} class={[ns.b('footer')]}>
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
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
