import { defineComponent, ref, inject, watch, toRaw, onMounted, nextTick } from 'vue';
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
	setup(props, { emit, expose }) {
		const ns = inject('ns', {} as any);
		const mainBasaeRef = ref<any>();
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
					const { canvasWidth, canvasHeight, scaleFactor, scaleX, scaleY } = getCanvasWidthHeight(image);
					image.style.width = canvasWidth + 'px';
					image.style.height = canvasHeight + 'px';
					setContainerWidthHeight(canvasWidth, canvasHeight);
					drawCanvas.value = new CreateDrawCanvas({
						canvas: canvasBaseRef.value,
						ctx: ctx,
						image: image,
						canvasWidth,
						canvasHeight,
						scaleFactor: scaleFactor,
						paths: rowInfo.labels,
						scaleX,
						scaleY,
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
		const onCloseContentmenuLabel = () => {};
		const onCloseDraggableRectFixed = () => {};
		const rerenderImage = () => {
			setContainerWidthHeight(0, 0);
			onCloseContentmenuLabel();
			onCloseDraggableRectFixed();
			nextTick(() => {
				const rowInfo = toRaw(props.rowInfo);
				renderImageLabel(rowInfo);
			});
		};
		const renderContent = () => {
			return (
				<NextSpinLoading ref={mainBasaeRef} loading={loadingImage.value} class={[ns.b('loading')]} style={{ height: '100%' }}>
					<div ref={canvasMainRef} class={[ns.b('canvas')]}>
						<canvas ref={canvasBaseRef} class={[ns.be('canvas', 'context')]}></canvas>
					</div>
				</NextSpinLoading>
			);
		};
		expose({
			rerenderImage,
		});
		return () => <>{renderContent()}</>;
	},
});
