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
			svg: `<svg t="1718695810903" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11410" width="16" height="16"><path d="M988.672 502.272l-476.16-476.16-476.16 476.16c-8.704 8.704-8.704 22.528 0 31.232l1.536 1.536c8.704 8.704 22.528 8.704 31.232 0l443.392-443.392 443.392 443.392c8.704 8.704 22.528 8.704 31.232 0l1.536-1.536c8.704-8.704 8.704-22.528 0-31.232z" fill="" p-id="11411"></path><path d="M860.16 534.016c-12.288 0-22.016 9.728-22.016 22.016v333.312c0 54.272-27.648 64-47.104 64h-152.064v-227.84c0-25.088 0-59.392-44.544-59.392H418.816c-44.032 0-44.032 33.28-44.032 59.392v227.84h-153.6c-44.032 0-45.056-64-45.056-64v-333.312c0.512-12.288-8.704-22.528-20.992-23.04-12.288-0.512-22.528 8.704-23.04 20.992v368.64c0 65.536 70.144 75.264 70.144 75.264h217.088v-287.232h176.64v287.232H824.32c39.424 0 57.856-44.032 57.856-75.264v-366.592c0-12.288-9.728-22.016-22.016-22.016z" fill="" p-id="11412"></path></svg>`,
		},
		{
			value: '/personal',
			label: 'next.layout.personal',
			svg: `<svg t="1718695007028" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2161" width="16" height="16"><path d="M512 87.04c-136.704 0-247.808 111.104-247.808 247.808 0 98.816 58.368 184.32 142.336 223.744-155.136 45.568-268.8 188.928-268.8 358.912 0 10.752 8.704 19.456 19.456 19.456 10.752 0 19.456-8.704 19.456-19.456 0-184.832 150.528-335.36 335.36-335.36 136.704 0 247.808-111.104 247.808-247.808S648.704 87.04 512 87.04z m0 456.192c-115.2 0-208.384-93.696-208.384-208.384 0-115.2 93.696-208.384 208.384-208.384 115.2 0 208.384 93.696 208.384 208.384 0 114.688-93.184 208.384-208.384 208.384z m226.816 76.8c-8.704-6.656-20.992-5.12-27.648 3.584-6.656 8.704-5.12 20.992 3.584 27.648 83.968 64 132.096 161.28 132.096 266.752 0 10.752 8.704 19.456 19.456 19.456 10.752 0 19.456-8.704 19.456-19.456 0.512-118.272-53.248-226.816-146.944-297.984z" fill="" p-id="2162"></path></svg>`,
		},
		{
			value: 'logOut',
			label: 'next.layout.logOut',
			svg: `<svg t="1718695049981" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2313" width="16" height="16"><path d="M896 928H384a32 32 0 0 1-32-32v-128a32 32 0 0 1 64 0v96h448v-704h-448V256a32 32 0 1 1-64 0V128a32 32 0 0 1 32-32h512a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32z" fill="" p-id="2314"></path><path d="M608 544H192a32 32 0 0 1 0-64h416a32 32 0 0 1 0 64z" fill="" p-id="2315"></path><path d="M256 672a30.08 30.08 0 0 1-22.4-9.6l-128-128a30.72 30.72 0 0 1 0-44.8l128-128a31.36 31.36 0 1 1 44.8 44.8L173.44 512l104.96 105.6a30.72 30.72 0 0 1 0 44.8 30.08 30.08 0 0 1-22.4 9.6z" fill="" p-id="2316"></path></svg>`,
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
		// 头部栏字体激活颜色
		headerBarFontActiveColor: '#c71585',
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
