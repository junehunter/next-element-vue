import './src/index.scss';
export declare const NextVideoPlayer: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
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
        };
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("play" | "error" | "detector")[], "play" | "error" | "detector", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
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
        };
    };
}>> & {
    onPlay?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onDetector?: (...args: any[]) => any;
}, {
    className: string;
    style: import("vue").CSSProperties;
    type: string;
    src: string;
    tensorflow: Record<string, any>;
}, {}>> & Record<string, any>;
export default NextVideoPlayer;
