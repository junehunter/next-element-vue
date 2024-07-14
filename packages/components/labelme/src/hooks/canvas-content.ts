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
export const colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];
export const DrawBaseCanvas = (options: DrawBaseCanvasProps) => {
	const { canvas, ctx, image, canvasWidth, canvasHeight } = options;
	const updatePolygon = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
	};
	updatePolygon();
	let isDrawing = false,
		isEditor = false,
		printsIndex = 0,
		mouseX = 0,
		mouseY = 0;
	let prints = [];
	const createPolygon = () => {
		updatePolygon();
		const color = colors[0];
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
		ctx.lineTo(mouseX, mouseY);
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
		}
	};

	const canvasClick = (e: MouseEvent) => {
		e.stopPropagation();
		isDrawing = true;
		canvas!.style.cursor = 'crosshair';
		const print = [e.offsetX, e.offsetY];
		if (!isEditor) {
			prints.push(print);
		} else {
			prints.splice(printsIndex, 0, print);
		}
	};
	const canvasMouseMove = (e: MouseEvent) => {
		e.stopPropagation();
		if (isDrawing) {
			mouseX = e.offsetX;
			mouseY = e.offsetY;
			createPolygon();
		} else {
			const x = e.offsetX,
				y = e.offsetY;
			const path = printsToPath(prints);
			const inside_stroke = ctx.isPointInStroke(path, x, y);
			if (inside_stroke) {
				const i = isPointOnLineSegment(x, y, prints, ctx);
				if (i > -1) {
					canvas!.style.cursor = 'pointer';
					printsIndex = i;
					isEditor = true;
				} else {
					canvas!.style.cursor = 'unset';
					printsIndex = -1;
					isEditor = false;
				}
				return;
			}
			const inside_path = ctx.isPointInPath(path, x, y);
			if (inside_path) {
				canvas!.style.cursor = 'move';
			} else {
				canvas!.style.cursor = 'unset';
			}
		}
	};
	const canvasDblclick = (e: MouseEvent) => {
		e.stopPropagation();
		isDrawing = false;
		canvas!.style.cursor = 'unset';
		mouseX = e.offsetX;
		mouseY = e.offsetY;
		prints.push([mouseX, mouseY]);
		prints = printsUnique(prints);
		createPolygon();
		// prints = [];
	};

	canvas.addEventListener('click', canvasClick);
	canvas.addEventListener('mousemove', canvasMouseMove);
	canvas.addEventListener('dblclick', canvasDblclick);
	const removeEventAll = () => {
		canvas.removeEventListener('click', canvasClick);
	};
	return {
		updatePolygon,
		removeEventAll,
	};
};

export const DrawPolygonCanvas = () => {};
