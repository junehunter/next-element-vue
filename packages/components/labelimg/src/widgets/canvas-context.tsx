import { defineComponent, inject, ref, onMounted, toRaw, computed } from 'vue';
import type { CSSProperties } from 'vue';
import { deepClone } from 'packages/hooks/global-hook';
import { DrawBaseCanvas, DrawRectCanvas } from '../hooks/canvas-context-hook';
import type { RectProps } from '../hooks/canvas-context-hook';
import NextCanvasContextMenuLabel from './contextmenu-label';
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
		const rowInfo = toRaw(props.rowInfo);
		const canvasMainRef = ref<HTMLElement>();
		const canvasBaseRef = ref<HTMLCanvasElement>();
		const canvasRectRef = ref<HTMLCanvasElement>();
		const formatLabelsTypeName = () => {
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
		const labels = ref<RectProps[]>(formatLabelsTypeName());
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
		const renderImageLabel = () => {
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
					DrawRectCanvas(canvasRectRef.value, (rect: RectProps, { endX, endY }: any) => {
						activate_label.value = rect;
						drawBaseCanvas.value.addDrawRect(rect);
						contentmenuLabelFixed.value.top = endY;
						contentmenuLabelFixed.value.left = endX;
						contentmenuLabelFixed.value.show = true;
					});
					// canvasBaseRef.value.addEventListener('click', e => {
					// 	const x = e.offsetX,
					// 		y = e.offsetY;
					// 	const hitRect = hitCanvasLabel(x, y);
					// 	console.log(hitRect.typeName);
					// });
				};
			}
			canvasBaseRef.value.addEventListener('contextmenu', e => {
				e.preventDefault();
				const x = e.offsetX,
					y = e.offsetY;
				const hitRect = drawBaseCanvas.value!.hitCanvasLabel(x, y);
				if (hitRect) {
					const { type } = hitRect;
					contentmenuLabelFixed.value.show = true;
					contentmenuLabelFixed.value.activateType = type;
					contentmenuLabelFixed.value.top = y;
					contentmenuLabelFixed.value.left = x;
				}
			});
		};
		onMounted(() => {
			renderImageLabel();
		});

		const contentmenuLabelFixed = ref<any>({
			show: false,
			top: 0,
			left: 0,
			activateType: null,
		});
		const contentmenuLabelStyle = computed(() => {
			const { top, left } = contentmenuLabelFixed.value;
			return {
				top: top + 'px',
				left: left + 'px',
			} as CSSProperties;
		});

		const onCloseContentmenuLabel = () => {
			contentmenuLabelFixed.value.show = false;
			contentmenuLabelFixed.value.top = 0;
			contentmenuLabelFixed.value.left = 0;
			contentmenuLabelFixed.value.activateType = null;
		};
		const activate_label = ref<RectProps>();
		const onSelectLabel = (type: number) => {
			activate_label.value!.type = type;
			const typeName = props.classes[type] as string;
			if (typeName) {
				activate_label.value!.typeName = typeName;
			}
			labels.value.push(activate_label.value!);
			onCloseContentmenuLabel();
			drawBaseCanvas.value.updateLabels();
			_emit('change', formatLabelsType());
		};
		const renderContent = () => {
			return (
				<div ref={canvasMainRef} class={[ns.b('canvas')]}>
					<canvas ref={canvasBaseRef} class={[ns.be('canvas', 'context')]}></canvas>
					<canvas ref={canvasRectRef} class={[ns.be('canvas', 'rect')]}></canvas>
					{contentmenuLabelFixed.value.show ? (
						<NextCanvasContextMenuLabel
							style={contentmenuLabelStyle.value}
							classes={props.classes}
							activateType={contentmenuLabelFixed.value.activateType}
							onClose={onCloseContentmenuLabel}
							onSelect={onSelectLabel}
						></NextCanvasContextMenuLabel>
					) : null}
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
