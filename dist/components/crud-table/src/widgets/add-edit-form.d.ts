declare const _default: import("vue").DefineComponent<{
    formDatum: {
        type: ObjectConstructor;
        default: () => {};
    };
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "submit")[], "close" | "submit", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    formDatum: {
        type: ObjectConstructor;
        default: () => {};
    };
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClose?: (...args: any[]) => any;
    onSubmit?: (...args: any[]) => any;
}, {
    formDatum: Record<string, any>;
    isEditing: boolean;
}, {}>;
export default _default;
