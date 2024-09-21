import type { ScaleTranslate } from '../config';
import type { RectProps } from './canvas-context-hook';
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
	private observers: ((scaleOffset: ScaleTranslate) => void)[] = [];
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.canvasWidth = canvas.width;
		this.canvasHeight = canvas.height;
		this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
		this.canvasMousedown = this.canvasMousedown.bind(this);
		this.canvasMousemove = this.canvasMousemove.bind(this);
		this.canvasMouseup = this.canvasMouseup.bind(this);
		this.canvas.addEventListener('mousedown', this.canvasMousedown);
		this.canvas.addEventListener('wheel', this.canvasMousewheel, { passive: false });
		window.addEventListener('wheel', this.onWindowWheel, { passive: false });
	}
	private notifyObservers(scale: number, offset: { x: number; y: number }) {
		this.observers.forEach(listener => {
			listener({ scale, ...offset });
		});
	}
	public changeZoom(callback: ({ scale, ...offset }: ScaleTranslate) => void) {
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
		const offset_x = this.mousePositioin.x - ((this.mousePositioin.x - this.offset.x) * this.scaleFactor) / this.preScaleFactor;
		const offset_y = this.mousePositioin.y - ((this.mousePositioin.y - this.offset.y) * this.scaleFactor) / this.preScaleFactor;
		this.offset.x = Math.ceil(offset_x);
		this.offset.y = Math.ceil(offset_y);
		this.render();
		this.preScaleFactor = this.scaleFactor;
		this.preOffset.x = this.offset.x;
		this.preOffset.y = this.offset.y;
	}
	onWindowWheel = (e: MouseEvent) => {
		if (e.ctrlKey) {
			e.preventDefault();
		}
	};
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
			this.offset.x = Math.ceil(this.preOffset.x + (event.offsetX - this.clickX));
			this.offset.y = Math.ceil(this.preOffset.y + (event.offsetY - this.clickY));
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
	destroy() {
		this.canvas.removeEventListener('mousedown', this.canvasMousedown);
		this.canvas.removeEventListener('mousemove', this.canvasMousemove);
		this.canvas.removeEventListener('mouseup', this.canvasMouseup);
		this.canvas.removeEventListener('wheel', this.canvasMousewheel);
		window.removeEventListener('wheel', this.onWindowWheel);
	}
}
/**
 * 屏幕数据转缩放平移数据
 * @param rect
 * @param scaleOffset
 * @returns
 */
export const rectToScaleOffset = (rect: RectProps, scaleOffset: ScaleTranslate) => {
	const { startX, startY, rectWidth, rectHeight } = rect;
	const { scale, x, y } = scaleOffset;
	const new_startX = Math.ceil((startX - x) / scale);
	const new_startY = Math.ceil((startY - y) / scale);
	const new_rectWidth = Math.ceil(rectWidth / scale);
	const new_rectHeight = Math.ceil(rectHeight / scale);
	return {
		startX: new_startX,
		startY: new_startY,
		rectWidth: new_rectWidth,
		rectHeight: new_rectHeight,
		canvasWidth: rect.canvasWidth,
		canvasHeight: rect.canvasHeight,
		originWidth: rect.originWidth,
		originHeight: rect.originHeight,
	};
};

export const rectToRestore = (rect: RectProps, scaleOffset: ScaleTranslate) => {
	const { startX, startY, rectWidth, rectHeight } = rect;
	const { scale, x, y } = scaleOffset;
	const new_startX = Math.ceil(startX * scale + x);
	const new_startY = Math.ceil(startY * scale + y);
	const new_rectWidth = Math.ceil(rectWidth * scale);
	const new_rectHeight = Math.ceil(rectHeight * scale);
	return {
		startX: new_startX,
		startY: new_startY,
		rectWidth: new_rectWidth,
		rectHeight: new_rectHeight,
		canvasWidth: rect.canvasWidth,
		canvasHeight: rect.canvasHeight,
		originWidth: rect.originWidth,
		originHeight: rect.originHeight,
	};
};
