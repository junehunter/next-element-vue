<script setup lang="ts">
import { ref } from 'vue';
import { useDetectVideo } from '../../../../publish/dist/index.js';
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
const { detectVideoFrameImage } = useDetectVideo();
const videoPlayer = ref<any>();
let timer: any = null;
const imgSrc = ref<string>();
const onLoaded = () => {
	const { videoElement, palyerContainer } = videoPlayer.value.getElement();
	let calssList: string[] = [];
	detectVideoFrameImage(
		{
			container: palyerContainer,
			video: videoElement,
			modelUrl: modelCfg.modelUrl,
			classNames: modelCfg.classNames,
			classInput: [
				{
					cls: 0,
					score: 0.6,
				},
				{
					cls: 1,
					score: 0.6,
				},
				{
					cls: 4,
					score: 0.6,
				},
				{
					cls: 7,
					score: 0.6,
				},
				{
					cls: 12,
					score: 0.8,
				},
				{
					cls: 13,
					score: 0.8,
				},
			],
		},
		({ name, score, detectImage }: any) => {
			if (!calssList.includes(name)) {
				imgSrc.value = detectImage;
			}
		}
	);

	timer = setInterval(() => {
		calssList = [];
	}, 30000);
};
</script>

<template>
	<div class="layout-container">
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="card-title">
					<span>MP4</span>
				</div>
				<div class="card-body">
					<NextVideoPlayer ref="videoPlayer" type="mp4" :src="mp4_url" @loaded="onLoaded"></NextVideoPlayer>
				</div>
			</el-col>
			<el-col :span="12">
				<div class="card-title">
					<span>识别结果图片</span>
				</div>
				<div class="card-body">
					<img v-if="imgSrc" :src="imgSrc" alt="" style="width: 100%; height: 100%" />
				</div>
			</el-col>
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
