import { PropType, CSSProperties } from 'vue';
declare const _default: import("vue").DefineComponent<{
    className: {
        type: StringConstructor;
        default: string;
    };
    style: {
        type: PropType<CSSProperties>;
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
        type: PropType<CSSProperties>;
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
    layout: string;
    className: string;
    style: CSSProperties;
    options: Record<string, any>;
}, {}>;
export default _default;
