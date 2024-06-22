import { defineComponent, provide, ref, computed, onMounted, onUnmounted, nextTick, watch, unref } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { ElScrollbar, ElIcon, ElImage, ElMessage } from 'element-plus';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import { merge } from 'lodash-unified';
import isEqual from 'lodash-es/isequal';
import { useNamespace, useLocale } from 'packages/hooks';
import { deepClone, elementResize } from 'packages/hooks/global-hook';
import NextSpinLoading from 'packages/components/spin-loading/src';
import ToolHeader from './widgets/tool-header';
import CanvasContext from './widgets/canvas-context';
import RightLabel from './widgets/right-label';
import { convertToLabel, canvertToCanvas } from './hooks/canvas-context-hook';
import type { RectProps } from './hooks/canvas-context-hook';
import defaultConfig from './config';

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
		rowKey: {
			type: String,
			default: 'id',
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
	emits: ['change', 'save', 'prev-click', 'next-click'],
	setup(props, { emit, slots, expose }) {
		const { t } = useLocale();
		const _config = deepClone(defaultConfig);
		const _options = computed(() => {
			const cfg = unref(props.options);
			return merge(_config, cfg);
		});
		const options = unref(_options);
		provide('ns', ns);
		provide('_emit', emit);
		const activateNodeIndex = ref<number>(0);
		const classes = ref<any>(props.classes);
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
		watch(
			() => props.classes,
			val => {
				classes.value = val;
			},
			{
				deep: true,
			}
		);
		const currentNode = computed(() => {
			if (!labelImages.value) return {};
			const node = labelImages.value[activateNodeIndex.value] || {};
			return deepClone(node);
		});
		const activateNodeLabels = ref<any>(currentNode.value.labels || []);
		watch(
			() => currentNode.value,
			() => {
				activateNodeLabels.value = currentNode.value.labels || [];
			}
		);
		const onChangeNodeRect = (rects: RectProps) => {
			currentNode.value.labels = rects;
			activateNodeLabels.value = rects;
		};
		const loading = ref<boolean>(false);
		const formatNodeLabels = () => {
			const node = currentNode.value;
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
		const isChangeNodeLabels = () => {
			const node = labelImages.value[activateNodeIndex.value];
			return isEqual(node.labels, currentNode.value.labels);
		};
		const switchKeydownAD = (e: KeyboardEvent) => {
			const imageLength = labelImages.value.length;
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
		};
		const onKeydownPrevNext = (e: KeyboardEvent) => {
			if (loading.value) return;
			if (!['KeyA', 'KeyD'].includes(e.code)) return;
			loading.value = true;
			const { node, label_txt } = formatNodeLabels();
			// 新渲染图片关闭之前的操作框
			canvasContextRef.value.onCloseDraggableRectFixed();
			if (isChangeNodeLabels()) {
				// 当标注数据没更新
				switchKeydownAD(e);
				loading.value = false;
				return;
			}
			emit(
				'save',
				{ node, label_txt },
				(imageItem?: any) => {
					// 保存成功后更新当前图片数据
					labelImages.value[activateNodeIndex.value] = imageItem ? imageItem : node;
					switchKeydownAD(e);
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
			// 新渲染图片关闭之前的操作框
			canvasContextRef.value.onCloseDraggableRectFixed();
			if (isChangeNodeLabels()) {
				// 当标注数据没更新
				activateNodeIndex.value = index;
				loading.value = false;
				return false;
			}
			emit(
				'save',
				{ node, label_txt },
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
		const canvasContextRef = ref<any>();
		const layoutLabelRef = ref<HTMLElement>();
		const headerRef = ref<HTMLElement>();
		const mainRef = ref<HTMLElement>();
		const footerRef = ref<HTMLDivElement>();
		const mainContentHeight = ref(options.minContentHeight);
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
		const onSelectLabelNode = (rect: RectProps, index: number) => {
			canvasContextRef.value.onSelectedLabel(rect, index);
		};
		const onDeleteLabelNode = (rect: RectProps) => {
			canvasContextRef.value.onDeleteLabel(rect);
		};
		const isFullscreen = ref<boolean>(false);
		const onSwitchFillscreen = (val: boolean) => {
			isFullscreen.value = val;
			updateMainContentHeight();
			nextTick(() => {
				canvasContextRef.value.rerenderImage();
			});
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
		expose({
			convertToLabel,
			canvertToCanvas,
		});
		const renderContent = () => {
			return (
				<div ref={layoutLabelRef} class={[ns.b(), props.className, isFullscreen.value ? ns.b('fullscreen') : '']} style={{ ...props.style }}>
					<NextSpinLoading loading={loading.value} tip={t('next.labelimg.saveTxt')} class={[ns.b('loading')]}>
						<ElScrollbar>
							<header ref={headerRef} class={[ns.b('header')]}>
								{slots['header'] ? slots['header']() : <ToolHeader isFullscreen={isFullscreen.value} onFullscreen={onSwitchFillscreen} onSave={() => onToolHeaderSave()}></ToolHeader>}
							</header>
							<div ref={mainRef} class={[ns.b('main')]}>
								<ElScrollbar class={[ns.be('main', 'content')]}>
									<div class={[ns.be('main', 'content')]} style={{ height: mainContentHeight.value + 'px' }}>
										<CanvasContext
											ref={canvasContextRef}
											contextClientHeight={mainContentHeight.value}
											classes={classes.value}
											rowInfo={currentNode.value}
											onChange={onChangeNodeRect}
										></CanvasContext>
									</div>
								</ElScrollbar>
								<RightLabel
									contentHeight={mainContentHeight.value}
									classes={classes.value}
									labels={activateNodeLabels.value}
									onDelete={onDeleteLabelNode}
									onSelect={onSelectLabelNode}
								></RightLabel>
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
