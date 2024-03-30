import type { PropType, CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
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
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
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
    style: CSSProperties;
    scrollbar: boolean;
    padding: string | number | boolean;
    card: boolean;
}, {}>;
export default _default;
