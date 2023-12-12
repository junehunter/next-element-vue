import './src/index.scss';
export declare const NextMenu: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    router: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: import("vue").PropType<"horizontal" | "vertical">;
        values: string[];
        default: string;
    };
    menuTree: {
        type: import("vue").PropType<import("./src/interface").MenuItemInterface[]>;
        default: () => any[];
    };
}, () => JSX.Element, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    router: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: import("vue").PropType<"horizontal" | "vertical">;
        values: string[];
        default: string;
    };
    menuTree: {
        type: import("vue").PropType<import("./src/interface").MenuItemInterface[]>;
        default: () => any[];
    };
}>>, {
    className: string;
    style: import("vue").CSSProperties;
    router: boolean;
    mode: "horizontal" | "vertical";
    menuTree: import("./src/interface").MenuItemInterface[];
}, {}>> & Record<string, any>;
export default NextMenu;
