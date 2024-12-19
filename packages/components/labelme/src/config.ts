import type { Ref } from 'vue';
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
	shape_type?: string;
}

export interface LabelNodeProps {
	imageWidth?: number;
	imageHeight?: number;
	shapes?: ShapesProps[];
}

export default {
	minContentHeight: 500,
};
