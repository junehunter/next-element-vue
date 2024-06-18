import { defineComponent, onMounted, ref, watch } from 'vue';
import type { PropType, CSSProperties } from 'vue';
import { useNamespace } from 'packages/hooks';
import { deepClone, isValueExist } from 'packages/hooks/global-hook';
import { colors } from './hooks/canvas-context-hook';
import type { RectProps } from './hooks/canvas-context-hook';

const ns = useNamespace('labelimg-preview');
export default defineComponent({
	name: 'NextLabelimgPreview',
	props: {
		className: {
			type: String,
			default: '',
		},
		style: {
			type: Object as PropType<CSSProperties>,
			default: () => ({}),
		},
		src: {
			type: String,
			default: '',
		},
		classes: {
			type: Array,
			default: () => [],
		},
		labels: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const canvasBaseRef = ref<HTMLCanvasElement>();
		const classes = ref<any>(deepClone(props.classes));
		const labels = ref<RectProps[]>(deepClone(props.labels));
		const setContainerWidthHeight = (canvasWidth: number, canvasHeight: number) => {
			canvasBaseRef.value!.width = canvasWidth;
			canvasBaseRef.value!.height = canvasHeight;
			canvasBaseRef.value!.style.width = canvasWidth + 'px';
			canvasBaseRef.value!.style.height = canvasHeight + 'px';
		};
		const renderImageAndLabel = () => {
			if (props.src) {
				const ctx = canvasBaseRef.value?.getContext('2d') as CanvasRenderingContext2D;
				const image = new Image();
				image.src = props.src;
				image.onload = () => {
					const { width, height } = image;
					const canvasHeight = height;
					const scaleFactor = canvasHeight / height;
					const canvasWidth = Math.ceil(width * scaleFactor);
					setContainerWidthHeight(canvasWidth, canvasHeight);
					ctx.clearRect(0, 0, canvasWidth, canvasHeight);
					ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
					for (let i = 0; i < labels.value.length; i++) {
						const rect = labels.value[i];
						const { startX, startY, rectWidth, rectHeight, type } = rect;
						const color = colors[type % colors.length];
						ctx.font = 'bold 14px serif';
						ctx.textBaseline = 'top';
						ctx.save();
						ctx.strokeStyle = color;
						ctx.strokeRect(startX, startY, rectWidth, rectHeight);
						if (!isValueExist(rect.typeName)) {
							const typeName = classes.value[rect.type] as string;
							if (typeName) rect.typeName = typeName;
						}
						if (isValueExist(rect.typeName) || isValueExist(rect.type)) {
							const text = (rect.typeName || rect.type) as string;
							ctx.fillStyle = color;
							ctx.fillText(text, startX + 6, startY + 6);
						}
						ctx.restore();
					}
				};
			}
		};
		onMounted(() => {
			watch(
				() => props.src,
				() => {
					renderImageAndLabel();
				},
				{
					immediate: true,
				}
			);
		});
		const renderContent = () => {
			return (
				<div class={[ns.b(), props.className]} style={{ ...props.style }}>
					<canvas ref={canvasBaseRef}></canvas>
				</div>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
