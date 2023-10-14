import './src/index.scss';
export declare const NextForm: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
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
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("submit" | "close")[], "submit" | "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
}, {
    options: Record<string, any>;
    columns: unknown[];
    formDatum: Record<string, any>;
}, {}>> & Record<string, any>;
export default NextForm;
