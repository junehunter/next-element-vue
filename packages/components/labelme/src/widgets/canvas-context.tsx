import { defineComponent, ref, inject, watch, toRaw, onMounted } from 'vue';
import { NextSpinLoading } from 'packages/components';
import { valueExist } from 'packages/hooks/global-hook';
import { CreateDrawCanvas } from '../hooks/canvas-content';

export default defineComponent({
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
	emits: ['editPolygon'],
	setup(props, { emit }) {
		const ns = inject('ns', {} as any);
		const canvasMainRef = ref<HTMLElement>();
		const canvasBaseRef = ref<HTMLCanvasElement>();
		const drawCanvas = ref<CreateDrawCanvas>();

		const setContainerWidthHeight = (canvasWidth: number, canvasHeight: number) => {
			canvasMainRef.value!.style.width = canvasWidth + 'px';
			canvasMainRef.value!.style.height = canvasHeight + 'px';
			canvasBaseRef.value!.width = canvasWidth;
			canvasBaseRef.value!.height = canvasHeight;
			canvasBaseRef.value!.style.width = canvasWidth + 'px';
			canvasBaseRef.value!.style.height = canvasHeight + 'px';
		};
		const loadingImage = ref<boolean>(false);
		const renderImageLabel = (rowInfo: any) => {
			const clientHeight = canvasMainRef.value?.clientHeight as number;
			const ctx = canvasBaseRef.value?.getContext('2d') as CanvasRenderingContext2D;
			if (rowInfo?.imageSrc) {
				const image = new Image();
				image.src = rowInfo.imageSrc;
				loadingImage.value = true;
				image.onload = () => {
					loadingImage.value = false;
					let { width, height } = image;
					// 当图片高度大于容器高度，缩放
					if (height > clientHeight) {
						// 缩放比例
						const scale = height / clientHeight;
						height = clientHeight;
						image.style.height = height + 'px';
						width = width / scale;
					}
					const canvasHeight = height;
					const scaleFactor = parseFloat((canvasHeight / height).toFixed(3));
					const canvasWidth = Math.ceil(width * scaleFactor);
					setContainerWidthHeight(canvasWidth, canvasHeight);
					drawCanvas.value = new CreateDrawCanvas({
						canvas: canvasBaseRef.value,
						ctx: ctx,
						image: image,
						canvasWidth,
						canvasHeight,
						scaleFactor: scaleFactor,
						paths: rowInfo.labels,
					});
					drawCanvas.value.updatePolygon(vertexes => {
						emit('editPolygon', {
							vertexes,
							canvasWidth,
							canvasHeight,
						});
					});
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
		const renderContent = () => {
			return (
				<NextSpinLoading loading={loadingImage.value} class={[ns.b('loading')]}>
					<div ref={canvasMainRef} class={[ns.b('canvas')]}>
						<canvas ref={canvasBaseRef} class={[ns.be('canvas', 'context')]}></canvas>
					</div>
				</NextSpinLoading>
			);
		};
		return () => <>{renderContent()}</>;
	},
});
