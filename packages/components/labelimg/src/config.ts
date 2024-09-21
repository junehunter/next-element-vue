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

export default {
	minContentHeight: 500,
};
