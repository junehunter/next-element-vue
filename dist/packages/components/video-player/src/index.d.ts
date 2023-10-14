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
        required: true;
    };
    tensorflow: {
        type: ObjectConstructor;
        default: () => {
            modelUrl: string;
            classNames: any[];
            tf: any;
        };
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("play" | "detector")[], "play" | "detector", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
        required: true;
    };
    tensorflow: {
        type: ObjectConstructor;
        default: () => {
            modelUrl: string;
            classNames: any[];
            tf: any;
        };
    };
}>> & {
    onPlay?: (...args: any[]) => any;
    onDetector?: (...args: any[]) => any;
}, {
    className: string;
    style: CSSProperties;
    type: string;
    src: string;
    tensorflow: Record<string, any>;
}, {}>;
export default _default;
