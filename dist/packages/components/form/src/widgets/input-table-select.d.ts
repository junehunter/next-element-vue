declare const InputTableSelect: import("vue").DefineComponent<{
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
        default: () => any[];
    };
    column: {
        type: ObjectConstructor;
        default: () => {};
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    formParams: {
        type: ObjectConstructor;
        default: () => {};
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "select"[], "select", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor | BooleanConstructor | ObjectConstructor)[];
        default: () => any[];
    };
    column: {
        type: ObjectConstructor;
        default: () => {};
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    formParams: {
        type: ObjectConstructor;
        default: () => {};
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onSelect?: (...args: any[]) => any;
}, {
    modelValue: string | number | boolean | Record<string, any> | unknown[];
    column: Record<string, any>;
    disabled: boolean;
    formParams: Record<string, any>;
    placeholder: string;
}, {}>;
export default InputTableSelect;
