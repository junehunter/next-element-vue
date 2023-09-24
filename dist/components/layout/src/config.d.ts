export declare const slots_config: {
    headerMenu: string;
    headerToolsPrefix: string;
    headerToolsSuffix: string;
    sidebarMenu: string;
};
declare const _default: {
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
        layout: string;
        themeColor: string;
        headerBarColor: string;
        headerBarFontColor: string;
        isHeaderBarColorGradual: boolean;
        asidebarColor: string;
        asidebarFontColor: string;
        isAsidebarColorGradual: boolean;
        isDark: boolean;
    };
};
export default _default;
