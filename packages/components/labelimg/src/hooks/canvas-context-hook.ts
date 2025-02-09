import { isValueExist } from 'packages/hooks/global-hook';
import type { Ref } from 'vue';
import type { ScaleTranslate } from '../config';
export interface ResizeCorner {
	topLeft: boolean;
	topCenter: boolean;
	topRight: boolean;
	leftCenter: boolean;
	rightCenter: boolean;
	bottomLeft: boolean;
	bottomCenter: boolean;
	bottomRight: boolean;
}

export interface RectProps {
	type?: number;
	typeName?: string;
	startX: number;
	startY: number;
	rectWidth: number;
	rectHeight: number;
	canvasWidth: number;
	canvasHeight: number;
	originWidth: number;
	originHeight: number;
}
export interface CreateRectCanvasProps {
	canvasWidth: number;
	canvasHeight: number;
}
export interface DrawBaseCanvasProps extends CreateRectCanvasProps {
	canvas?: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	image: HTMLImageElement;
	labels: RectProps[];
	scaleFactor?: number;
	scaleOffset?: Ref<ScaleTranslate>;
}

export const DrawRectCanvas = ({ canvas, originWidth, originHeight }: { canvas: HTMLCanvasElement; originWidth: number; originHeight: number }, callback?: Function, keyW?: Function) => {
	const canvasWidth = canvas.width;
	const canvasHeight = canvas.height;
	const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D;
	const clearCanvas = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	};
	clearCanvas();
	let startX: any,
		startY: any,
		endX: any,
		endY: any,
		isDrawing = false,
		isRectDraw = false,
		isWKeyPressed = false;
	const drawRectDone = () => {
		const rectWidth = Math.abs(endX - startX);
		const rectHeight = Math.abs(endY - startY);
		if (startX > endX) startX = endX;
		if (startY > endY) startY = endY;
		const rect: RectProps = {
			startX: startX,
			startY: startY,
			rectWidth: rectWidth,
			rectHeight: rectHeight,
			canvasWidth: canvasWidth,
			canvasHeight: canvasHeight,
			originWidth: originWidth,
			originHeight: originHeight,
		};
		callback && callback(rect, { endX, endY });
	};
	const documentKeydown = (event: KeyboardEvent) => {
		if (isWKeyPressed) return;
		if (event.code === 'KeyW') {
			event.preventDefault();
			isWKeyPressed = true;
			canvas!.style.cursor = 'crosshair';
			canvas!.style.zIndex = '11';
			keyW && keyW();
		}
	};
	const documentKeyup = (event: KeyboardEvent) => {
		if (isDrawing) return;
		if (event.code === 'KeyW') {
			isWKeyPressed = false;
			canvas!.style.cursor = 'unset';
			canvas!.style.zIndex = '0';
		}
	};
	const documentMouseup = () => {
		if (!isRectDraw) return;
		isDrawing = false;
		isWKeyPressed = false;
		canvas!.style.cursor = 'unset';
		canvas!.style.zIndex = '0';
		drawRectDone();
		isRectDraw = false;
	};
	document.addEventListener('keydown', documentKeydown);
	document.addEventListener('keyup', documentKeyup);
	document.addEventListener('mouseup', documentMouseup);
	const canvasMousedown = (event: MouseEvent) => {
		if (isWKeyPressed) {
			isDrawing = true;
			startX = event.offsetX;
			startY = event.offsetY;
		}
	};
	const canvasMousemove = (event: MouseEvent) => {
		if (isDrawing && isWKeyPressed) {
			isRectDraw = true;
			endX = event.offsetX;
			endY = event.offsetY;
			drawRect();
		}
	};
	const canvasMouseup = (event: MouseEvent) => {
		event.stopPropagation();
		if (!isRectDraw) return;
		isDrawing = false;
		isWKeyPressed = false;
		canvas!.style.cursor = 'unset';
		canvas!.style.zIndex = '0';
		drawRectDone();
		isRectDraw = false;
	};
	canvas.addEventListener('mousedown', canvasMousedown);
	canvas.addEventListener('mousemove', canvasMousemove);
	canvas.addEventListener('mouseup', canvasMouseup);
	const removeEventAll = () => {
		document.removeEventListener('keydown', documentKeydown);
		document.removeEventListener('keyup', documentKeyup);
		document.removeEventListener('mouseup', documentMouseup);
		canvas.removeEventListener('mousedown', canvasMousedown);
		canvas.removeEventListener('mousemove', canvasMousemove);
		canvas.removeEventListener('mouseup', canvasMouseup);
	};
	const drawRect = (color = '#f30635') => {
		clearCanvas();
		ctx.strokeStyle = color;
		ctx.strokeRect(startX, startY, endX - startX, endY - startY);
	};
	return {
		canvas,
		ctx,
		clearCanvas,
		drawRect,
		removeEventAll,
	};
};
export const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
export const DrawBaseCanvas = (options: DrawBaseCanvasProps) => {
	const { canvas, ctx, labels, image, canvasWidth, canvasHeight, scaleOffset } = options;
	const updateLabels = () => {
		canvas.width = canvasWidth;
		if (scaleOffset.value) {
			ctx.save();
			ctx.translate(scaleOffset.value.x, scaleOffset.value.y);
			ctx.scale(scaleOffset.value.scale, scaleOffset.value.scale);
		}
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
		const scale = scaleOffset.value?.scale || 1;
		const fontSize = 14 / scale;
		const fontPadding = 6 / scale;
		const lineWidth = 2 / scale;
		for (let i = 0; i < labels.length; i++) {
			const rect = labels[i];
			const { startX, startY, rectWidth, rectHeight, type } = rect;
			const color = colors[type % colors.length];
			ctx.font = `bold ${fontSize}px serif`;
			ctx.textBaseline = 'top';
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = lineWidth;
			ctx.strokeRect(startX, startY, rectWidth, rectHeight);
			if (isValueExist(rect.typeName) || isValueExist(rect.type)) {
				const text = (rect.typeName || rect.type) as string;
				ctx.fillStyle = color;
				ctx.fillText(text, startX + fontPadding, startY + fontPadding);
			}
			ctx.restore();
		}
	};
	updateLabels();
	const addDrawRect = (rect: RectProps, color = '#f30635') => {
		const scale = scaleOffset.value?.scale || 1;
		const { startX, startY, rectWidth, rectHeight } = rect;
		ctx.save();
		const lineWidth = 2 / scale;
		ctx.lineWidth = lineWidth;
		ctx.strokeStyle = color;
		ctx.strokeRect(startX, startY, rectWidth, rectHeight);
		ctx.restore();
	};
	const hitCanvasLabel = (x: number, y: number): any => {
		let hit_rect = null,
			hit_index = null,
			color = null;
		for (let i = 0; i < labels.length; i++) {
			const rect = labels[i];
			const { type, startX, startY, rectWidth, rectHeight } = rect;
			if (x >= startX && x <= startX + rectWidth && y >= startY && y <= startY + rectHeight) {
				hit_rect = rect;
				hit_index = i;
				color = colors[type];
			}
		}
		return { hit_rect, hit_index, color };
	};
	return {
		updateLabels,
		addDrawRect,
		hitCanvasLabel,
	};
};

/**
 * 根据比例重新设置标注框位置和大小
 * @param labels
 * @returns
 */
export const formatCanvasLabelScale = (labels: RectProps[], canvasHeight: number): RectProps[] => {
	let scale_rects = [];
	for (let i = 0; i < labels.length; i++) {
		const rect = labels[i];
		const scale = parseFloat((canvasHeight / rect.canvasHeight).toFixed(3));
		if (scale) {
			rect.startX = Math.ceil(rect.startX * scale);
			rect.startY = Math.ceil(rect.startY * scale);
			rect.rectWidth = Math.ceil(rect.rectWidth * scale);
			rect.rectHeight = Math.ceil(rect.rectHeight * scale);
			rect.canvasWidth = Math.ceil(rect.canvasWidth * scale);
			rect.canvasHeight = canvasHeight;
		}
		scale_rects.push(rect);
	}
	return scale_rects;
};

export const convertToLabel = (rect: RectProps) => {
	const label_type = rect.type;
	const x_center = rect.startX + rect.rectWidth / 2;
	const y_center = rect.startY + rect.rectHeight / 2;
	const x_start = parseFloat((x_center / rect.canvasWidth).toFixed(6));
	const y_start = parseFloat((y_center / rect.canvasHeight).toFixed(6));
	const width = parseFloat((rect.rectWidth / rect.canvasWidth).toFixed(6));
	const height = parseFloat((rect.rectHeight / rect.canvasHeight).toFixed(6));
	return [label_type, x_start, y_start, width, height];
};
export const canvertToCanvas = (labelData: number[], canvasWidth: number, canvasHeight: number) => {
	const [label_type, x_center, y_center, width, height] = labelData;
	const rectWidth = width * canvasWidth;
	const rectHeight = height * canvasHeight;
	const startX = x_center * canvasWidth - rectWidth / 2;
	const startY = y_center * canvasHeight - rectHeight / 2;
	return {
		type: label_type,
		startX: Math.ceil(startX),
		startY: Math.ceil(startY),
		rectWidth: Math.ceil(rectWidth),
		rectHeight: Math.ceil(rectHeight),
		canvasWidth: canvasWidth,
		canvasHeight: canvasHeight,
	};
};
