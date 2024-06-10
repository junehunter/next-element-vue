import { defineComponent, inject, onUnmounted, ref } from 'vue';
import type { PropType } from 'vue';
import type { RectProps } from '../hooks/canvas-context-hook';

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
	emits: ['draggle'],
	setup() {
		onUnmounted(() => {
			document.removeEventListener('mouseup', null);
		});
		return {};
	},
	render() {
		const _ns = inject('ns', {} as any);
		const props = this.$props;
		// const emit = this.$emit;
		const draggableRectStyle = () => {
			const { startX, startY, rectWidth, rectHeight } = props.rect;
			return {
				top: startY + 'px',
				left: startX + 'px',
				width: rectWidth + 'px',
				height: rectHeight + 'px',
			};
		};
		const isDraggle = ref<boolean>(false);
		const draggleOffset = ref({
			offsetX: null,
			offsetY: null,
			diff_x: null,
			diff_y: null,
		});
		const onMousedown = (e: MouseEvent) => {
			e.preventDefault();
			isDraggle.value = true;
			// const offsetX = e.offsetX + props.rect.startX;
			// const offsetY = e.offsetY + props.rect.startY;
			// draggleOffset.value.offsetX = offsetX;
			// draggleOffset.value.offsetY = offsetY;
			draggleOffset.value.diff_x = e.offsetX;
			draggleOffset.value.diff_y = e.offsetY;
		};
		const onMouseup = (e: MouseEvent) => {
			e.preventDefault();
			isDraggle.value = false;
			// draggleOffset.value.offsetX = e.offsetX;
			// draggleOffset.value.offsetY = e.offsetY;
		};
		document.addEventListener('mouseup', () => {
			isDraggle.value = false;
		});
		props.parentEl.addEventListener('mousemove', (e: MouseEvent) => {
			if (isDraggle.value) {
				const { diff_x, diff_y } = draggleOffset.value;
				// draggleOffset.value.offsetX = e.offsetX;
				// draggleOffset.value.offsetY = e.offsetY;
				const rect_offsetX = e.offsetX - diff_x;
				const rect_offsetY = e.offsetY - diff_y;
				if (rect_offsetX < 0 || rect_offsetY < 0) return;
				// console.log(e.offsetX, e.offsetY);
				// console.log(diff_x, diff_y);
				// emit('draggle', {
				// 	...props.rect,
				// 	startX: rect_offsetX,
				// 	startY: rect_offsetY,
				// });
			}
		});
		return (
			<div class={[_ns.b('draggable-rect')]} style={draggableRectStyle()} onMousedown={onMousedown} onMouseup={onMouseup}>
				<div></div>
			</div>
		);
	},
});
