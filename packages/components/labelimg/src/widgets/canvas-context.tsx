import { defineComponent, inject, ref, onMounted, toRaw, computed, watch, nextTick, onUnmounted } from 'vue';
import isEqual from 'lodash-es/isequal';
import { deepClone, valueExist } from 'packages/hooks/global-hook';
import { DrawBaseCanvas, DrawRectCanvas, convertToLabel, formatCanvasLabelScale, colors } from '../hooks/canvas-context-hook';
import type { RectProps } from '../hooks/canvas-context-hook';
import { NextSpinLoading } from 'packages/components';
import ContextMenuLabel from './contextmenu-label';
import DraggableRect from './draggable-rect';
import { CanvasSceneDragZoom, rectToScaleOffset } from '../hooks/canvas-drag-zoom';
import type { ScaleTranslate, ScaleTranslateManager } from '../config';
export default defineComponent({
	name: 'NextCanvasContext',
	props: {
		classes: {
			type: Array,
			default: () => [],
		},
		contextClientHeight: {
			type: Number,
			default: null,
		},
		rowInfo: {
			type: Object,
			default: () => ({}),
		},
	},
	emits: ['change'],
	setup(props, { emit, expose }) {
		const ns = inject('ns', {} as any);
		const _emit = inject('_emit', null as any);
		const scaleTranslateManager = inject('scaleTranslateManager', {} as ScaleTranslateManager);
		const mainBasaeRef = ref<any>();
		const canvasMainRef = ref<HTMLElement>();
		const canvasBaseRef = ref<HTMLCanvasElement>();
		const canvasRectRef = ref<HTMLCanvasElement>();
		const labels = ref<RectProps[]>([]);
		const drawBaseCanvas = ref<any>({});
		const canvasDragZoom = ref<any>();
		const formatLabelsTypeName = (rowInfo: any, originWidth: number, originHeight) => {
			if (!rowInfo.labels) return [];
			return rowInfo.labels.map((rect: RectProps) => {
				const typeName = props.classes[rect.type] as string;
				if (typeName) {
					rect.typeName = typeName;
				}
				if (!rect.originWidth) {
					rect.originWidth = originWidth;
				}
				if (!rect.originHeight) {
					rect.originHeight = originHeight;
				}
				return rect;
			});
		};
		const formatLabelsType = () => {
			const _labels = deepClone(labels.value);
			let yolo_label = [];
			const rects = _labels.map((rect: RectProps) => {
				delete rect.typeName;
				const label_rect = convertToLabel(rect);
				yolo_label.push(label_rect.join(' '));
				return toRaw(rect);
			});
			return {
				rects,
				label_txt: yolo_label.join('\n'),
			};
		};
		const setContainerWidthHeight = (canvasWidth: number, canvasHeight: number) => {
			canvasMainRef.value!.style.width = canvasWidth + 'px';
			canvasMainRef.value!.style.height = canvasHeight + 'px';
			canvasBaseRef.value!.width = canvasWidth;
			canvasBaseRef.value!.height = canvasHeight;
			canvasBaseRef.value!.style.width = canvasWidth + 'px';
			canvasBaseRef.value!.style.height = canvasHeight + 'px';
			canvasRectRef.value!.width = canvasWidth;
			canvasRectRef.value!.height = canvasHeight;
			canvasRectRef.value!.style.width = canvasWidth + 'px';
			canvasRectRef.value!.style.height = canvasHeight + 'px';
		};
		const loadingImage = ref<boolean>(false);
		const getCanvasWidthHeight = (image: HTMLImageElement) => {
			const clientWidth = mainBasaeRef.value?.elementInstance.clientWidth as number;
			const clientHeight = mainBasaeRef.value?.elementInstance.clientHeight as number;
			let { width, height } = image;
			let scaleFactor: number = 1;
			// 当图片宽高都小于容器，放大
			const scale = width / height;
			if (scale > 1) {
				// 宽度大于高度，宽度固定
				width = clientWidth;
				height = clientWidth / scale;
			} else {
				// 高度大于宽度，高度固定
				width = clientHeight * scale;
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
			return {
				canvasWidth,
				canvasHeight,
				scaleFactor,
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
					const { canvasWidth, canvasHeight, scaleFactor, originWidth, originHeight } = getCanvasWidthHeight(image);
					// 添加图片源宽高
					labels.value = formatLabelsTypeName(rowInfo, originWidth, originHeight);
					image.style.width = canvasWidth + 'px';
					image.style.height = canvasHeight + 'px';
					setContainerWidthHeight(canvasWidth, canvasHeight);
					// 当跟上一次画布宽高不一直时，根据当前预览的比例重新设置标注框位置和大小
					labels.value = formatCanvasLabelScale(labels.value, canvasHeight);
					const { updateLabels, addDrawRect, hitCanvasLabel } = DrawBaseCanvas({
						canvas: canvasBaseRef.value,
						ctx: ctx,
						image: image,
						canvasWidth,
						canvasHeight,
						labels: labels.value,
						scaleFactor: scaleFactor,
						scaleOffset: scaleTranslateManager.scaleTranslate,
					});
					drawBaseCanvas.value!.updateLabels = updateLabels;
					drawBaseCanvas.value!.addDrawRect = addDrawRect;
					drawBaseCanvas.value!.hitCanvasLabel = hitCanvasLabel;
					const { clearCanvas, removeEventAll } = DrawRectCanvas(
						{
							canvas: canvasRectRef.value,
							originWidth,
							originHeight,
						},
						(rect: RectProps, { endX, endY }: any) => {
							activate_add_label.value = rect;
							const newRect = rectToScaleOffset(rect, scaleTranslateManager.scaleTranslate.value);
							drawBaseCanvas.value.addDrawRect(newRect);
							updateContextmenuLabelFixed(endX, endY, newRect);
						},
						() => {
							onCloseDraggableRectFixed();
						}
					);
					drawBaseCanvas.value!.clearCanvasRect = clearCanvas;
					drawBaseCanvas.value!.removeEventAll = removeEventAll;
					canvasDragZoom.value = new CanvasSceneDragZoom(canvasBaseRef.value);
					canvasDragZoom.value.changeZoom((scaleOffset: ScaleTranslate) => {
						scaleTranslateManager.onChangeScaleTranslate(scaleOffset);
						drawBaseCanvas.value!.updateLabels();
					});
				};
				image.onerror = () => {
					loadingImage.value = false;
				};
			}
			canvasBaseRef.value.addEventListener('contextmenu', e => {
				e.preventDefault();
				const offsetX = e.offsetX,
					offsetY = e.offsetY;
				const { scale, x, y } = scaleTranslateManager.scaleTranslate.value;
				const new_x = Math.floor((offsetX - x) / scale),
					new_y = Math.floor((offsetY - y) / scale);
				const { hit_rect } = drawBaseCanvas.value!.hitCanvasLabel(new_x, new_y);
				onCloseContentmenuLabel();
				onCloseDraggableRectFixed();
				if (hit_rect) {
					nextTick(() => {
						updateContextmenuLabelFixed(offsetX, offsetY, hit_rect);
					});
				}
			});
			canvasBaseRef.value.addEventListener('click', e => {
				if (e.ctrlKey) return;
				const offsetX = e.offsetX,
					offsetY = e.offsetY;
				const { scale, x, y } = scaleTranslateManager.scaleTranslate.value;
				const new_x = Math.floor((offsetX - x) / scale),
					new_y = Math.floor((offsetY - y) / scale);
				const { hit_rect, hit_index, color } = drawBaseCanvas.value!.hitCanvasLabel(new_x, new_y);
				onCloseDraggableRectFixed();
				onCloseContentmenuLabel();
				if (hit_rect) {
					nextTick(() => {
						updateDraggableRectFixed(offsetX, offsetY, hit_rect, hit_index, color);
					});
				}
			});
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
			watch(
				() => props.classes,
				() => {
					const rowInfo = toRaw(props.rowInfo);
					renderImageLabel(rowInfo);
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
			drawBaseCanvas.value!.removeEventAll?.();
			canvasDragZoom.value!.destroy();
		});
		const contextmenuLabelFixed = ref<any>({
			show: false,
			top: 0,
			left: 0,
			activateRect: null,
		});
		const updateContextmenuLabelFixed = (x: number, y: number, rect: RectProps) => {
			// 根据绘制区域在窗口位置设置标注菜单栏位置
			const contextRect = canvasBaseRef.value.getBoundingClientRect();
			contextmenuLabelFixed.value.show = true;
			contextmenuLabelFixed.value.left = x + contextRect.x;
			contextmenuLabelFixed.value.top = y + contextRect.y;
			contextmenuLabelFixed.value.canvasWidth = canvasBaseRef.value!.width;
			contextmenuLabelFixed.value.canvasHeight = canvasBaseRef.value!.height;
			contextmenuLabelFixed.value.activateRect = rect;
			activate_add_label.value = rect;
		};
		const onCloseContentmenuLabel = () => {
			contextmenuLabelFixed.value.show = false;
			contextmenuLabelFixed.value.top = 0;
			contextmenuLabelFixed.value.left = 0;
			contextmenuLabelFixed.value.activateRect = null;
			activate_add_label.value = null;
			drawBaseCanvas.value!.updateLabels();
			drawBaseCanvas.value!.clearCanvasRect();
		};
		const contextmenuLabelRect = computed(() => {
			const { top, left, canvasWidth, canvasHeight } = contextmenuLabelFixed.value;
			return { top, left, canvasWidth, canvasHeight };
		});
		const draggableRectFixed = ref<any>({
			show: false,
			top: 0,
			left: 0,
			width: 0,
			height: 0,
			activateRect: null,
			activateIndex: null,
			color: null,
		});
		const updateDraggableRectFixed = (x: number, y: number, rect: RectProps, index: number, color: string) => {
			draggableRectFixed.value.show = true;
			draggableRectFixed.value.top = y;
			draggableRectFixed.value.left = x;
			draggableRectFixed.value.width = rect.rectWidth;
			draggableRectFixed.value.height = rect.rectHeight;
			draggableRectFixed.value.activateRect = rect;
			draggableRectFixed.value.activateIndex = index;
			draggableRectFixed.value.color = color;
		};
		const onCloseDraggableRectFixed = () => {
			draggableRectFixed.value.show = false;
			draggableRectFixed.value.top = 0;
			draggableRectFixed.value.left = 0;
			draggableRectFixed.value.width = 0;
			draggableRectFixed.value.height = 0;
			draggableRectFixed.value.activateRect = null;
			draggableRectFixed.value.activateIndex = null;
			draggableRectFixed.value.color = null;
		};
		const onDraggleRectResize = (rect: RectProps) => {
			draggableRectFixed.value.activateRect = rect;
			const i = labels.value.findIndex((o: RectProps) => isEqual(o, rect));
			if (i > -1) {
				labels.value.splice(i, 1, rect);
			}
			drawBaseCanvas.value.updateLabels();
			const { rects, label_txt } = formatLabelsType();
			_emit('change', rects, label_txt);
			emit('change', rects, label_txt);
		};
		const onContextmenuDraggable = (e: MouseEvent, rect: RectProps) => {
			e.preventDefault();
			const rect_x = e.offsetX,
				rect_y = e.offsetY;
			const x = rect_x + rect.startX,
				y = rect_y + rect.startY;
			onCloseContentmenuLabel();
			nextTick(() => {
				updateContextmenuLabelFixed(x, y, rect);
			});
		};
		const activate_add_label = ref<RectProps>();
		// 添加标注
		const onSelectLabel = (type: number) => {
			activate_add_label.value!.type = type;
			const typeName = props.classes[type] as string;
			if (typeName) {
				activate_add_label.value!.typeName = typeName;
			}
			const i = labels.value.findIndex((o: RectProps) => isEqual(o, activate_add_label.value));
			if (i > -1) {
				labels.value.splice(i, 1, activate_add_label.value);
			} else {
				labels.value.push(activate_add_label.value);
			}
			onCloseContentmenuLabel();
			const { rects, label_txt } = formatLabelsType();
			_emit('change', rects, label_txt);
			emit('change', rects, label_txt);
		};
		// 删除标注
		const onDeleteLabel = (rect: RectProps) => {
			const i = labels.value.findIndex((o: RectProps) => isEqual(o, rect));
			labels.value.splice(i, 1);
			onCloseContentmenuLabel();
			onCloseDraggableRectFixed();
			drawBaseCanvas.value.updateLabels();
			const { rects, label_txt } = formatLabelsType();
			_emit('change', rects, label_txt);
			emit('change', rects, label_txt);
		};
		const onSelectedLabel = (rect: RectProps, index: number) => {
			onCloseDraggableRectFixed();
			nextTick(() => {
				const { startX: x, startY: y, type } = rect;
				const color = colors[type];
				// 防止右侧选中数据与画布中不同步，使用labels.value中的标注数据
				updateDraggableRectFixed(x, y, labels.value[index], index, color);
			});
		};
		const rerenderImage = () => {
			setContainerWidthHeight(0, 0);
			onCloseContentmenuLabel();
			onCloseDraggableRectFixed();
			nextTick(() => {
				const rowInfo = toRaw(props.rowInfo);
				renderImageLabel(rowInfo);
			});
		};
		expose({
			onCloseDraggableRectFixed,
			onCloseContentmenuLabel,
			onSelectedLabel,
			onDeleteLabel,
			rerenderImage,
			resetScaleOffset: () => {
				canvasDragZoom.value!.reset();
			},
		});
		const renderContent = () => {
			return (
				<NextSpinLoading ref={mainBasaeRef} loading={loadingImage.value} class={[ns.b('loading')]}>
					<div ref={canvasMainRef} class={[ns.b('canvas')]}>
						<canvas ref={canvasBaseRef} class={[ns.be('canvas', 'context')]}></canvas>
						<canvas ref={canvasRectRef} class={[ns.be('canvas', 'rect')]}></canvas>
						{contextmenuLabelFixed.value.show ? (
							<ContextMenuLabel
								labelRect={contextmenuLabelRect.value}
								classes={props.classes}
								activateRect={contextmenuLabelFixed.value.activateRect}
								onClose={onCloseContentmenuLabel}
								onSelect={onSelectLabel}
								onDelete={onDeleteLabel}
							></ContextMenuLabel>
						) : null}
						{draggableRectFixed.value.show ? (
							<DraggableRect
								parentEl={canvasMainRef.value}
								rect={draggableRectFixed.value.activateRect}
								color={draggableRectFixed.value.color}
								onDraggleResize={onDraggleRectResize}
								onContextmenu={onContextmenuDraggable}
							></DraggableRect>
						) : null}
					</div>
				</NextSpinLoading>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
