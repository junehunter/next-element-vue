import './src/index.scss';
export declare const NextSpinLoading: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    tip: {
        type: StringConstructor;
        default: string;
    };
}, {
    t: import("../..").Translator;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    tip: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    className: string;
    style: import("vue").CSSProperties;
    loading: boolean;
    tip: string;
}, {}>> & Record<string, any>;
export default NextSpinLoading;
