import type { Ref } from 'vue';
import { useChangeColor } from 'packages/utils/theme';
import { isValueExist } from 'packages/hooks/global-hook';
import type { ScaleTranslate, LabelNodeProps, ShapesProps } from '../config';
export interface CreateRectCanvasProps {
	canvasWidth: number;
	canvasHeight: number;
}
export interface DrawBaseCanvasProps extends CreateRectCanvasProps {
	canvas?: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	image: HTMLImageElement;
	scaleFactor?: number;
	labels?: LabelNodeProps;
	scaleX?: number;
	scaleY?: number;
	scaleOffset?: Ref<ScaleTranslate>;
}
export const printsToPath = (vertexes: [number, number][]): Path2D => {
	const path = new Path2D();
	if (vertexes.length) {
		path.moveTo(vertexes[0][0], vertexes[0][1]);
		for (let i = 1; i < vertexes.length; i++) {
			const x = vertexes[i][0],
				y = vertexes[i][1];
			path.lineTo(x, y);
		}
		path.closePath();
	}
	return path;
};
export const isPointOnLineSegment = (px: number, py: number, vertexes: [number, number][], ctx: CanvasRenderingContext2D): number => {
	let index = -1;
	for (let i = 0; i < vertexes.length; i++) {
		const [x1, y1] = vertexes[i];
		const [x2, y2] = vertexes[(i + 1) % vertexes.length];
		const path = printsToPath([
			[x1, y1],
			[x2, y2],
		]);
		const inside_path = ctx.isPointInStroke(path, px, py);
		if (inside_path) {
			index = i;
			break;
		}
	}
	return index;
};
export const isPointInCircle = (mouseX: number, mouseY: number, circleX: number, circleY: number, radius: number) => {
	const distance = Math.sqrt(Math.pow(mouseX - circleX, 2) + Math.pow(mouseY - circleY, 2));
	if (distance < radius) {
		return true;
	} else {
		return false;
	}
};
/**
 * 点位数据去重
 * @param vertexes
 * @returns
 */
export const vertexesUnique = (vertexes: [number, number][]) => {
	return Array.from(new Set(vertexes.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
};
export const vertexToScale = (vertex: [number, number], scaleX: number, scaleY: number, isMultiply: boolean = true): [number, number] => {
	const [x, y] = vertex;
	if (isMultiply) {
		return [x * scaleX, y * scaleY];
	} else {
		return [x / scaleX, y / scaleY];
	}
};
export const vertexesToScale = (vertexes: [number, number][], scaleX: number, scaleY: number, isMultiply: boolean = true): [number, number][] => {
	if (!vertexes?.length) return [];
	return vertexes.map(item => vertexToScale(item, scaleX, scaleY, isMultiply));
};

const { hexToRgba } = useChangeColor();
const default_color = '#5470c6';
export const colors = ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
/**
 * 创建多边形顶点
 */
class CreatePolygonVertexes {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public vertexes: [number, number][];
	private isDrawing: boolean;
	private mouseOffset: { x: number; y: number };
	private vertexesObservers: ((vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void)[] = [];
	private destroyedObservers?: (vertexes: [number, number][]) => void;
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.isDrawing = false;
		this.vertexes = [];
		this.mouseOffset = { x: 0, y: 0 };
		canvas.addEventListener('click', this.canvasMouseClick.bind(this));
		canvas.addEventListener('mousemove', this.canvasMousemove.bind(this));
		canvas.addEventListener('dblclick', this.canvasMouseDblclick.bind(this));
		this.vertexes = new Proxy(this.vertexes, {
			set: (target, property, value) => {
				target[property] = value;
				this.notifyVertexChangeListeners();
				return true;
			},
		});
		this.mouseOffset = new Proxy(this.mouseOffset, {
			set: (target, property, value) => {
				target[property] = value;
				this.notifyVertexChangeListeners();
				return true;
			},
		});
	}
	private notifyVertexChangeListeners() {
		this.vertexesObservers.forEach(listener => {
			listener(this.vertexes, this.mouseOffset);
		});
	}
	public vertexesChangeEventListener(listener: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void) {
		this.vertexesObservers.push(listener);
	}
	private notifyDestryedListerers() {
		this.destroyedObservers(this.vertexes);
	}
	public onDestroyed(callback: (vertexes: [number, number][]) => void) {
		this.destroyedObservers = callback;
	}
	canvasMouseClick(e: MouseEvent) {
		e.stopPropagation();
		this.isDrawing = true;
		this.mouseOffset.x = e.offsetX;
		this.mouseOffset.y = e.offsetY;
		const [x, y] = [e.offsetX, e.offsetY];
		let is_add = true;
		for (let i = 0; i < this.vertexes.length; i++) {
			const p = this.vertexes[i];
			const radius = Math.sqrt((x - p[0]) ** 2 + (y - p[1]) ** 2);
			if (radius < 8) {
				is_add = false;
				break;
			}
		}
		if (is_add) this.vertexes.push([x, y]);
		this.vertexes = vertexesUnique(this.vertexes);
	}
	canvasMousemove(e: MouseEvent) {
		e.stopPropagation();
		if (this.isDrawing) {
			this.mouseOffset.x = e.offsetX;
			this.mouseOffset.y = e.offsetY;
			this.canvas!.style.cursor = 'crosshair';
		}
	}
	canvasMouseDblclick(e: MouseEvent) {
		e.stopPropagation();
		if (this.isDrawing) {
			this.canvas!.style.cursor = 'unset';
			this.mouseOffset.x = e.offsetX;
			this.mouseOffset.y = e.offsetY;
			this.vertexes.push([e.offsetX, e.offsetY]);
			this.vertexes = vertexesUnique(this.vertexes);
		}
		this.notifyDestryedListerers();
		this.destroy();
	}
	destroy() {
		this.isDrawing = false;
		this.vertexes = [];
		this.vertexesObservers = [];
		this.destroyedObservers = () => void this.canvas.removeEventListener('click', this.canvasMouseClick);
		this.canvas.removeEventListener('mousemove', this.canvasMousemove);
		this.canvas.removeEventListener('dblclick', this.canvasMouseDblclick);
	}
}
/**
 * 绘制编辑多边形
 */
class EditPolygonPath {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	private vertexes: [number, number][];
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
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.vertexes = [];
		this.isEditing = false;
		this.canClickEvent = true;
		this.isMoveEditing = false;
		this.pointVertexIndex = -1;
		this.pointCentreIndex = -1;
		this.vertexRadius = 8;
		this.edgeCentreRadius = 5;
		this.pointRecover = [];
	}
	private notifyEditPolygonObserver() {
		this.editPolygonObserver?.(this.vertexes);
	}
	public onEditPolygon(callback: (vertexes: [number, number][]) => void) {
		this.editPolygonObserver = callback;
	}
	getTransformPoint(x: number, y: number): [number, number] {
		const transformMatrix = this.ctx.getTransform();
		const scaleX = parseFloat(transformMatrix.a.toFixed(1));
		const scaleY = parseFloat(transformMatrix.d.toFixed(1));
		const translateX = Math.ceil(transformMatrix.e);
		const translateY = Math.ceil(transformMatrix.f);
		const _x = Math.floor((x - translateX) / scaleX);
		const _y = Math.floor((y - translateY) / scaleY);
		return [_x, _y];
	}
	drawPolygonPath(vertexes: [number, number][], mouseX?: number, mouseY?: number) {
		const ctx = this.ctx;
		if (!vertexes.length) return;
		const color = default_color;
		ctx.beginPath();
		ctx.lineWidth = 3;
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
	}
	drawPolygonEdgeCentre(vertexes: [number, number][]) {
		const ctx = this.ctx;
		const color = default_color;
		for (let i = 0; i < vertexes.length; i++) {
			const [x, y] = vertexes[i];
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, this.vertexRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#FFFFFF';
			ctx.arc(x, y, this.vertexRadius - 3, 0, Math.PI * 2);
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
			ctx.arc(x, y, this.edgeCentreRadius, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}
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
	pointInVertexes(x: number, y: number) {
		const [_x, _y] = this.getTransformPoint(x, y);
		const vertexes = this.vertexes;
		let aimIndex = null;
		for (let i = 0; i < vertexes.length; i++) {
			const [vertex_x, vertex_y] = vertexes[i];
			const isIn = isPointInCircle(_x, _y, vertex_x, vertex_y, this.vertexRadius);
			if (isIn) {
				this.canvas!.style.cursor = 'pointer';
				aimIndex = i;
				break;
			} else {
				this.canvas!.style.cursor = 'unset';
			}
		}
		return aimIndex;
	}
	pointInEdgeCentre(x: number, y: number) {
		const [_x, _y] = this.getTransformPoint(x, y);
		const vertexes = this.vertexes;
		let aimIndex = null;
		for (let i = 0; i < vertexes.length; i++) {
			const start = vertexes[i % vertexes.length],
				end = vertexes[(i + 1) % vertexes.length];
			const vertex_x = start[0] + (end[0] - start[0]) / 2;
			const vertex_y = start[1] + (end[1] - start[1]) / 2;
			const isIn = isPointInCircle(_x, _y, vertex_x, vertex_y, this.edgeCentreRadius);
			if (isIn) {
				this.canvas!.style.cursor = 'pointer';
				aimIndex = i;
				break;
			} else {
				this.canvas!.style.cursor = 'unset';
			}
		}
		return aimIndex;
	}
	pointInVertexesOrEdgeCentre(x: number, y: number) {
		const [_x, _y] = this.getTransformPoint(x, y);
		const vertexes = this.vertexes;
		for (let i = 0; i < vertexes.length; i++) {
			const [vertex_x, vertex_y] = vertexes[i];
			const isInVertex = isPointInCircle(_x, _y, vertex_x, vertex_y, this.vertexRadius);
			const start = vertexes[i % vertexes.length],
				end = vertexes[(i + 1) % vertexes.length];
			const edge_center_x = start[0] + (end[0] - start[0]) / 2;
			const edge_center_y = start[1] + (end[1] - start[1]) / 2;
			const isInEdgeCenter = isPointInCircle(_x, _y, edge_center_x, edge_center_y, this.edgeCentreRadius);
			if (isInVertex || isInEdgeCenter) {
				this.canvas!.style.cursor = 'pointer';
				break;
			} else {
				this.canvas!.style.cursor = 'unset';
			}
		}
	}
	private notifyObservers() {
		this.observers.forEach(listener => {
			listener(this.vertexes);
		});
	}
	public updatePolygon(callback: (vertexes: [number, number][]) => void) {
		this.isEditing = true;
		this.canvas.addEventListener('mousedown', this.canvasMousedown.bind(this));
		this.canvas.addEventListener('mouseup', this.canvasMouseup.bind(this));
		this.canvas.addEventListener('click', this.canvasMouseClick.bind(this));
		this.canvas.addEventListener('mousemove', this.canvasMousemove.bind(this));
		this.observers.push(callback);
	}
	canvasMousedown(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
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
	}
	canvasMouseup(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		let { offsetX: x, offsetY: y } = e;
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
		this.pointVertexIndex = -1;
		this.pointCentreIndex = -1;
		this.drawPolygon(this.vertexes);
		this.notifyObservers();
		this.notifyEditPolygonObserver();
	}
	canvasMouseClick(e: MouseEvent) {
		e.stopPropagation();
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
	canvasMousemove(e: MouseEvent) {
		e.stopPropagation();
		const { offsetX: x, offsetY: y } = e;
		this.pointInVertexesOrEdgeCentre(x, y);
		if (this.isMoveEditing) {
			if (this.pointVertexIndex > -1) {
				this.vertexes.splice(this.pointVertexIndex, 1, [x, y]);
			}
			if (this.pointCentreIndex > -1) {
				this.vertexes.splice(this.pointCentreIndex, 1, [x, y]);
			}
			this.notifyObservers();
		}
	}
	destroy() {
		this.vertexes = [];
		this.observers = [];
		this.isEditing = false;
		this.canvas.removeEventListener('mousedown', this.canvasMousedown);
		this.canvas.removeEventListener('mouseup', this.canvasMouseup);
		this.canvas.removeEventListener('click', this.canvasMouseClick);
		this.canvas.removeEventListener('mousemove', this.canvasMousemove);
	}
}
export class CreateDrawCanvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public image: HTMLImageElement;
	public canvasWidth: number;
	public canvasHeight: number;
	public scaleOffset: Ref<ScaleTranslate>;
	private labels: LabelNodeProps;
	private scaleX: number;
	private scaleY: number;
	private editDrawPolygon: EditPolygonPath;
	private createPolygonVertexes: CreatePolygonVertexes;
	private editVertexes: [number, number][];
	private editPolygonObservers: ((vertexes: [number, number][]) => void)[] = [];
	private drawnPolygonObserver?: (vertexes: [number, number][]) => void;
	constructor(options: DrawBaseCanvasProps) {
		const { canvas, ctx, image, canvasWidth, canvasHeight, labels, scaleX, scaleY, scaleOffset } = options;
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = image;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.scaleOffset = scaleOffset;
		this.labels = labels || {};
		this.scaleX = scaleX || 1;
		this.scaleY = scaleY || 1;
		this.editVertexes = [];
		this.render();
		this.createPolygonVertexes = new CreatePolygonVertexes(canvas, ctx);
		this.editDrawPolygon = new EditPolygonPath(canvas, ctx);
		this.createPolygonVertexes.vertexesChangeEventListener((vertexes, mouseOffset) => {
			this.render();
			this.editDrawPolygon.drawPolygon(vertexes, mouseOffset);
			this.editVertexes = vertexes;
			this.notifyObservers();
		});
		this.createPolygonVertexes.onDestroyed(vertexes => {
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

	drawPolygons(shapes: ShapesProps[]) {
		const ctx = this.ctx;
		const { scale } = this.scaleOffset.value;
		const scaleX = this.scaleX,
			scaleY = this.scaleY;
		for (let i = 0; i < shapes.length; i++) {
			const item = shapes[i];
			const path = vertexesToScale(item.points, scaleX, scaleY);
			if (!path.length) return;
			const color = colors[i % colors.length];
			ctx.beginPath();
			ctx.lineWidth = 2 / scale;
			ctx.strokeStyle = color;
			ctx.fillStyle = hexToRgba(color, 0.2);
			const startX = path[0][0];
			const startY = path[0][1];
			ctx.moveTo(startX, startY);
			for (let i = 1; i < path.length; i++) {
				const [x, y] = path[i];
				ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}
	drawCanvas = () => {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
		this.ctx.save();
		const shapes = this.labels.shapes;
		if (shapes?.length) this.drawPolygons(shapes);
		this.ctx.restore();
	};
	render = () => {
		this.canvas.width = this.canvasWidth;
		if (this.scaleOffset.value) {
			this.ctx.translate(this.scaleOffset.value.x, this.scaleOffset.value.y);
			this.ctx.scale(this.scaleOffset.value.scale, this.scaleOffset.value.scale);
		}
		this.drawCanvas();
	};
	destroy() {
		this.labels = {};
		this.editDrawPolygon.destroy();
		this.createPolygonVertexes.destroy();
	}
}
