import { useChangeColor } from 'packages/utils/theme';
export interface CreateRectCanvasProps {
	canvasWidth: number;
	canvasHeight: number;
}
export interface DrawBaseCanvasProps extends CreateRectCanvasProps {
	canvas?: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	image: HTMLImageElement;
	scaleFactor?: number;
	paths?: any[];
}
export const printsToPath = (prints: [number, number][]): Path2D => {
	const path = new Path2D();
	if (prints.length) {
		path.moveTo(prints[0][0], prints[0][1]);
		for (let i = 1; i < prints.length; i++) {
			const x = prints[i][0],
				y = prints[i][1];
			path.lineTo(x, y);
		}
		path.closePath();
	}
	return path;
};
export const isPointOnLineSegment = (px: number, py: number, prints: [number, number][], ctx: CanvasRenderingContext2D): number => {
	let index = -1;
	for (let i = 0; i < prints.length; i++) {
		const [x1, y1] = prints[i];
		const [x2, y2] = prints[(i + 1) % prints.length];
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
/**
 * 点位数据去重
 * @param prints
 * @returns
 */
export const printsUnique = (prints: [number, number][]) => {
	return Array.from(new Set(prints.map(item => JSON.stringify(item)))).map(item => JSON.parse(item));
};
const { hexToRgba } = useChangeColor();
const default_color = '#5470c6';
export const colors = ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
class DrawPolygon {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public updateRender: Function;
	private prints: [number, number][];
	private mouseX: number;
	private mouseY: number;
	private isDrawing: boolean;
	private isEditor: boolean;
	private printsIndex: number;

	constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, updateRender: Function) {
		this.canvas = canvas;
		this.ctx = ctx;
		this.updateRender = updateRender;
		this.prints = [];
		this.mouseX = 0;
		this.mouseY = 0;
		this.isDrawing = false;
		this.isEditor = false;
		this.printsIndex = -1;
		canvas.addEventListener('click', this.canvasClick);
		canvas.addEventListener('mousemove', this.canvasMouseMove);
		canvas.addEventListener('dblclick', this.canvasDblclick);
	}
	createPolygon = () => {
		const ctx = this.ctx;
		const prints = this.prints;
		this.updateRender();
		if (!prints.length) return;
		const color = default_color;
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = color;
		ctx.fillStyle = hexToRgba(color, 0.2);
		ctx.moveTo(prints[0][0], prints[0][1]);
		for (let i = 1; i < prints.length; i++) {
			const x = prints[i][0],
				y = prints[i][1];
			ctx.lineTo(x, y);
		}
		ctx.lineTo(this.mouseX, this.mouseY);
		ctx.closePath();
		ctx.stroke();
		ctx.fill();
		for (let i = 0; i < prints.length; i++) {
			const x = prints[i][0],
				y = prints[i][1];
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, 5, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
			ctx.beginPath();
			ctx.fillStyle = '#FFFFFF';
			ctx.arc(x, y, 3, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
		}
	};
	editPolygon = (x: number, y: number) => {
		const prints = this.prints;
		const ctx = this.ctx;
		const path = printsToPath(prints);
		const inside_stroke = ctx.isPointInStroke(path, x, y);
		if (inside_stroke) {
			const i = isPointOnLineSegment(x, y, prints, ctx);
			if (i > -1) {
				this.canvas!.style.cursor = 'pointer';
				this.printsIndex = i;
				this.isEditor = true;
			} else {
				this.canvas!.style.cursor = 'unset';
				this.printsIndex = -1;
				this.isEditor = false;
			}
			return;
		}
		const inside_path = ctx.isPointInPath(path, x, y);
		if (inside_path) {
			this.canvas!.style.cursor = 'move';
		} else {
			this.canvas!.style.cursor = 'unset';
		}
	};
    drawPolygonEdgeCentre = () => {
        const ctx = this.ctx
        const prints = this.prints
		const color = default_color;
        for (let i = 0; i < prints.length; i++) {
            const start = prints[i % prints.length], end = prints[(i+1) % prints.length]
            const x = start[0] + (end[0] - start[0]) / 2
            const y = start[1] + (end[1] - start[1]) / 2
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.arc(x, y, 5, 0, Math.PI * 2);
			ctx.closePath();
			ctx.fill();
        }
    }
	canvasClick = (e: MouseEvent) => {
		e.stopPropagation();
		this.isDrawing = true;
		this.canvas!.style.cursor = 'unset';
		this.mouseX = e.offsetX;
		this.mouseY = e.offsetY;
		this.prints.push([this.mouseX, this.mouseY]);
		this.prints = printsUnique(this.prints);
	};
	canvasMouseMove = (e: MouseEvent) => {
		e.stopPropagation();
		if (this.isDrawing) {
			this.mouseX = e.offsetX;
			this.mouseY = e.offsetY;
			this.canvas!.style.cursor = 'crosshair';
			this.createPolygon();
		}
		if (this.isEditor) {
			this.editPolygon(e.offsetX, e.offsetY);
		}
	};
	canvasDblclick = (e: MouseEvent) => {
		e.stopPropagation();
		this.isDrawing = false;
		this.canvas!.style.cursor = 'unset';
		this.mouseX = e.offsetX;
		this.mouseY = e.offsetY;
		this.prints.push([this.mouseX, this.mouseY]);
		this.prints = printsUnique(this.prints);
		this.createPolygon();
        this.drawPolygonEdgeCentre()
        this.isEditor = true
	};
	removeEventAll = () => {
		this.canvas.removeEventListener('click', this.canvasClick);
		this.canvas.removeEventListener('mousemove', this.canvasMouseMove);
		this.canvas.removeEventListener('dblclick', this.canvasDblclick);
	};
}
export class CreateDrawCanvas {
	public canvas: HTMLCanvasElement;
	public ctx: CanvasRenderingContext2D;
	public image: HTMLImageElement;
	public canvasWidth: number;
	public canvasHeight: number;
	private paths: any[];
	public drawPolygon: DrawPolygon;

	constructor(options: DrawBaseCanvasProps) {
		const { canvas, ctx, image, canvasWidth, canvasHeight, paths } = options;
		this.canvas = canvas;
		this.ctx = ctx;
		this.image = image;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.paths = paths || [];
		this.render();
		this.drawPolygon = new DrawPolygon(canvas, ctx, this.render);
	}
	drawPolygons(paths: any[]) {
		const ctx = this.ctx;
		for (let i = 0; i < paths.length; i++) {
			const item = paths[i];
			const path = item.path;
			if (!path.length) return;
			const color = colors[i % colors.length];
			ctx.beginPath();
			ctx.lineWidth = 3;
			ctx.strokeStyle = color;
			ctx.fillStyle = hexToRgba(color, 0.2);
			ctx.moveTo(path[0][0], path[0][1]);
			for (let i = 1; i < path.length; i++) {
				const x = path[i][0],
					y = path[i][1];
				ctx.lineTo(x, y);
			}
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}
	initCanvas = () => {
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		this.ctx.drawImage(this.image, 0, 0, this.canvasWidth, this.canvasHeight);
		this.drawPolygons(this.paths);
	};
	render = () => {
		this.initCanvas();
	};
	destroyed() {
		this.drawPolygon.removeEventAll();
	}
}
