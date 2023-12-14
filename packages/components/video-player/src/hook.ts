import { useDateFormat, useNow } from '@vueuse/core';
import { randomColor16 } from 'packages/utils/theme';
import * as tf from '@tensorflow/tfjs';

/**
 * 识别视频帧
 * @param video
 * @param model
 * @param ctx
 * @param tf
 * @param classNames
 */
interface ClassInputInterface {
	cls: number;
	score: number;
}
interface ClassInterfacce {
	value: number;
	label: string;
}
export const detectVideoFrame = async (
	video: HTMLVideoElement,
	model: any,
	ctx: CanvasRenderingContext2D,
	tf: any,
	classNames: ClassInterfacce[],
	classInput: ClassInputInterface[] = [],
	detect_ctx: CanvasRenderingContext2D,
	success?: Function
) => {
	const { videoWidth, videoHeight } = video;
	// 当视频关闭，及没有宽高时不识别
	if (!videoWidth || !videoHeight) return;
	let [modelWeight, modelHeight] = (model as any).inputs[0].shape.slice(1, 3);
	let input = tf.tidy(() => tf.image.resizeBilinear(tf.browser.fromPixels(video), [modelWeight, modelHeight]).div(255.0).expandDims(0));
	ctx.clearRect(0, 0, videoWidth, videoHeight);
	detect_ctx.clearRect(0, 0, videoWidth, videoHeight);
	await model.executeAsync(input).then(async (res: any) => {
		let [boxes, scores, classes, valid_detections] = res;
		for (let i = 0; i < valid_detections.dataSync()[0]; ++i) {
			let [x0, y0, x1, y1] = boxes.dataSync().slice(i * 4, (i + 1) * 4);
			x0 = x0 < 0 || x0 > 1 ? parseInt(x0) : x0;
			x1 = x1 < 0 || x1 > 1 ? parseInt(x1) : x1;
			y0 = y0 < 0 || y0 > 1 ? parseInt(y0) : y0;
			y1 = y1 < 0 || y1 > 1 ? parseInt(y1) : y1;
			x0 = Math.round(Math.abs(x0) * videoWidth);
			x1 = Math.round(Math.abs(x1) * videoWidth);
			y0 = Math.round(Math.abs(y0) * videoHeight);
			y1 = Math.round(Math.abs(y1) * videoHeight);
			const width = x1 - x0;
			const height = y1 - y0;
			const left = x0;
			const top = y0;
			let cls = classes.dataSync()[i]; // 类别
			let score = scores.dataSync()[i].toFixed(2); // 置信度
			const drawOutcome = (name: string, score: number, ctx: CanvasRenderingContext2D) => {
				const color = randomColor16();
				ctx.strokeStyle = color;
				ctx.lineWidth = 2;
				ctx.beginPath();
				ctx.rect(left, top, width, height);
				ctx.stroke();
				ctx.font = 'bold 16px Arial';
				ctx.fillStyle = color;
				ctx.fillText(`${name} ${score}`, left + 10, top < 20 ? 20 : top - 10);
			};
			if (classInput?.length) {
				// 有检测到目标才回调
				for (let k = 0; k < classInput.length; k++) {
					const item = classInput[k];
					if (item.cls == cls && Number(score) > item.score) {
						const target = classNames.find(o => o.value == cls);
						if (target) {
							const name = target.label;
							const _ctx = await drawVideoFrame(video, detect_ctx);
							// 绘制视频帧加结果
							drawOutcome(name, score, _ctx);
							// 只绘制检测结果
							drawOutcome(name, score, ctx);
							success && success(name, score);
						}
					}
				}
			} else if (score > 0.5) {
				const target = classNames.find(o => o.value == cls);
				if (target) {
					const name = target.label || '';
					drawOutcome(name, score, ctx);
				}
			}
		}
		// boxes.dispose();
		// scores.dispose();
		// classes.dispose();
		// valid_detections.dispose();
		input.dispose();
		tf.dispose(res);
	});
};
/**
 * 普通视频截图
 * @param player
 */
export const screenshotVideo = (player: any) => {
	const time = useDateFormat(useNow(), 'YYYY-MM-DD_HH-mm-ss').value;
	const videoElement = player.el().getElementsByTagName('video')[0];
	const canvas = document.createElement('canvas');
	// 这里必须使用 videoWidth， videoHeight。这样才能正确获取media的实际宽高，如果取元素宽高，会出现截图不全的bug
	const width = videoElement.videoWidth;
	const height = videoElement.videoHeight;
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d') as any;
	const mediaRatio = width / height;
	const canvasRatio = canvas.width / canvas.height;
	const sx = 0,
		sy = 0,
		sw = width,
		sh = height;
	let dx, dy, dw, dh;
	if (mediaRatio > canvasRatio) {
		dw = canvas.width;
		dh = canvas.width / mediaRatio;
		dx = 0;
		dy = Math.round((canvas.height - dh) / 2);
	} else if (mediaRatio === canvasRatio) {
		dw = canvas.width;
		dh = canvas.height;
		dx = 0;
		dy = 0;
	} else if (mediaRatio < canvasRatio) {
		dw = canvas.height * mediaRatio;
		dh = canvas.height;
		dx = Math.round((canvas.width - dw) / 2);
		dy = 0;
	}
	/**
	 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 * sx, sy 资源文件左上角坐标， sw, sh 需要截取资源文件宽高
	 * dx, dy 目标文件画布的左上角坐标， dw, dh 目标画布上绘制的宽高
	 */
	ctx.drawImage(videoElement, sx, sy, sw, sh, dx, dy, dw, dh);
	const type = 'image/png'; // 图片格式，默认为 image/png
	const quality = 0.92; // 图片质量设置，0-1区间，超出会使用默认值0.92
	let imageDataURL = canvas.toDataURL(type, quality).replace(type, 'image/octet-stream');
	imageDataURL = imageDataURL.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
	const downloadLink = document.createElement('a');
	downloadLink.href = imageDataURL;
	downloadLink.download = time + '_screenshot.png';
	downloadLink.click();
};
/**
 * AI识别标识视频截图
 * @param player
 * @param detectFrameCanvas
 */
export const screenshotVideoDetectFrame = (player: any, detectFrameCanvas?: HTMLCanvasElement) => {
	const time = useDateFormat(useNow(), 'YYYY-MM-DD_HH-mm-ss').value;
	const videoElement = player.el().getElementsByTagName('video')[0];
	const canvas = document.createElement('canvas');
	// 这里必须使用 videoWidth， videoHeight。这样才能正确获取media的实际宽高，如果取元素宽高，会出现截图不全的bug
	const width = videoElement.videoWidth;
	const height = videoElement.videoHeight;
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d') as any;
	const mediaRatio = width / height;
	const canvasRatio = canvas.width / canvas.height;
	const sx = 0,
		sy = 0,
		sw = width,
		sh = height;
	let dx, dy, dw, dh;
	if (mediaRatio > canvasRatio) {
		dw = canvas.width;
		dh = canvas.width / mediaRatio;
		dx = 0;
		dy = Math.round((canvas.height - dh) / 2);
	} else if (mediaRatio === canvasRatio) {
		dw = canvas.width;
		dh = canvas.height;
		dx = 0;
		dy = 0;
	} else if (mediaRatio < canvasRatio) {
		dw = canvas.height * mediaRatio;
		dh = canvas.height;
		dx = Math.round((canvas.width - dw) / 2);
		dy = 0;
	}
	/**
	 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 * sx, sy 资源文件左上角坐标， sw, sh 需要截取资源文件宽高
	 * dx, dy 目标文件画布的左上角坐标， dw, dh 目标画布上绘制的宽高
	 */
	ctx.drawImage(videoElement, sx, sy, sw, sh, dx, dy, dw, dh);
	if (detectFrameCanvas) {
		ctx.drawImage(detectFrameCanvas, 0, 0);
	}
	const type = 'image/png'; // 图片格式，默认为 image/png
	const quality = 0.92; // 图片质量设置，0-1区间，超出会使用默认值0.92
	let imageDataURL = canvas.toDataURL(type, quality).replace(type, 'image/octet-stream');
	imageDataURL = imageDataURL.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
	const downloadLink = document.createElement('a');
	downloadLink.href = imageDataURL;
	downloadLink.download = time + '_screenshot.png';
	downloadLink.click();
};
export const drawVideoFrame = (videoElement: HTMLVideoElement, ctx: CanvasRenderingContext2D) => {
	const width = videoElement.videoWidth;
	const height = videoElement.videoHeight;
	const mediaRatio = width / height;
	const canvasRatio = width / height;
	const sx = 0,
		sy = 0,
		sw = width,
		sh = height;
	let dx, dy, dw, dh;
	if (mediaRatio > canvasRatio) {
		dw = width;
		dh = width / mediaRatio;
		dx = 0;
		dy = Math.round((height - dh) / 2);
	} else if (mediaRatio === canvasRatio) {
		dw = width;
		dh = height;
		dx = 0;
		dy = 0;
	} else if (mediaRatio < canvasRatio) {
		dw = height * mediaRatio;
		dh = height;
		dx = Math.round((width - dw) / 2);
		dy = 0;
	}
	/**
	 * https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
	 * sx, sy 资源文件左上角坐标， sw, sh 需要截取资源文件宽高
	 * dx, dy 目标文件画布的左上角坐标， dw, dh 目标画布上绘制的宽高
	 */
	ctx.drawImage(videoElement, sx, sy, sw, sh, dx, dy, dw, dh);
	return ctx;
};
interface DetectVideoOptions {
	container?: HTMLElement;
	video: HTMLVideoElement;
	modelUrl: string;
	classNames: ClassInterfacce[];
	classInput: ClassInputInterface[];
}
export const useDetectVideo = () => {
	const detectVideoFrameImage = ({ container, video, modelUrl, classNames, classInput = [] }: DetectVideoOptions, success: Function, error: Function) => {
		if (!modelUrl) {
			error && error('模型文件地址不能为空');
			return false;
		}
		if (!classNames) {
			error && error('模型类别不能未空');
			return false;
		}
		tf.loadGraphModel(modelUrl).then(model => {
			// 这里canvas只绘制识别结果，并覆盖到视频上
			const canvas = document.createElement('canvas') as HTMLCanvasElement;
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
			canvas.style.position = 'absolute';
			canvas.style.zIndex = '99';
			canvas.style.pointerEvents = 'none';
			if (container) {
				container.appendChild(canvas);
			}
			// 绘制视频帧加识别结果
			const detectCanvas = document.createElement('canvas') as HTMLCanvasElement;
			const detect_ctx = detectCanvas.getContext('2d') as CanvasRenderingContext2D;
			video.ontimeupdate = (e: any) => {
				const { clientWidth, clientHeight } = e.target;
				const { videoWidth, videoHeight, offsetTop, offsetLeft } = video;
				canvas.width = videoWidth;
				canvas.height = videoHeight;
				canvas.style.top = offsetTop + 'px';
				canvas.style.left = offsetLeft + 'px';
				canvas.style.width = clientWidth + 'px';
				canvas.style.height = clientHeight + 'px';
				detectCanvas.width = videoWidth;
				detectCanvas.height = videoHeight;
				detectCanvas.style.width = clientWidth + 'px';
				detectCanvas.style.height = clientHeight + 'px';
				detectVideoFrame(video, model, ctx, tf, classNames, classInput, detect_ctx, (name, score) => {
					const type = 'image/png'; // 图片格式，默认为 image/png
					const quality = 0.92; // 图片质量设置，0-1区间，超出会使用默认值0.92
					let imageDataURL = canvas.toDataURL(type, quality).replace(type, 'image/octet-stream');
					imageDataURL = imageDataURL.replace(/^data:image\/[^;]+/, 'data:application/octet-stream');
					// 绘制最终识别结果
					const detectImage = detectCanvas.toDataURL(type, quality);
					success && success({ name, score, detectImage, detectCanvas }, { canvas, imageDataURL });
				});
			};
		});
	};
	return {
		detectVideoFrameImage,
	};
};
