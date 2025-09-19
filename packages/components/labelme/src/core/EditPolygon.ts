import { isValueExist } from 'packages/hooks/global-hook';
import { defaultColor } from '../config';
import { getTranslateAndScale, isPointInCircle, isPointInPath, vertexesUnique, vertexeTransform } from './utils';
import { useChangeColor } from 'packages/utils/theme';
const { hexToRgba } = useChangeColor();

export default class EditPolygon {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	private imageScaleX: number = 1;
	private imageScaleY: number = 1;
	private vertexes: [number, number][];
	private mouseMoveOffset: [number, number];
	private isEditing: boolean;
	private isMoveEditing: boolean;
	private canClickEvent: boolean;
	private pointVertexIndex: number;
	private pointCentreIndex: number;
	private vertexRadius: number;
	private edgeCentreRadius: number;
	private pointRecover: Array<number>;
	private observers: ((vertexes: [number, number][]) => void)[] = [];
	private editPolygonObserver?: (vertexes: [number, number][]) => void;
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, imageScaleX: number, imageScaleY: number) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.imageScaleX = imageScaleX;
		this.imageScaleY = imageScaleY;
		this.vertexes = [];
		this.isEditing = false;
		this.canClickEvent = true;
		this.isMoveEditing = false;
		this.pointVertexIndex = -1;
		this.pointCentreIndex = -1;
		this.vertexRadius = 8;
		this.edgeCentreRadius = 5;
		this.pointRecover = [];
		this.canvasMousedown = this.canvasMousedown.bind(this);
		this.canvasMouseup = this.canvasMouseup.bind(this);
		this.canvasMousemove = this.canvasMousemove.bind(this);
		this.canvasMouseClick = this.canvasMouseClick.bind(this);
	}
	private notifyEditPolygonObserver() {
		this.editPolygonObserver?.(this.vertexes);
	}
	public onEditPolygon(callback: (vertexes: [number, number][]) => void) {
		this.editPolygonObserver = callback;
	}
	private getTransformPoint(x: number, y: number): [number, number] {
		const { scale, translateX, translateY } = getTranslateAndScale(this.ctx);
		return vertexeTransform([x, y], { scale: scale, x: translateX, y: translateY });
	}
	drawPolygonPath(vertexes: [number, number][], mouseX?: number, mouseY?: number) {
		const ctx = this.ctx;
		if (!vertexes.length) return;
		const { scale } = getTranslateAndScale(this.ctx);
		const color = defaultColor;
		ctx.save();
		ctx.beginPath();
		ctx.lineWidth = 2 / scale;
		ctx.strokeStyle = color;
		ctx.fillStyle = hexToRgba(color, 0.2);
		ctx.moveTo(vertexes[0][0], vertexes[0][1]);
		for (let i = 1; i < vertexes.length; i++) {
			const [x, y] = vertexes[i];
			ctx.lineTo(x, y);
		}
		if (!isNaN(mouseX) && !isNaN(mouseY)) {
			ctx.lineTo(mouseX, mouseY);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		ctx.restore();
	}
	drawPolygonEdgeCentre(vertexes: [number, number][]) {
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(this.ctx);
		const _vertexRadius = this.vertexRadius / scale;
		const _edgeCentreRadius = this.edgeCentreRadius / scale;
		const _vertexCentreRadius = Math.max(1, _vertexRadius - _edgeCentreRadius);
		const color = defaultColor;
		ctx.save();
		for (let i = 0; i < vertexes.length; i++) {
			const [x, y] = vertexes[i];
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, _vertexRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#FFFFFF';
			ctx.arc(x, y, _vertexCentreRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}
		for (let i = 0; i < vertexes.length; i++) {
			const start = vertexes[i % vertexes.length],
				end = vertexes[(i + 1) % vertexes.length];
			const x = start[0] + (end[0] - start[0]) / 2;
			const y = start[1] + (end[1] - start[1]) / 2;
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, _edgeCentreRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}
		ctx.restore();
	}
	render() {
		this.drawPolygonPath(this.vertexes);
		this.drawPolygonEdgeCentre(this.vertexes);
	}
	drawPolygon(vertexes: [number, number][], mouseOffset?: { x: number; y: number }) {
		this.vertexes = vertexes;
		if (mouseOffset) {
			this.drawPolygonPath(vertexes, mouseOffset.x, mouseOffset.y);
		} else {
			this.drawPolygonPath(vertexes);
			this.drawPolygonEdgeCentre(vertexes);
		}
	}
	private updateCanvasCursor(hit: boolean) {
		if (hit) {
			this.canvas!.style.cursor = 'pointer';
		} else {
			if (this.canvas!.style.cursor !== 'pointer') this.canvas!.style.cursor = 'unset';
		}
	}
	pointInVertexes(x: number, y: number) {
		const [_x, _y] = this.getTransformPoint(x, y);
		const { scale } = getTranslateAndScale(this.ctx);
		const _vertexRadius = this.vertexRadius / scale;
		const vertexes = this.vertexes;
		let aimIndex = null;
		for (let i = 0; i < vertexes.length; i++) {
			const [vertex_x, vertex_y] = vertexes[i];
			const isIn = isPointInCircle(_x, _y, vertex_x, vertex_y, _vertexRadius);
			if (isIn) {
				aimIndex = i;
				break;
			}
		}
		this.updateCanvasCursor(aimIndex !== null);
		return aimIndex;
	}
	pointInEdgeCentre(x: number, y: number) {
		const [_x, _y] = this.getTransformPoint(x, y);
		const { scale } = getTranslateAndScale(this.ctx);
		const _edgeCentreRadius = this.edgeCentreRadius / scale;
		const vertexes = this.vertexes;
		let aimIndex = null;
		for (let i = 0; i < vertexes.length; i++) {
			const start = vertexes[i % vertexes.length],
				end = vertexes[(i + 1) % vertexes.length];
			const vertex_x = start[0] + (end[0] - start[0]) / 2;
			const vertex_y = start[1] + (end[1] - start[1]) / 2;
			const isIn = isPointInCircle(_x, _y, vertex_x, vertex_y, _edgeCentreRadius);
			if (isIn) {
				aimIndex = i;
				break;
			}
		}
		this.updateCanvasCursor(aimIndex !== null);
		return aimIndex;
	}
	pointInVertexesOrEdgeCentre(x: number, y: number) {
		const [_x, _y] = this.getTransformPoint(x, y);
		const { scale } = getTranslateAndScale(this.ctx);
		const _vertexRadius = this.vertexRadius / scale;
		const _edgeCentreRadius = this.edgeCentreRadius / scale;
		const vertexes = this.vertexes;
		let aimIndex = null;
		for (let i = 0; i < vertexes.length; i++) {
			const [vertex_x, vertex_y] = vertexes[i];
			const isInVertex = isPointInCircle(_x, _y, vertex_x, vertex_y, _vertexRadius);
			const start = vertexes[i % vertexes.length],
				end = vertexes[(i + 1) % vertexes.length];
			const edge_center_x = start[0] + (end[0] - start[0]) / 2;
			const edge_center_y = start[1] + (end[1] - start[1]) / 2;
			const isInEdgeCenter = isPointInCircle(_x, _y, edge_center_x, edge_center_y, _edgeCentreRadius);
			if (isInVertex || isInEdgeCenter) {
				aimIndex = i;
				break;
			}
		}
		this.updateCanvasCursor(aimIndex !== null);
		return aimIndex;
	}
	private notifyObservers() {
		this.observers.forEach(listener => {
			listener(this.vertexes);
		});
	}
	public updatePolygon(callback: (vertexes: [number, number][]) => void) {
		if (this.isEditing) return;
		this.isEditing = true;
		this.canvas.addEventListener('mousedown', this.canvasMousedown);
		this.canvas.addEventListener('mouseup', this.canvasMouseup);
		this.canvas.addEventListener('mousemove', this.canvasMousemove);
		this.canvas.addEventListener('click', this.canvasMouseClick);
		this.observers.push(callback);
	}
	canvasMousedown(e: MouseEvent) {
		e.stopPropagation(); // 阻止事件冒泡
		e.preventDefault(); // 阻止默认事件
		if (e.ctrlKey) return;
		this.canClickEvent = true;
		const { offsetX: x, offsetY: y } = e;
		this.pointRecover = [x, y];
		const vertex_i = this.pointInVertexes(x, y);
		if (isValueExist(vertex_i)) {
			this.isMoveEditing = true;
			this.pointVertexIndex = vertex_i;
			this.vertexes.splice(this.pointVertexIndex, 1, [x, y]);
		}
		const i = this.pointInEdgeCentre(x, y);
		if (isValueExist(i)) {
			this.isMoveEditing = true;
			this.pointCentreIndex = i + 1;
			this.vertexes.splice(this.pointCentreIndex, 0, [x, y]);
		}
		setTimeout(() => {
			this.canClickEvent = false;
		}, 200);
		const isIn = isPointInPath(x, y, this.vertexes, this.ctx);
		if (isIn) {
			this.mouseMoveOffset = [x, y];
		}
	}
	canvasMouseup(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		let { offsetX, offsetY } = e;
		let [x, y] = this.getTransformPoint(offsetX, offsetY);
		this.vertexes = vertexesUnique(this.vertexes);
		for (let i = 0; i < this.vertexes.length; i++) {
			const p = this.vertexes[i];
			const radius = Math.sqrt((x - p[0]) ** 2 + (y - p[1]) ** 2);
			if (radius < 8 && radius > 0 && this.pointRecover.length) {
				x = this.pointRecover[0];
				y = this.pointRecover[1];
				this.pointRecover = [];
				break;
			}
		}
		if (this.pointVertexIndex > -1) {
			this.vertexes.splice(this.pointVertexIndex, 1, [x, y]);
		}
		if (this.pointCentreIndex > -1) {
			this.vertexes.splice(this.pointCentreIndex, 1, [x, y]);
		}
		this.isMoveEditing = false;
		this.mouseMoveOffset = null;
		this.pointVertexIndex = -1;
		this.pointCentreIndex = -1;
		this.drawPolygon(this.vertexes);
		this.notifyEditPolygonObserver();
	}
	canvasMousemove(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX, offsetY } = e;
		const aimIndex = this.pointInVertexesOrEdgeCentre(offsetX, offsetY);
		const [x, y] = this.getTransformPoint(offsetX, offsetY);
		if (this.isMoveEditing) {
			if (this.pointVertexIndex > -1) {
				this.vertexes.splice(this.pointVertexIndex, 1, [x, y]);
			}
			if (this.pointCentreIndex > -1) {
				this.vertexes.splice(this.pointCentreIndex, 1, [x, y]);
			}
			this.notifyObservers();
			return;
		}
		// 优先点位编辑：如果选中编辑点，不要整体移动
		if (isValueExist(aimIndex)) {
			return;
		}
		const isIn = isPointInPath(offsetX, offsetY, this.vertexes, this.ctx);
		if (isIn) {
			this.canvas!.style.cursor = 'move';
		}
		if (this.mouseMoveOffset) {
			const [_offsetX, _offsetY] = this.getTransformPoint(offsetX, offsetY);
			const [_offsetX_pre, _offsetY_pre] = this.getTransformPoint(this.mouseMoveOffset![0], this.mouseMoveOffset![1]);
			const dx = _offsetX - _offsetX_pre;
			const dy = _offsetY - _offsetY_pre;
			this.vertexes = this.vertexes.map((vertex: [number, number]) => {
				return [vertex[0] + dx, vertex[1] + dy];
			});
			this.notifyObservers();
			this.mouseMoveOffset = [offsetX, offsetY];
		}
	}
	canvasMouseClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const { offsetX: x, offsetY: y } = e;
		if (this.canClickEvent) {
			const i = this.pointInVertexes(x, y);
			if (isValueExist(i)) {
				if (this.vertexes.length <= 3) return;
				this.vertexes.splice(i, 1);
				this.drawPolygon(this.vertexes);
				this.notifyObservers();
				this.notifyEditPolygonObserver();
			}
		}
	}
	destroy() {
		this.vertexes = [];
		this.observers = [];
		this.isEditing = false;
		this.canClickEvent = false;
		this.canvas.removeEventListener('mousedown', this.canvasMousedown);
		this.canvas.removeEventListener('mouseup', this.canvasMouseup);
		this.canvas.removeEventListener('mousemove', this.canvasMousemove);
		this.canvas.removeEventListener('click', this.canvasMouseClick);
	}
}
