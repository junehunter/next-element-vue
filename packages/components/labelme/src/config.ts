import type { Ref } from 'vue';

export enum ShapeType {
	Polygon = 'polygon',
	Rectangle = 'rectangle',
	Circle = 'circle',
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

export default {
	minContentHeight: 500,
};
