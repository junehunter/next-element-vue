<script setup lang="ts">
const base_url = window.location.origin + window.location.pathname;

const modelCfg = {
	modelUrl: new URL('./assets/base_web_model1212/model.json', import.meta.url).href,
	classNames: [
		{
			value: 0,
			label: '人',
		},
		{
			value: 1,
			label: '不戴安全帽',
		},
		{
			value: 3,
			label: '不戴口罩',
		},
		{
			value: 4,
			label: '不戴防毒面具',
		},
		{
			value: 5,
			label: '未穿反光衣',
		},
		{
			value: 7,
			label: '轿车',
		},
		{
			value: 8,
			label: '卡车',
		},
		{
			value: 9,
			label: '抽烟',
		},
		{
			value: 10,
			label: '烟雾',
		},
		{
			value: 11,
			label: '明火',
		},
		{
			value: 12,
			label: '打电话',
		},
		{
			value: 13,
			label: '玩手机',
		},
	],
};
const mp4_url = new URL('./assets/video/demo02.mp4', import.meta.url).href;
</script>

<template>
	<div class="layout-container">
		<el-row :gutter="20">
			<!-- <el-col :span="12">
				<div class="card-title">
					<span>m3u8</span>
				</div>
				<div class="card-body">
					<NextVideoPlayer type="m3u8" src="http://220.161.87.62:8800/hls/0/index.m3u8" :tensorflow="modelCfg"></NextVideoPlayer>
				</div>
			</el-col> -->
			<el-col :span="24">
				<div class="card-title">
					<span>MP4</span>
				</div>
				<div class="card-body">
					<NextVideoPlayer type="mp4" :src="mp4_url" :tensorflow="modelCfg"></NextVideoPlayer>
				</div>
			</el-col>
			<!-- <el-col :span="12">
				<div class="card-title">
					<span>mpegts</span>
				</div>
				<div class="card-body">
					<NextVideoPlayer type="mpegts" :src="'http://10.0.40.220:8080/live/livestream/13_0.flv'" :tensorflow="modelCfg"></NextVideoPlayer>
				</div>
			</el-col> -->
		</el-row>
	</div>
</template>

<style lang="scss" scoped>
.layout-container {
	.card-title {
		text-align: center;
		line-height: 30px;
	}
	.card-body {
		background-color: #f5f5f5;
		height: 450px;
	}
}
</style>
