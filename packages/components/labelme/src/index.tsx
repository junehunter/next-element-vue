import { defineComponent, ref, provide, watch, computed, onMounted, onUnmounted, unref, nextTick } from 'vue';
import type { CSSProperties, PropType } from 'vue';
import { ElScrollbar, ElIcon, ElImage, ElMessage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { useNamespace, useLocale } from 'packages/hooks';
import { merge } from 'lodash-unified';
import { deepClone, elementResize } from 'packages/hooks/global-hook';
import NextSpinLoading from 'packages/components/spin-loading';
import CanvasContext from './widgets/canvas-context';
import HeaderTool from './widgets/header-tool';
import LeftTools from './widgets/left-tools';
import RightLabel from './widgets/right-label';
import defaultConfig from './config';
import type { ScaleTranslate, ScaleTranslateManager, LabelNodeProps, ShapesProps } from './config';

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
	emits: ['change', 'save', 'edit-polygon', 'change-polygon', 'prev-click', 'next-click'],
	setup(props, { emit, slots }) {
		const _config = deepClone(defaultConfig);
		const _options = computed(() => {
			const cfg = unref(props.options);
			return merge(_config, cfg);
		});
		const options = unref(_options);
		provide('ns', ns);
		const { t } = useLocale();
		const activateNodeIndex = ref<number>(0);
		const classes = ref<any>(props.classes);
		provide('classes', classes);
		const toolsActive = ref<string>('');
		provide('toolsActive', toolsActive);
		provide('changeToolsActive', (val: string) => {
			toolsActive.value = val;
		});
		const labelImages = ref<any>(deepClone(props.data));
		watch(
			() => props.data,
			data => {
				labelImages.value = deepClone(data);
			},
			{
				deep: true,
			}
		);
		watch(
			() => props.data.length,
			() => {
				activateNodeIndex.value = 0;
			}
		);
		const currentNode = computed(() => {
			if (!labelImages.value) return {};
			const node = labelImages.value[activateNodeIndex.value] || {};
			return deepClone(node);
		});
		const onUpdateLabelInfo = (val: LabelNodeProps) => {
			labelImages.value[activateNodeIndex.value] = val;
		};
		const onDeleteLabelShape = (shape: ShapesProps) => {
			const node = currentNode.value;
			const index = node.labels?.shapes?.findIndex((item: ShapesProps) => item.id === shape.id);
			if (index !== -1) {
				node.labels.shapes.splice(index, 1);
			}
			labelImages.value[activateNodeIndex.value] = node;
		};
		const onUpdateLabelShape = (shape: ShapesProps) => {
			const node = currentNode.value;
			const index = node.labels?.shapes?.findIndex((item: ShapesProps) => item.id === shape.id);
			if (index !== -1) {
				node.labels.shapes[index] = shape;
			}
			labelImages.value[activateNodeIndex.value] = node;
		};
		const loading = ref<boolean>(false);
		const mainContentHeight = ref(options.minContentHeight);
		const canvasContextRef = ref<any>();
		const layoutLabelRef = ref<HTMLElement>();
		const headerRef = ref<HTMLElement>();
		const mainRef = ref<HTMLElement>();
		const footerRef = ref<HTMLDivElement>();

		const updateMainContentHeight = () => {
			nextTick(() => {
				const layoutCrudHeight = (layoutLabelRef.value as HTMLDivElement)?.clientHeight || 0;
				const headerHeight = (headerRef.value as HTMLDivElement)?.clientHeight || 0;
				const footerHeight = (footerRef.value as HTMLDivElement)?.clientHeight || 0;
				const contentHeight = layoutCrudHeight - (headerHeight + footerHeight);
				mainContentHeight.value = contentHeight;
			});
		};
		onMounted(() => {
			document.addEventListener('keydown', onKeydownPrevNext);
			elementResize(layoutLabelRef.value.parentElement as HTMLElement, () => {
				updateMainContentHeight();
			});
			window.addEventListener('resize', updateMainContentHeight);
		});
		onUnmounted(() => {
			document.removeEventListener('keydown', onKeydownPrevNext);
			window.removeEventListener('resize', updateMainContentHeight);
		});
		const onKeydownPrevNext = () => {};
		const onPaginationPrev = () => {
			const imageLength = labelImages.value.length;
			let i = activateNodeIndex.value - 1;
			if (i < 0) i = imageLength - 1;
			onChangeActivateNode(i);
			emit('prev-click');
		};
		const onPaginationNext = () => {
			const imageLength = labelImages.value.length;
			let i = activateNodeIndex.value + 1;
			if (i >= imageLength) i = 0;
			onChangeActivateNode(i);
			emit('next-click');
		};
		const onChangeActivateNode = (index: number) => {
			if (loading.value) return;
			loading.value = true;
			const node = currentNode.value;
			emit(
				'save',
				{ node },
				(imageItem?: any) => {
					labelImages.value[activateNodeIndex.value] = imageItem ? imageItem : node;
					activateNodeIndex.value = index;
					loading.value = false;
				},
				() => {
					loading.value = false;
				}
			);
			return true;
		};
		const isFullscreen = ref<boolean>(false);
		const onSwitchFillscreen = (val: boolean) => {
			isFullscreen.value = val;
			updateMainContentHeight();
			nextTick(() => {
				canvasContextRef.value.rerenderImage();
			});
		};
		const onChangePolygon = (node: LabelNodeProps) => {
			currentNode.value.labels = node;
			emit('change-polygon', node);
		};

		const onEditPolygon = (node: LabelNodeProps) => {
			// currentNode.value.labels = node;
			emit('edit-polygon', node);
		};
		const onToolHeaderSave = () => {
			const status = onChangeActivateNode(activateNodeIndex.value);
			if (!status) {
				ElMessage({
					type: 'info',
					message: t('next.labelimg.labelNoUpdate'),
				});
			}
		};
		const scaleTranslate = ref<ScaleTranslate>({
			scale: 1,
			x: 0,
			y: 0,
		});
		provide('scaleTranslateManager', {
			scaleTranslate,
			onChangeScaleTranslate: (val: ScaleTranslate) => {
				scaleTranslate.value = val;
			},
			onResetScaleTranslate: () => {
				canvasContextRef.value!.resetScaleOffset();
			},
		} as ScaleTranslateManager);
		const renderContent = () => {
			return (
				<div ref={layoutLabelRef} class={[ns.b(), props.className, isFullscreen.value ? ns.b('fullscreen') : '']} style={{ ...props.style }}>
					<NextSpinLoading loading={loading.value} tip={t('next.labelimg.saveTxt')} class={[ns.b('loading')]}>
						<ElScrollbar>
							<header ref={headerRef} class={[ns.b('header')]}>
								{slots['header'] ? (
									slots['header']()
								) : (
									<HeaderTool
										isFullscreen={isFullscreen.value}
										imageIndex={activateNodeIndex.value}
										imageLength={labelImages.value.length}
										onFullscreen={onSwitchFillscreen}
										onSave={onToolHeaderSave}
									></HeaderTool>
								)}
							</header>
							<div ref={mainRef} class={[ns.b('main')]}>
								<LeftTools></LeftTools>
								<div class={[ns.be('main', 'content')]} style={{ height: mainContentHeight.value + 'px' }}>
									<CanvasContext
										ref={canvasContextRef}
										labelInfo={currentNode.value}
										onEditPolygon={onEditPolygon}
										onChangePolygon={onChangePolygon}
										onUpdateLabelInfo={onUpdateLabelInfo}
									></CanvasContext>
								</div>
								<RightLabel shapes={currentNode.value.labels?.shapes} onUpdate={onUpdateLabelShape} onDelete={onDeleteLabelShape}></RightLabel>
							</div>
							<footer ref={footerRef} class={[ns.b('footer')]}>
								<div class={[ns.be('footer', 'left')]}>
									<ElIcon size={24} color="#797979" onClick={onPaginationPrev}>
										<ArrowLeft />
									</ElIcon>
								</div>
								<div class={[ns.be('footer', 'center')]}>
									<ElScrollbar>
										<ul class={[ns.bem('footer', 'center', 'list')]}>
											{labelImages.value.map((item, index) => {
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
									<ElIcon size={24} color="#797979" onClick={onPaginationNext}>
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
