import type { LabelNodeProps, ScaleTranslate, ShapesProps } from '../config';
import { colors, ShapeType } from '../config';
import CreatePolygon from '../core/CreatePolygon';
import EditPolygon from '../core/EditPolygon';
import CreateRectangle from '../core/CreateRectangle';
import EditRectangle from '../core/EditRectangle';
import { useChangeColor } from 'packages/utils/theme';
import { getTranslateAndScale, isPointInPath, isPointInRectangle, printsToPath, vertexesToImageScale, vertexToPixel } from '../core/utils';
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
	private createRectangle: CreateRectangle;
	private editDrawRectangle: EditRectangle;
	private addVertexes: [number, number][] = [];
	private createCompleteSubscribers = new Set<(vertexes: [number, number][], mouseOffset: { x: number; y: number }, shapeType?: ShapeType) => void>();
	private editingShape: ShapesProps;
	private editVertexes: [number, number][] = [];
	private editingSubscribers = new Set<(vertexes: [number, number][], shape: ShapesProps) => void>();
	private activeShapeObserver: (shape: ShapesProps | null) => void;
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
		this.editDrawPolygon = new EditPolygon(canvas, ctx, imageScaleX, imageScaleY);
		this.createRectangle = new CreateRectangle(canvas, ctx);
		this.editDrawRectangle = new EditRectangle(canvas, ctx);
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
			this.notifyCreateComplete({ x, y }, ShapeType.Polygon);
		});
		this.createRectangle.subscribeVertexesChange(vertexes => {
			this.render();
			this.createRectangle.drawRectangle(vertexes);
		});
		this.createRectangle.subscribeDrawComplete((vertexes, mouseOffset) => {
			const { scale, translateX, translateY } = getTranslateAndScale(this.ctx);
			const [x, y] = vertexToPixel([mouseOffset.x, mouseOffset.y], { scale, x: translateX, y: translateY });
			this.addVertexes = vertexes;
			this.notifyCreateComplete({ x, y }, ShapeType.Rectangle);
		});
		this.render();
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseClick = this.onMouseClick.bind(this);
		this.onMouseDoubleClick = this.onMouseDoubleClick.bind(this);
	}
	// 订阅新增完成
	public subscribeCreateComplete(callback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }, shapeType?: ShapeType) => void) {
		this.createCompleteSubscribers.add(callback);
	}
	// 取消订阅新增完成
	public unsubscribeCreateComplete(callback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }, shapeType?: ShapeType) => void) {
		this.createCompleteSubscribers.delete(callback);
	}
	// 新增完成后通知
	private notifyCreateComplete(mouseOffset: { x: number; y: number }, shapeType?: ShapeType) {
		this.createCompleteSubscribers.forEach(listener => {
			listener(this.addVertexes, mouseOffset, shapeType ?? ShapeType.Polygon);
		});
	}
	// 允许创建多边形
	public onStartCreatePolygon() {
		this.createPolygon.triggerCreatePolygon();
	}
	// 订阅编辑中
	public subscribeEditing(callback: (vertexes: [number, number][], shape: ShapesProps) => void) {
		this.editingSubscribers.add(callback);
	}
	// 取消订阅编辑中
	public unsubscribeEditing(callback: (vertexes: [number, number][], shape: ShapesProps) => void) {
		this.editingSubscribers.delete(callback);
	}
	// 通知编辑
	private notifyEditing() {
		this.editingSubscribers.forEach(listener => {
			listener(this.editVertexes, this.editingShape);
		});
	}

	// 订阅选中某个图形
	public subscribeActiveShape(callback: (shape: ShapesProps | null) => void) {
		this.activeShapeObserver = callback;
	}
	// 取消订阅选中某个图形
	public unsubscribeActiveShape() {
		this.activeShapeObserver = null;
	}
	// 通知选中某个图形
	private notifyActiveShape(shape: ShapesProps | null) {
		this.activeShapeObserver?.(shape);
	}

	public onStartCreateRectangle() {
		this.createRectangle.start();
	}

	public resetAllInstance() {
		this.createPolygon.destroy();
		this.editDrawPolygon.destroy();
		this.createRectangle.destroy();
		this.editDrawRectangle.destroy();
		this.onEditorEnd();
	}

	public closeCreateOrEditor() {
		this.createPolygon.reset();
		this.createRectangle.reset();
	}

	drawShapes(shapes: ShapesProps[]) {
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		for (let i = 0; i < shapes.length; i++) {
			const shape = shapes[i];
			if (shape.id === this.editingShape?.id) continue;
			const points = vertexesToImageScale(shape.points, this.imageScaleX, this.imageScaleY);
			if (!points.length) continue;
			if (shape.shape_type === ShapeType.Polygon) {
				const path = printsToPath(points);
				const color = colors[i % colors.length];
				path.closePath();
				ctx.beginPath();
				ctx.lineWidth = 2 / scale;
				ctx.strokeStyle = color;
				ctx.fillStyle = hexToRgba(color, 0.2);
				ctx.stroke(path);
				ctx.fill(path);
			} else if (shape.shape_type === ShapeType.Rectangle) {
				const [[start_x, start_y], [end_x, end_y]] = points;
				const color = colors[i % colors.length];
				ctx.beginPath();
				ctx.lineWidth = 2 / scale;
				ctx.strokeStyle = color;
				ctx.fillStyle = hexToRgba(color, 0.2);
				ctx.strokeRect(start_x, start_y, end_x - start_x, end_y - start_y);
				ctx.fillRect(start_x, start_y, end_x - start_x, end_y - start_y);
			}
		}
	}
	updateTransform(scaleOffseet: ScaleTranslate) {
		const ctx = this.ctx;
		const { scale, x, y } = scaleOffseet;
		ctx.translate(x, y);
		ctx.scale(scale, scale);
	}
	updateLabelInfo(labelInfo: LabelNodeProps) {
		this.labels = labelInfo;
		this.render();
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
		ctx.save(); // 保存当前的变换矩阵
		ctx.setTransform(1, 0, 0, 1, 0, 0); // 重置变换矩阵
		ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清空画布
		ctx.restore(); // 恢复之前的缩放/平移
		ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
		ctx.save();
		const shapes = this.labels.shapes;
		if (shapes?.length) this.drawShapes(shapes);
		// 移动缩放时绘制编辑中的多边形
		this.editDrawPolygon.render();
		this.editDrawRectangle.render();
		ctx.restore();
	};
	private mouseHitShape(event: MouseEvent): ShapesProps {
		const { offsetX: x, offsetY: y } = event;
		const shapes = this.labels.shapes;
		let hit = false,
			hitShape: ShapesProps = null;
		for (let i = 0; i < shapes.length; i++) {
			const shape = shapes[i];
			const points = vertexesToImageScale(shape.points, this.imageScaleX, this.imageScaleY);
			if (!points.length) continue;
			if (shape.shape_type === ShapeType.Polygon) {
				const isIn = isPointInPath(x, y, points, this.ctx);
				if (isIn) {
					hit = true;
					hitShape = shape;
					break;
				}
			} else if (shape.shape_type === ShapeType.Rectangle) {
				const isIn = isPointInRectangle(x, y, points, this.ctx);
				if (isIn) {
					hit = true;
					hitShape = shape;
					break;
				}
			}
		}
		this.canvas.style.cursor = hit ? 'pointer' : 'default';
		return hitShape;
	}
	public triggerShapeEdit(shape: ShapesProps) {
		this.editingShape = shape;
		this.notifyActiveShape(shape);
		const points = vertexesToImageScale(shape.points, this.imageScaleX, this.imageScaleY);
		if (shape.shape_type === ShapeType.Polygon) {
			this.editDrawPolygon.drawPolygon(points);
			// 编辑多边形通知
			this.editDrawPolygon.updatePolygon(vertexes => {
				this.editVertexes = vertexes;
				this.render();
			});
			this.editDrawPolygon.onEditPolygon(vertexes => {
				this.render();
				this.editVertexes = vertexes;
				this.notifyEditing();
			});
		} else if (shape.shape_type === ShapeType.Rectangle) {
			this.editDrawRectangle.drawRectangle(points);
			// 编辑矩形通知
			this.editDrawRectangle.onEditing(vertexes => {
				this.editVertexes = vertexes;
				this.render();
			});
			this.editDrawRectangle.onEditCompleted(vertexes => {
				this.render();
				this.editVertexes = vertexes;
				this.notifyEditing();
			});
		}
		this.render();
	}
	public onSelectShape(shape: ShapesProps) {
		// 点击当前编辑中的多边形，消除重新选择图形，不用重新创建编辑事件
		if (this.editingShape?.id && this.editingShape.id === shape?.id) {
			return;
		}
		this.onResetHitShape();
		if (shape) {
			this.triggerShapeEdit(shape);
		}
	}
	private onResetHitShape() {
		this.editingShape = null;
		this.editVertexes = [];
		this.editDrawPolygon.destroy();
		this.editDrawRectangle.destroy();
		this.render();
	}
	private onMouseDoubleClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		const hitShape = this.mouseHitShape(e);
		if (!hitShape) {
			this.onResetHitShape();
		}
	}
	private onMouseClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const hitShape = this.mouseHitShape(e);
		if (this.editVertexes.length && !hitShape) {
			return;
		}
		this.onSelectShape(hitShape);
	}
	private onMouseDown(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		if (this.editingShape) return;
		// this.mouseHitShape(e);
	}
	private onMouseMove(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		if (this.editingShape) return;
		// this.mouseHitShape(e);
	}
	private onMouseUp(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		if (this.editingShape) return;
	}
	onEditorStart() {
		this.canvas.addEventListener('mousedown', this.onMouseDown);
		this.canvas.addEventListener('mousemove', this.onMouseMove);
		this.canvas.addEventListener('mouseup', this.onMouseUp);
		this.canvas.addEventListener('click', this.onMouseClick);
		this.canvas.addEventListener('dblclick', this.onMouseDoubleClick);
	}
	onEditorEnd() {
		this.editVertexes = [];
		this.editingShape = null;
		this.editDrawPolygon.destroy();
		this.canvas.removeEventListener('mousedown', this.onMouseDown);
		this.canvas.removeEventListener('mousemove', this.onMouseMove);
		this.canvas.removeEventListener('mouseup', this.onMouseUp);
		this.canvas.removeEventListener('click', this.onMouseClick);
		this.canvas.removeEventListener('dblclick', this.onMouseDoubleClick);
	}
	destroy() {
		this.labels = {};
		this.editDrawPolygon.destroy();
		this.createPolygon.destroy();
		this.createRectangle.destroy();
		this.editDrawRectangle.destroy();
		this.onEditorEnd();
	}
}
