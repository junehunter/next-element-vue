import './src/index.scss';
export declare const NextTabs: import("../../utils/install").SFCWithInstall<import("vue").DefineComponent<{
    activeTab: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    tabs: {
        type: import("vue").PropType<import("./src/interface").TabInterface[]>;
        default: () => any[];
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "select" | "close")[], "change" | "select" | "close", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    activeTab: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    tabs: {
        type: import("vue").PropType<import("./src/interface").TabInterface[]>;
        default: () => any[];
    };
}>> & {
    onChange?: (...args: any[]) => any;
    onSelect?: (...args: any[]) => any;
    onClose?: (...args: any[]) => any;
}, {
    activeTab: string | number;
    tabs: import("./src/interface").TabInterface[];
}, {}>> & Record<string, any>;
export default NextTabs;
