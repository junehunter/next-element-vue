<script setup lang="ts">
const menuTree = [
	{
		id: '1',
		path: '/',
		name: 'HomeView',
		meta: {
			title: '首页',
			isLink: '',
			isHide: false,
			isKeepAlive: false,
			isAffix: true,
			isIframe: '1',
			icon: '',
		},
		children: [],
	},
	{
		id: '2',
		path: '',
		name: '',
		meta: {
			title: '系统设置',
			isLink: '',
			isHide: false,
			isKeepAlive: false,
			isAffix: false,
			isIframe: '1',
			icon: '',
		},
		children: [
			{
				id: '2310',
				path: '/system/role',
				name: 'SystemRole',
				meta: {
					title: '角色配置',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: '1',
					icon: '',
				},
				children: [],
			},
			{
				id: '2311',
				path: '/system/user',
				name: 'SystemUser',
				meta: {
					title: '用户管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: '1',
					icon: '',
				},
				children: [],
			},
			{
				id: '2312',
				path: '/system/menu',
				name: 'SystemMenu',
				meta: {
					title: '菜单管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					isIframe: '1',
					icon: '',
				},
				children: [],
			},
		],
	},
];
</script>

<template>
	<div class="container">
		<NextMenu className="next-menu-custom-style" mode="vertical" :menuTree="menuTree"></NextMenu>
	</div>
</template>

<style lang="scss" scoped>
.container {
}
</style>
<style lang="scss">
.next-menu-custom-style {
	width: 200px;
	border-right: solid 1px var(--el-menu-border-color) !important;
}
</style>
