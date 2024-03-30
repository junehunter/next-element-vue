import './src/index.scss';
export declare const NextTreeSelect: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor | ObjectConstructor | ArrayConstructor)[];
        default: string;
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
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "node-click" | "node-contextmenu" | "check" | "check-change" | "node-expand" | "node-collapse" | "current-change")[], "change" | "node-click" | "node-contextmenu" | "check" | "check-change" | "node-expand" | "node-collapse" | "current-change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor | ObjectConstructor | ArrayConstructor)[];
        default: string;
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
}>> & {
    onChange?: (...args: any[]) => any;
    "onNode-click"?: (...args: any[]) => any;
    "onNode-contextmenu"?: (...args: any[]) => any;
    onCheck?: (...args: any[]) => any;
    "onCheck-change"?: (...args: any[]) => any;
    "onNode-expand"?: (...args: any[]) => any;
    "onNode-collapse"?: (...args: any[]) => any;
    "onCurrent-change"?: (...args: any[]) => any;
}, {
    modelValue: string | number | boolean | Record<string, any> | unknown[];
    column: Record<string, any>;
    disabled: boolean;
    formParams: Record<string, any>;
}, {}>> & Record<string, any>;
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
}, {}>> & Record<string, any>;
export default NextForm;
