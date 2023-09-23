import './src/index.scss';
export declare const NextContainer: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    scrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    padding: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    card: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    scrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    padding: {
        type: (StringConstructor | BooleanConstructor | NumberConstructor)[];
        default: boolean;
    };
    card: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    className: string;
    style: import("vue").CSSProperties;
    scrollbar: boolean;
    padding: string | number | boolean;
    card: boolean;
}, {}>> & Record<string, any>;
export default NextContainer;
