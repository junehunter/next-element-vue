import { defineComponent, inject, ref, onMounted, toRaw, computed, watch } from 'vue';
import isEqual from 'lodash-es/isequal';
import { deepClone } from 'packages/hooks/global-hook';
import { DrawBaseCanvas, DrawRectCanvas } from '../hooks/canvas-context-hook';
import type { RectProps } from '../hooks/canvas-context-hook';
import ContextMenuLabel from './contextmenu-label';
import DraggableRect from './draggable-rect';
export default defineComponent({
	name: 'NextCanvasContext',
	props: {
		classes: {
			type: Array,
			default: () => [],
		},
		rowInfo: {
			type: Object,
			default: () => ({}),
		},
	},
	setup(props) {
		const ns = inject('ns', {} as any);
		const _emit = inject('_emit', null as any);
		const canvasMainRef = ref<HTMLElement>();
		const canvasBaseRef = ref<HTMLCanvasElement>();
		const canvasRectRef = ref<HTMLCanvasElement>();
		const formatLabelsTypeName = (rowInfo: any) => {
			return rowInfo.labels.map((rect: RectProps) => {
				const typeName = props.classes[rect.type] as string;
				if (typeName) {
					rect.typeName = typeName;
				}
				return rect;
			});
		};
		const formatLabelsType = () => {
			const _labels = deepClone(labels.value);
			const rects = _labels.map((rect: RectProps) => {
				delete rect.typeName;
				return toRaw(rect);
			});
			return rects;
		};
		const labels = ref<RectProps[]>([]);
		const drawBaseCanvas = ref<any>({});
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
		const renderImageLabel = (rowInfo: any) => {
			labels.value = formatLabelsTypeName(rowInfo);
			const clientHeight = canvasMainRef.value?.clientHeight as number;
			const ctx = canvasBaseRef.value?.getContext('2d') as CanvasRenderingContext2D;
			if (rowInfo?.imageSrc) {
				const image = new Image();
				image.src = rowInfo.imageSrc;
				image.onload = () => {
					const { width, height } = image;
					const canvasHeight = clientHeight;
					const scaleFactor = canvasHeight / height;
					const canvasWidth = Math.ceil(width * scaleFactor);
					setContainerWidthHeight(canvasWidth, canvasHeight);
					const { updateLabels, addDrawRect, hitCanvasLabel } = DrawBaseCanvas({
						canvas: canvasBaseRef.value,
						ctx: ctx,
						image: image,
						canvasWidth,
						canvasHeight,
						labels: labels.value,
					});
					drawBaseCanvas.value!.updateLabels = updateLabels;
					drawBaseCanvas.value!.addDrawRect = addDrawRect;
					drawBaseCanvas.value!.hitCanvasLabel = hitCanvasLabel;
					const { clearCanvas } = DrawRectCanvas(canvasRectRef.value, (rect: RectProps, { endX, endY }: any) => {
						activate_add_label.value = rect;
						drawBaseCanvas.value.addDrawRect(rect);
						updateContextmenuLabelFixed(endX, endY, rect);
					});
					drawBaseCanvas.value!.clearCanvasRect = clearCanvas;
				};
			}
			canvasBaseRef.value.addEventListener('contextmenu', e => {
				e.preventDefault();
				const x = e.offsetX,
					y = e.offsetY;
				const { hit_rect } = drawBaseCanvas.value!.hitCanvasLabel(x, y);
				if (hit_rect) {
					updateContextmenuLabelFixed(x, y, hit_rect);
				}
			});
			canvasBaseRef.value.addEventListener('click', e => {
				const x = e.offsetX,
					y = e.offsetY;
				const { hit_rect, hit_index } = drawBaseCanvas.value!.hitCanvasLabel(x, y);
				onCloseDraggableRectFixed();
				if (hit_rect) {
					updateDraggableRectFixed(x, y, hit_rect, hit_index);
				}
			});
		};
		onMounted(() => {
			// const rowInfo = toRaw(props.rowInfo);
			// renderImageLabel(rowInfo);
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
		});
		const contextmenuLabelFixed = ref<any>({
			show: false,
			top: 0,
			left: 0,
			activateRect: null,
		});
		const updateContextmenuLabelFixed = (x: number, y: number, rect: RectProps) => {
			contextmenuLabelFixed.value.show = true;
			contextmenuLabelFixed.value.left = x;
			contextmenuLabelFixed.value.top = y;
			contextmenuLabelFixed.value.canvasWidth = canvasBaseRef.value!.width;
			contextmenuLabelFixed.value.canvasHeight = canvasBaseRef.value!.height;
			contextmenuLabelFixed.value.activateRect = rect;
		};
		const contextmenuLabelRect = computed(() => {
			const { top, left, canvasWidth, canvasHeight } = contextmenuLabelFixed.value;
			return { top, left, canvasWidth, canvasHeight };
		});
		const onCloseContentmenuLabel = () => {
			contextmenuLabelFixed.value.show = false;
			contextmenuLabelFixed.value.top = 0;
			contextmenuLabelFixed.value.left = 0;
			contextmenuLabelFixed.value.activateRect = null;
			activate_add_label.value = null;
			drawBaseCanvas.value.updateLabels();
			drawBaseCanvas.value!.clearCanvasRect();
		};
		const draggableRectFixed = ref<any>({
			show: false,
			top: 0,
			left: 0,
			width: 0,
			height: 0,
			activateRect: null,
			activateIndex: null,
		});
		const updateDraggableRectFixed = (x: number, y: number, rect: RectProps, index: number) => {
			draggableRectFixed.value.show = true;
			draggableRectFixed.value.top = y;
			draggableRectFixed.value.left = x;
			draggableRectFixed.value.width = rect.rectWidth;
			draggableRectFixed.value.height = rect.rectHeight;
			draggableRectFixed.value.activateRect = rect;
			draggableRectFixed.value.activateIndex = index;
		};
		const onCloseDraggableRectFixed = () => {
			draggableRectFixed.value.show = false;
			draggableRectFixed.value.top = 0;
			draggableRectFixed.value.left = 0;
			draggableRectFixed.value.width = 0;
			draggableRectFixed.value.height = 0;
			draggableRectFixed.value.activateRect = null;
			draggableRectFixed.value.activateIndex = null;
		};
		const onDraggleRect = (rect: RectProps) => {
			// const i = draggableRectFixed.value.activateIndex;
			// labels.value[i] = rect;
			draggableRectFixed.value.activateRect = rect;
			drawBaseCanvas.value.updateLabels();
			// console.log(rect.startX, rect.startY);
		};
		const activate_add_label = ref<RectProps>();
		// 添加标注
		const onSelectLabel = (type: number) => {
			activate_add_label.value!.type = type;
			const typeName = props.classes[type] as string;
			if (typeName) {
				activate_add_label.value!.typeName = typeName;
			}
			labels.value.push(activate_add_label.value);
			onCloseContentmenuLabel();
			_emit('change', formatLabelsType());
		};
		// 删除标注
		const onDeleteLabel = (rect: RectProps) => {
			const i = labels.value.findIndex((o: RectProps) => isEqual(o, rect));
			labels.value.splice(i, 1);
			onCloseContentmenuLabel();
			drawBaseCanvas.value.updateLabels();
			_emit('change', formatLabelsType());
		};
		const renderContent = () => {
			return (
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
					{draggableRectFixed.value.show ? <DraggableRect parentEl={canvasMainRef.value} rect={draggableRectFixed.value.activateRect} onDraggle={onDraggleRect}></DraggableRect> : null}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
