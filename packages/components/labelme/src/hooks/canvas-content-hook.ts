import type { LabelNodeProps, ScaleTranslate, ShapesProps } from '../config';
import { colors } from '../config';
import CreatePolygon from '../core/CreatePolygon';
import EditPolygon from '../core/EditPolygon';
import { useChangeColor } from 'packages/utils/theme';
import { getTranslateAndScale, printsToPath, vertexesToImageScale, vertexToPixel } from '../core/utils';
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
	private addVertexes: [number, number][] = [];
	private createCompleteSubscribers = new Set<(vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void>();
	private editVertexes: [number, number][] = [];
	private editingSubscribers = new Set<(vertexes: [number, number][]) => void>();
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
		this.createPolygon = new CreatePolygon(canvas, ctx);
		this.editDrawPolygon = new EditPolygon(canvas, ctx);
		this.createPolygon.vertexesChangeEventListener(vertexes => {
			this.render();
			this.createPolygon.drawPolygon(vertexes);
			this.addVertexes = vertexes;
		});
		// 新增完成后通知
		this.createPolygon.addCompleted((vertexes, mouseOffset) => {
			this.addVertexes = vertexes;
			const { scale, translateX, translateY } = getTranslateAndScale(this.ctx);
			const [x, y] = vertexToPixel([mouseOffset.x, mouseOffset.y], { scale, x: translateX, y: translateY });
			this.notifyCreateComplete({ x, y });
		});
		// 编辑多边形通知
		this.editDrawPolygon.onEditPolygon(vertexes => {
			this.editVertexes = vertexes;
			this.notifyEditing();
		});
		this.render();
	}
	// 订阅新增完成
	public subscribeCreateComplete(callback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void) {
		this.createCompleteSubscribers.add(callback);
	}
	// 取消订阅新增完成
	public unsubscribeCreateComplete(callback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void) {
		this.createCompleteSubscribers.delete(callback);
	}
	// 新增完成后通知
	private notifyCreateComplete(mouseOffset: { x: number; y: number }) {
		this.createCompleteSubscribers.forEach(listener => {
			listener(this.addVertexes, mouseOffset);
		});
	}
	// 允许创建多边形
	public createPolygonEventListener() {
		this.createPolygon.createEventListener();
	}
	// 订阅编辑中
	public subscribeEditing(callback: (vertexes: [number, number][]) => void) {
		this.editingSubscribers.add(callback);
	}
	// 取消订阅编辑中
	public unsubscribeEditing(callback: (vertexes: [number, number][]) => void) {
		this.editingSubscribers.delete(callback);
	}
	// 通知编辑
	private notifyEditing() {
		this.editingSubscribers.forEach(listener => {
			listener(this.editVertexes);
		});
	}

	public destroyAllInstance() {
		this.createPolygon.destroy();
	}

	public closeCreateOrEditor() {
		this.createPolygon.reset();
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
	addShape(shape: ShapesProps) {
		this.labels.shapes.push(shape);
		this.render();
		this.createPolygon.reset();
	}
	deleteShape(shape: ShapesProps) {
		const index = this.labels.shapes.findIndex(item => item.id === shape.id);
		if (index !== -1) {
			this.labels.shapes.splice(index, 1);
		}
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
