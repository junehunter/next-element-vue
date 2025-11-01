import { defaultColor } from '../config';
import { getTranslateAndScale, vertexesUnique, vertexeTransform } from './utils';
import { useChangeColor } from 'packages/utils/theme';
const { hexToRgba } = useChangeColor();

export default class CreateRectangle {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public vertexes: [number, number][];
	private isDrawing: boolean;
	private mouseOffset: { x: number; y: number };
	private vertexesObservers: Array<(vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void> = [];
	private drawCompleteCallback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void;
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.isDrawing = false;
		this.vertexes = [];
		this.mouseOffset = { x: 0, y: 0 };
		this.vertexes = new Proxy(this.vertexes, {
			set: (target, property, value) => {
				target[property] = value;
				this.notifyVertexesChange();
				return true;
			},
		});
		this.canvasMouseDown = this.canvasMouseDown.bind(this);
		this.canvasMouseMove = this.canvasMouseMove.bind(this);
		this.canvasMouseUp = this.canvasMouseUp.bind(this);
	}
	public subscribeVertexesChange(listener: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void) {
		this.vertexesObservers.push(listener);
	}
	private notifyVertexesChange() {
		this.vertexesObservers.forEach(listener => {
			listener(this.vertexes, this.mouseOffset);
		});
	}
	public subscribeDrawComplete(callback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void) {
		this.drawCompleteCallback = callback;
	}
	private notifyDrawComplete() {
		this.drawCompleteCallback?.(this.vertexes, this.mouseOffset);
	}
	private transformMousePoint(e: MouseEvent): [number, number] {
		const { scale, translateX, translateY } = getTranslateAndScale(this.ctx);
		return vertexeTransform([e.offsetX, e.offsetY], { scale: scale, x: translateX, y: translateY });
	}
	public start() {
		this.canvas.addEventListener('mousedown', this.canvasMouseDown);
		this.canvas.addEventListener('mousemove', this.canvasMouseMove);
		this.canvas.addEventListener('mouseup', this.canvasMouseUp);
	}
	public reset() {
		this.vertexes = [];
		this.isDrawing = false;
		this.mouseOffset.x = 0;
		this.mouseOffset.y = 0;
	}
	public stop() {
		this.vertexes = [];
		this.isDrawing = false;
		this.mouseOffset.x = 0;
		this.mouseOffset.y = 0;
		this.canvas.removeEventListener('mousedown', this.canvasMouseDown);
		this.canvas.removeEventListener('mousemove', this.canvasMouseMove);
		this.canvas.removeEventListener('mouseup', this.canvasMouseUp);
	}
	private canvasMouseDown(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		this.isDrawing = true;
		const [x, y] = this.transformMousePoint(e);
		this.mouseOffset.x = x;
		this.mouseOffset.y = y;
		this.vertexes = [[x, y]];
	}
	private canvasMouseMove(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		this.canvas!.style.cursor = 'crosshair';
		if (this.isDrawing) {
			const [x, y] = this.transformMousePoint(e);
			this.mouseOffset.x = x;
			this.mouseOffset.y = y;
			this.notifyVertexesChange();
		}
	}
	private canvasMouseUp(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		if (this.isDrawing) {
			this.canvas!.style.cursor = 'unset';
			const [x, y] = this.transformMousePoint(e);
			this.vertexes.push([x, y]);
			if (vertexesUnique(this.vertexes).length === 2) {
				this.notifyDrawComplete();
			}
		}
		this.isDrawing = false;
	}
	public drawRectangle(vertexes: [number, number][]) {
		if (vertexes.length < 1) return;
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		const { x, y } = this.mouseOffset;
		const start_x = vertexes[0][0];
		const start_y = vertexes[0][1];
		const end_x = vertexes[1]?.[0] ?? x;
		const end_y = vertexes[1]?.[1] ?? y;
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
	public destroy() {
		this.stop();
	}
}
