<script setup lang="ts">
const tabs = [
	{
		name: 'tab1',
		title: '首页',
		path: '/',
	},
	{
		name: 'tab2',
		title: '菜单1',
		path: '/home',
	},
	{
		name: 'tab3',
		title: '系统菜单',
		path: '/system',
	},
];
</script>

<template>
	<div class="container">
		<NextTabs :tabs="tabs"> </NextTabs>
	</div>
</template>

<style lang="scss" scoped></style>
