<h1 align="center">
   <b>
        <a href="https://junehunter.github.io/next-element-vue" target="_blank"><img height="100px" src="https://junehunter.github.io/next-element-vue/logo.svg" /></a><br>
    </b>
</h1>
<p align="center">基于Element Plus封装的高级组件库，快速、灵活配置搭建你的应用</p>
<p align="center">
    <a href="https://junehunter.github.io/next-element-vue" target="_blank"><b>Website</b></a> •
    <a href="https://junehunter.github.io/next-element-vue" target="_blank"><b>Documentation</b></a>
</p>

## 安装

```shell
# node版本建议>=16 pnpm >= 8.X.X
# pnpm
$ pnpm add next-element-vue

# Yarn
$ yarn add next-element-vue

# NPM
$ npm install next-element-vue --save
```

## 快速开始
**完整引入**
```typescript
import { createApp } from 'vue';
import App from './App/vue';
// 先安装导入依赖 Element Plus，@vueuse/core，vue-router，vue-i18n
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import NextElement from 'next-element-vue';
import 'next-element-vue/dist/index.css';

const app = createApp(App)
app.use(ElementPlus)
app.use(NextElement)
app.mount('#app')
```

**布局组件使用**
```vue
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { GlobalStore } from '@/stores/global';
import { menuTree } from '../temp-menu';
const router = useRouter();
const { t, locale } = useI18n();
const globalStore = GlobalStore();
const { tabsViewList } = storeToRefs(globalStore);
const tabs = ref<any>(tabsViewList);
const getKeepAliveNames = computed(() => {
	const keepAlive = tabs.value.filter((o: any) => o.meta.keepAlive).map((o: any) => o.name);
	return keepAlive;
});
const layoutOptions = {
	logo: new URL('@/assets/images/logo.svg', import.meta.url).href,
	profile: new URL('@/assets/images/logo.svg', import.meta.url).href,
	menuTree: menuTree,
	tabs: tabs.value,
};
const onChangeLanguage = (langue: string) => {
	locale.value = langue;
};
const { proxy } = getCurrentInstance() as any;
const onChangeUserDropdown = (command: string) => {
	if (command === 'logOut') {
		proxy.$ElMessageBox
			.confirm('您确定要退出登录吗？', '退出登录', {
				type: 'warning',
				showClose: false,
				confirmButtonText: t('next.table.message.confirmButtonText'),
				cancelButtonText: t('next.table.message.cancelButtonText'),
			})
			.then(() => {
				const { fullPath } = router.currentRoute.value;
				proxy.$ElMessage.success('退出登录成功！');
				router.replace({
					path: '/login',
					query: {
						reload: fullPath,
					},
				});
			})
			.catch(() => {
				proxy.$ElMessage.info('取消退出登录！');
			});
	} else {
		router.push(command);
	}
};
</script>

<template>
	<NextLayout :options="layoutOptions" @changeLanguage="onChangeLanguage" @changeUserDropdown="onChangeUserDropdown">
		<template #default>
			<router-view v-slot="{ Component }">
				<transition name="slide-right" mode="out-in">
					<keep-alive :include="getKeepAliveNames" :max="10">
						<component :is="Component" />
					</keep-alive>
				</transition>
			</router-view>
		</template>
	</NextLayout>
</template>

```


****
**持续更新中...**