import { defaultColor } from '../config';
import { getTranslateAndScale, printsToPath, vertexesUnique, vertexeTransform } from './utils';
import { useChangeColor } from 'packages/utils/theme';
const { hexToRgba } = useChangeColor();

export default class CreatePolygon {
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
	public createEventListeners() {
		this.isDrawing = true;
		this.canvas.addEventListener('click', this.canvasMouseClick.bind(this));
		this.canvas.addEventListener('mousemove', this.canvasMousemove.bind(this));
		this.canvas.addEventListener('dblclick', this.canvasMouseDblclick.bind(this));
	}
	private transformMousePoint(e: MouseEvent): [number, number] {
		const { scale, translateX, translateY } = getTranslateAndScale(this.ctx);
		return vertexeTransform([e.offsetX, e.offsetY], { scale: scale, x: translateX, y: translateY });
	}
	canvasMouseClick(e: MouseEvent) {
		e.stopPropagation();
		this.isDrawing = true;
		const [x, y] = this.transformMousePoint(e);
		this.mouseOffset.x = x;
		this.mouseOffset.y = y;
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
			const [x, y] = this.transformMousePoint(e);
			this.mouseOffset.x = x;
			this.mouseOffset.y = y;
			this.canvas!.style.cursor = 'crosshair';
		}
	}
	canvasMouseDblclick(e: MouseEvent) {
		e.stopPropagation();
		if (this.isDrawing) {
			this.canvas!.style.cursor = 'unset';
			const [x, y] = this.transformMousePoint(e);
			this.mouseOffset.x = x;
			this.mouseOffset.y = y;
			this.vertexes.push([x, y]);
			this.vertexes = vertexesUnique(this.vertexes);
		}
		this.notifyDestryedListerers();
		this.destroy();
	}
	drawPolygon(vertexes: [number, number][]) {
		const ctx = this.ctx;
		if (!vertexes.length) return;
		const { scale } = getTranslateAndScale(this.ctx);
		ctx.save();
		const { x, y } = this.mouseOffset;
		const path = printsToPath([...vertexes, [x, y]]);
		path.closePath();
		const color = defaultColor;
		ctx.beginPath();
		ctx.lineWidth = 2 / scale;
		ctx.setLineDash([5, 5]);
		ctx.strokeStyle = color;
		ctx.fillStyle = hexToRgba(color, 0.2);
		ctx.stroke(path);
		ctx.fill(path);
		ctx.fillStyle = color;
		for (let i = 0; i < vertexes.length; i++) {
			const [x, y] = vertexes[i];
			ctx.beginPath();
			ctx.arc(x, y, 5 / scale, 0, 2 * Math.PI);
			ctx.fill();
		}
		ctx.restore();
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
