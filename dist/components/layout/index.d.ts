import './src/index.scss';
export declare const NextLayout: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    options: any;
    updateOptions: (cfg: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("changeLanguage" | "changeUserDropdown")[], "changeLanguage" | "changeUserDropdown", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    onChangeLanguage?: (...args: any[]) => any;
    onChangeUserDropdown?: (...args: any[]) => any;
}, {
    className: string;
    style: import("vue").CSSProperties;
    options: Record<string, any>;
}, {}>> & Record<string, any>;
export default NextLayout;
