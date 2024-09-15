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
	scaleOffset?: { x: number; y: number; scale: number };
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
	const { canvas, ctx, labels, image, canvasWidth, canvasHeight } = options;
	const updateLabels = (scaleOffset?: { x: number; y: number; scale: number }) => {
		if (scaleOffset) {
			canvas.width = canvasWidth;
			ctx.save();
			ctx.translate(scaleOffset.x, scaleOffset.y);
			ctx.scale(scaleOffset.scale, scaleOffset.scale);
		}
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
		ctx.save();
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

export class CanvasSceneDragZoom {
	private canvas: HTMLCanvasElement;
	private canvasWidth: number;
	private canvasHeight: number;
	private ctx: CanvasRenderingContext2D;
	private scaleFactor: number = 1;
	private preScaleFactor: number = 1;
	private offset = { x: 0, y: 0 };
	private preOffset = { x: 0, y: 0 };
	private mousePositioin = { x: 0, y: 0 };
	private maxScale: number = 8;
	private minScale: number = 0.5;
	private scaleStep: number = 0.1;
	private clickX: number = 0;
	private clickY: number = 0;
	private observers: ((scale: number, offset: { x: number; y: number }) => void)[] = [];
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.canvasMousedown = this.canvasMousedown.bind(this);
		this.canvasMousemove = this.canvasMousemove.bind(this);
		this.canvasMouseup = this.canvasMouseup.bind(this);
		this.canvas.addEventListener('mousedown', this.canvasMousedown);
		// this.canvas.addEventListener('wheel', this.canvasMousewheel, { passive: false });
	}
	private notifyObservers(scale: number, offset: { x: number; y: number }) {
		this.observers.forEach(listener => {
			listener(scale, offset);
		});
	}
	public changeZoom(callback: (scale: number, offset: { x: number; y: number }) => void) {
		this.observers.push(callback);
	}
	reset() {
		this.scaleFactor = 1;
		this.preScaleFactor = 1;
		this.offset = { x: 0, y: 0 };
		this.preOffset = { x: 0, y: 0 };
		this.mousePositioin = { x: 0, y: 0 };
		this.zoom();
	}
	render() {
		this.canvas.width = this.canvasWidth;
		this.notifyObservers(this.scaleFactor, this.offset);
	}
	zoom() {
		this.offset.x = this.mousePositioin.x - ((this.mousePositioin.x - this.offset.x) * this.scaleFactor) / this.preScaleFactor;
		this.offset.y = this.mousePositioin.y - ((this.mousePositioin.y - this.offset.y) * this.scaleFactor) / this.preScaleFactor;
		this.render();
		this.preScaleFactor = this.scaleFactor;
		this.preOffset.x = this.offset.x;
		this.preOffset.y = this.offset.y;
	}
	canvasMousewheel = (event: WheelEvent) => {
		event.preventDefault();
		if (event.ctrlKey) {
			this.mousePositioin.x = event.offsetX;
			this.mousePositioin.y = event.offsetY;
			if (event.deltaY > 0) {
				// 放大
				this.scaleFactor = parseFloat((this.scaleFactor + this.scaleStep).toFixed(1));
				if (this.scaleFactor > this.maxScale) {
					this.scaleFactor = this.maxScale;
				}
			} else {
				// 缩小
				this.scaleFactor = parseFloat((this.scaleFactor - this.scaleStep).toFixed(1));
				if (this.scaleFactor < this.minScale) {
					this.scaleFactor = this.minScale;
				}
			}
			this.zoom();
		}
	};
	canvasMousedown(event: MouseEvent) {
		event.preventDefault();
		if (event.button === 0 && event.ctrlKey) {
			this.clickX = event.offsetX;
			this.clickY = event.offsetY;
			this.canvas.addEventListener('mousemove', this.canvasMousemove);
			this.canvas.addEventListener('mouseup', this.canvasMouseup);
		}
	}
	canvasMousemove(event: MouseEvent) {
		event.preventDefault();
		if (event.ctrlKey) {
			this.offset.x = this.preOffset.x + (event.offsetX - this.clickX);
			this.offset.y = this.preOffset.y + (event.offsetY - this.clickY);
			this.render();
		}
	}
	canvasMouseup(event: MouseEvent) {
		event.preventDefault();
		if (event.ctrlKey) {
			this.preOffset.x = this.offset.x;
			this.preOffset.y = this.offset.y;
			this.canvas.removeEventListener('mousemove', this.canvasMousemove);
			this.canvas.removeEventListener('mouseup', this.canvasMouseup);
		}
	}
}

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
