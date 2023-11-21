import type { PropType, CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    listType: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
}, {
    t: import("packages/hooks").Translator;
    appContext: any;
    defaultPreviewSrcList: any;
    uploadfilesPreview: import("vue").Ref<{
        name: string;
        percentage?: number;
        size?: number;
        response?: unknown;
        url?: string;
        raw?: import("element-plus").UploadRawFile;
        status?: import("element-plus").UploadStatus;
        uid?: number;
    }[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "change"[], "change", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
        default: () => {};
    };
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    listType: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onChange?: (...args: any[]) => any;
}, {
    className: string;
    style: CSSProperties;
    modelValue: string;
    disabled: boolean;
    listType: string;
    accept: string;
}, {}>;
export default _default;
