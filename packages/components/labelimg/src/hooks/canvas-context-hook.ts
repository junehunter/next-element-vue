import { isValueExist } from 'packages/hooks/global-hook';

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
}

export const DrawRectCanvas = (canvas: HTMLCanvasElement, callback?: Function) => {
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

	document.addEventListener('keydown', event => {
		if (event.key === 'w') {
			isWKeyPressed = true;
			canvas!.style.cursor = 'crosshair';
			canvas!.style.zIndex = '11';
		}
	});
	document.addEventListener('keyup', event => {
		if (event.key === 'w') {
			isWKeyPressed = false;
			canvas!.style.cursor = 'unset';
			canvas!.style.zIndex = '0';
		}
	});
	canvas.addEventListener('mousedown', e => {
		if (isWKeyPressed) {
			isDrawing = true;
			startX = e.offsetX;
			startY = e.offsetY;
		}
	});
	canvas.addEventListener('mousemove', e => {
		if (isDrawing && isWKeyPressed) {
			isRectDraw = true;
			endX = e.offsetX;
			endY = e.offsetY;
			drawRect();
		}
	});
	canvas.addEventListener('mouseup', () => {
		if (!isRectDraw) return;
		isDrawing = false;
		isWKeyPressed = false;
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
		};
		callback && callback(rect, { endX, endY });
		isRectDraw = false;
	});
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
	};
};
export const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
export const DrawBaseCanvas = (options: DrawBaseCanvasProps) => {
	const { ctx, labels, image, canvasWidth, canvasHeight } = options;
	const updateLabels = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
		for (let i = 0; i < labels.length; i++) {
			const rect = labels[i];
			const { startX, startY, rectWidth, rectHeight, type } = rect;
			const color = colors[type % colors.length];
			ctx.font = 'bold 14px serif';
			ctx.textBaseline = 'top';
			ctx.save();
			ctx.strokeStyle = color;
			ctx.strokeRect(startX, startY, rectWidth, rectHeight);
			if (isValueExist(rect.typeName) || isValueExist(rect.type)) {
				const text = (rect.typeName || rect.type) as string;
				ctx.fillStyle = color;
				ctx.fillText(text, startX + 6, startY + 6);
			}
			ctx.restore();
		}
	};
	updateLabels();
	const addDrawRect = (rect: RectProps, color = '#f30635') => {
		const { startX, startY, rectWidth, rectHeight } = rect;
		ctx.strokeStyle = color;
		ctx.strokeRect(startX, startY, rectWidth, rectHeight);
	};
	const hitCanvasLabel = (x: number, y: number): any => {
		let hit_rect = null,
			hit_index = null;
		for (let i = 0; i < labels.length; i++) {
			const rect = labels[i];
			const { startX, startY, rectWidth, rectHeight } = rect;
			if (x >= startX && x <= startX + rectWidth && y >= startY && y <= startY + rectHeight) {
				hit_rect = rect;
				hit_index = i;
			}
		}
		return { hit_rect, hit_index };
	};
	return {
		updateLabels,
		addDrawRect,
		hitCanvasLabel,
	};
};
export const convertToLabel = (rect: RectProps) => {
	const x_center = rect.startX + rect.rectWidth / 2;
	const y_center = rect.startY + rect.rectHeight / 2;
	const x_start = parseFloat((x_center / rect.canvasWidth).toFixed(6));
	const y_start = parseFloat((y_center / rect.canvasHeight).toFixed(6));
	const width = parseFloat((rect.rectWidth / rect.canvasWidth).toFixed(6));
	const height = parseFloat((rect.rectHeight / rect.canvasHeight).toFixed(6));
	return [x_start, y_start, width, height];
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
