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
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    tip: {
        type: StringConstructor;
        default: string;
    };
}, {
    t: import("packages/hooks").Translator;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
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
    style: CSSProperties;
    loading: boolean;
    tip: string;
}, {}>;
export default _default;
