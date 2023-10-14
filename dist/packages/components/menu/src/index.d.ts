import type { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    router: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: PropType<"horizontal" | "vertical">;
        values: string[];
        default: string;
    };
    menuTree: {
        type: ArrayConstructor;
        default: () => any[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    router: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: PropType<"horizontal" | "vertical">;
        values: string[];
        default: string;
    };
    menuTree: {
        type: ArrayConstructor;
        default: () => any[];
    };
}>>, {
    router: boolean;
    mode: "horizontal" | "vertical";
    menuTree: unknown[];
}, {}>;
export default _default;
