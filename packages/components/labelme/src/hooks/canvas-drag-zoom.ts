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
		this.canvas.addEventListener('wheel', this.canvasMousewheel, { passive: false });
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
	destroy() {
		this.canvas.removeEventListener('mousedown', this.canvasMousedown);
		this.canvas.removeEventListener('mousemove', this.canvasMousemove);
		this.canvas.removeEventListener('mouseup', this.canvasMouseup);
		this.canvas.removeEventListener('wheel', this.canvasMousewheel);
	}
}
