<script setup lang="ts">
import { ref } from 'vue';

const layout = ref<string>('transverse');
const isTabs = ref<boolean>(true);
const menuTree = [];
const logo = new URL('/logo.svg', import.meta.url).href;
const layoutOptions = {
	logo: logo,
	profile: logo,
	menuTree: menuTree,
	showTabs: isTabs.value,
	tabs: [],
};
</script>

<template>
	<div class="layout-container">
		<div class="tabs">
			<el-radio-group v-model="layout" size="large">
				<el-radio-button label="transverse">横向布局</el-radio-button>
				<el-radio-button label="columns">分栏布局</el-radio-button>
				<el-radio-button label="classic">经典布局</el-radio-button>
				<el-radio-button label="defaults">默认布局</el-radio-button>
			</el-radio-group>
			<div>
				<span style="padding: 0 20px">是否显示导航栏</span>
				<el-switch v-model="isTabs" />
			</div>
		</div>
		<NextLayout style="margin-top: 10px; height: 600px" :options="layoutOptions" :layout="layout">
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
		background-color: #0000000d;
	}
}
</style>
