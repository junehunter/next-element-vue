import { defineComponent, inject, onMounted, onUnmounted, ref, toRef } from 'vue';
import type { PropType, CSSProperties, Ref } from 'vue';
import type { RectProps, ResizeCorner } from '../hooks/canvas-context-hook';
import { useChangeColor } from 'packages/utils/theme';
import type { ScaleTranslate, ScaleTranslateManager } from '../config';
import { rectToRestore } from '../hooks/canvas-drag-zoom';

const { hexToRgb } = useChangeColor();
export default defineComponent({
	props: {
		parentEl: {
			type: Object as PropType<HTMLElement>,
			default: null,
		},
		rect: {
			type: Object as PropType<RectProps>,
			default: () => ({}),
		},
		color: {
			type: String,
			default: null,
		},
	},
	emits: ['draggle-resize', 'contextmenu'],
	setup(props, { emit }) {
		const scaleTranslateManager = inject('scaleTranslateManager', {} as ScaleTranslateManager);
		const scaleTranslate: Ref<ScaleTranslate> = scaleTranslateManager.scaleTranslate;
		const isDraggle = ref<boolean>(false);
		const isResizeCorner = ref<ResizeCorner>({
			topLeft: false,
			topCenter: false,
			topRight: false,
			leftCenter: false,
			rightCenter: false,
			bottomLeft: false,
			bottomCenter: false,
			bottomRight: false,
		});
		const draggleOffset = ref({
			diff_x: null,
			diff_y: null,
		});
		let parentRect = {} as DOMRect;
		const rect = toRef<RectProps>(props.rect);
		const onMousedown = (e: MouseEvent) => {
			e.preventDefault();
			isDraggle.value = true;
			draggleOffset.value.diff_x = e.offsetX;
			draggleOffset.value.diff_y = e.offsetY;
		};
		const onMouseup = (e: MouseEvent) => {
			e.preventDefault();
			e.stopPropagation();
			isDraggle.value = false;
			isResizeCorner.value.topLeft = false;
			isResizeCorner.value.topCenter = false;
			isResizeCorner.value.topRight = false;
			isResizeCorner.value.leftCenter = false;
			isResizeCorner.value.rightCenter = false;
			isResizeCorner.value.bottomLeft = false;
			isResizeCorner.value.bottomCenter = false;
			isResizeCorner.value.bottomRight = false;
			emit('draggle-resize', rect.value);
		};
		const onContextmenu = (e: MouseEvent) => {
			e.preventDefault();
			e.preventDefault();
			emit('contextmenu', e, rect.value);
		};
		const onMousedownDot = (e: MouseEvent, corner: string) => {
			e.preventDefault();
			e.stopPropagation();
			isResizeCorner.value[corner] = true;
		};
		const onMousemove = (e: MouseEvent) => {
			const { scale, x, y } = scaleTranslate.value;
			const min_size = 30 / scale;
			// 相对完整画布屏幕坐标
			const startX = Math.ceil(rect.value.startX * scale + x);
			const startY = Math.ceil(rect.value.startY * scale + y);
			if (isDraggle.value) {
				const newLeft = e.clientX - parentRect.left - draggleOffset.value.diff_x;
				const newTop = e.clientY - parentRect.top - draggleOffset.value.diff_y;
				const offsetX = Math.ceil((newLeft - x) / scale);
				const offsetY = Math.ceil((newTop - y) / scale);
				rect.value.startX = Math.max(0, Math.min(offsetX, parentRect.width - rect.value.rectWidth));
				rect.value.startY = Math.max(0, Math.min(offsetY, parentRect.height - rect.value.rectHeight));
			}
			if (isResizeCorner.value.bottomCenter) {
				let newHeight = Math.floor((e.clientY - parentRect.top - startY) / scale);
				if (newHeight < min_size) newHeight = min_size;
				if (newHeight + rect.value.startY > parentRect.height) newHeight = parentRect.height - rect.value.startY;
				rect.value.rectHeight = newHeight;
			}
			if (isResizeCorner.value.topCenter) {
				let newTop = Math.floor((e.clientY - parentRect.top - y) / scale);
				let newHeight = rect.value.startY - newTop + rect.value.rectHeight;
				if (newTop < 0) return;
				if (newHeight < min_size) return;
				rect.value.rectHeight = newHeight;
				rect.value.startY = Math.max(0, Math.min(newTop, parentRect.height - rect.value.rectHeight));
			}
			if (isResizeCorner.value.leftCenter) {
				let newLeft = Math.floor((e.clientX - parentRect.left - x) / scale);
				let newWidth = rect.value.startX - newLeft + rect.value.rectWidth;
				if (newLeft < 0) return;
				if (newWidth < min_size) return;
				rect.value.startX = Math.max(0, Math.min(newLeft, parentRect.width - rect.value.rectWidth));
				rect.value.rectWidth = newWidth;
			}
			if (isResizeCorner.value.rightCenter) {
				let newWidth = Math.floor((e.clientX - parentRect.left - startX) / scale);
				if (newWidth < min_size) newWidth = min_size;
				if (newWidth + rect.value.startX > parentRect.width) newWidth = parentRect.width - rect.value.startX;
				rect.value.rectWidth = newWidth;
			}
			if (isResizeCorner.value.bottomRight) {
				let newWidth = Math.floor((e.clientX - parentRect.left - startX) / scale);
				let newHeight = Math.floor((e.clientY - parentRect.top - startY) / scale);
				if (newWidth < min_size) newWidth = min_size;
				if (newHeight < min_size) newHeight = min_size;
				if (newWidth + rect.value.startX > parentRect.width) newWidth = parentRect.width - rect.value.startX;
				if (newHeight + rect.value.startY > parentRect.height) newHeight = parentRect.height - rect.value.startY;
				rect.value.rectWidth = newWidth;
				rect.value.rectHeight = newHeight;
			}
			if (isResizeCorner.value.bottomLeft) {
				let newLeft = Math.floor((e.clientX - parentRect.left - x) / scale);
				let newWidth = rect.value.startX - newLeft + rect.value.rectWidth;
				let newHeight = Math.floor((e.clientY - parentRect.top - startY) / scale);
				if (newLeft < 0) return;
				if (newWidth < min_size) return;
				if (newHeight < min_size) newHeight = min_size;
				if (newHeight + rect.value.startY > parentRect.height) newHeight = parentRect.height - rect.value.startY;
				rect.value.startX = Math.max(0, Math.min(newLeft, parentRect.width - rect.value.rectWidth));
				rect.value.rectWidth = newWidth;
				rect.value.rectHeight = newHeight;
			}
			if (isResizeCorner.value.topLeft) {
				let newTop = Math.floor((e.clientY - parentRect.top - y) / scale);
				let newHeight = rect.value.startY - newTop + rect.value.rectHeight;
				if (newTop < 0) return;
				if (newHeight < min_size) return;
				rect.value.rectHeight = newHeight;
				rect.value.startY = Math.max(0, Math.min(newTop, parentRect.height - rect.value.rectHeight));
				let newLeft = Math.floor((e.clientX - parentRect.left - x) / scale);
				let newWidth = rect.value.startX - newLeft + rect.value.rectWidth;
				if (newLeft < 0) return;
				if (newWidth < min_size) return;
				rect.value.startX = Math.max(0, Math.min(newLeft, parentRect.width - rect.value.rectWidth));
				rect.value.rectWidth = newWidth;
			}
			if (isResizeCorner.value.topRight) {
				let newTop = Math.floor((e.clientY - parentRect.top - y) / scale);
				let newHeight = rect.value.startY - newTop + rect.value.rectHeight;
				if (newTop < 0) return;
				if (newHeight < min_size) return;
				rect.value.rectHeight = newHeight;
				rect.value.startY = Math.max(0, Math.min(newTop, parentRect.height - rect.value.rectHeight));
				let newWidth = Math.floor((e.clientX - parentRect.left - startX) / scale);
				if (newWidth < min_size) newWidth = min_size;
				if (newWidth + rect.value.startX > parentRect.width) newWidth = parentRect.width - rect.value.startX;
				rect.value.rectWidth = newWidth;
			}
		};
		onMounted(() => {
			parentRect = props.parentEl.getBoundingClientRect();
			document.addEventListener('mousemove', onMousemove);
			document.addEventListener('mouseup', onMouseup);
		});
		onUnmounted(() => {
			document.removeEventListener('mousemove', onMousemove);
			document.removeEventListener('mouseup', onMouseup);
		});
		return { onMousedown, onMouseup, onContextmenu, rect, onMousedownDot };
	},
	render() {
		const _ns = inject('ns', {} as any);
		const scaleTranslateManager = inject('scaleTranslateManager', {} as ScaleTranslateManager);
		const scaleTranslate: Ref<ScaleTranslate> = scaleTranslateManager.scaleTranslate;
		const props = this.$props;
		const draggableRectStyle = () => {
			const { startX, startY, rectWidth, rectHeight } = rectToRestore(this.rect, scaleTranslate.value);
			const style = {
				top: startY + 'px',
				left: startX + 'px',
				width: rectWidth + 'px',
				height: rectHeight + 'px',
			} as CSSProperties;
			const color = props.color;
			if (color) {
				const rgb_color = hexToRgb(color);
				if (rgb_color) style.backgroundColor = `rgba(${rgb_color[0]},${rgb_color[1]},${rgb_color[2]}, 0.5)`;
			}
			return style;
		};
		return (
			<div class={[_ns.b('draggable-rect')]} style={draggableRectStyle()} onMousedown={this.onMousedown} onMouseup={this.onMouseup} onContextmenu={this.onContextmenu}>
				<ul class={[_ns.be('draggable-rect', 'resize')]}>
					<li class="top-left" onMousedown={event => this.onMousedownDot(event, 'topLeft')}></li>
					<li class="top-center" onMousedown={event => this.onMousedownDot(event, 'topCenter')}></li>
					<li class="top-right" onMousedown={event => this.onMousedownDot(event, 'topRight')}></li>
					<li class="left-center" onMousedown={event => this.onMousedownDot(event, 'leftCenter')}></li>
					<li class="right-center" onMousedown={event => this.onMousedownDot(event, 'rightCenter')}></li>
					<li class="bottom-left" onMousedown={event => this.onMousedownDot(event, 'bottomLeft')}></li>
					<li class="bottom-center" onMousedown={event => this.onMousedownDot(event, 'bottomCenter')}></li>
					<li class="bottom-right" onMousedown={event => this.onMousedownDot(event, 'bottomRight')}></li>
				</ul>
			</div>
		);
	},
});
