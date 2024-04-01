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
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    tensorflow: {
        type: ObjectConstructor;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("loaded" | "play" | "error" | "detector")[], "loaded" | "play" | "error" | "detector", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    tensorflow: {
        type: ObjectConstructor;
    };
}>> & {
    onLoaded?: (...args: any[]) => any;
    onPlay?: (...args: any[]) => any;
    onError?: (...args: any[]) => any;
    onDetector?: (...args: any[]) => any;
}, {
    className: string;
    style: import("vue").CSSProperties;
    type: string;
    src: string;
    autoplay: boolean;
}, {}>> & Record<string, any>;
export default NextVideoPlayer;
