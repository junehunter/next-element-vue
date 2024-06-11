import { defineComponent, inject, onMounted, onUnmounted, ref, toRef } from 'vue';
import type { PropType } from 'vue';
import type { RectProps, ResizeCorner } from '../hooks/canvas-context-hook';

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
	},
	emits: ['draggle-resize', 'contextmenu'],
	setup(props, { emit }) {
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
		let parentRect: any = {};
		const rect = toRef<RectProps>(props.rect);
		const onMousedown = (e: MouseEvent) => {
			e.preventDefault();
			isDraggle.value = true;
			draggleOffset.value.diff_x = e.offsetX;
			draggleOffset.value.diff_y = e.offsetY;
		};
		const onMouseup = (e: MouseEvent) => {
			e.preventDefault();
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
			emit('contextmenu', e, rect.value);
		};
		const onMousedownDot = (e: MouseEvent, corner: string) => {
			e.preventDefault();
			e.stopPropagation();
			isResizeCorner.value[corner] = true;
		};
		const onMousemove = (e: MouseEvent) => {
			if (isDraggle.value) {
				const newLeft = e.clientX - parentRect.left - draggleOffset.value.diff_x;
				const newTop = e.clientY - parentRect.top - draggleOffset.value.diff_y;
				rect.value.startX = Math.max(0, Math.min(newLeft, parentRect.width - rect.value.rectWidth));
				rect.value.startY = Math.max(0, Math.min(newTop, parentRect.height - rect.value.rectHeight));
			}
			if (isResizeCorner.value.bottomRight) {
				let newWidth = e.clientX - parentRect.left - rect.value.startX;
				let newHeight = e.clientY - parentRect.top - rect.value.startY;
				if (newWidth < 30) newWidth = 30;
				if (newHeight < 30) newHeight = 30;
				if (newWidth + rect.value.startX > parentRect.width) newWidth = parentRect.width - rect.value.startX;
				if (newHeight + rect.value.startY > parentRect.height) newHeight = parentRect.height - rect.value.startY;
				rect.value.rectWidth = newWidth;
				rect.value.rectHeight = newHeight;
			}
			if (isResizeCorner.value.bottomCenter) {
				let newHeight = e.clientY - parentRect.top - rect.value.startY;
				if (newHeight < 30) newHeight = 30;
				if (newHeight + rect.value.startY > parentRect.height) newHeight = parentRect.height - rect.value.startY;
				rect.value.rectHeight = newHeight;
			}
			if (isResizeCorner.value.topCenter) {
				let newTop = e.clientY - parentRect.top;
				let newHeight = rect.value.startY - newTop + rect.value.rectHeight;
				if (newTop < 0) return;
				if (newHeight < 30) return;
				rect.value.rectHeight = newHeight;
				rect.value.startY = Math.max(0, Math.min(newTop, parentRect.height - rect.value.rectHeight));
			}
		};
		onMounted(() => {
			parentRect = props.parentEl.getBoundingClientRect();
			document.addEventListener('mousemove', onMousemove);
			document.addEventListener('mouseup', onMouseup);
		});
		onUnmounted(() => {
			document.removeEventListener('mouseup', onMouseup, false);
			document.removeEventListener('mousemove', onMousemove, false);
		});
		return { onMousedown, onMouseup, onContextmenu, rect, onMousedownDot };
	},
	render() {
		const _ns = inject('ns', {} as any);
		const draggableRectStyle = () => {
			const { startX, startY, rectWidth, rectHeight } = this.rect;
			return {
				top: startY + 'px',
				left: startX + 'px',
				width: rectWidth + 'px',
				height: rectHeight + 'px',
			};
		};
		return (
			<div class={[_ns.b('draggable-rect')]} style={draggableRectStyle()} onMousedown={this.onMousedown} onMouseup={this.onMouseup} onContextmenu={this.onContextmenu}>
				<ul class={[_ns.be('draggable-rect', 'resize')]}>
					<li class="top-left"></li>
					<li class="top-center" onMousedown={event => this.onMousedownDot(event, 'topCenter')}></li>
					<li class="top-right"></li>
					<li class="left-center"></li>
					<li class="right-center"></li>
					<li class="bottom-left"></li>
					<li class="bottom-center" onMousedown={event => this.onMousedownDot(event, 'bottomCenter')}></li>
					<li class="bottom-right" onMousedown={event => this.onMousedownDot(event, 'bottomRight')}></li>
				</ul>
			</div>
		);
	},
});
