import { isValueExist } from 'packages/hooks/global-hook';
import { defaultColor } from '../config';
import type { ShapesProps } from '../config';
import { getTranslateAndScale, isPointInRectangle, vertexeTransform } from './utils';
import { useChangeColor } from 'packages/utils/theme';
import cloneDeep from 'lodash-es/cloneDeep';
const { hexToRgba } = useChangeColor();

export default class EditRectangle {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public shape: ShapesProps;
	private anchorRadius: number = 4;
	private anchorVertexIndex: number = null;
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
		this.canvasMouseDown = this.canvasMouseDown.bind(this);
		this.canvasMouseMove = this.canvasMouseMove.bind(this);
		this.canvasMouseUp = this.canvasMouseUp.bind(this);
		this.canvasMouseClick = this.canvasMouseClick.bind(this);
		this.canvasMouseContextmenu = this.canvasMouseContextmenu.bind(this);
	}
	public onEditing(observer: (vertexes: [number, number][]) => void) {
		if (this.isEditing) return;
		this.isEditing = true;
		this.canvas.addEventListener('mousedown', this.canvasMouseDown);
		this.canvas.addEventListener('mousemove', this.canvasMouseMove);
		this.canvas.addEventListener('mouseup', this.canvasMouseUp);
		this.canvas.addEventListener('click', this.canvasMouseClick);
		this.canvas.addEventListener('contextmenu', this.canvasMouseContextmenu);
		this.editingObservers.push(observer);
	}
	public offEditing(observer: (vertexes: [number, number][]) => void) {
		this.editingObservers = this.editingObservers.filter(obs => obs !== observer);
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
	public drawRectangle(vertexes: [number, number][]) {
		if (!vertexes?.length) return;
		this.vertexes = vertexes;
		const [start_x, start_y] = vertexes[0];
		const [end_x, end_y] = vertexes[1];
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		const color = defaultColor;
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 2 / scale;
		ctx.strokeStyle = color;
		ctx.fillStyle = hexToRgba(color, 0.2);
		ctx.strokeRect(start_x, start_y, end_x - start_x, end_y - start_y);
		ctx.fillRect(start_x, start_y, end_x - start_x, end_y - start_y);
		ctx.restore();
	}

	private drawVertexAnchors(vertexes: [number, number][]) {
		if (!vertexes?.length) return;
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		const color = defaultColor;
		const radius = this.anchorRadius / scale;
		ctx.save();
		ctx.lineWidth = 2 / scale;
		ctx.strokeStyle = color;
		ctx.fillStyle = '#ffffff';
		for (const vertex of vertexes) {
			const [x, y] = vertex;
			ctx.beginPath();
			ctx.rect(x - radius, y - radius, radius * 2, radius * 2);
			ctx.fill();
			ctx.stroke();
			ctx.closePath();
		}
		ctx.restore();
	}
	private pointInVertexAnchors(x: number, y: number): number {
		const vertexes = this.vertexes;
		if (!vertexes?.length) return null;
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		const radius = this.anchorRadius / scale;
		let aimIndex = null;
		for (let i = 0; i < vertexes.length; i++) {
			const [vx, vy] = vertexes[i];
			const start_x = vx - radius;
			const end_x = vx + radius;
			const start_y = vy - radius;
			const end_y = vy + radius;
			const isIn = isPointInRectangle(
				x,
				y,
				[
					[start_x, start_y],
					[end_x, end_y],
				],
				ctx
			);
			if (isIn) {
				aimIndex = i;
				break;
			}
		}
		this.updateCanvasCursor(aimIndex !== null);
		return aimIndex;
	}

	private updateCanvasCursor(hit: boolean) {
		if (hit) {
			this.canvas!.style.cursor = 'pointer';
		} else {
			if (this.canvas!.style.cursor !== 'pointer') this.canvas!.style.cursor = 'unset';
		}
	}
	private canvasMouseDown(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const aimIndex = this.pointInVertexAnchors(offsetX, offsetY);
		if (isValueExist(aimIndex)) {
			this.isMoveEditing = true;
			this.vertexes[aimIndex] = [offsetX, offsetY];
			this.anchorVertexIndex = aimIndex;
		}
		const isIn = isPointInRectangle(offsetX, offsetY, this.vertexes, this.ctx);
		if (isIn) {
			this.mouseMoveOffset = { x: offsetX, y: offsetY };
		}
	}
	private canvasMouseMove(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const aimIndex = this.pointInVertexAnchors(offsetX, offsetY);
		if (this.isMoveEditing) {
			const [x, y] = this.getTransformPoint(offsetX, offsetY);
			const _vertexes = cloneDeep(this.vertexes);
			_vertexes[this.anchorVertexIndex] = [x, y];
			const width = Math.abs(_vertexes[0][0] - _vertexes[1][0]);
			const height = Math.abs(_vertexes[0][1] - _vertexes[1][1]);
			if (width > 20 && height > 20) {
				this.vertexes[this.anchorVertexIndex] = [x, y];
			}
			this.notifyEditing();
			return;
		}
		// 优先点位编辑：如果选中编辑点，不要整体移动
		if (isValueExist(aimIndex)) {
			return;
		}
		const isIn = isPointInRectangle(offsetX, offsetY, this.vertexes, this.ctx);
		if (isIn) {
			this.canvas!.style.cursor = 'move';
		}
		if (this.mouseMoveOffset) {
			const [_offsetX, _offsetY] = this.getTransformPoint(offsetX, offsetY);
			const [_offsetX_pre, _offsetY_pre] = this.getTransformPoint(this.mouseMoveOffset!.x, this.mouseMoveOffset!.y);
			const dx = _offsetX - _offsetX_pre;
			const dy = _offsetY - _offsetY_pre;
			this.vertexes = this.vertexes.map((vertex: [number, number]) => {
				return [vertex[0] + dx, vertex[1] + dy];
			});
			this.mouseMoveOffset = { x: offsetX, y: offsetY };
			this.notifyEditing();
		}
	}
	private canvasMouseUp(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const [x, y] = this.getTransformPoint(offsetX, offsetY);
		if (isValueExist(this.anchorVertexIndex)) {
			const _vertexes = cloneDeep(this.vertexes);
			_vertexes[this.anchorVertexIndex] = [x, y];
			const width = Math.abs(_vertexes[0][0] - _vertexes[1][0]);
			const height = Math.abs(_vertexes[0][1] - _vertexes[1][1]);
			if (width > 20 && height > 20) {
				this.vertexes[this.anchorVertexIndex] = [x, y];
			}
		}
		this.isMoveEditing = false;
		this.anchorVertexIndex = null;
		this.mouseMoveOffset = null;
		this.notifyEditCompleted();
	}
	private canvasMouseClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		// this.notifyEditing();
	}
	private canvasMouseContextmenu(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const isIn = isPointInRectangle(offsetX, offsetY, this.vertexes, this.ctx);
		if (isIn) {
			this.notifyContextmenuObserver(e);
		}
	}
	public render() {
		this.drawRectangle(this.vertexes);
		this.drawVertexAnchors(this.vertexes);
	}
	destroy() {
		this.isEditing = false;
		this.vertexes = [];
		this.editingObservers = [];
		this.canvas.removeEventListener('mousedown', this.canvasMouseDown);
		this.canvas.removeEventListener('mousemove', this.canvasMouseMove);
		this.canvas.removeEventListener('mouseup', this.canvasMouseUp);
		this.canvas.removeEventListener('click', this.canvasMouseClick);
		this.canvas.removeEventListener('contextmenu', this.canvasMouseContextmenu);
	}
}
