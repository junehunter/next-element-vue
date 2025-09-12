import type { Ref } from 'vue';

export enum ShapeType {
	Polygon = 'polygon',
	Rectangle = 'rectangle',
	Circle = 'circle',
}
export enum ToolsHandleType {
	CreatePolygon = 'createPolygon',
	EditPolygon = 'editPolygon',
	CreateRectangle = 'createRectangle',
	CreateCircle = 'createCircle',
}
export interface ScaleTranslate {
	scale: number;
	x: number;
	y: number;
}

export interface ScaleTranslateManager {
	scaleTranslate: Ref<ScaleTranslate>;
	onChangeScaleTranslate: (scaleTranslate: ScaleTranslate) => void;
	onResetScaleTranslate: () => void;
}

export interface ShapesProps {
	label?: string;
	points: [number, number][];
	group_id?: string;
	shape_type?: ShapeType;
}

export interface LabelNodeProps {
	imageWidth?: number;
	imageHeight?: number;
	shapes?: ShapesProps[];
}

export const defaultColor = '#5470c6';
export const colors = ['#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'];

export default {
	minContentHeight: 500,
};
