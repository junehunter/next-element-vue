<script setup lang="ts">
import { ref, inject } from 'vue';
import { useLanguage, localeContextKey } from '../../../../publish/dist/index.js';

const locale = inject(localeContextKey, ref())! as any;
const layout = ref<string>('transverse');
const isTabs = ref<boolean>(true);
const menuTree = [
	{
		id: '18',
		path: '/home',
		name: 'Home',
		meta: {
			title: '首页',
			isLink: '',
			isHide: false,
			isKeepAlive: false,
			isAffix: false,
			icon: 'iconfont monitor-shouye-shouye',
			level: 1,
		},
		children: [],
	},
	{
		id: '11',
		path: '',
		name: '',
		meta: {
			title: '其它',
			isLink: '',
			isHide: false,
			isKeepAlive: false,
			isAffix: false,
			icon: 'iconfont monitor-data-Inquire',
			level: 1,
		},
		children: [
			{
				id: '12',
				path: '/11/12',
				name: 'AiboxBoxInfo11',
				meta: {
					title: '其它111',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					icon: 'iconfont monitor-shujuchaxun',
					level: 2,
				},
				children: [],
			},
		],
	},
	{
		id: '25',
		path: '',
		name: '',
		meta: {
			title: '系统管理',
			isLink: '',
			isHide: false,
			isKeepAlive: false,
			isAffix: false,
			icon: 'iconfont monitor-data-Inquire',
			level: 1,
		},
		children: [
			{
				id: '26',
				path: '/aibox/box-info',
				name: 'AiboxBoxInfo',
				meta: {
					title: '用户管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					icon: 'iconfont monitor-shujuchaxun',
					level: 2,
				},
				children: [],
			},
			{
				id: '29',
				path: '/aibox/event',
				name: 'AiboxEvent',
				meta: {
					title: '角色管理',
					isLink: '',
					isHide: false,
					isKeepAlive: false,
					isAffix: false,
					icon: 'iconfont monitor-jiankongzhongxin',
					level: 2,
				},
				children: [],
			},
		],
	},
];
const logo = new URL('/logo.svg', import.meta.url).href;
const layoutOptions = ref<any>({
	logo: logo,
	profile: logo,
	userName: '超级管理员',
	menuTree: menuTree,
	menuRouter: false,
	showTabs: isTabs.value,
	tabs: [],
	setting: {
		themeColor: '#1E90FF',
		layout: layout.value,
	},
});
const layoutRef = ref<any>();
const onChangeLayout = (val: string) => {
	layoutOptions.value.setting.layout = val;
	// layoutRef.value.options.setting.layout = layout.value;
};
const onChangeTab = val => {
	layoutOptions.value.showTabs = val;
	// layoutRef.value.options.showTabs = isTabs.value;
};
const onChangeLanguage = (langue: string) => {
	useLanguage(locale, langue);
	layoutOptions.value.menuTree = menuTree.slice(0, 1);
};
const changeOptions = opt => {};
const onSaveSetting = config => {
	console.log('config', config);
};
</script>

<template>
	<div class="layout-container">
		<div class="tabs">
			<el-radio-group v-model="layout" size="large" @change="onChangeLayout">
				<el-radio-button value="transverse">横向布局</el-radio-button>
				<el-radio-button value="columns">分栏布局</el-radio-button>
				<el-radio-button value="classic">经典布局</el-radio-button>
				<el-radio-button value="defaults">默认布局</el-radio-button>
				<el-radio-button value="composite">综合布局</el-radio-button>
			</el-radio-group>
			<div>
				<span style="padding: 0 20px">是否显示导航栏</span>
				<el-switch v-model="isTabs" @change="onChangeTab" />
			</div>
		</div>
		<NextLayout ref="layoutRef" style="margin-top: 10px; height: 600px" :options="layoutOptions" @changeLanguage="onChangeLanguage" @changeOptions="changeOptions">
			<template #header-tools-prefix>
				<li>666</li>
			</template>
			<!-- <template #header-menu>
				<div>自定义菜单</div>
			</template> -->

			<template v-if="isTabs" #tabs>
				<NextTabs :tabs="layoutOptions.tabs"></NextTabs>
			</template>
			<NextContainer className="main"> </NextContainer>
			<template #setting="{ config }">
				<footer style="padding: 20px 0; text-align: center">
					<el-button type="primary" @click="onSaveSetting(config)">
						<template #icon>
							<el-icon><Promotion /></el-icon>
						</template>
						<span>保存配置</span>
					</el-button>
				</footer>
			</template>
		</NextLayout>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	width: 100%;
	.tabs {
		display: flex;
		align-items: center;
	}
	:deep(.main) {
		background-color: #f5f5f5;
	}
}
</style>
