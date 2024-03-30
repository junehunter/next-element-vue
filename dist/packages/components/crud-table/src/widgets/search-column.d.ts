declare const _default: import("vue").DefineComponent<{
    searchSpan: {
        type: NumberConstructor;
        default: number;
    };
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
    formParams: {
        type: ObjectConstructor;
        default: () => void;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    searchSpan: {
        type: NumberConstructor;
        default: number;
    };
    columns: {
        type: ArrayConstructor;
        default: () => any[];
    };
    formParams: {
        type: ObjectConstructor;
        default: () => void;
    };
}>>, {
    searchSpan: number;
    columns: unknown[];
    formParams: Record<string, any>;
}, {}>;
export default _default;
