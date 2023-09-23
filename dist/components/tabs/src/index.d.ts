declare const _default: import("vue").DefineComponent<{
    activeTab: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    tabs: {
        type: ArrayConstructor;
        default: () => any[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "select" | "close")[], "change" | "select" | "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    activeTab: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    tabs: {
        type: ArrayConstructor;
        default: () => any[];
    };
}>> & {
    onChange?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
}, {
    tabs: unknown[];
    activeTab: string | number;
}, {}>;
export default _default;
