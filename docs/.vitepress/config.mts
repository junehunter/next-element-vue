import { defineConfig } from 'vitepress';
import { mdPlugin } from './plugins/md-plugin';

const createdNav = () => {
	return [
		{
			text: '指南',
			link: '/guide/quickstart',
			activeMatch: '/guide/',
		},
		{
			text: '组件',
			link: '/components/layout',
			activeMatch: '/components/',
		},
	];
};
const createdSidebar = () => {
	return {
		'/guide/': {
			base: '/guide/',
			text: '指南',
			collapsed: false,
			items: [
				{
					text: '基础',
					collapsed: false,
					items: [
						{
							text: '安装',
							link: 'installation',
						},
						{
							text: '快速开始',
							link: 'quickstart',
						},
					],
				},
				{
					text: '进阶',
					collapsed: false,
					items: [
						{
							text: '国际化',
							link: 'i18n',
						},
						{
							text: '主题',
							link: 'theming',
						},
					],
				},
				{
					text: '开发',
					collapsed: false,
					items: [
						{
							text: '开发指南',
							link: 'dev-guide',
						},
					],
				},
			],
		},
		'/components/': {
			base: '/components/',
			text: '组件',
			collapsed: false,
			items: [
				{
					text: 'NextLayout 布局',
					link: 'layout',
				},
				{
					text: 'NextContainer 容器',
					link: 'container',
				},
				{
					text: 'NextCrudTable 表格',
					link: 'crud-table',
				},
				{
					text: 'NextForm 表单',
					link: 'form',
				},
				{
					text: 'NextMenu 菜单',
					link: 'menu',
				},
				{
					text: 'NextTabs 导航栏',
					link: 'tabs',
				},
				{
					text: 'NextDialog 弹框',
					link: 'dialog',
				},
				{
					text: 'NextSpinLoading 加载中',
					link: 'spin-loading',
				},
				{
					text: 'NextTextEllipsis 文本溢出',
					link: 'text-ellipsis',
				},
				{
					text: 'NextVideoPlayer 视频播放器',
					link: 'video-player',
				},
			],
		},
	};
};

export default defineConfig({
	base: process.env.NODE_ENV === 'production' ? '/next-element-vue' : '/',
	lang: 'zh-cn',
	title: 'Next Element Vue',
	description: '基于Element Plus封装的高级组件库',
	lastUpdated: true,
	cleanUrls: true,
	head: [
		['meta', { name: 'theme-color', content: '#10b981' }],
		['meta', { name: 'og:type', content: 'website' }],
		['meta', { name: 'og:locale', content: 'zh-cn' }],
		['meta', { name: 'og:site_name', content: 'Next Element Vue' }],
		['link', { rel: 'icon', href: './favicon.ico' }],
	],
	themeConfig: {
		logo: '/logo.svg',
		search: {
			provider: 'local',
		},
		nav: createdNav(),
		socialLinks: [{ icon: 'github', link: 'https://github.com/junehunter/next-element-vue' }],
		sidebar: createdSidebar(),
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023 huangteng',
		},
	},
	markdown: {
		config: md => mdPlugin(md),
	},
});
