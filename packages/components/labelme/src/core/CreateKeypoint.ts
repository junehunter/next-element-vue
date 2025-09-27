import { defaultColor } from '../config';
import { getTranslateAndScale, vertexeTransform } from './utils';
import { useChangeColor } from 'packages/utils/theme';
const { hexToRgba } = useChangeColor();
export default class CreateKeypoint {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	private mouseOffset: { x: number; y: number };
	public vertexes: [number, number][] = [];
	private drawCompleteCallback: (vertexes: [number, number][], mouseOffset: { x: number; y: number }) => void;
	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.mouseOffset = { x: 0, y: 0 };
		this.canvasMouseClick = this.canvasMouseClick.bind(this);
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
		this.canvas.addEventListener('click', this.canvasMouseClick);
	}
	public stop() {
		this.reset();
		this.canvas.removeEventListener('click', this.canvasMouseClick);
	}
	public reset() {
		this.vertexes = [];
		this.mouseOffset.x = 0;
		this.mouseOffset.y = 0;
	}
	private canvasMouseClick = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.ctrlKey) return;
		const [x, y] = this.transformMousePoint(e);
		this.mouseOffset.x = x;
		this.mouseOffset.y = y;
		this.vertexes = [[x, y]];
		this.render();
		this.notifyDrawComplete();
	};

	public draw(vertexes: [number, number][]) {
		if (!vertexes?.length) return;
		const ctx = this.ctx;
		const { scale } = getTranslateAndScale(ctx);
		const radius = 5 / scale;
		ctx.save();
		ctx.fillStyle = hexToRgba(defaultColor, 1);
		ctx.beginPath();
		ctx.arc(vertexes[0][0], vertexes[0][1], radius, 0, 2 * Math.PI);
		ctx.fill();
		ctx.restore();
	}
	public render() {
		this.draw(this.vertexes);
	}
	public destroy() {
		this.stop();
	}
}
