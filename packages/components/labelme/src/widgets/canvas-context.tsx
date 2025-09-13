import { defineComponent, ref, inject, watch, toRaw, onMounted, nextTick, onUnmounted, computed } from 'vue';
import type { Ref } from 'vue';
import { NextSpinLoading } from 'packages/components';
import ContextMenuLabel from '../widgets/contextmenu-label';
import { timeUniqueId, valueExist } from 'packages/hooks/global-hook';
import { CreateDrawCanvas } from '../hooks/canvas-content-hook';
import { CanvasSceneDragZoom } from 'packages/components/labelimg/src/hooks/canvas-drag-zoom';
import type { ScaleTranslate, ScaleTranslateManager, ShapesProps } from '../config';
import { ToolsHandleType } from '../config';
import { vertexesToImageScale } from '../core/utils';

export default defineComponent({
	props: {
		contextClientHeight: {
			type: Number,
			default: null,
		},
		rowInfo: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['editPolygon', 'changePolygon'],
	setup(props, { emit, expose }) {
		const ns = inject('ns', {} as any);
		const classes = inject<Ref<any>>('classes', ref([]));
		const toolsActive = inject('toolsActive', {} as Ref<string>);
		const scaleTranslateManager = inject('scaleTranslateManager', {} as ScaleTranslateManager);
		const mainBasaeRef = ref<any>();
		const canvasMainRef = ref<HTMLElement>();
		const canvasBaseRef = ref<HTMLCanvasElement>();
		const drawCanvas = ref<CreateDrawCanvas>();
		const canvasDragZoom = ref<CanvasSceneDragZoom>();

		const setContainerWidthHeight = (canvasWidth: number, canvasHeight: number) => {
			canvasMainRef.value!.style.width = canvasWidth + 'px';
			canvasMainRef.value!.style.height = canvasHeight + 'px';
			canvasBaseRef.value!.width = canvasWidth;
			canvasBaseRef.value!.height = canvasHeight;
			canvasBaseRef.value!.style.width = canvasWidth + 'px';
			canvasBaseRef.value!.style.height = canvasHeight + 'px';
		};
		const loadingImage = ref<boolean>(false);

		const getCanvasWidthHeight = (image: HTMLImageElement) => {
			const clientWidth = mainBasaeRef.value?.elementInstance.clientWidth as number;
			const clientHeight = mainBasaeRef.value?.elementInstance.clientHeight as number;
			let { width, height } = image;
			let scaleFactor: number = 1;
			// 当图片宽高都小于容器，放大
			const aspect_ratio = width / height;
			if (aspect_ratio > 1) {
				// 宽度大于高度，宽度固定
				width = clientWidth;
				height = clientWidth / aspect_ratio;
			} else {
				// 高度大于宽度，高度固定
				width = clientHeight * aspect_ratio;
				height = clientHeight;
			}
			if (height > clientHeight) {
				// 当图片高度大于容器高度，缩放
				const scale = height / clientHeight;
				height = clientHeight;
				width = width / scale;
			} else if (width > clientWidth) {
				// 当图片宽度大于容器高度，缩放
				const scale = width / clientWidth;
				width = clientWidth;
				height = height / scale;
			}
			const canvasWidth = parseInt(width.toString());
			const canvasHeight = parseInt(height.toString());
			scaleFactor = Number((canvasWidth / canvasHeight).toFixed(2));
			const scaleX = (canvasWidth / image.width).toFixed(8);
			const scaleY = (canvasHeight / image.height).toFixed(8);
			return {
				canvasWidth,
				canvasHeight,
				scaleFactor,
				scaleX: Number(scaleX),
				scaleY: Number(scaleY),
				originWidth: image.width,
				originHeight: image.height,
			};
		};
		const renderImageLabel = (rowInfo: any) => {
			const ctx = canvasBaseRef.value?.getContext('2d') as CanvasRenderingContext2D;
			if (rowInfo?.imageSrc) {
				const image = new Image();
				image.src = rowInfo.imageSrc;
				loadingImage.value = true;
				image.onload = () => {
					loadingImage.value = false;
					const { canvasWidth, canvasHeight, scaleX, scaleY, originWidth, originHeight } = getCanvasWidthHeight(image);
					image.style.width = canvasWidth + 'px';
					image.style.height = canvasHeight + 'px';
					setContainerWidthHeight(canvasWidth, canvasHeight);
					drawCanvas.value = new CreateDrawCanvas({
						canvas: canvasBaseRef.value,
						ctx: ctx,
						image: image,
						canvasWidth,
						canvasHeight,
						labels: rowInfo.labels,
						imageScaleX: scaleX,
						imageScaleY: scaleY,
					});
					canvasDragZoom.value = new CanvasSceneDragZoom(canvasBaseRef.value);
					canvasDragZoom.value.changeZoom((scaleOffset: ScaleTranslate) => {
						scaleTranslateManager.onChangeScaleTranslate(scaleOffset);
						drawCanvas.value!.updateTransform(scaleOffset);
						drawCanvas.value!.render();
					});
					drawCanvas.value.subscribeCreateComplete((vertexes, mouseOffset) => {
						const new_vertexes = vertexesToImageScale(vertexes, scaleX, scaleY, false);
						const shape = {
							id: timeUniqueId(),
							type: 'polygon',
							points: new_vertexes,
						};
						updateContextmenuLabelFixed(mouseOffset.x, mouseOffset.y, shape);
					});
					drawCanvas.value.subscribeEditing(vertexes => {
						const new_vertexes = vertexesToImageScale(vertexes, scaleX, scaleY, false);
						emit('editPolygon', {
							vertexes: new_vertexes,
							originWidth,
							originHeight,
						});
					});

					watch(
						() => toolsActive.value,
						() => {
							drawCanvas.value!.destroyAllInstance();
							if (toolsActive.value === ToolsHandleType.CreatePolygon) {
								drawCanvas.value!.createPolygonEventListener();
							}
						},
						{ immediate: true }
					);
				};
				image.onerror = () => {
					loadingImage.value = false;
				};
			}
		};
		onMounted(() => {
			watch(
				() => props.rowInfo,
				info => {
					const rowInfo = toRaw(info);
					renderImageLabel(rowInfo);
				},
				{
					deep: true,
					immediate: true,
				}
			);
			// 当画布主体高度变化重新计算绘制
			watch(
				() => props.contextClientHeight,
				height => {
					if (valueExist(height)) {
						canvasMainRef.value!.style.height = height + 'px';
						const rowInfo = toRaw(props.rowInfo);
						renderImageLabel(rowInfo);
					}
				}
			);
		});
		onUnmounted(() => {
			drawCanvas.value!.destroy();
			canvasDragZoom.value!.destroy();
		});
		const rerenderImage = () => {
			onCloseContentmenuLabel();
			nextTick(() => {
				const rowInfo = toRaw(props.rowInfo);
				renderImageLabel(rowInfo);
			});
		};
		const contextmenuLabelFixed = ref<any>({
			show: false,
			top: 0,
			left: 0,
			activateShape: null,
		});
		const onCloseContentmenuLabel = () => {
			contextmenuLabelFixed.value.show = false;
			contextmenuLabelFixed.value.top = 0;
			contextmenuLabelFixed.value.left = 0;
			contextmenuLabelFixed.value.activateShape = null;
		};
		const updateContextmenuLabelFixed = (x: number, y: number, shape: ShapesProps) => {
			// 根据绘制区域在窗口位置设置标注菜单栏位置
			const contextRect = canvasBaseRef.value.getBoundingClientRect();
			contextmenuLabelFixed.value.show = true;
			contextmenuLabelFixed.value.left = x + contextRect.x;
			contextmenuLabelFixed.value.top = y + contextRect.y;
			contextmenuLabelFixed.value.canvasWidth = canvasBaseRef.value!.width;
			contextmenuLabelFixed.value.canvasHeight = canvasBaseRef.value!.height;
			contextmenuLabelFixed.value.activateShape = shape;
		};
		const contextmenuLabelRect = computed(() => {
			const { top, left, canvasWidth, canvasHeight } = contextmenuLabelFixed.value;
			return { top, left, canvasWidth, canvasHeight };
		});
		const onSelectLabel = () => {
			const { activateShape } = contextmenuLabelFixed.value;
			drawCanvas.value!.addShape(activateShape);
			onCloseContentmenuLabel();
		};
		const onDeleteLabel = () => {
			onCloseContentmenuLabel();
		};
		const renderContent = () => {
			return (
				<NextSpinLoading ref={mainBasaeRef} loading={loadingImage.value} class={[ns.b('loading')]} style={{ height: '100%' }}>
					<div ref={canvasMainRef} class={[ns.b('canvas')]}>
						<canvas ref={canvasBaseRef} class={[ns.be('canvas', 'context')]}></canvas>
						{contextmenuLabelFixed.value.show ? (
							<ContextMenuLabel
								fixed={contextmenuLabelRect.value}
								classes={classes.value}
								activateShape={contextmenuLabelFixed.value.activateShape}
								onClose={onCloseContentmenuLabel}
								onSelect={onSelectLabel}
								onDelete={onDeleteLabel}
							></ContextMenuLabel>
						) : null}
					</div>
				</NextSpinLoading>
			);
		};
		expose({
			rerenderImage,
			resetScaleOffset: () => {
				canvasDragZoom.value!.reset();
			},
		});
		return () => <>{renderContent()}</>;
	},
});
