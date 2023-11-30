export const slots_config = {
	headerMenu: 'header-menu',
	headerToolsPrefix: 'header-tools-prefix',
	headerToolsSuffix: 'header-tools-suffix',
	sidebarMenu: 'sidebar-menu',
};

export default {
	logo: '',
	title: 'Next Element Vue',
	userName: 'Admin',
	language: 'zh-cn', // zh-cn en zh-tw
	languageDropdown: [
		{
			value: 'zh-cn',
			label: '简体中文',
		},
		{
			value: 'en',
			label: 'English',
		},
		{
			value: 'zh-tw',
			label: '繁體中文',
		},
	],
	userDropdown: [
		{
			value: '/',
			label: 'next.layout.home',
		},
		{
			value: '/personal',
			label: 'next.layout.personal',
		},
		{
			value: 'logOut',
			label: 'next.layout.logOut',
			divided: true,
		},
	],
	showTabs: true,
	activeTab: '/',
	tabs: [],
	menuTree: [],
	menuRouter: true,
	menuMode: 'horizontal', // 'horizontal', 'vertical'
	setting: {
		// 布局方式
		layout: 'transverse', // 'defaults', 'transverse', 'columns', 'classic'
		// 主题颜色
		themeColor: '#c71585',
		// 头部栏背景颜色
		headerBarColor: '#282c34',
		// 头部栏字体颜色
		headerBarFontColor: '#FFFFFF',
		// 头部栏背景颜色是否渐变
		isHeaderBarColorGradual: false,
		// 左侧侧边栏背景颜色
		asidebarColor: '#282c34',
		// 左侧侧边栏字体颜色
		asidebarFontColor: '#ffffff',
		// 左侧侧边栏背景色是否渐变
		isAsidebarColorGradual: false,
		// 是否暗黑模式
		isDark: false,
	},
};
