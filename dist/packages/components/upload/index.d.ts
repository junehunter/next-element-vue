import './src/index.scss';
export declare const NextUpload: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    listType: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
}, {
    t: import("../..").Translator;
    appContext: any;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    listType: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    className: string;
    style: import("vue").CSSProperties;
    listType: string;
    accept: string;
}, {}>> & Record<string, any>;
export default NextUpload;