<script setup lang="ts">
import { ref, inject } from 'vue';
import { useLanguage, localeContextKey } from '../../../../dist/index.js';

const locale = inject(localeContextKey, ref())!;
const layout = ref<string>('transverse');
const isTabs = ref<boolean>(true);
const menuTree = [];
const logo = new URL('/logo.svg', import.meta.url).href;
const layoutOptions = ref<any>({
	logo: logo,
	profile: logo,
	menuTree: menuTree,
	showTabs: isTabs.value,
	tabs: [],
	setting: {
		themeColor: '#1E90FF',
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
};
</script>

<template>
	<div class="layout-container">
		<div class="tabs">
			<el-radio-group v-model="layout" size="large" @change="onChangeLayout">
				<el-radio-button label="transverse">横向布局</el-radio-button>
				<el-radio-button label="columns">分栏布局</el-radio-button>
				<el-radio-button label="classic">经典布局</el-radio-button>
				<el-radio-button label="defaults">默认布局</el-radio-button>
			</el-radio-group>
			<div>
				<span style="padding: 0 20px">是否显示导航栏</span>
				<el-switch v-model="isTabs" @change="onChangeTab" />
			</div>
		</div>
		<NextLayout ref="layoutRef" style="margin-top: 10px; height: 600px" :options="layoutOptions" @changeLanguage="onChangeLanguage">
			<template v-if="isTabs" #tabs>
				<NextTabs :tabs="layoutOptions.tabs"></NextTabs>
			</template>
			<NextContainer className="main"> </NextContainer>
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
