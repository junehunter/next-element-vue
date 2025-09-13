import type { LabelNodeProps, ScaleTranslate, ShapesProps } from '../config';
import { colors } from '../config';
import CreatePolygon from '../core/CreatePolygon';
import EditPolygon from '../core/EditPolygon';
import { useChangeColor } from 'packages/utils/theme';
import { getTranslateAndScale, printsToPath, vertexesToImageScale } from '../core/utils';
const { hexToRgba } = useChangeColor();

export interface CreateRectCanvasProps {
	canvasWidth: number;
	canvasHeight: number;
}
export interface DrawBaseCanvasProps extends CreateRectCanvasProps {
	canvas?: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	image: HTMLImageElement;
	imageScaleX: number;
	imageScaleY: number;
	labels?: LabelNodeProps;
}

export class CreateDrawCanvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public image: HTMLImageElement;
	public canvasWidth: number;
	public canvasHeight: number;
	public imageScaleX: number;
	public imageScaleY: number;
	private labels: LabelNodeProps;
	private createPolygon: CreatePolygon;
	private editDrawPolygon: EditPolygon;
	private editVertexes: [number, number][];
	private editPolygonObservers: ((vertexes: [number, number][]) => void)[] = [];
	private drawnPolygonObserver?: (vertexes: [number, number][]) => void;
	constructor(options: DrawBaseCanvasProps) {
		const { canvas, ctx, image, canvasWidth, canvasHeight, imageScaleX, imageScaleY, labels } = options;
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = image;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.imageScaleX = imageScaleX;
		this.imageScaleY = imageScaleY;
		this.labels = labels || {};
		this.editVertexes = [];
		this.createPolygon = new CreatePolygon(canvas, ctx);
		this.editDrawPolygon = new EditPolygon(canvas, ctx);
		this.createPolygon.vertexesChangeEventListener(vertexes => {
			this.render();
			this.createPolygon.drawPolygon(vertexes);
			this.editVertexes = vertexes;
			this.notifyObservers();
		});
		this.createPolygon.onDestroyed(vertexes => {
			this.editVertexes = vertexes;
			this.render();
			this.editDrawPolygon.drawPolygon(vertexes);
			this.editDrawPolygon.updatePolygon(vertexes => {
				this.render();
				this.editDrawPolygon.drawPolygon(vertexes);
				this.editVertexes = vertexes;
				this.notifyObservers();
			});
			this.editDrawPolygon.onEditPolygon(vertexes => {
				this.editVertexes = vertexes;
				this.notifyDrawnPolygonObservers();
			});
			this.notifyDrawnPolygonObservers();
		});
		this.render();
	}

	private notifyObservers() {
		this.editPolygonObservers.forEach(listener => {
			listener(this.editVertexes);
		});
	}
	// 新增完成和编辑完成后通知
	private notifyDrawnPolygonObservers() {
		this.drawnPolygonObserver?.(this.editVertexes);
	}
	public updatePolygon(callback: (vertexes: [number, number][]) => void) {
		this.editPolygonObservers.push(callback);
	}
	public onDrawnPolygon(callback: (vertexes: [number, number][]) => void) {
		this.drawnPolygonObserver = callback;
	}
	public createEventListeners() {
		this.createPolygon.createEventListeners();
	}
	public destroyCreate() {
		this.createPolygon.destroy();
	}

	drawShapes(shapes: ShapesProps[]) {
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		for (let i = 0; i < shapes.length; i++) {
			const item = shapes[i];
			const points = vertexesToImageScale(item.points, this.imageScaleX, this.imageScaleY);
			if (!points.length) return;
			const path = printsToPath(points);
			const color = colors[i % colors.length];
			path.closePath();
			ctx.beginPath();
			ctx.lineWidth = 2 / scale;
			ctx.strokeStyle = color;
			ctx.fillStyle = hexToRgba(color, 0.2);
			ctx.stroke(path);
			ctx.fill(path);
		}
	}
	updateTransform(scaleOffseet: ScaleTranslate) {
		const ctx = this.ctx;
		const { scale, x, y } = scaleOffseet;
		ctx.translate(x, y);
		ctx.scale(scale, scale);
	}
	render = () => {
		const ctx = this.ctx;
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
		ctx.save();
		const shapes = this.labels.shapes;
		if (shapes?.length) this.drawShapes(shapes);
		// 移动缩放时绘制编辑中的多边形
		this.editDrawPolygon.render();
		ctx.restore();
	};
	destroy() {
		this.labels = {};
		this.editDrawPolygon.destroy();
		this.createPolygon.destroy();
	}
}
