import type { PropType, CSSProperties } from 'vue';
import 'video.js/dist/video-js.css';
declare const _default: import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    type: {
        type: StringConstructor;
        default: string;
        values: string[];
    };
    src: {
        type: StringConstructor;
        default: string;
    };
    tensorflow: {
        type: ObjectConstructor;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("loaded" | "play" | "error" | "detector")[], "loaded" | "play" | "error" | "detector", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    type: {
        type: StringConstructor;
        default: string;
        values: string[];
    };
    src: {
        type: StringConstructor;
        default: string;
    };
    tensorflow: {
        type: ObjectConstructor;
    };
}>> & {
    onPlay?: (...args: any[]) => any;
    onLoaded?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onDetector?: (...args: any[]) => any;
}, {
    className: string;
    style: CSSProperties;
    type: string;
    src: string;
}, {}>;
export default _default;
