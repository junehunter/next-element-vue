declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
        default: () => any[];
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
        default: () => any[];
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: (...args: any[]) => any;
}, {
    modelValue: string | number | boolean | Record<string, any> | unknown[];
    min: number;
    max: number;
    disabled: boolean;
}, {}>;
export default _default;
