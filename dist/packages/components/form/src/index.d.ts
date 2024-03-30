declare const _default: import("vue").DefineComponent<{
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
    formDatum: {
        type: ObjectConstructor;
        default: () => {};
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("submit" | "close" | "reset")[], "submit" | "close" | "reset", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
    formDatum: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    onSubmit?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
    onReset?: (...args: any[]) => any;
}, {
    options: Record<string, any>;
    columns: unknown[];
    formDatum: Record<string, any>;
}, {}>;
export default _default;
