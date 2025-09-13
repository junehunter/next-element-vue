import type { ScaleTranslate } from '../config';

/**
 * 点位数据转换为路径
 * @param vertexes 点位数据
 * @returns
 */
export const printsToPath = (vertexes: [number, number][]): Path2D => {
	const path = new Path2D();
	if (vertexes.length) {
		path.moveTo(vertexes[0][0], vertexes[0][1]);
		for (let i = 1; i < vertexes.length; i++) {
			const [x, y] = vertexes[i];
			path.lineTo(x, y);
		}
	}
	return path;
};
/**
 * 点是否在折线内
 * @param px 鼠标x坐标
 * @param py 鼠标y坐标
 * @param vertexes 点位数据
 * @param ctx 上下文
 * @returns
 */
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
/**
 * 点是否在圆内
 * @param mouseX 鼠标x坐标
 * @param mouseY 鼠标y坐标
 * @param circleX 圆x坐标
 * @param circleY 圆y坐标
 * @param radius 圆半径
 * @returns
 */
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
/**
 * 获取画布转换平移和缩放比例
 * @param ctx 上下文
 * @returns
 */
export const getTranslateAndScale = (ctx: CanvasRenderingContext2D) => {
	/**
	 * 转换矩阵
	 * [a,c,e]
	 * [b,d,f]
	 * [0,0,1]
	 * a: 水平缩放比例 scaleX
	 * b: 垂直倾斜角度 skewY
	 * c: 水平倾斜角度 skewX
	 * d: 垂直缩放比例 scaleY
	 * e: 水平平移距离 translateX
	 * f: 垂直平移距离 translateY
	 */
	const transformMatrix = ctx.getTransform();
	const { a: scaleX, b: skewY, e: translateX, f: translateY } = transformMatrix;
	const scale = Math.hypot(scaleX, skewY);
	return { scale, translateX, translateY };
};
/**
 * 图片缩放后点位数据转换
 * @param vertex 点位
 * @param scaleX 缩放比例
 * @param scaleY 缩放比例
 * @param isMultiply true 转为缩放后点位数据 false 还原为图片真实位置
 * @returns
 */
export const vertexToImageScale = (vertex: [number, number], scaleX: number, scaleY: number, isMultiply: boolean = true): [number, number] => {
	const [x, y] = vertex;
	if (isMultiply) {
		return [x * scaleX, y * scaleY];
	} else {
		return [x / scaleX, y / scaleY];
	}
};
/**
 * 图片缩放后点位集合数据转换
 * @param vertexes 点位数据
 * @param scaleX 缩放比例
 * @param scaleY 缩放比例
 * @param isMultiply true 转为缩放后点位数据 false 还原为图片真实位置
 * @returns
 */
export const vertexesToImageScale = (vertexes: [number, number][], scaleX: number, scaleY: number, isMultiply: boolean = true): [number, number][] => {
	if (!vertexes?.length) return [];
	return vertexes.map(item => vertexToImageScale(item, scaleX, scaleY, isMultiply));
};
/**
 * 点位数据转换
 * @param vertex 点位
 * @param scaleOffset 缩放偏移
 * @returns
 */
export const vertexeTransform = (vertex: [number, number], scaleOffset: ScaleTranslate): [number, number] => {
	const { scale, x: offsetX, y: offsetY } = scaleOffset;
	const [x, y] = vertex;
	return [(x - offsetX) / scale, (y - offsetY) / scale];
};
/**
 * 点位集合数据转换
 * @param vertexes 点位数据
 * @param scaleOffset 缩放偏移
 * @returns
 */
export const vertexesTransform = (vertexes: [number, number][], scaleOffset: ScaleTranslate): [number, number][] => {
	if (!vertexes?.length) return [];
	return vertexes.map(item => vertexeTransform(item, scaleOffset));
};
