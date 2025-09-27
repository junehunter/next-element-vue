import { defaultColor } from '../config';
import type { ShapesProps } from '../config';
import { getTranslateAndScale, isPointInKeypointShape, vertexeTransform } from './utils';

export default class EditKeypoint {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public shape: ShapesProps;
	public radius: number = 5;
	private isMoveEditing: boolean = false;
	private mouseMoveOffset: { x: number; y: number };
	private isEditing: boolean = false;
	private vertexes: [number, number][];
	private editingObservers: ((vertexes: [number, number][]) => void)[] = [];
	private editedObserver?: (vertexes: [number, number][]) => void;
	private contextmenuObserver?: (e: MouseEvent) => void;
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.canvas.addEventListener('mousedown', this.canvasMouseDown.bind(this));
		this.canvas.addEventListener('mousemove', this.canvasMouseMove.bind(this));
		this.canvas.addEventListener('mouseup', this.canvasMouseUp.bind(this));
		this.canvas.addEventListener('contextmenu', this.canvasMouseContextmenu.bind(this));
	}
	public onEditing(observer: (vertexes: [number, number][]) => void) {
		if (this.isEditing) return;
		this.isEditing = true;
		this.canvas.addEventListener('mousedown', this.canvasMouseDown);
		this.canvas.addEventListener('mousemove', this.canvasMouseMove);
		this.canvas.addEventListener('mouseup', this.canvasMouseUp);
		this.canvas.addEventListener('contextmenu', this.canvasMouseContextmenu);
		this.editingObservers.push(observer);
	}
	private notifyEditing() {
		this.editingObservers.forEach(observer => observer(this.vertexes));
	}
	public onEditCompleted(callback: (vertexes: [number, number][]) => void) {
		this.editedObserver = callback;
	}
	private notifyEditCompleted() {
		this.editedObserver?.(this.vertexes);
	}
	public onContextmenu(callback: (e: MouseEvent) => void) {
		this.contextmenuObserver = callback;
	}
	private notifyContextmenuObserver(e: MouseEvent) {
		this.contextmenuObserver?.(e);
	}
	private getTransformPoint(x: number, y: number): [number, number] {
		const { scale, translateX, translateY } = getTranslateAndScale(this.ctx);
		return vertexeTransform([x, y], { scale: scale, x: translateX, y: translateY });
	}
	private canvasMouseDown = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const [x, y] = this.getTransformPoint(offsetX, offsetY);
		const isIn = isPointInKeypointShape(x, y, this.vertexes, this.ctx);
		if (isIn) {
			this.isMoveEditing = true;
			this.mouseMoveOffset = { x: offsetX, y: offsetY };
		}
	};
	private canvasMouseMove = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		if (!this.isMoveEditing) return;
		const { offsetX, offsetY } = e;
		const [x, y] = this.getTransformPoint(offsetX, offsetY);
		if (this.mouseMoveOffset) {
			const [_offsetX_pre, _offsetY_pre] = this.getTransformPoint(this.mouseMoveOffset!.x, this.mouseMoveOffset!.y);
			const dx = x - _offsetX_pre;
			const dy = y - _offsetY_pre;
			this.vertexes = this.vertexes.map((vertex: [number, number]) => {
				return [vertex[0] + dx, vertex[1] + dy];
			});
			this.mouseMoveOffset = { x: offsetX, y: offsetY };
			this.notifyEditing();
		}
	};
	private canvasMouseUp = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		if (!this.isMoveEditing) return;
		const { offsetX, offsetY } = e;
		const [x, y] = this.getTransformPoint(offsetX, offsetY);
		this.vertexes = [[x, y]];
		this.isEditing = false;
		this.isMoveEditing = false;
		this.mouseMoveOffset = null;
		this.notifyEditCompleted();
	};
	private canvasMouseContextmenu(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const isIn = isPointInKeypointShape(offsetX, offsetY, this.vertexes, this.ctx);
		if (isIn) {
			this.notifyContextmenuObserver(e);
		}
	}
	public draw(vertexes: [number, number][]) {
		if (!vertexes?.length) return;
		this.vertexes = vertexes;
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		const radius = this.radius / scale;
		// 绘制点位
		ctx.save();
		ctx.fillStyle = defaultColor;
		ctx.beginPath();
		ctx.arc(vertexes[0][0], vertexes[0][1], radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
		// 绘制描边
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 2 / scale;
		ctx.strokeStyle = '#ffffff';
		ctx.arc(vertexes[0][0], vertexes[0][1], radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.restore();
	}
	public render() {
		this.draw(this.vertexes);
	}
	public destroy() {
		this.isEditing = false;
		this.vertexes = [];
		this.canvas.removeEventListener('mousedown', this.canvasMouseDown);
		this.canvas.removeEventListener('mousemove', this.canvasMouseMove);
		this.canvas.removeEventListener('mouseup', this.canvasMouseUp);
		this.canvas.removeEventListener('contextmenu', this.canvasMouseContextmenu);
	}
}
