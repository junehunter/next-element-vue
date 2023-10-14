declare const _default: import("vue").DefineComponent<{
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("confirmSearch" | "clearSearch" | "zoomResize")[], "confirmSearch" | "clearSearch" | "zoomResize", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
}>> & {
    onConfirmSearch?: (...args: any[]) => any;
    onClearSearch?: (...args: any[]) => any;
    onZoomResize?: (...args: any[]) => any;
}, {
    columns: unknown[];
}, {}>;
export default _default;
