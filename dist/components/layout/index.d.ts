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
    layout: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    config: {
        logo: string;
        title: string;
        language: string;
        languageDropdown: {
            value: string;
            label: string;
        }[];
        userDropdown: ({
            value: string;
            label: string;
            divided?: undefined;
        } | {
            value: string;
            label: string;
            divided: boolean;
        })[];
        showTabs: boolean;
        activeTab: string;
        tabs: any[];
        menuTree: any[];
        setting: {
            themeColor: string;
            headerBarColor: string;
            headerBarFontColor: string;
            isHeaderBarColorGradual: boolean;
            asidebarColor: string;
            asidebarFontColor: string;
            isAsidebarColorGradual: boolean;
            isDark: boolean;
        };
    } & Record<string, any>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("changeLanguage" | "changeUserDropdown")[], "changeLanguage" | "changeUserDropdown", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: import("vue").PropType<import("vue").CSSProperties>;
        default: () => {};
    };
    layout: {
        type: StringConstructor;
        values: string[];
        default: string;
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
    layout: string;
    options: Record<string, any>;
}, {}>> & Record<string, any>;
export default NextLayout;
